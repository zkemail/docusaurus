---
title: Setup | Account Recovery
sidebar_label: Setup
description: Step-by-step guide for implementing ZK Email Recovery in Safe accounts, including module installation, guardian configuration, and recovery process setup
keywords: [email recovery setup, Safe integration, guardian configuration, account recovery, module installation, ERC-7579, smart account setup, recovery module, web3 security, account protection]
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