---
title: Setup | ZK Email SDK
sidebar_label: Setup
description: Complete setup guide for the Blueprint SDK, including installation, configuration for Node.js, React, and Next.js, with working examples for proof generation
keywords: [Blueprint SDK, setup guide, installation, Node.js integration, React setup, Next.js configuration, WASM support, proof generation, email verification, development setup]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setup

The Blueprint SDK provides a simple way to generate and verify zero-knowledge proofs from emails.

## Installation

To get started with the SDK, the first step is to install it using your preferred package manager:

<Tabs>
<TabItem value="npm" label="npm">
```bash
npm install @zk-email/sdk
```
</TabItem>
<TabItem value="pnpm" label="pnpm">
```bash
pnpm add @zk-email/sdk
```
</TabItem>
<TabItem value="yarn" label="yarn">
```bash
yarn add @zk-email/sdk
```
</TabItem>
</Tabs>

## Usage

### Download Sample Email

You can download a sample email file to test the SDK:

<div style={{
  padding: "1rem",
  border: "1px solid #e0e0e0", 
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "fit-content",
  cursor: "pointer"
}}>
  <a href="/files/residency.eml" download style={{
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "inherit"
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
    </svg>
    <span>Download residency.eml</span>
  </a>
</div>

### Generate Proof

<Tabs>
<TabItem value="nodejs" label="Node.js">

```javascript
import zkeSDK from "@zk-email/sdk";
import fs from "fs/promises";

async function main() {
  const sdk = zkeSDK();
  
  // Get blueprint from the registry
  const blueprint = await sdk.getBlueprint("Bisht13/SuccinctZKResidencyInvite@v1");
  const prover = blueprint.createProver();

  // Read email file
  const eml = await fs.readFile("residency.eml", "utf-8");
  
  // Generate proof
  const proof = await prover.generateProof(eml);
  const { proofData, publicData } = proof.getProofData();
  
  console.log("Proof:", proofData);
  console.log("Public data:", publicData);
}

main();
```

</TabItem>
<TabItem value="react" label="React (Vite)">

Create your component:

```jsx
import { useState } from 'react'
import zkeSDK from "@zk-email/sdk"

export default function Home() {
  const [proof, setProof] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      // Read the file as text
      const eml = await file.text()

      // Initialize the SDK
      const sdk = zkeSDK()

      // Get the blueprint
      const blueprint = await sdk.getBlueprint("Bisht13/SuccinctZKResidencyInvite@v1")

      // Create a prover
      const prover = blueprint.createProver()
      
      // Generate the proof
      const generatedProof = await prover.generateProof(eml)
      const { proofData, publicData } = generatedProof.getProofData()
      setProof({ proofData, publicData })
    } catch (error) {
      console.error("Error generating proof:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div>
        <h1>ZK Email Proof Generator</h1>
        
        <input 
          type="file" 
          accept=".eml"
          onChange={handleFileUpload}
          disabled={loading}
        />
        
        {loading && <p>Generating proof...</p>}
        
        {proof && (
          <div>
            <h3>Proof Generated:</h3>
            <pre>
              {JSON.stringify(proof, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  )
}
```

</TabItem>
<TabItem value="nextjs" label="Next.js">

Create your component:

```jsx
'use client'

import { useState } from 'react'
import zkeSDK from "@zk-email/sdk"

export default function Home() {
  const [proof, setProof] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      // Read the file as text
      const eml = await file.text()

      // Initialize the SDK
      const sdk = zkeSDK()

      // Get the blueprint
      const blueprint = await sdk.getBlueprint("Bisht13/SuccinctZKResidencyInvite@v1")

      // Create a prover
      const prover = blueprint.createProver()
      
      // Generate the proof
      const generatedProof = await prover.generateProof(eml)
      const { proofData, publicData } = generatedProof.getProofData()
      setProof({ proofData, publicData })
    } catch (error) {
      console.error("Error generating proof:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div>
        <h1>ZK Email Proof Generator</h1>
        
        <input 
          type="file" 
          accept=".eml"
          onChange={handleFileUpload}
          disabled={loading}
        />
        
        {loading && <p>Generating proof...</p>}
        
        {proof && (
          <div>
            <h3>Proof Generated:</h3>
            <pre>
              {JSON.stringify(proof, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  )
}
```

</TabItem>
</Tabs>
