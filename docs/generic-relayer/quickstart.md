import ApiClient from '@site/src/components/ApiClient';
import submitCommandConfig from '@site/src/api/generic-relayer/submit.ts';
import statusConfig from '@site/src/api/generic-relayer/status.ts';

# Quickstart

In this section, we will show you how to create a simple project using the ZK Email Generic Relayer and the `EmitEmailCommand.sol` contract. You will learn how to set up the project, optionally build and deploy the contracts, and interact with the relayer API to execute commands via email.

## Create a Project

We have provided a GitHub template that includes all necessary components, including the `EmitEmailCommand.sol` contract, deployment scripts, a Makefile, and a `.env.example` file. This template allows you to get started using the Generic Relayer quickly without deploying contracts yourself.

You can either fork the template repository or clone it:

```bash
git clone https://github.com/zkemail/generic-relayer-template.git
cd generic-relayer-template
```

## Project Overview

Your new project will include the following structure:

```bash
.
├── .env.example
├── Makefile
├── broadcast
│   └── DeployEmitEmailCommand.s.sol
│       └── 11155111
│           └── run-latest.json
├── script
│   └── DeployEmitEmailCommand.s.sol
└── src
    └── EmitEmailCommand.sol
```

- **.env.example**: Example environment variables for configuration for the contract deployment.
- **Makefile**: Includes commands to interact with the Generic Relayer API.
- **broadcast/**: Contains `run-latest.json` with pre-deployed contract addresses.
- **script/**: Contains deployment scripts (not needed for this quickstart).
- **src/**: Contains the `EmitEmailCommand.sol` contract.

## Build and Deploy

If you wish to build and deploy the contracts yourself you can follow these steps.

### Set Up Environment Variables

Copy the example environment file and fill in the required variables:

```bash
cp .env.example .env
```

Edit the `.env` file and set the following variables:

- **PRIVATE_KEY**: Your private key for deployment (include the `0x` prefix).
- **SIGNER**: ICP Canister signer that can update the DKIM registry.
- **RPC_URL**: RPC URL for the target network.
- **CHAIN_ID**: Chain ID of the target network.
- **ETHERSCAN_API_KEY**: (Optional) Etherscan API key for contract verification.

### Deploy the Contracts

You can build and deploy the contract by running:

```bash
make deploy
```

After deploying, the `run-latest.json` file in the `broadcast/` directory will be updated with the addresses of the deployed contracts.

:::success
Now that you have the project set up (and optionally deployed your own contracts), you can use the provided Makefile to interact with the Generic Relayer API.
:::

## Use the Relayer API

### Submitting a Command

#### Option 1: Using the Makefile

To submit a command to the Generic Relayer, run:

```bash
make submit EMAIL=<your_email@example.com>
```

This command does the following:

1. Uses the contract addresses from `run-latest.json` (either the pre-deployed addresses or your own if you deployed them).
2. Sends a request to the relayer API to execute the command `Emit string {string}` with the parameter "Sending a hello".
3. Prints the response, which includes a `request_id`.

#### Option 2: Interacting with the Relayer API Directly

If you prefer to interact with the API without using the Makefile, you can use `curl` directly. For detailed information on the API endpoints and request format, refer to the [Submit Command API Reference](./api-reference#submit-command).

### Checking the Status

#### Option 1: Using the Makefile

After submitting, you can check the status of your request:

```bash
make status REQUEST=<request_id>
```

Replace `<request_id>` with the actual `request_id` you received from the previous command.

#### Option 2: Interacting with the Relayer API Directly

You can check the status of your request by making a GET request to the Request Status endpoint. For detailed information on this endpoint and its response format, refer to the [Request Status API Reference](./api-reference#request-status).
