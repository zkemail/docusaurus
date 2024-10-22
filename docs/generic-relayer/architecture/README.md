# Generic Relayer Architecture

<div style={{fontSize: '1.2em'}}>
Learn how the Generic Relayer works and how to use it to enable email-driven actions.
</div>

The **Generic Relayer** allows developers to integrate email-driven actions into their blockchain applications seamlessly. By interacting with a specific API endpoint, you can trigger the execution of commands defined in a smart contract via email. The relayer handles the email verification process, zero-knowledge proof generation, and the execution of the command on the blockchain, simplifying development and enhancing security.

This document provides an in-depth explanation of the architecture, including detailed technical aspects of an end-to-end implementation deployed on the Sepolia testnet.


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

## Key Components

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

## Other Key Concepts

### EmailAuth.sol Contract

**Purpose**: The `EmailAuth.sol` contract is central to the authentication process. It manages command templates, verifies email proofs, and ensures that commands are executed only after proper authentication.

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
string[] memory template = new string[](3);
template[0] = "Transfer";
template[1] = "{uint256}";
template[2] = "tokens to";
template[3] = "{address}";
```

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

## Command Execution Workflow

The process of executing a command involves several steps, interacting between the client application, the relayer, the user, and the blockchain.

### 1. Command Definition in Smart Contract

- **Define Commands**: Commands are defined as functions in `EmailAuth.sol` or in a separate contract like `EmitEmailCommand.sol`.

- **Set Up Command Templates**: Templates are created and stored with unique `templateId`s for matching during authentication.

### 2. Initiating a Command via API

- **API Request**: The client application sends a `POST` request to the relayer's `/api/submit` endpoint with all necessary parameters, including `functionAbi`, `commandTemplate`, `commandParams`, and more.

### 3. Email Generation and Sending

- **Construct Email**: The relayer constructs an email using the `commandTemplate` and `commandParams`.

- **Send Email**: The email is sent to the user's email address using SMTP.

### 4. User Interaction

- **User Receives Email**: The user checks the email, which contains the command.

- **User Replies**: To authorize the action, the user replies to the email.

### 5. Email Verification

- **Receive Reply**: The relayer receives the email reply via IMAP.

- **DKIM Verification**: The relayer verifies the DKIM signature to ensure the email is authentic.

- **Zero-Knowledge Proof Generation**: The relayer generates a zero-knowledge proof to attest to the email's validity without revealing sensitive content.

- **Construct EmailAuthMsg**: The relayer constructs the `EmailAuthMsg` with the proof and other data.

### 6. On-Chain Execution

- **Compute EmailAuth Contract Address**: Using `accountSalt` and `CREATE2`, the relayer computes the expected address of the `EmailAuth` contract.

- **Deploy EmailAuth Contract if Necessary**: If the contract doesn't exist, it's deployed.

- **Call Command Function**: The relayer calls the command function (e.g., `emitEmailCommand`) on the blockchain, passing in the `EmailAuthMsg` and other parameters.

- **Email Authentication**: The smart contract verifies the email proof and command parameters.

- **Execute Command**: If authentication passes, the command logic is executed.

### 7. Status Update and Notification

- **Update Status**: The relayer updates the request status in the database.

- **Notify User**: An acknowledgment email is sent to the user, confirming the action.

---

## Technical Aspects

### Detailed Functionality of `EmailAuth.sol`

- **Initialization**:

  ```solidity
  function initialize(
      address _initialOwner,
      bytes32 _accountSalt,
      address _controller
  ) public initializer {
      // Initialization logic...
  }
  ```

- **Command Template Management**:

  - **Insert Command Template**:

    ```solidity
    function insertCommandTemplate(
        uint _templateId,
        string[] memory _commandTemplate
    ) public onlyController {
        // Logic to insert template...
    }
    ```

  - **Get Command Template**:

    ```solidity
    function getCommandTemplate(
        uint _templateId
    ) public view returns (string[] memory) {
        // Logic to retrieve template...
    }
    ```

- **Email Authentication**:

  - **Verify DKIM Public Key Hash**: Ensures the email came from the correct domain.

  - **Prevent Replay Attacks**: Uses `emailNullifier` to ensure each email is only used once.

  - **Timestamp Verification**: Ensures the command is fresh.

  - **Command Matching**: Validates that the command in the email matches the expected template.

  - **Zero-Knowledge Proof Verification**: Uses the `Verifier` contract to verify the proof.

### Role of the `EmitEmailCommand` Contract

- **Compute EmailAuth Address**: Uses `computeEmailAuthAddress` with `CREATE2` to determine where the `EmailAuth` contract should be.

- **Deploy EmailAuth Proxy**: If the `EmailAuth` contract isn't deployed yet, it uses `deployEmailAuthProxy` to deploy it deterministically.

- **Execute Commands**: After authentication, executes the command logic, such as emitting events.

### Zero-Knowledge Proofs in Context

- **Purpose**: To prove that the user has authorized the command via email without revealing the email's content on-chain.

- **Process**:

  - **Proof Generation**: The relayer generates the proof off-chain using the email content.

  - **On-Chain Verification**: The `Verifier` contract verifies the proof, ensuring it's valid.

### AccountSalt and CREATE2 Deployment

- **Deterministic Addresses**: By using `CREATE2` and a known `accountSalt`, the address of the `EmailAuth` contract can be predicted.

- **Benefits**:

  - **No Need for Prior Deployment**: Contracts can be deployed when needed, and their addresses are known in advance.

  - **Security**: Ties the contract to the user's email and account, enhancing security.

## Security Considerations

- **Email Authentication**: Only the intended recipient can authorize commands, as access to the email account is required.

- **DKIM Verification**: Ensures the email is authentic and hasn't been tampered with.

- **Zero-Knowledge Proofs**: Protects user privacy by not revealing email content on-chain.

- **Replay Protection**: `emailNullifier` prevents the same email from being used multiple times.

- **Access Control**: Only the `controller` or `owner` can perform sensitive operations in the contracts.

- **Timestamp Verification**: Prevents execution of outdated commands.

- **Contract Upgradeability**: Using `UUPSUpgradeable`, contracts can be upgraded securely, but only by authorized parties.

## Conclusion

The ZK Email Generic Relayer architecture provides a secure and efficient way to integrate email-driven actions into blockchain applications. By leveraging email authentication, zero-knowledge proofs, and smart contract functionality, developers can create user-friendly and secure decentralized applications.

By understanding the key concepts such as commands, command templates, email authentication, and the technical workflow, developers can effectively implement and utilize the Generic Relayer in their projects.

For a practical implementation and step-by-step guide, refer to the [Quickstart Guide](quickstart.md).

---

**Further Reading**

- [API Reference](api-reference.md)
- [Overview](overview.md)