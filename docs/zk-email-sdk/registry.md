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

The ZK Email Registry is a platform that allows you to create and manage email proofs. It provides an easy way to define, deploy, create and share email-based zero-knowledge proofs without dealing with the underlying complexity.

You can browse existing blueprints to see what others have created, or create your own new blueprints.

To get started, you can visit the [ZK Email Registry](https://registry.zk.email).

## Create New Blueprint

To create a new blueprint, you must be signed in with your Github account. Once you are signed in, you can click the "Create Blueprint" button to start the creation process.

If you want to learn how to create a new blueprint, follow this guide:

<DocCardList 
  items={[
    {
      type: 'link',
      href: '/zk-email-sdk/create-blueprint',
      label: 'Create Blueprint',
      description: 'Learn how to create a new blueprint.',
    },
  ]}
/>

## Browse Blueprints

The Registry allows you to browse existing blueprints, you can search by the blueprint name or slug (author/circuit-name). You can also filter by the status of the blueprint (Compiled, In Progress, Failed).

<img 
  src="/img/registry/search.webp" 
  alt="ZK Email Registry Search" 
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

## Generate Proof

Once you have created or selected an existing blueprint, you can generate a proof by clicking on the blueprint card. On the blueprint page you can connect your gmail account or upload an eml file to generate a proof.

<img 
  src="/img/registry/create-proof.webp" 
  alt="ZK Email Registry Create Proof" 
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

After connecting your gmail account or submitting an eml file, you will be able to generate a proof by clicking the "Generate Proof Remotely" button.

<img 
  src="/img/registry/create-proof-step2.webp" 
  alt="ZK Email Registry Create Proof" 
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

Lastly, you can view the proof by clicking the "View" button.

<img 
  src="/img/registry/create-proof-step3.webp" 
  alt="ZK Email Registry Create Proof" 
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

## Share Proof

After generating a proof, you can share the proof by clicking the "Share Proof" button. This will copy the proof URL to your clipboard. If you create the proof from the registry, you can also see the preview of the email.

The registry does not store any emails, so the preview will not be available to others or if you clear your browser memory.

<img 
  src="/img/registry/share-proof.webp" 
  alt="ZK Email Registry Share Proof" 
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
