---
title: Backend & Storage | Redacted
sidebar_label: Backend & Storage
description: Express.js backend API and Google Cloud Storage integration for Redacted — proof upload, retrieval, and storage architecture.
keywords: [Express API, Google Cloud Storage, proof storage, signed URLs, CORS, cross-origin isolation]
---

# Backend & Storage

## Overview

The backend is a lightweight Express.js server that handles proof storage and retrieval via Google Cloud Storage. It intentionally does **not** handle proof generation or email processing — those happen entirely in the browser.

**Source:** `server/index.js`

## API Endpoints

### `POST /api/generate-uuid`

Generate a random UUID for a new proof.

**Response:**
```json
{ "uuid": "6c4d4f5f-859f-4221-8ba4-53055ed006f3" }
```

---

### `POST /api/get-proof-upload-url`

Get a signed URL for the client to upload proof data directly to GCS.

**Request:**
```json
{
  "uuid": "6c4d4f5f-...",
  "headerMask": [1, 1, 0, 0],
  "bodyMask": [1, 1, 1, 0]
}
```

**Response:**
```json
{
  "uploadUrl": "https://storage.googleapis.com/bucket/eml/uuid/proof.json?X-Goog-Signature=...",
  "publicUrl": "https://storage.googleapis.com/bucket/eml/uuid/proof.json",
  "filename": "eml/uuid/proof.json",
  "uuid": "6c4d4f5f-..."
}
```

**What happens:**
1. Generates a signed PUT URL (15-minute expiry) for `eml/{uuid}/proof.json`
2. Stores `eml/{uuid}/metadata.json` with mask arrays + timestamp
3. Client uploads proof directly to GCS using the signed URL (no proxy through backend)

---

### `GET /api/get-data/:uuid`

Retrieve proof and metadata for verification.

**Response:**
```json
{
  "proof": {
    "publicInputs": ["0x1a2b...", "0x3c4d..."],
    "proof": [12, 34, 56]
  },
  "headerMask": [1, 1, 0, 0],
  "bodyMask": [1, 1, 1, 0],
  "createdAt": "2025-12-18T13:22:19.000Z"
}
```

**Data normalization:** The endpoint normalizes proof data on retrieval:
- `publicInputs` elements are ensured to be hex strings (converts arrays if stored incorrectly)
- `proof` elements are ensured to be numbers 0-255 (converts string representations)

---

### `GET /health`

```json
{ "status": "ok" }
```

## GCS Storage Structure

```text
bucket/
└── eml/
    └── {uuid}/
        ├── proof.json       # ProofData: {publicInputs: string[], proof: number[]}
        └── metadata.json    # {headerMask: number[], bodyMask: number[], createdAt: string}
```

**No original email is ever stored.** The proof's public inputs contain the masked header and body — sufficient for display and verification.

## GCS Configuration

The server supports two credential modes:

**Option 1 — JSON string** (recommended for deployment):
```bash
GCS_CREDENTIALS='{"type":"service_account","project_id":"...","private_key":"..."}'
```

**Option 2 — Key file path:**
```bash
GCS_KEY_FILE=./path/to/service-account.json
```

Required environment variables:
```bash
GCS_PROJECT_ID=your-project-id
GCS_BUCKET_NAME=your-bucket-name
```

### Bucket CORS Setup

The bucket needs CORS configured for client-side uploads. Use `server/setup-cors.js`:

```bash
npm run setup-cors
```

This sets:
- Allowed methods: `PUT`, `GET`, `HEAD`
- Allowed headers: `Content-Type`, `Content-Length`
- Allowed origins: configured from `ALLOWED_ORIGINS` env var

## Cross-Origin Isolation

The server sets two critical headers on all responses:

```text
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

These enable `SharedArrayBuffer` in the browser, which Barretenberg's `UltraHonkBackend` uses for multi-threaded proof generation via Web Workers. Without these headers, proving falls back to single-threaded mode.

## Static File Serving

In production (`NODE_ENV=production`), the server also serves the built Vite frontend:

```text
GET /                → dist/index.html
GET /generate-proof  → dist/index.html (SPA fallback)
GET /verify          → dist/index.html (SPA fallback)
GET /assets/*        → dist/assets/* (static files)
```

API routes (`/api/*`) are registered first and take priority.

## Proof Lifecycle

```text
1. Client generates proof in browser
2. Client calls POST /api/get-proof-upload-url → gets signed URL + uuid
3. Client uploads proof.json directly to GCS via signed PUT URL
4. Client stores proof in localStorage as fallback
5. Client redirects to /verify?id={uuid}
6. Verifier's browser calls GET /api/get-data/{uuid}
7. Verifier's browser verifies proof locally (no server computation)
```

The server is stateless — it only brokers storage. All cryptographic operations happen client-side.
