---
title: Generic Relayer | Email Transaction Builder
sidebar_label: Generic Relayer
description: Technical guide to ZK Email's Generic Relayer system for integrating email-driven blockchain actions, including API endpoints, proof generation, and smart contract interactions
keywords: [generic relayer, email transactions, blockchain integration, zero-knowledge proofs, DKIM verification, smart contracts, EmailAuth.sol, command templates, API integration, decentralized architecture]
---

# Generic Relayer

The **Generic Relayer** allows developers to integrate email-driven actions into their blockchain applications seamlessly. By interacting with a specific API endpoint, you can trigger the execution of commands defined in a smart contract via email. The relayer handles the email verification process, zero-knowledge proof generation, and the execution of the command on the blockchain, simplifying development and enhancing security.

**ICP Canister ID**: `fxmww-qiaaa-aaaaj-azu7a-cai`

This ICP Canister ID is deployed as the IC DNS Oracle on the Internet Computer. This canister generates a signature for a pair of a domain and a hash of a DKIM public key registered on the distributed name service (DNS). The signature can be verified on Ethereum, allowing smart contracts on Ethereum to verify that the given domain and public key hash are registered on the DNS. For example, this is used in ZK Email to update a DKIM registry contract, which stores the authorized public key hashes accessed during email proof verification.

## Architecture Overview

![Generic Relayer Architecture Diagram](/img/generic-relayer-architecture.png)

The architecture consists of the following key components:

1. **Client Application**: Initiates the process by sending a request to the generic relayer's API.
2. **Generic Relayer**: Manages API requests, sends and receives emails, generates zero-knowledge proofs, and interacts with the blockchain.
3. **EmailAuth.sol Contract**: Defines the commands that can be executed via email authentication.
4. **Command Implementation Contract**: Uses `EmailAuth.sol` to execute specific commands and handle events.
5. **SMTP/IMAP Servers**: Used by the relayer for email communication.
6. **Blockchain Network**: Where smart contracts are deployed and transactions are executed.
7. **DKIM Registry**: Manages DKIM public keys for email verification.
8. **Database**: Stores request statuses and tracks expected email replies.

## Components

### Client Application

- **Purpose**: The entry point for users or other systems to initiate email-driven commands.
- **Responsibilities**:
  - Constructs API requests with necessary parameters.
  - Sends requests to the Generic Relayer's API endpoints.
  - Monitors request statuses and handles responses.

### Generic Relayer

- **Purpose**: The core server that orchestrates the entire email-driven command execution process.
- **Responsibilities**:
  - Handles incoming API requests.
  - Sends emails to users and receives replies.
  - Generates zero-knowledge proofs for email verification.
  - Interacts with the blockchain to execute commands.
  - Manages request tracking and status updates.

### EmailAuth.sol Contract

- **Purpose**: Smart contract that handles email authentication and command template management.
- **Responsibilities**:
  - Stores and manages command templates.
  - Authenticates emails using DKIM and zero-knowledge proofs.
  - Ensures commands match expected templates.
  - Prevents replay attacks using nullifiers.

### Command Implementation Contract (e.g., EmitEmailCommand.sol)

- **Purpose**: Implements specific command logic using `EmailAuth.sol`.
- **Responsibilities**:
  - Defines and manages command templates.
  - Handles command execution upon successful email authentication.
  - Interacts with `EmailAuth.sol` for email verification.
  - Emits events or performs actions based on commands.

## Key Concepts

### EmailAuth.sol Contract

The `EmailAuth.sol` contract is central to the authentication process. It manages command templates, verifies email proofs, and ensures that commands are executed only after proper authentication.

**Key Components**:

- **Command Templates**: Stored in a mapping with unique `templateId`.

  ```solidity
  mapping(uint => string[]) public commandTemplates;
  ```

- **Authentication Function**:

  ```solidity
  function authEmail(EmailAuthMsg memory emailAuthMsg) public onlyController {
      // Verification logic...
  }
  ```

- **Access Control**: Only the `controller` can call certain functions, enhancing security.

### Command Templates

Command templates define the structure of commands that can be authenticated and executed. They consist of fixed strings and placeholders for parameters.

**Example**:

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](1);
    templates[0] = new string[](3);
    templates[0][0] = "Authorize";
    templates[0][1] = "address";
    templates[0][2] = "{ethAddr}";
    return templates;
}
```

Command templates support various matcher types like `{string}`, `{uint}`, `{int}`, `{decimals}`, and `{ethAddr}` for capturing different types of data. For a comprehensive guide on command templates and available matchers, see the [Command Templates](./command-templates) documentation.

### EmailAuthMsg Structure

The `EmailAuthMsg` struct contains all the necessary information required for email authentication and command execution.

```solidity
struct EmailAuthMsg {
    uint templateId;
    bytes[] commandParams;
    uint skippedCommandPrefix;
    EmailProof proof;
}
```

- **templateId**: The ID of the command template.

- **commandParams**: Parameters extracted from the email, matching the placeholders in the command template.

- **skippedCommandPrefix**: Number of characters skipped in the command, used for partial matching.

- **proof**: An `EmailProof` struct containing the zero-knowledge proof and related data.

### EmailProof Structure

The `EmailProof` struct contains data required to verify the email's authenticity and integrity using zero-knowledge proofs.

```solidity
struct EmailProof {
    string domainName;
    bytes32 publicKeyHash;
    uint256 timestamp;
    string maskedCommand;
    bytes32 emailNullifier;
    bytes32 accountSalt;
    bool isCodeExist;
    bytes proof;
}
```

- **domainName**: The email sender's domain.

- **publicKeyHash**: Hash of the DKIM public key used for email verification.

- **timestamp**: Timestamp of the email, used for freshness checks.

- **maskedCommand**: The command extracted from the email, potentially masked for privacy.

- **emailNullifier**: A unique identifier to prevent replay attacks.

- **accountSalt**: Used with `CREATE2` for deterministic contract deployment.

- **isCodeExist**: Indicates if the code exists in the email body.

- **proof**: The actual zero-knowledge proof bytes.

### Verifier and DKIM Registry

- **Verifier Contract**: Used to verify zero-knowledge proofs on-chain. It ensures that the email proof provided is valid without revealing sensitive information.

- **DKIM Registry Contract**: Stores and manages DKIM public keys for different domains. Used to verify that an email was indeed sent from the claimed domain.

### AccountSalt and CREATE2 Deployment

- **AccountSalt**: A unique value derived from the user's email address and an account code. Used to compute deterministic contract addresses.

- **CREATE2 Deployment**: A method in Solidity that allows for the deployment of contracts to deterministic addresses. This is crucial for predicting the `EmailAuth` contract address without prior deployment.

