import ApiClient from '@site/src/components/ApiClient';
import submitCommandConfig from '@site/src/api/email-tx-builder/submit.ts';
import statusConfig from '@site/src/api/email-tx-builder/status.ts';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Quickstart

In this section, we will show you how to create a simple project using the Email Transaction Builder and the `EmitEmailCommand.sol` contract. You will learn how to set up the project, deploy the contracts, and interact with the generic relayer API to execute commands via email.

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
```

You have to edit the `.env` file and set the following variables:

- **PRIVATE_KEY**: Your private key for deployment (include the `0x` prefix).
- **CHAIN_ID**: Chain ID of the target network.
- **RPC_URL**: RPC URL for the target network.
- **SIGNER**: Signer for the DKIM Oracle that can update the DKIM registry.
- **ETHERSCAN_API_KEY**: (Optional) Etherscan API key for contract verification.

:::info
You will need to source the `.env` file in your shell to make the variables available to the deployment script.

```bash
source .env
```

:::

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

## Using the TypeScript CLI

After deploying the contracts, you can use the TypeScript CLI to test different command templates. First, navigate to the `ts` directory and install dependencies:

```bash
cd ts
yarn install
```

The CLI supports different parameter types. Here are examples for each type matcher:

### String Type Matcher

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

Each command will return a request ID and transaction hash upon successful execution.
