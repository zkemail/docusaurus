---
title: Setup | Account Recovery
sidebar_label: Setup
description: Step-by-step guide for implementing ZK Email Recovery in Safe accounts, including module installation, guardian configuration, and recovery process setup
keywords:
  [
    email recovery setup,
    Safe integration,
    guardian configuration,
    account recovery,
    module installation,
    ERC-7579,
    smart account setup,
    recovery module,
    web3 security,
    account protection,
    EIP-7702,
  ]
---

import DocCardList from '@theme/DocCardList';

# Setup

ZK Email Recovery enables account recovery through email guardians. The recovery process involves:

1. Guardian setup and acceptance
2. Recovery initiation by guardians
3. Timelock delay period
4. Recovery completion and ownership transfer

## Implementing the Universal Module

The Universal Email Recovery Module allows you to add an email-based recovery mechanism to any ERC7579-compatible account, such as a 7579 Safe account. The following guides showcase the E2E recovery flow via permissionless.js or ModuleSDK. They will guide you through the process of setting up the module, configuring recovery options, and handling the recovery process in case you need to regain access to your account.

### Account Recovery for EIP-7702 delegated Accounts

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) gives superpowers to EOAs by allowing any EOA to set its code based on any existing smart contract. To do so, an EOA owner would sign an authorization that could then be submitted by anyone as part of the new transaction type. The code will be valid until replaced by another authorization. The authorization could be given for a single chain, or all chains at once.

This setup allows an EOA to mimic a smart contract account, particularly allowing transaction bundling, gas sponsorships, and custom permissioning schemes.

When using ZK Email Recovery with an EIP-7702 account, the recovery process enables adding a new signer in place of the current secondary signer (e.g., passkeys, WebAuthn) or swapping an existing one. To clarify, recovery in this context does not restrict an EOA's control from its own keys.

#### Usage with Email Recovery Module

The email recovery module works seamlessly with EIP-7702 accounts without requiring any changes to the existing contracts. The setup process follows the same patterns as demonstrated in the permissionless.js and ModuleSDK guides below, with only slight modifications in the implementation details.

For a complete example implementation with EIP-7702 accounts, refer to the [7702 branch of the email recovery example scripts](https://github.com/zkemail/email-recovery-example-scripts/tree/7702).

#### Storage Considerations

- The **email recovery module** is a standalone module that does not interact with the account's storage; it has its own storage.
- As a result, **namespaced storage is not required** since there is no risk of storage collisions. Namespaced storage (EIP-7779) is only necessary for implementations when re-delegating and the new implementation is unaware of the account's existing storage slots.

- Thus, in theory, current modules should be compatible with implementations that are ERC-7579-based accounts for EIP-7702.

:::warning Important: Re-delegation Risk

An issue may arise if the module is not uninstalled properly before re-delegation, as its storage would remain uncleared in the module. The new implementation might face conflicts in such cases, but this depends on the specific implementation used and doesn't require changes on the module.

**Always ensure proper module cleanup by uninstalling it before re-delegating to avoid potential storage conflicts.**

:::

<DocCardList items={[
{
type: 'category',
href: '/account-recovery/permissionless-guide',
label: 'Permissionless.js',
description: 'Guide to set up the Universal Email Recovery Module using permissionless.js',
},
{
type: 'category',
href: '/account-recovery/module-sdk-guide',
label: 'ModuleSDK',
description: 'Guide to set up the Universal Email Recovery Module using ModuleSDK',
}
]} />
