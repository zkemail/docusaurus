import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstart

In this section, we will show you how to create a simple project using the Email Transaction Builder and the `EmitEmailCommand.sol` contract. You will learn how to set up the project, deploy the contracts, calling the Generic Relayer API and broadcasting the transaction to the network to execute commands via email.

## Create a Project

We have provided a GitHub template that includes all necessary components, including the `EmitEmailCommand.sol` contract, deployment scripts and a `.env.example` file. This template allows you to get started using the Generic Relayer quickly without deploying contracts yourself.

You can either fork the [template repository](https://github.com/zkemail/email-tx-builder-template.git) or clone it:

```bash
git clone https://github.com/zkemail/email-tx-builder-template.git
cd email-tx-builder-template
```

## Project Overview

Your new project will include the following structure:

```bash
.
├── contracts
└── ts
```

- **contracts**: Contains a foundry project for the `EmitEmailCommand.sol` contract, including a deployment script.
- **ts**: Contains a TypeScript CLI to interact with the Generic Relayer API.

The `EmitEmailCommand` contract implements five command templates, each corresponding to a different type matcher. These templates are used to emit events based on commands received via email. Here's a breakdown of how it works:

The contract defines five command templates, each associated with a specific type matcher:

1. String Matcher: Emits a `StringCommand` event.
2. Uint Matcher: Emits a `UintCommand` event.
3. Int Matcher: Emits an `IntCommand` event.
4. Decimals Matcher: Emits a `DecimalsCommand` event.
5. EthAddr Matcher: Emits an `EthAddrCommand` event.

:::info
Each template is represented as an array of strings, specifying the command format. You can learn more about the command format in the [Command Templates](/email-tx-builder/architecture/command-templates) section.
:::

## Build and Deploy

The Email Transaction Builder requires several smart contracts working together to enable secure email-based transactions:

- `EmitEmailCommand.sol`: Our main example contract that processes email commands and emits events
- `EmailAuth.sol`: Handles the core authentication flow, verifying that emails came from authorized users
- `UserOverrideableDKIMRegistry.sol`: Maintains a registry of email domain public keys (DKIM keys) used to verify email authenticity.
- `Verifier.sol` and `Groth16Verifier.sol`: Zero-knowledge proof verifiers that cryptographically prove an email is authentic without revealing its contents.

In this guide we will deploy the `EmitEmailCommand.sol` contract using the script provided in the template, but you can use a update this script to deploy your own contract.

### Set Up Environment Variables

The first step is to navigate to the contracts folder and copy the example environment file:

```bash
cd contracts
cp .env.example .env
source .env
```

You have to edit the `.env` file and set the following variables:

- **PRIVATE_KEY**: Your private key for deployment (include the `0x` prefix).
- **CHAIN_ID**: Chain ID of the target network.
- **RPC_URL**: RPC URL for the target network.
- **SIGNER**: Signer for the DKIM Oracle that can update the DKIM registry.
- **ETHERSCAN_API_KEY**: (Optional) Etherscan API key for contract verification.

### Deploy the Contracts

After you finish setting up the environment variables, you need to install the dependencies:

```bash
yarn
```

:::warning
If you find any issues with the dependencies, you can clear your yarn cache and try again:

```bash
yarn cache clean
```

:::

Then, you can deploy the contracts:

```bash
forge script script/DeployEmitEmailCommand.s.sol:Deploy --fork-url $RPC_URL --broadcast -vvvv --legacy
```

## Calling the Generic Relayer API

To call the Generic Relayer we are going to use the TypeScript CLI, if you want to learn more about the Generic Relayer you can check the [Generic Relayer](/email-tx-builder/architecture/generic-relayer) section. After deploying the contracts, you can use the TypeScript CLI to test different command templates.

First, navigate to the `ts` directory and install dependencies:

```bash
cd ts
yarn install
```

Copy the `.env.example` file to `.env` and set the required variables:

```bash
cp .env.example .env
```

- **PRIVATE_KEY**: Your private key for deployment (include the `0x` prefix).
- **RELAYER_URL**: URL of the Generic Relayer API (`https://relayer.zkemail.xyz/api`).

Then you can use the following examples to test each command template. After you call the CLI, you will receive an email that you need to reply to confirm the command and after the relayer verifies the email, it will return the `EmailAuthMsg` used to broadcast the transaction.

### String Type Matcher

This command will emit a `StringCommand` event.

```bash
npx ts-node src/cli.ts \
  --emit-email-command-addr YOUR_CONTRACT_ADDRESS \
  --account-code YOUR_ACCOUNT_CODE \
  --email-addr your.email@example.com \
  --owner-addr YOUR_WALLET_ADDRESS \
  --template-idx 0 \
  --command-value "hello" \
  --subject "Emit a string" \
  --body "Emit a string"
```

### Uint Type Matcher

This command will emit a `UintCommand` event.

```bash
npx ts-node src/cli.ts \
  --emit-email-command-addr YOUR_CONTRACT_ADDRESS \
  --account-code YOUR_ACCOUNT_CODE \
  --email-addr your.email@example.com \
  --owner-addr YOUR_WALLET_ADDRESS \
  --template-idx 1 \
  --command-value "123" \
  --subject "Emit a uint" \
  --body "Emit a uint"
```

### Int Type Matcher

This command will emit an `IntCommand` event.

```bash
npx ts-node src/cli.ts \
  --emit-email-command-addr YOUR_CONTRACT_ADDRESS \
  --account-code YOUR_ACCOUNT_CODE \
  --email-addr your.email@example.com \
  --owner-addr YOUR_WALLET_ADDRESS \
  --template-idx 2 \
  --command-value "-123" \
  --subject "Emit an int" \
  --body "Emit an int"
```

### Decimals Type Matcher

This command will emit a `DecimalsCommand` event.

```bash
npx ts-node src/cli.ts \
  --emit-email-command-addr YOUR_CONTRACT_ADDRESS \
  --account-code YOUR_ACCOUNT_CODE \
  --email-addr your.email@example.com \
  --owner-addr YOUR_WALLET_ADDRESS \
  --template-idx 3 \
  --command-value "1.23" \
  --subject "Emit a decimal" \
  --body "Emit a decimal"
```

### EthAddr Type Matcher

This command will emit an `EthAddrCommand` event.

```bash
npx ts-node src/cli.ts \
  --emit-email-command-addr YOUR_CONTRACT_ADDRESS \
  --account-code YOUR_ACCOUNT_CODE \
  --email-addr your.email@example.com \
  --owner-addr YOUR_WALLET_ADDRESS \
  --template-idx 4 \
  --command-value "0x6956856464EaA434f22B42642e9089fF8e5C9cE9" \
  --subject "Emit an address" \
  --body "Emit an address"
```
