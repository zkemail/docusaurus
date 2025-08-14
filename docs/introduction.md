---
title: The Future of Digital Identity is in Your Inbox
sidebar_label: Introduction
description: Transform your email into a universal, privacy-preserving identity system. Prove any email interaction without revealing sensitive data using zero-knowledge proofs.
keywords: [ZK Email, zero knowledge proofs, email verification, privacy-preserving identity, DKIM signatures, blockchain integration, anonymous verification, selective disclosure, digital identity]
---

import DocCardList from '@theme/DocCardList';
import Head from '@docusaurus/Head';

# The Future of Digital Identity is in Your Inbox

<Head>
  <link 
    rel="preload" 
    as="image" 
    href="/img/zk-email-docs-banner.webp"
    fetchpriority="high"
  />
  <meta name="google-site-verification" content="p1d2CJxBesOeXENEYrDsrLDTPfWOBVTmwXnsfdB7b1Q" />
</Head>

<div style={{fontSize: '1.2em', marginBottom: '2em'}}>
Every day, billions of emails confirm important interactions - concert tickets arrive in your inbox, membership confirmations validate your access, and newsletters verify your participation in communities. But when you need to prove these interactions to others, you're stuck: the only way to demonstrate you received that email is to show the entire email - exposing your email address, personal details, and often unrelated private information.

**ZK Email solves this fundamental problem.** Now you can create cryptographic proofs of any email content that anyone can verify - without revealing your email address, personal information, or other sensitive details in the message.
</div>

<img 
  src="/img/zk-email-docs-banner.webp" 
  alt="ZK Email Documentation Banner" 
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

## The Paradigm Shift

ZK Email transforms your inbox into a **universal, privacy-preserving identity system** by leveraging the existing DKIM (DomainKeys Identified Mail) cryptographic infrastructure. Using zero-knowledge proof systems, you can:

- **Prove event attendance** without revealing your email address or email contents
- **Verify membership** in organizations while maintaining anonymity  
- **Authenticate achievements** without exposing personal details beyond the specific claim
- **Control blockchain assets** through familiar email interfaces with cryptographic guarantees

This approach provides formal privacy guarantees through zero-knowledge proofs while maintaining the authenticity assurances of DKIM signatures - a fundamental advancement in privacy-preserving digital identity systems.

## Real-World Impact

**Privacy-First Authentication**: Prove email ownership and specific attributes without revealing the email address or contents—enabling anonymous verification for sensitive applications. The system provides information-theoretic privacy for undisclosed email data while maintaining computational security for authenticity.

**Cryptographically Verifiable Claims**: Generate tamper-evident proofs of email-derived assertions without exposing sensitive data. The system reduces trust requirements through mathematical verifiability, though it inherits the security assumptions of DKIM infrastructure and the underlying zero-knowledge proof system.

**Accessible Web3**: Control blockchain wallets through familiar email interfaces while maintaining cryptographic security guarantees. This approach eliminates the need for seed phrase management while providing equivalent security through email-based authentication and social recovery mechanisms.

## Two Powerful Approaches

ZK Email enables privacy-preserving verification through two complementary approaches:

<div className="simple-approaches">
  <div className="simple-approach">
    <h3>Build ZK Circuits</h3>
    <p>Create custom zero-knowledge proofs from email data</p>
    <ul>
      <li>No-code circuit creation with our Registry</li>
      <li>Programmatic SDK for developers</li>
      <li>Verify any email pattern privately</li>
    </ul>
  </div>

  <div className="simple-approach">
    <h3>Web3 UX Enhancement</h3>
    <p>Make Web3 as familiar as online banking</p>
    <ul>
      <li>Email-controlled smart contract wallets</li>
      <li>Guardian-based account recovery</li>
      <li>Natural language blockchain transactions</li>
    </ul>
  </div>
</div>

## Choose Your Path

Select the journey that matches your goals and technical background:

<div className="persona-grid">
  <div className="persona-card">
    <h3>🎨 No-Code Builder</h3>
    <p className="persona-subtitle">Business users, Product managers, Marketers</p>
    <p>Create email verification proofs without writing code using our visual Registry tool.</p>
    <div className="persona-links">
      <a href="/zk-email-sdk/registry">Start with Registry →</a>
      <a href="/zk-email-sdk/proof-of-luma">5-Minute Tutorial →</a>
      <a href="https://registry.zk.email">Browse Blueprints →</a>
    </div>
  </div>

  <div className="persona-card">
    <h3>👩‍💻 Developer</h3>
    <p className="persona-subtitle">Frontend & Backend engineers</p>
    <p>Integrate ZK Email proofs into your applications with our SDK and comprehensive APIs.</p>
    <div className="persona-links">
      <a href="/zk-email-sdk/setup">SDK Quick Start →</a>
      <a href="/zk-email-sdk/overview">API Reference →</a>
      <a href="/zk-email-sdk/running-the-example">Code Examples →</a>
    </div>
  </div>

  <div className="persona-card">
    <h3>🏗️ Infrastructure Operator</h3>
    <p className="persona-subtitle">DevOps, System administrators</p>
    <p>Deploy and manage ZK Email infrastructure including relayers and DKIM archives.</p>
    <div className="persona-links">
      <a href="/email-wallet/relayer-infrastructure/overview">Deploy Relayer →</a>
      <a href="/architecture">Architecture Guide →</a>
      <a href="/architecture/security-considerations">Security Setup →</a>
    </div>
  </div>

  <div className="persona-card">
    <h3>🔬 Researcher</h3>
    <p className="persona-subtitle">Cryptographers, Protocol developers</p>
    <p>Explore the cryptographic foundations and extend ZK Email's capabilities.</p>
    <div className="persona-links">
      <a href="/architecture/zk-proofs">ZK Proofs →</a>
      <a href="/architecture/dkim-verification">DKIM Verification →</a>
      <a href="/architecture/security-considerations">Security Model →</a>
    </div>
  </div>
</div>

## Learn More

<DocCardList 
  items={[
    {
      type: 'link',
      href: '/architecture',
      label: 'How It Works',
      description: 'Understand the cryptographic foundations and ZK Email architecture.',
    },
    {
      type: 'link',
      href: 'https://zk.email/blog',
      label: 'Blog & Research',
      description: 'Latest insights, research, and developments in ZK Email.',
    },
    {
      type: 'link',
      href: 'https://github.com/zkemail',
      label: 'Open Source',
      description: 'Explore code, contribute, and build with our libraries.',
    },
    {
      type: 'link',
      href: '/web3-ux-overview',
      label: 'Use Cases',
      description: 'Real-world applications and implementation examples.',
    },
  ]}
/>

:::tip Ready to Get Started?
**Choose your path above** based on your role • **Questions?**: [Join our Telegram](https://t.me/zkemail) • **Stay updated**: [Follow our Blog](https://zk.email/blog)
:::
