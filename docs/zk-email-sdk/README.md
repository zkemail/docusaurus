---
title: Overview | ZK Email SDK
sidebar_label: Overview
description: TypeScript library for building ZK Email Proofs in your applications - generate and verify zero-knowledge proofs from emails, create custom verification blueprints, and verify proofs on-chain
keywords: [Blueprint SDK, ZK Email, zero-knowledge proofs, email verification, TypeScript library, proof generation, custom blueprints, on-chain verification, blockchain integration, email authentication]
---

import DocCardList from '@theme/DocCardList';

# Overview


<div style={{fontSize: '1.2em'}}>
Learn how to generate and verify ZK Proofs inside your application using the Blueprint SDK.
</div>

---

The Blueprint SDK is a TypeScript library that lets you integrate ZK Email verification into your applications. It handles all the cryptographic complexity - you just need to know regex patterns to specify what email fields to extract (like sender, subject, content). The SDK submits your pattern definitions to the [**Registry**](./registry.md).

The **Registry** takes care of compiling the ZK circuits and deploying verification contracts. This means you can quickly add email verification without dealing with any zero-knowledge cryptography implementation details.

## Core Features

The Blueprint SDK consists of three main features:

**Create Blueprint** lets you define email verification templates by specifying regex patterns and fields to extract from emails, along with proof parameters like public/private data visibility.

**Generate Proof** creates zero-knowledge proofs from emails based on blueprint specifications, proving authenticity and content claims without revealing the actual email.

**Verify Proof** validates proofs both off-chain and through smart contracts on-chain, allowing dApps to trustlessly verify email-based claims.

## Documentation

<DocCardList 
  items={[
    {
      type: 'link',
      href: '/zk-email-sdk/setup',
      label: 'Setup',
      description: 'Setup your project with the Blueprint SDK.',
    },
    {
      type: 'link',
      href: 'https://github.com/zkemail/sdk-ts-demo',
      label: 'Examples',
      description: 'Example repository to help you get started.',
    }
  ]}
/>