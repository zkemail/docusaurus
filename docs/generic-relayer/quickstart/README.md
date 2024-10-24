# Quickstart Guide

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

:::success
Now you can submit a request to the Generic Relayer by running the following command:

```bash
make submit EMAIL=your_email@example.com
```
:::


## Build and Deploy

If you wish to build and deploy the contracts yourself you can follow these steps.

### Install Dependencies

First, install the required dependencies:

```bash
forge install && npm install
```
### Set Up Environment Variables

Copy the example environment file and fill in the required variables:

```bash
cp .env.example .env
```

Edit the `.env` file and set the following variables:

- **PRIVATE_KEY**: Your private key for deploying contracts (include the `0x` prefix).
- **SIGNER**: The signer's address. The current value is 0x69bec2dd161d6bbcc91ec32aa44d9333ebc864c0
- **CHAIN_ID**: The chain ID of the network you're deploying to (e.g., `11155111` for Sepolia).
- **RPC_URL**: The RPC URL of the network you're deploying to.
- **ETHERSCAN_API_KEY**: Your Etherscan API key (needed for contract verification).

Then source the environment variables by running:

```bash
source .env
```

### Deploy the Contracts

You can deploy the contracts using Foundry's `forge script` command:

```bash
forge script script/DeployEmitEmailCommand.s.sol:Deploy --rpc-url $RPC_URL --chain-id $CHAIN_ID --broadcast --verify --legacy --etherscan-api-key $ETHERSCAN_API_KEY
```

- **--rpc-url**: Specifies the RPC URL of the network.
- **--chain-id**: Specifies the chain ID of the network.
- **--broadcast**: Instructs Foundry to send the transactions to the network.
- **--verify**: Verifies the contracts on Etherscan.
- **--legacy**: Uses the legacy transaction format (if needed).
- **--etherscan-api-key**: Your Etherscan API key.

After deploying, the `run-latest.json` file in the `broadcast/` directory will be updated with the addresses of the deployed contracts.

## Use the Relayer API

Now that you have the project set up (and optionally deployed your own contracts), you can use the provided Makefile to interact with the Generic Relayer API.

### Submitting a Command

#### Option 1: Using the Makefile (recommended)

To submit a command to the Generic Relayer, run:

```bash
make submit EMAIL=<your_email@example.com>
```

This command does the following:

1. Uses the contract addresses from `run-latest.json` (either the pre-deployed addresses or your own if you deployed them).
2. Sends a request to the relayer API to execute the command `Emit string {string}` with the parameter "Sending a hello world!".
3. Prints the response, which includes a `request_id`.

To check the status of your request, you can use the `make status` command:

```bash
make status REQUEST=<request_id>
```

#### Option 2: Interacting with the Relayer API Directly

If you prefer to interact with the API without using the Makefile, you can use `curl` directly:

```bash
curl -L 'https://relayer.zk.email/api/submit' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
--data-raw '{
    "contractAddress": "<EMIT_EMAIL_COMMAND_ADDRESS>",
    "dkimContractAddress": "<DKIM_PROXY_ADDRESS>",
    "accountCode": "<ACCOUNT_CODE>",
    "codeExistsInEmail": true,
    "functionAbi": <FUNCTION_ABI>,
    "commandTemplate": "Emit string {string}",
    "commandParams": [
        "your_string"
    ],
    "templateId": "<TEMPLATE_ID>",
    "remainingArgs": [
        {
            "Address": "<OWNER_ADDRESS>"
        },
        {
            "Uint": "<TEMPLATE_IDX>"
        }
    ],
    "emailAddress": "your_email@example.com",
    "subject": "Hello World",
    "body": "Sending a hello world!",
    "chain": "sepolia"
}'
```

### Checking the Status

After submitting, you can check the status of your request:

```bash
make status REQUEST=<request_id>
```

Replace `<request_id>` with the actual `request_id` you received from the previous command.

## Additional Resources

For more detailed information on the architecture and technical aspects, refer to the [Architecture Guide](../architecture/README.md) in the repository.
