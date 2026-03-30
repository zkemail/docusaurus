---
title: Development Guide | Redacted
sidebar_label: Development Guide
description: Local development setup, build commands, circuit compilation, deployment, and troubleshooting for Redacted.
keywords: [development setup, Noir compilation, Barretenberg, Docker deployment, Render, environment variables]
---

# Development Guide

## Prerequisites

- **Node.js** 20+
- **Yarn** (package manager)
- **Nargo** 1.0.0-beta.5 (only for circuit compilation)
- **Barretenberg** (`bb`) 0.84.0 (only for circuit compilation)

## Quick Start

```bash
# Install dependencies
yarn install

# Start frontend dev server (http://localhost:5173)
yarn dev

# Start backend API server (http://localhost:3001)
yarn server

# Start both simultaneously
yarn dev:full
```

## Environment Variables

### Frontend (prefix with `VITE_`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GCS_API_URL` | Yes | Backend API base URL. Local: `http://localhost:3001/api`. Production: `https://your-service.onrender.com/api` |
| `VITE_POSTHOG_KEY` | No | PostHog analytics project key |
| `VITE_POSTHOG_HOST` | No | PostHog host. Default: `https://app.posthog.com` |

### Backend

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port. Default: `3001` (local), `10000` (Render) |
| `NODE_ENV` | No | `development` or `production` |
| `GCS_PROJECT_ID` | Yes | Google Cloud project ID |
| `GCS_BUCKET_NAME` | Yes | GCS bucket name for proof storage |
| `GCS_CREDENTIALS` | Yes* | Service account JSON string |
| `GCS_KEY_FILE` | Yes* | Path to service account JSON file |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins. Default: `http://localhost:5173,http://localhost:3000` |

*One of `GCS_CREDENTIALS` or `GCS_KEY_FILE` is required.

### Local `.env` setup

Create `server/.env`:

```bash
GCS_PROJECT_ID=your-project-id
GCS_BUCKET_NAME=your-bucket-name
GCS_KEY_FILE=./path-to-credentials.json
```

Create `.env` (or `.env.local`) in project root:

```bash
VITE_GCS_API_URL=http://localhost:3001/api
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Vite dev server with HMR (port 5173) |
| `yarn server` | Express backend only (port 3001) |
| `yarn dev:full` | Frontend + backend simultaneously |
| `yarn build` | TypeScript check + Vite production build |
| `yarn preview` | Serve production build locally |
| `yarn lint` | ESLint check |
| `yarn setup-cors` | Configure GCS bucket CORS rules |
| `yarn compile:circuits` | Recompile Noir circuits (see below) |

## Circuit Compilation

Pre-compiled circuits are checked into `src/circuit/target/`. You only need to recompile if you modify `src/circuit/src/main.nr` or change circuit parameters.

### Requirements

```bash
# Install Nargo (Noir compiler)
# See: https://noir-lang.org/docs/getting_started/installation
noirup --version 1.0.0-beta.5

# Install Barretenberg
# See: https://github.com/AztecProtocol/aztec-packages
bbup --version 0.84.0
```

### Compiling

```bash
yarn compile:circuits
```

This script (`scripts/compile-circuits.ts`):

1. Reads circuit variants from `src/circuit-configs.json`
2. For each variant:
   - Patches `main.nr` with the variant's `MAX_EMAIL_HEADER_LENGTH`, `MAX_EMAIL_BODY_LENGTH`, and `KEY_LIMBS`
   - Runs `nargo compile --force --silence-warnings`
   - Renames output to `email_mask_{variant}.json`
   - Restores original `main.nr`
3. All 4 compiled circuits land in `src/circuit/target/`

### Circuit configuration

`src/circuit-configs.json`:

```json
{
  "circuits": [
    { "name": "email_mask_1024_small", "maxHeaderLength": 2048, "maxBodyLength": 4096, "keyBits": 1024 },
    { "name": "email_mask_1024_mid",   "maxHeaderLength": 2048, "maxBodyLength": 8448, "keyBits": 1024 },
    { "name": "email_mask_2048_small", "maxHeaderLength": 2048, "maxBodyLength": 4096, "keyBits": 2048 },
    { "name": "email_mask_2048_mid",   "maxHeaderLength": 2048, "maxBodyLength": 8448, "keyBits": 2048 }
  ],
  "versions": {
    "nargo": "1.0.0-beta.5",
    "barretenberg": "0.84.0"
  }
}
```

To add a new variant (e.g., larger body support), add an entry here and run `yarn compile:circuits`.

## Build & Deployment

### Docker

```bash
docker build \
  --build-arg VITE_GCS_API_URL=https://your-service.onrender.com/api \
  --build-arg VITE_POSTHOG_KEY=your-key \
  -t redacted .

docker run -p 10000:10000 \
  -e GCS_PROJECT_ID=your-project \
  -e GCS_BUCKET_NAME=your-bucket \
  -e GCS_CREDENTIALS='{"type":"service_account",...}' \
  redacted
```

The Dockerfile uses a multi-stage build:
1. **Builder stage:** Installs all deps, creates `.env.production` from build args, runs `yarn build`
2. **Production stage:** Installs production deps only, copies `dist/`, `server/`, and `src/circuit/`, runs `node server/index.js`

### Render

Deployment is configured in `render.yaml`:

```yaml
services:
  - name: redacted-app
    type: web
    runtime: docker
    plan: starter
    envVars:
      NODE_ENV: production
      PORT: 10000
      # Set these in Render dashboard:
      # GCS_PROJECT_ID, GCS_BUCKET_NAME, GCS_CREDENTIALS
      # VITE_GCS_API_URL, VITE_POSTHOG_KEY, VITE_POSTHOG_HOST
```

`VITE_*` variables must be set as both environment variables AND Docker build args (Render handles this via `render.yaml`).

## Key Dependencies

| Package | Version | Role |
|---------|---------|------|
| `@noir-lang/noir_js` | 1.0.0-beta.5 | Noir circuit execution in browser |
| `@aztec/bb.js` | 0.84.0 | UltraHonk proving backend (WASM) |
| `@zk-email/zkemail-nr` | 1.3.2-alpha.0 | DKIM verification, input generation, masking |
| `postal-mime` | 2.6.0 | RFC 5322 email parsing |
| `@google-cloud/storage` | 7.7.0 | GCS SDK (backend) |
| `react` | 19.2.0 | UI framework |
| `vite` | 7.2.2 | Build tool + dev server |
| `vite-plugin-node-polyfills` | 0.17.0 | Node.js polyfills for browser (Buffer, etc.) |

## Troubleshooting

**Proof generation is slow (single-threaded):**
Check that COOP/COEP headers are set. Open browser console and check `self.crossOriginIsolated`. If `false`, the headers aren't reaching the page.

**"Unsupported DKIM key size" error:**
The email uses a key size other than 1024 or 2048 bits. This is rare but can happen with some enterprise mail servers.

**"Body too large" during upload:**
The email body exceeds ~8.4KB. Only the raw body content counts — MIME headers and boundaries are included in the byte count.

**GCS upload fails:**
Check that bucket CORS is configured (`yarn setup-cors`) and that the service account has `storage.objects.create` and `storage.objects.get` permissions.
