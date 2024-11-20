# Setup

This guide covers setting up and using the ZK Email SDK to create email proofs.

## Install Dependencies

```bash
npm install @zk-email/sdk
```

## Using the SDK

Initialize the SDK with authentication:

```typescript
import zkeSDK from "@zk-email/sdk";
```

## Creating Proofs

Generate proofs from email files (.eml):

```typescript
import zkeSDK from "@zk-email/sdk";
import fs from "fs/promises";

// Copy slug from UI homepage
const blueprintSlug = "Bisht13/SuccinctZKResidencyInvite@v1"

async function main() {
  const sdk = zkeSDK();

  // Get an instance of Blueprint
  const blueprint = await sdk.getBlueprint(blueprintSlug);

  // Create a prover from the blueprint
  const prover = blueprint.createProver();

  // Get eml
  const eml = (await fs.readFile("emls/residency.eml")).toString();

  // Generate and wait until proof is generated, can take up to a few minutes
  const proof = await prover.generateProof(eml);
  // will change tomorrow: the field proof and public will be directly be named proofData, publicData
  const { proofData, publicData } = proof.getProofData();
  console.log("proof: ", proofData);
  console.log("public: ", publicData);
}

main();
```
