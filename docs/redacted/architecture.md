---
title: Architecture | Redacted
sidebar_label: Architecture
description: System architecture for Redacted — component overview, data flow, and key design decisions for the ZK email masking tool.
keywords: [redacted architecture, system design, client-side proving, GCS storage, email verification]
---

# Architecture

## System Overview

```text
┌──────────────────────────────────────────────────────────────────┐
│  Browser (React 19 + Vite)                                       │
│                                                                  │
│  ┌──────────┐  ┌──────────────┐  ┌─────────────────────────────┐ │
│  │ Email    │  │ Interactive  │  │ ZK Proving Layer            │ │
│  │ Upload & │→ │ Masking UI   │→ │                             │ │
│  │ Parsing  │  │ (per-char)   │  │  Noir circuit (WASM)        │ │
│  └──────────┘  └──────────────┘  │  + Barretenberg UltraHonk   │ │
│       ↑                          │  → proof + public inputs     │ │
│  postal-mime                     └──────────────┬──────────────┘ │
│  + @zk-email/helpers (DKIM)                     │                │
└─────────────────────────────────────────────────┼────────────────┘
                                                  │
                                    Upload proof via signed URL
                                                  │
                                                  ▼
                              ┌──────────────────────────────────┐
                              │  Express Backend (Node.js)       │
                              │                                  │
                              │  POST /api/get-proof-upload-url  │
                              │  GET  /api/get-data/:uuid        │
                              │  POST /api/generate-uuid         │
                              │                                  │
                              │  Serves static frontend (prod)   │
                              └──────────────┬───────────────────┘
                                             │
                                             ▼
                              ┌──────────────────────────────────┐
                              │  Google Cloud Storage             │
                              │                                  │
                              │  eml/{uuid}/proof.json           │
                              │  eml/{uuid}/metadata.json        │
                              │                                  │
                              │  (original email NEVER stored)   │
                              └──────────────────────────────────┘
```

## Key Design Decisions

**Client-side proving.** The entire ZK proof is generated in the browser. The original email never leaves the user's device. This is the core privacy guarantee.

**No email storage.** The backend only stores proof outputs (masked bytes + cryptographic proof) and mask metadata. The original `.eml` file exists only in browser memory during the session.

**Cross-origin isolation.** The Express server sets `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` headers. This enables `SharedArrayBuffer`, which Barretenberg uses for multi-threaded proof generation via Web Workers.

**Circuit variants.** Four pre-compiled Noir circuits cover the 2x2 matrix of RSA key sizes (1024/2048-bit) and email body sizes (4KB/8.4KB). The app auto-selects the smallest circuit that fits. See the [ZK Proving System](./zk-proving) page for details on each variant.

## File Structure

```text
src/
├── lib.ts                    # Core: proof generation, verification, circuit loading
├── App.tsx                   # Main app state, proof flow orchestration
├── circuit-configs.json      # Circuit variant definitions
├── circuit/
│   ├── src/main.nr           # Noir circuit source
│   ├── Nargo.toml            # Noir project config + dependencies
│   └── target/               # Pre-compiled circuit JSON (4 variants)
│       ├── email_mask_1024_small.json
│       ├── email_mask_1024_mid.json
│       ├── email_mask_2048_small.json
│       └── email_mask_2048_mid.json
├── utils/
│   └── emlParser.ts          # Email parsing, DKIM, field range extraction
├── components/
│   ├── EmailCard.tsx          # Email display with masking UI
│   ├── EmailField.tsx         # Individual field (From, To, etc.) with mask toggle
│   ├── ActionBar.tsx          # Bottom bar: generate proof, undo/redo
│   ├── UploadModal.tsx        # Drag-and-drop .eml upload
│   ├── MaskedText.tsx         # Renders masked content as black blocks
│   └── ...
├── pages/
│   ├── Home.tsx               # Landing page
│   └── VerifyPage.tsx         # Proof verification page
server/
└── index.js                   # Express API + GCS integration
```

## Data Flow

### Proof Generation

```text
1. User drops .eml file
2. postal-mime parses email → {from, to, subject, body, raw}
3. @zk-email/helpers verifyDKIMSignature → DKIMResult {modulusLength, signature, ...}
4. User masks fields → headerMask[], bodyMask[] (1=reveal, 0=hide)
5. Select circuit by keyBits + bodyLength
6. generateEmailVerifierInputsFromDKIMResult(dkimResult, {masks, lengths})
7. Noir witness execution → witness
8. UltraHonkBackend.generateProof(witness) → ProofData {publicInputs, proof}
9. Upload proof.json + metadata.json to GCS via signed URL
10. Redirect to /verify?id={uuid}
```

### Proof Verification

```text
1. Verifier opens /verify?id={uuid}
2. GET /api/get-data/{uuid} → {proof, headerMask, bodyMask}
3. Extract masked header/body from publicInputs
4. Display masked email (null bytes → black blocks)
5. User clicks "Verify Proof"
6. UltraHonkBackend.verifyProof(proofData) → boolean
7. Show green (valid) or red (invalid) banner
```
