---
title: ICP Account Setup | Relayer Infrastructure
sidebar_label: ICP Account Setup
description: Guide to setting up an Internet Computer Protocol (ICP) account for the Email Wallet relayer
keywords: [ICP account setup, Internet Computer Protocol, relayer configuration, identity management, dfx CLI, principal ID]
---

# Setting up an ICP Account for Relayer

This guide will walk you through the process of setting up an Internet Computer Protocol (ICP) account to use with your ZK Email relayer. This includes installing necessary tools, configuring your identity, acquiring cycles, and securely exporting credentials.

## Why This Matters

In order to run a relayer on the Internet Computer (IC) network, you need to:

* Own a valid identity (principal)
* Deploy a canister (smart contract) or interact with one
* Authenticate your relayer's identity securely via PEM files

This guide is tailored for developers familiar with CLI tools and assumes a Unix-like environment (Linux/macOS). For Windows, use WSL or PowerShell with equivalent commands.

---

## Prerequisites

### 1. Install Rust (for building dependencies)

Rust is required for some low-level tooling used by the IC SDK.

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

After installation, restart your terminal and verify:

```bash
rustc --version
```

Refer to the [Rust Installation Guide](https://rustup.rs/) for additional help.

### 2. Install DFX (IC SDK CLI)

DFX is the command-line tool used to interact with the Internet Computer. You can install it by installing the IC SDK with the following command and selecting default installation options:

```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

Verify it's installed:

```bash
dfx --version
```

More info: [ICP SDK Installation Guide](https://internetcomputer.org/docs/current/developer-docs/build/install/)

### 3. Set Up Your Identity

Create and switch to a new identity that will be used for the relayer.

```bash
dfx identity new --network ic zkemail
```

Switch to it:

```bash
dfx identity use zkemail --network ic
```

Verify your principal ID:

```bash
dfx ledger account-id
```

This is the address of your ICP account. 

### 4. Request Cycles from Faucet

Follow the instructions [here](https://internetcomputer.org/docs/building-apps/getting-started/tokens-and-cycles#obtaining-cycles) to request cycles from the faucet and sending them to your principal ID.

After sending the cycles, you can check your balance with:

```bash
dfx ledger balance --network ic
```

---

## Deploy a Wallet Canister

You can deploy a wallet canister for your account by following these steps:

1. Get your principal ID:

```bash
dfx identity --network ic get-principal
```

2. Create a new canister:

```bash
dfx ledger --network ic create-canister <principal-identifier> --amount <icp-token-amount, such as 1.5>
```

This will output the canister ID which will be used later as the wallet canister ID.

3. Install the cycle wallet code to your canister:

```bash
dfx identity --network ic deploy-wallet <wallet-canister-id>
```

For a more detailed guide, see the [Creating a Cycles Wallet from IC](https://internetcomputer.org/docs/building-apps/canister-management/cycles-wallet#creating-a-cycles-wallet) guide.

---

## Export Your Identity to a PEM File

You can export an account private key to a PEM file. The PEM file will be needed by your relayer container to authenticate with the IC.

```bash
dfx identity export zkemail > .ic.pem
```

Move it to a secure directory if necessary. **Never commit this file to Git.**

---

## Modify the Relayer Configuration to Use Your ICP Account

Here we explain how to modify configurations for ICP in the relayer designed for account recovery, located in the [relayer](https://github.com/zkemail/email-tx-builder/tree/email-recovery/packages/relayer) package.

1. You first move the `.ic.pem` to the relayer directory, i.e., the path `relayer/.ic.pem` is correct.

2. You then modify the env value in `relayer/.env` as follows:

    ```bash
        DKIM_CANISTER_ID=<ic_dns_oracle_backend id>
        WALLET_CANISTER_ID=<wallet canister id>
        IC_REPLICA_URL=https://<ic_dns_oracle_backend>.raw.icp0.io/?id=<ic_dns_oracle_backend_id>
    ```

    The value of `WALLET_CANISTER_ID` is your wallet canister id which is the output of Step 2 from Deploy a Wallet Canister section.
    The value of IC_REPLICA_URL corresponding to DKIM_CANISTER_ID is found [here](https://github.com/zkemail/ic-dns-oracle/tree/b4912031ccab5c2d406e7cd3c95d0b21ac966381?tab=readme-ov-file#how-to-try-our-canister).

    You can find the id of the canister we deployed from [this](https://github.com/zkemail/ic-dns-oracle/blob/b4912031ccab5c2d406e7cd3c95d0b21ac966381/canister_ids.json#L6) file. The value of `DKIM_CANISTER_ID` corresponds to `ic_dns_oracle_backend` in the above file.

## Resources

* [Internet Computer Developer Docs](https://internetcomputer.org/docs/current/developer-docs/)
* [Identity Management](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/)
* [DFX CLI Reference](https://internetcomputer.org/docs/current/developer-docs/build/cli-reference/dfx-parent)
