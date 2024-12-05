---
title: Overview
description: The Blueprint SDK is a TypeScript library for building ZK Email applications. Allows you to generate and verify zero-knowledge proofs from emails.
---

import DocCardList from '@theme/DocCardList';
import Head from '@docusaurus/Head';

# Overview

<Head>
  <link 
    rel="preload" 
    as="image" 
    href="/img/zk-email-docs-banner.webp"
    fetchpriority="high"
  />
</Head>

<div style={{fontSize: '1.2em'}}>
Learn how to generate and verify zk proofs inside your application using the Blueprint SDK.
</div>

<img 
  src="/img/beta-release-banner.webp" 
  alt="Beta Release Banner" 
  width="1200"
  height="600"
  loading="eager"
  decoding="async"
  fetchpriority="high"
  style={{
    width: '100%',
    display: 'block',
    margin: '20px auto',
    borderRadius: '17px',
    objectFit: 'contain',
    maxWidth: '100%',
    height: 'auto'
  }}
/>

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