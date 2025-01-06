---
title: Registry
sidebar_label: Registry
description: Platform for creating, managing, and sharing email-based zero-knowledge proofs through blueprints. Features Gmail integration, proof generation, and sharing capabilities
keywords: [ZK Email Registry, blueprint management, proof generation, email verification, zero-knowledge proofs, Gmail integration, proof sharing, blueprint creation, proof preview, blueprint search]
image: /img/registry/search.webp
---

import DocCardList from '@theme/DocCardList';

# Registry

<Head>
  <link 
    rel="preload" 
    as="image" 
    href="/img/registry/search.webp"
    fetchpriority="high"
  />
  <link 
    rel="preload" 
    as="image" 
    href="/img/registry/create-proof.webp"
    fetchpriority="high"
  />
  <link 
    rel="preload" 
    as="image" 
    href="/img/registry/create-proof-step2.webp"
    fetchpriority="high"
  />
  <link 
    rel="preload" 
    as="image" 
    href="/img/registry/create-proof-step3.webp"
    fetchpriority="high"
  />
</Head>

The ZK Email Registry is a platform that allows you to create, manage, and sharing email zero-knowledge proofs. It provides an interface for defining email verification [blueprints](#what-is-a-blueprint) and generating proofs.

You can browse existing blueprints to see what others have created, or [create your own new blueprints](/zk-email-sdk/create-blueprint).

To get started, you can visit the [ZK Email Registry](https://registry.zk.email).

## What is a blueprint?

A blueprint is a set of parameters that define the email proof. These parameters include the regex for extracting parts of the email, the size of the email header and body, the email sender and all the required fields. The registry uses these parameters to compile a circuit that can be used to generate proofs.

A blueprint consists of:

- **Pattern Details**: This defines the pattern name, circuit name, and description of the blueprint.
- **Proof Details**: Includes the sender, fields to extract and external inputs for generating the proof.

The Registry uses these parameters to compile a zero-knowledge circuit and creating for proof generation and a smart contract for proof verification.

## Create New Blueprint

To create a new blueprint, you must be signed in with your Github account. Once you are signed in, you can click the "Create Blueprint" button to start the creation process.

If you want to learn how to create a new blueprint, follow this guide:

<DocCardList 
  items={[
    {
      type: 'link',
      href: '/zk-email-sdk/create-blueprint',
      label: 'Blueprints',
      description: 'Learn more about blueprints.',
    },
    {
      type: 'link',
      href: '/zk-email-sdk/regex',
      label: 'Regex',
      description: 'Learn how to create a new regex pattern.',
    },
  ]}
/>

## Step-by-step Guides

<DocCardList 
  items={[
    {
      type: 'link',
      href: '/zk-email-sdk/proof-of-luma',
      label: 'Creating Proof Of Luma',
      description: 'Learn how to create a Proof of Luma.',
    },
  ]}
/>