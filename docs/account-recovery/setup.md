---
title: Setup | Account Recovery
sidebar_label: Setup
description: Step-by-step guide for implementing ZK Email Recovery in Safe accounts, including module installation, guardian configuration, and recovery process setup
keywords: [email recovery setup, Safe integration, guardian configuration, account recovery, module installation, ERC-7579, smart account setup, recovery module, web3 security, account protection]
---

# Setup

## Universal Module Setup

The Universal Email Recovery Module allows the recovery of a Safe account using an email-based verification process. By following the scripts and configuration files, you can easily install the module, handle acceptance and recovery requests, and complete the recovery process. 

By using the Permissionless library, we can simplify interactions with the blockchain and the relevant smart contracts, making it easier for developers to integrate email-based account recovery into their applications.

<details>
<summary>Prerequisites</summary>

Before running the script, make sure you have the following:

- Node.js installed (version 14 or higher)
- Yarn package manager installed
- An Alchemy API key for the Base Sepolia network
- A Pimlico API key for the Base Sepolia network
- A relayer URL for handling email-based recovery requests

</details>

### Setup

1. Clone the repository and navigate to the project directory.

```bash
git clone https://github.com/zkemail/example-email-recovery-permissionless-scripts.git
cd example-email-recovery-permissionless-scripts
```

2. Install the dependencies by running:

```bash
yarn install
```

3. Create a `.env` file in the project root and provide the required environment variables:

```env
PIMLICO_API_KEY=your_pimlico_api_key
ALCHEMY_API_KEY=your_alchemy_api_key
RELAYER_URL=your_relayer_url
OWNER_PRIVATE_KEY=your_owner_private_key
GUARDIAN_EMAIL=your_guardian_email
ACCOUNT_CODE=your_account_code
NEW_OWNER=your_new_owner_address
```

### Usage

The script consists of several steps that need to be executed in the correct order:

1. Install the Universal Email Recovery Module:

```bash
yarn install-module
```

This step installs the module on the Safe account and sets up the initial configuration.

2. Handle the acceptance request:

```bash
yarn handle-acceptance
```

This step sends an acceptance request to the relayer, which will send an email to the guardian to confirm their role in the recovery process.

3. Handle the recovery request:

```bash
yarn handle-recovery
```

This step sends a recovery request to the relayer, which will send an email to the guardian to initiate the recovery process.

4. Complete the recovery:

```bash
yarn complete-recovery
```

This step completes the recovery process by swapping the old owner with the new owner in the Safe account.

### Helper Scripts

The script also includes two helper scripts:

- `generate-account-code`: Generates a random account code for the Safe account.
- `generate-address`: Generates a random account address that can be used as the new owner for the Safe account.

To run these scripts, use the following commands:

```bash
yarn generate-account-code
yarn generate-address
```

## 7579 Compatible Accounts

ERC-7579 compatible accounts introduce the concept of modules. To implement email-based account recovery, you can install the EmailRecoveryModule on your account.

```solidity
bytes memory recoveryModuleInstallData = abi.encode(
  isInstalledContext,
  guardians,
  guardianWeights,
  threshold,
  delay,
  expiry
);

account.installModule({
  moduleTypeId: MODULE_TYPE_EXECUTOR,
  module: emailRecoveryModuleAddress,
  data: recoveryModuleInstallData
});
```