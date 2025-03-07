---
title: Getting Started
sidebar_label: Getting Started
description: Learn how to integrate ZK Email's DKIM verification and zero-knowledge proofs into your applications, with guides for SDKs, templates, and project components
keywords: [ZK Email integration, DKIM verification, zero-knowledge proofs, email authentication, blockchain integration, SDK implementation, smart contract wallet, account recovery, OAuth login, developer guide]
---

import DocCardList from '@theme/DocCardList';

# Getting Started

<div style={{fontSize: '1.2em', marginBottom: '2em'}}>
Welcome to ZK Email! Let's help you get started with email verification using zero-knowledge proofs.
</div>

## What is ZK Email?

ZK Email is a powerful system that lets you verify emails using zero-knowledge proofs, based on the DKIM (DomainKeys Identified Mail) protocol. Here's how it works:

1. When an email is sent from a domain, it's signed with the domain's private key
2. The corresponding public key is published in the domain's DNS records
3. The receiver verifies the DKIM signature to authenticate the email
4. ZK Email adds privacy by proving the verification without revealing the email contents

:::info Learn More
For a deeper dive into the cryptography and architecture behind ZK Email, check out our [Architecture](architecture) section.
:::

## Quick Start Guide

### 1. Choose Your Starting Point

Based on your needs, start with one of these components:

<div className="row" style={{marginBottom: '2em'}}>
  <div className="col col--6">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">🌟 For New Developers</h3>
      </div>
      <div className="zk-card__body">
        <div className="zk-card__link-wrapper">
          <a href="zk-email-sdk/README.md" className="zk-card__main-link">ZK Email SDK</a>
        </div>
        <p className="zk-card__subtitle">Start here if you want to:</p>
        <ul className="zk-card__bullet-list">
          <li>Build ZK Email proofs with minimal code</li>
          <li>Use auto-deployed infrastructure</li>
          <li>Get up and running quickly</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">⚡ For Advanced Users</h3>
      </div>
      <div className="zk-card__body">
        <div className="zk-card__link-wrapper">
          <a href="zk-email-verifier/README.md" className="zk-card__main-link">ZK Email Verifier</a>
        </div>
        <p className="zk-card__subtitle">Choose this if you need to:</p>
        <ul className="zk-card__bullet-list">
          <li>Create custom verification circuits</li>
          <li>Build specialized smart contracts</li>
          <li>Implement custom frontend utilities</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### 2. Explore Our Solutions

<div className="row">
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">🔐 Authentication</h3>
      </div>
      <div className="zk-card__body">
        <ul className="zk-card__bullet-list">
          <li><a href="login-with-zk-email-oauth-api.md" className="zk-card__main-link">OAuth Login</a>Privacy-preserving email authentication</li>
          <li><a href="account-recovery/README.md" className="zk-card__main-link">Account Recovery</a>Secure wallet recovery via email</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">💼 Smart Contracts</h3>
      </div>
      <div className="zk-card__body">
        <ul className="zk-card__bullet-list">
          <li><a href="email-wallet/README.md" className="zk-card__main-link">Email Wallet</a>Control smart contracts via email</li>
          <li><a href="email-tx-builder/README.md" className="zk-card__main-link">Transaction Builder</a>Email-driven blockchain actions</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">🛠️ Developer Tools</h3>
      </div>
      <div className="zk-card__body">
        <ul className="zk-card__bullet-list">
          <li><a href="zk-regex.md" className="zk-card__main-link">ZK Regex</a>Pattern matching in ZK circuits</li>
          <li><a href="https://github.com/zkemail/email-tx-builder/" className="zk-card__main-link">JWT Builder</a>Anonymous JWT verification</li>
        </ul>
      </div>
    </div>
  </div>
</div>

## Implementation Guide

### 1. Set Up Your Environment
- Clone the repository for your chosen component
- Follow the installation instructions in the component's README
- Install required dependencies

### 2. Learn Through Examples
- Try our [Proof of Twitter Example](https://prove.email/blog/twitter)
- Explore more examples in our [Github repositories](https://github.com/zkemail)
- Check component-specific documentation for detailed APIs

### 3. Build Your Application
- Start with basic email verification
- Add custom logic for your use case
- Integrate with your existing systems

### 4. Best Practices
- Keep dependencies up-to-date for security
- Follow our coding standards
- Implement proper error handling
- Test thoroughly before deployment

## Popular Use Cases

Here's what developers are building with ZK Email:

| Use Case                   | Description                                                                                                                                                                            | Key Components                    | Examples                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------- |
| **Private Authentication** | Use your email for secure and private authentication. Prove ownership of your email address without revealing it or its contents to the service.                                       | OAuth API, ZK Email SDK           | - Logging into a healthcare portal<br/>- Accessing a private club                     |
| **Smart Contract Control** | Manage your blockchain wallets using your email. Perform transactions securely by proving email ownership, making it user-friendly and eliminating the need for managing private keys. | Email Wallet, Transaction Builder | - Transferring cryptocurrency<br/>- Executing smart contract functions                |
| **Account Recovery**       | Safely recover access to your blockchain wallet if you lose your credentials. Use your email to prove your identity and regain control over your assets.                               | Account Recovery, Email Wallet    | - Forgetting your wallet password<br/>- Losing your private key                       |
| **Identity Verification**  | Verify personal details or qualifications privately. Prove attributes like age, membership, or event attendance based on email receipts without exposing sensitive information.        | ZK Email Verifier, ZK Regex       | - Confirming membership in an organization<br/>- Verifying attendance at a conference |

## Join Our Community

We're here to help you succeed with ZK Email:

- 💬 Join our [Telegram](https://t.me/zkemail) for support
- 📚 Check the [FAQ](frequently-asked-questions.md) for quick answers
- 🤝 Contribute through our [contributing guide](contributing.md)
- 🔍 Browse [example implementations](https://github.com/zkemail)

:::tip Stay Updated
Watch our [Github repositories](https://github.com/zkemail) for the latest updates and features!
:::
