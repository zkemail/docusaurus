---
title: Overview | ZK Email SDK
sidebar_label: Overview
description: TypeScript library for building ZK Email Proofs in your applications - generate and verify zero-knowledge proofs from emails, create custom verification blueprints, and verify proofs on-chain
keywords: [Blueprint SDK, ZK Email, zero-knowledge proofs, email verification, TypeScript library, proof generation, custom blueprints, on-chain verification, blockchain integration, email authentication]
---

import DocCardList from '@theme/DocCardList';
import Head from '@docusaurus/Head';

# Overview


<div style={{fontSize: '1.2em'}}>
Learn how to generate and verify zk proofs inside your application using the Blueprint SDK.
</div>

---

:::note
The Blueprint SDK is still under development and won't be ready for another week or two. Please use the v1 SDK in the meantime.
:::

The Blueprint SDK provides methods in TypeScript, for developing on or interacting with ZK Email Blueprints.

Using the SDK you can:

- **Generate proofs from emails**. Generate proofs from emails using the ZK Email Blueprint of your choice.
- **Create custom blueprints**. Create your own ZK Email Blueprints to verify custom patterns in emails.
- **Verify proofs onchain**. Verify proofs onchain using the ZK Email Verifier smart contract.

## Getting Started

For start using the SDK, follow the following guides:

<DocCardList 
  items={[
    {
      type: 'link',
      href: '/zk-email-sdk/setup',
      label: 'Setup',
      description: 'Setup your project with the Blueprint SDK.',
    }
  ]}
/>