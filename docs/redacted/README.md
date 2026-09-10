---
title: Overview | Redacted
sidebar_label: Overview
description: Redacted is a zero-knowledge email verification tool that lets users prove an email is authentic while selectively hiding sensitive content using ZK proofs.
keywords: [redacted, zk-email, email masking, zero-knowledge proofs, DKIM verification, email privacy, selective disclosure, Noir circuits]
---

import DocCardList from '@theme/DocCardList';

# Overview

Redacted is a zero-knowledge email verification tool. Users upload an email, selectively mask sensitive fields, and generate a cryptographic proof that the unmasked parts are authentic. Anyone can verify the proof without seeing the original email.

**Live app:** [redacted.zk.email](https://redacted.zk.email)

## How it works

1. User uploads a `.eml` file in the browser
2. The app parses the email and verifies the DKIM signature
3. User selects which fields to reveal and which to mask
4. A ZK proof is generated entirely client-side (Noir + UltraHonk)
5. The proof is uploaded — the original email never leaves the device
6. Anyone with the link can verify the proof and see only the revealed content

## Key properties

- **Client-side proving** — the email never leaves the browser
- **No email storage** — only the proof and masked output are persisted
- **Cryptographic masking** — masked content is mathematically removed, not just hidden
- **DKIM-based** — leverages existing [email authentication infrastructure](/architecture/dkim-verification)

## How Redacted relates to the ZK Email ecosystem

Redacted is a standalone application built on top of core ZK Email libraries:

- **[`@zk-email/helpers`](/zk-email-verifier/packages/zk-email-helpers)** — used for DKIM signature verification and generating circuit inputs from raw emails
- **[`@zk-email/zkemail-nr`](https://github.com/zkemail/zkemail.nr)** — the Noir library that provides RSA/DKIM verification, body hash extraction, and masking primitives inside the circuit
- Uses the same [DKIM verification](/architecture/dkim-verification) and [ZK proof](/architecture/zk-proofs) concepts as the rest of the ecosystem

Unlike the [Blueprint SDK](/zk-email-sdk/README), which uses Circom circuits compiled server-side, Redacted uses **Noir circuits** with the **UltraHonk** proving system. This enables the entire proof to be generated client-side in the browser via WASM — no remote prover needed.

## Documentation

<DocCardList />
