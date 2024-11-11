# Setup

This guide covers setting up and using the ZK Email SDK to create email proofs.

## Install Dependencies

```bash
npm install @zk-email/sdk
```

## Using the SDK

Initialize the SDK with authentication:

```typescript
import { createBlueprint, Auth } from '@zk-email/sdk';
```

## Creating Proofs

Generate proofs from email files (.eml):

```typescript
// Get blueprint
const blueprint = await sdk.getBlueprint('<blueprint-id>');

// Create a prover instance
const prover = blueprint.createProver();

// Generate proof from email content
const proof = await prover.generateProof(emlContent);

// Check proof status
const status = await proof.checkStatus();

// Get proof data
const proofDataUrl = await proof.getProofDataDownloadLink();
```

The proof generation is asynchronous - use `checkStatus()` to monitor progress.
