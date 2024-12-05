# Concepts

Welcome to the Concepts page for our Email Transaction Builder. This document provides an overview of the main concepts essential for understanding our decentralized email login, account recovery, and two-factor authentication (2FA) system.

You can watch a video that explains these concepts in more detail at [our 2024 EthCC talk](https://ethcc.io/archives/zk-email-decentralized-email-login-account-recovery-2fa).

## Account Code and Salt

An **Account Code** is a randomly generated integer within the finite scalar field of the BN254 elliptic curve. It serves as private randomness used to derive a CREATE2 salt for the user's Ethereum address from their email address:

```plaintext
userEtherAddr := CREATE2(hash(userEmailAddr, accountCode))
```

The derived CREATE2 salt is called the **Account Salt**, which is published on-chain. **As long as the account code remains hidden, no adversary can learn the user's email address from on-chain data.**

This system provides robust privacy and security guarantees. The user's email address remains completely confidential and cannot be derived from on-chain data, while unauthorized parties are prevented from accessing or linking to the user's Ethereum address without the proper account code.

## Invitation Code

An **Invitation Code** is a hexadecimal string comprising the account code with a specific prefix. It is embedded in any field of the email header that is inherited upon reply, such as the Subject line.

The invitation code serves two key purposes: it verifies that the user has access to the account code, and acts as a liveness check to confirm the user is active and not a malicious entity. This dual verification mechanism helps maintain the security of the system.

**Therefore, the contract must check if the email sent by the user contains the invitation code before confirming the user's account for the first time.**

- The email-auth message includes a boolean field `isCodeExist`.
  - `true` if the invitation code is present.
  - The Subject message masks characters for the invitation code.
- **Privacy Preservation**: No information beyond the existence of the invitation code is disclosed.

## Command Template

A **Command Template** defines the expected format of the message in the Subject line for each application. **It allows developers to constrain that message to an application-specific format without creating new ZKP circuits.** Our Email Transaction Builder package defines a universal circuit controlled by these command templates.

Learn more about the command templates in the [Command Templates](/email-tx-builder/architecture/command-templates) section.