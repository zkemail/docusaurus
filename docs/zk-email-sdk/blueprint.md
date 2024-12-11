---
title: Blueprints | ZK Email SDK
sidebar_label: Blueprints
description: Guide to creating and managing email verification blueprints in ZK Email SDK, including regex pattern matching, proof generation, and on-chain verification
keywords: [blueprints, regex patterns, proof generation, ZK proofs, email parsing, on-chain verification, smart contract deployment, blueprint compilation, SDK configuration]
---

# Blueprints

A blueprint is a set of rules that define how to generate a proof from an email. It specifies:

- What information to extract from an email
- How to locate this information (header or body)
- Which parts should be public or private in the proof
- The verification rules for the proof

## Creating a Blueprint

```typescript
import { initializeSdk } from 'zk-email-sdk';

const sdk = initializeSdk();

// Define regex rules
const decomposedRegex = {
  name: "body_match",
  location: "body",
  parts: [
    {
      is_public: false, 
      regex_def: 'email was meant for @'
    },
    {
      is_public: true,
      regex_def: '(a-zA-Z0-9_)+'
    }
  ]
};

// Add metadata
const metadata = {
  title: 'Email Verification',
  name: 'EmailVerifier',
  description: 'Verifies email contents'
};

// Create blueprint
const blueprint = sdk.createRegexBlueprint({
  decomposedRegexes: [decomposedRegex],
  metadata,
  options: {
    deployVerifierContract: {
      chain: 84532
    }
  }
});
```

## Testing a Blueprint

Before submitting, test if your blueprint correctly matches emails:

```typescript
// Test with raw email
const testResult = blueprint.test(emailContent);

// Or with parsed email
const parsedEmail = parseEmail(emailContent);
const testResult = blueprint.test(parsedEmail);
```

## Submitting and Compiling

```typescript
// Submit blueprint for compilation
const blueprintId = await blueprint.submit();

// Check compilation status
const status = await blueprint.checkStatus();

if (status === ProgressStatus.Done) {
  // Blueprint is ready for generating proofs
}
```

## Using the Blueprint

Once compiled, use the blueprint to create proofs:

```typescript
const prover = blueprint.createProver();

// Generate proof from email
const proof = await prover.generateProof(emailContent);

// Get proof data
const proofData = await proof.getProofData();

// Verify on chain
const result = await proof.verifyOnChain();
```

## Blueprint Options

The blueprint supports these configuration options:

```typescript
interface BlueprintOptions {
  zkFramework?: 'Circom'; // Default framework
  deployVerifierContract?: {
    chain: number; // Chain ID for deploying verifier
  };
}
```

## Retrieving Blueprints

```typescript
// List blueprints with filters
const blueprints = await sdk.listBlueprints({
  skip: 0,
  limit: 10,
  sort: -1,
  status: ProgressStatus.Done,
  isPublic: true
});

// Get specific blueprint
const blueprint = await sdk.getBlueprintById("blueprint-id");
```
