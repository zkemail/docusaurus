---
title: Build ZK Circuits - Overview
sidebar_label: Overview
description: Learn about ZK Email's tools for creating zero-knowledge circuits - from no-code blueprint creation to programmatic SDK usage
keywords: [ZK Email SDK, Registry, blueprints, zero-knowledge circuits, no-code ZK, email verification, proof generation, DKIM verification]
---

# Build ZK Circuits

<div style={{fontSize: '1.2em', marginBottom: '2em'}}>
Create powerful zero-knowledge email proofs without cryptography expertise. Our tools make ZK circuit creation accessible to all developers.
</div>

## Transformative Applications in Production

Real companies are using ZK Email circuits to solve critical business problems:

### **Anonymous Credential Verification** 
**The Challenge**: Sensitive reporting requires verifiable credentials while maintaining anonymity  
**ZK Email Solution**: Generate proofs of professional credentials from institutional emails without revealing identity  
**Technical Implementation**: DKIM verification of institutional domains with selective disclosure of credential types

### **Privacy-Preserving Age Verification**
**The Challenge**: Traditional age verification exposes unnecessary personal information  
**ZK Email Solution**: Prove age thresholds from government-issued email confirmations without storing personal data  
**Technical Implementation**: Zero-knowledge proofs over date fields with range constraints, ensuring GDPR compliance

### **Selective Academic Disclosure**
**The Challenge**: Academic verification often requires exposing complete transcripts  
**ZK Email Solution**: Prove specific academic achievements (degree completion, GPA thresholds) without revealing full records  
**Technical Implementation**: Pattern matching on university email formats with authenticated institutional DKIM signatures

### **Anonymous Membership Verification**
**The Challenge**: Membership verification systems traditionally compromise member privacy  
**ZK Email Solution**: Cryptographically prove membership status from confirmation emails while maintaining anonymity  
**Technical Implementation**: Zero-knowledge proofs over membership confirmation patterns with temporal validity constraints

## Two Approaches to Building

### 🎨 Registry (No-Code)

Perfect for developers who want to create ZK circuits without writing cryptography code:

- **Visual Blueprint Builder** - Create circuits through an intuitive web interface
- **Pre-built Templates** - Start from existing patterns and customize
- **Automatic Deployment** - Your circuits are compiled and deployed automatically
- **Instant API Access** - Get endpoints ready to use in your application

[Start with Registry →](zk-email-sdk/registry)

### 🛠️ SDK (Programmatic)

For developers who need fine-grained control and integration:

- **TypeScript/JavaScript** - Native support for web applications
- **Blueprint Integration** - Use circuits created in the Registry
- **Custom Proof Generation** - Full control over the proving process
- **Framework Agnostic** - Works with React, Next.js, Vue, and more

[Explore the SDK →](zk-email-sdk/)

## How It Works

1. **Create a Blueprint** - Define what emails to verify and what data to extract
2. **Deploy Automatically** - Our infrastructure compiles and hosts your circuit
3. **Generate Proofs** - Users create proofs from their emails client-side
4. **Verify On-Chain** - Smart contracts verify proofs trustlessly

## Core Components

### ZK Email Verifier
The foundational library providing:
- DKIM signature verification circuits
- Email parsing helpers
- Smart contract verifiers
- Low-level primitives for custom implementations

[Learn about ZK Email Verifier →](zk-email-verifier/)

### Supporting Technologies

- **ZK-Regex Compiler** - Convert regex patterns to ZK circuits (Circom, Noir)
- **zkVM Support** - Server-side proof generation with SP1 and RISC0
- **Archive** - Historical DKIM public key storage
- **Relayer Utils** - Utilities for proof input generation

## Quick Start

<div className="row">
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>Try the Registry</h3>
      </div>
      <div className="card__body">
        <p>Create your first blueprint in minutes:</p>
        <ol>
          <li>Visit <a href="https://registry.zk.email">registry.zk.email</a></li>
          <li>Connect your wallet</li>
          <li>Create a new blueprint</li>
          <li>Test with sample emails</li>
        </ol>
      </div>
      <div className="card__footer">
        <a href="zk-email-sdk/create-blueprint" className="button button--primary button--block">Blueprint Tutorial</a>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card">
      <div className="card__header">
        <h3>Install the SDK</h3>
      </div>
      <div className="card__body">
        <p>Get started with the SDK:</p>
        <pre>
npm install @zk-email/sdk
# or
yarn add @zk-email/sdk
        </pre>
      </div>
      <div className="card__footer">
        <a href="zk-email-sdk/setup" className="button button--primary button--block">SDK Setup Guide</a>
      </div>
    </div>
  </div>
</div>

## Example: Proof of Twitter Verification

Cryptographically prove Twitter account ownership without revealing email contents:

```typescript
import { createBlueprint, generateProof } from '@zk-email/sdk';

// Define pattern matching for Twitter notification emails
const blueprint = await createBlueprint({
  slug: 'proof-of-twitter-verification',
  emailQuery: 'from:notifications@twitter.com',
  extractedData: {
    username: {
      regex: '@([a-zA-Z0-9_]+) on X',
      subgroup: 1,
      isPublic: true  // Username will be revealed in proof
    }
  },
  // Additional circuit constraints for authenticity
  constraints: {
    maxEmailLength: 1024 * 10,  // 10KB limit
    enableHeaderVerification: true,
    enableBodyHashCheck: true
  }
});

// Generate zero-knowledge proof from authenticated email
const proof = await generateProof(blueprint, {
  email: emailContent,
  generateWitness: true,  // Include circuit witness generation
  verifyDKIM: true       // Validate DKIM signature before proving
});
```

**Security Properties**: This proof demonstrates knowledge of a Twitter notification email for the specified username while maintaining privacy of all other email contents and recipient information.

[Full Twitter Proof Tutorial →](zk-email-sdk/proof-of-luma)

## Need Help?

- 📚 Browse [example implementations](https://github.com/zkemail)
- 💬 Ask questions in [Telegram](https://t.me/zkemail)
- 🐛 Report issues on [GitHub](https://github.com/zkemail)

:::tip
Start with the Registry if you're new to ZK Email. You can always move to the SDK later for more control.
:::