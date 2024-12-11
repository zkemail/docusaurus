---
title: Zero-Knowledge Proofs
sidebar_label: Zero-Knowledge Proofs
description: Deep dive into how ZK Email uses Zero-Knowledge Proofs for private email verification, including ZK-SNARKs, circuit design, and selective disclosure mechanisms
keywords: [zero-knowledge proofs, ZK-SNARKs, ZK circuits, privacy-preserving verification, selective disclosure, cryptographic protocols, blockchain verification, DKIM verification, proof generation, circuit design]
---

import DocCardList from '@theme/DocCardList';

# Zero-Knowledge Proofs

<div style={{fontSize: '1.2em'}}>
Explore ZK Email's use of Zero-Knowledge Proofs for safe, private blockchain email verification.
</div>

---

**Zero-Knowledge Proofs (ZKPs)** are a fundamental component of ZK Email's architecture, enabling privacy-preserving verification of email contents on the blockchain. This document provides an in-depth exploration of what Zero-Knowledge Proofs are, how they work, their significance, and how ZK Email leverages them to facilitate secure and private email authentication in decentralized environments.

## What are Zero-Knowledge Proofs?

Zero-Knowledge Proofs are cryptographic protocols that allow one party, the **prover**, to prove to another party, the **verifier**, that a given statement is true, **without revealing any information** beyond the validity of the statement itself.


<details>
<summary><strong>Example</strong></summary>

Imagine a scenario where **Alice (the prover)** wants to prove to **Bob (the verifier)** that she knows the password to a secret door, without revealing the password itself. Here's how this could work using a Zero-Knowledge Proof:

1. Bob and Alice agree on a large, circular room with a door that can only be opened with a secret password.
2. Alice enters the room, and Bob waits outside.
3. Bob randomly chooses to ask Alice to exit from either the left or right side of the door.
4. If Alice knows the password, she can always exit from the side Bob requests.
5. If Alice doesn't know the password, she has a 50% chance of guessing the correct side.
6. They repeat this process multiple times.

After many repetitions, if Alice always exits from the correct side, Bob can be confident that Alice knows the password, without Alice ever revealing what the password is.
</details>


### Key Properties of Zero-Knowledge Proofs

1. **Completeness**: If the statement is true, an honest verifier will be convinced by an honest prover.

2. **Soundness**: If the statement is false, no dishonest prover can convince the honest verifier that it is true, except with negligible probability.

3. **Zero-Knowledge**: If the statement is true, the verifier learns nothing other than the fact that the statement is true; no additional information is revealed.

## How Do Zero-Knowledge Proofs Work?

Zero-Knowledge Proofs are based on complex mathematical and cryptographic principles. There are several types of ZKPs, including:

- **Interactive Zero-Knowledge Proofs**: Require multiple rounds of interaction between the prover and verifier.

- **Non-Interactive Zero-Knowledge Proofs (NIZKs)**: Do not require interaction; the proof can be sent to the verifier and verified independently.

- **Succinct Non-Interactive Arguments of Knowledge (SNARKs)**: A type of NIZK that is particularly efficient in terms of proof size and verification time.

In blockchain applications, **ZK-SNARKs** (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge) are commonly used due to their efficiency and suitability for on-chain verification.

## How ZK Email Uses Zero-Knowledge Proofs

ZK Email employs Zero-Knowledge Proofs to enable private and secure verification of email contents on the blockchain. Here's how:

<details>
<summary><strong>1. DKIM Signature Verification in ZK Circuits</strong></summary>

**Objective**: Prove that a valid DKIM signature exists for an email without revealing the email's contents or the signature itself.

**Process**:
- The prover constructs a Zero-Knowledge Proof that they possess an email with a valid DKIM signature.
- The proof includes verification of the DKIM signature using the sender's public key, all within the ZK circuit.

**Benefits**:
- Ensures the email's authenticity and integrity without exposing sensitive information.
</details>

<details>
<summary><strong>2. Email Content Verification</strong></summary>

**Objective**: Prove specific properties or contents of an email without exposing the entire message.

**Examples**:
- **Ownership Proof**: Demonstrate ownership of an email address.
- **Content Confirmation**: Verify that an email contains a specific phrase, code, or piece of information.

**Process**:
- The ZK circuit includes constraints that check for specific patterns or values in the email content.
- Only necessary information is exposed in the proof's public inputs, keeping other data private.

**Benefits**:
- Allows users to prove statements about the email content while maintaining confidentiality.
</details>

<details>
<summary><strong>3. Selective Disclosure</strong></summary>

**Objective**: Enable users to choose which parts of an email to reveal and which to keep private, all while proving the authenticity of the revealed information.

**Process**:
- The ZK circuit is designed to allow selective disclosure of certain fields or content within the email.
- Users can reveal specific properties (e.g., sender domain, date) without exposing other sensitive information.

**Benefits**:
- Provides granular control over information sharing.
- Enhances privacy and user autonomy.
</details>

<details>
<summary><strong>4. On-Chain Verification</strong></summary>

**Objective**: Facilitate trustless and decentralized verification of proofs on the blockchain.

**Process**:
- The generated Zero-Knowledge Proof is submitted to a smart contract on the blockchain.
- The smart contract verifies the proof using the appropriate verification key.
- Upon successful verification, the contract can execute predefined actions based on the proof.

**Benefits**:
- Eliminates the need for trusted intermediaries.
- Aligns with decentralized principles of blockchain technology.
</details>

### ZK Circuits in ZK Email

ZK Email uses specialized Zero-Knowledge circuits (ZK circuits) to perform its proofs. These circuits are designed to:

#### 1. Verify DKIM Signature

- Implement the RSA signature verification algorithm within the ZK circuit.
- Use the sender's public key to verify the DKIM signature without exposing the private key or the email content.
- Ensure that the email headers and body match the expected format and content.

#### 2. Extract and Prove Email Properties

- Utilize cryptographic hash functions (e.g., SHA-256) within the circuit to handle email content securely.
- Implement pattern matching (e.g., regular expressions) to parse and validate email headers and body content.
- Allow flexible verification of properties such as sender, recipient, date, subject, and specific content snippets.

#### 3. Perform Regex Matching on Emails

- Use custom ZK circuits capable of performing regex matching within the constraints of Zero-Knowledge Proof systems.
- Efficiently verify that the email content matches certain patterns or contains specific information.

#### 4. Ensure Proof Soundness and Security

- Design circuits to prevent malleability and other potential attacks.
- Include constraints to bind the proof to the prover's identity or specific parameters, ensuring the proof cannot be altered or misused.

## Learn More

To deepen your understanding of ZK Email's architecture and how Zero-Knowledge Proofs integrate with other components, explore the following topics:

<DocCardList 
  items={[
    {
      type: 'link',
      href: '/architecture/dkim-verification',
      label: 'DKIM Verification',
      description: 'Learn how ZK Email uses DKIM for trustless email verification.',
    },
    {
      type: 'link',
      href: '/architecture/on-chain',
      label: 'On-chain Integration',
      description: 'Discover how ZK Email enables trustless blockchain verification.',
    },
    {
      type: 'link',
      href: '/architecture/security-considerations',
      label: 'Security Considerations',
      description: 'Explore the trust assumptions and security measures in ZK Email.',
    }
  ]}
/>

