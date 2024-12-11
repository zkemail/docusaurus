---
title: On-chain Integration | ZK Email Architecture
sidebar_label: On-chain Integration
description: Technical overview of ZK Email's blockchain integration, including proof generation, verification contracts, and DKIM registry for trustless email verification in Web3 applications
keywords: [on-chain verification, blockchain integration, zero-knowledge proofs, smart contracts, DKIM registry, web3 integration, trustless verification, privacy-preserving, proof generation, blockchain applications]
---

# On-chain Integration

<div style={{fontSize: '1.2em'}}>
Discover how ZK Email enables trustless, private on-chain email verification for blockchain applications.
</div>

---

ZK Email's on-chain integration is a crucial component that enables trustless verification of email contents on the blockchain. This document explains how ZK Email bridges the gap between traditional email systems and blockchain networks, allowing for secure and privacy-preserving email-based interactions in Web3 applications.

## The Challenge of Email Verification on Blockchain

Traditionally, verifying email contents on a blockchain would require revealing the entire email, including sensitive information. This approach is neither private nor efficient. ZK Email solves this problem by using zero-knowledge proofs to verify email properties without exposing the full content.

## How ZK Email Enables On-chain Verification

ZK Email's on-chain integration works through the following process:

1. **Off-chain Proof Generation**: 
   - A zero-knowledge proof is generated off-chain, verifying specific properties of an email (e.g., sender, recipient, content matches).
   - This proof is compact and doesn't contain the actual email content.

2. **On-chain Verification**:
   - The generated proof is submitted to a smart contract on the blockchain.
   - The contract verifies the proof, confirming the email's properties without seeing the email itself.

3. **Action Triggering**:
   - Based on the verified email properties, the smart contract can trigger specific actions or update on-chain state.

## Key Components of On-chain Integration

1. **Verifier Contracts**: 
   - Smart contracts deployed on the blockchain that can verify zero-knowledge proofs.
   - These contracts implement the logic to check the validity of proofs submitted by users.

2. **Application-Specific Contracts**: 
   - Custom smart contracts that use the verified email properties to execute business logic.
   - These contracts interact with the verifier contracts to make decisions based on proven email contents.

3. **DKIM Public Key Registry**:
   - An on-chain registry of DKIM public keys for various email domains.
   - This registry allows for trustless verification of DKIM signatures without relying on DNS lookups.

## Benefits of ZK Email's On-chain Integration

1. **Trustless Verification**: No need to trust third-party oracles or centralized services for email verification.

2. **Privacy Preservation**: Email contents remain private while still enabling on-chain actions based on their properties.

3. **Flexibility**: Different types of email-based proofs can be verified on-chain, enabling a wide range of applications.

4. **Efficiency**: The compact nature of zero-knowledge proofs reduces on-chain storage and computation costs.

ZK Email opens up new possibilities connecting traditional web communication and blockchain applications. By enabling trustless, privacy-preserving email verification on-chain, ZK Email creates new Web3 use cases that leverage the omnipresence of email.
