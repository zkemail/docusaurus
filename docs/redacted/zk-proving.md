---
title: ZK Proving System | Redacted
sidebar_label: ZK Proving System
description: Technical details of the Noir-based ZK proving system in Redacted — circuit design, proof generation, verification, and circuit variants.
keywords: [Noir circuits, UltraHonk, Barretenberg, ZK proofs, DKIM verification, email masking circuit, WASM proving]
---

# ZK Proving System

## Overview

Redacted uses Noir circuits compiled to UltraHonk proofs via the Barretenberg backend. All proving happens client-side in the browser using WASM.

For background on how zero-knowledge proofs work in the ZK Email ecosystem, see [ZK Proofs Architecture](/architecture/zk-proofs). Redacted's approach differs from the [Circom-based EmailVerifier](/zk-email-verifier/packages/zk-email-circuits) used by the Blueprint SDK — it uses Noir circuits with the UltraHonk proving system, which enables fully client-side proving in the browser.

**Stack:**
- **Circuit language:** [Noir](https://noir-lang.org/) v1.0.0-beta.5
- **Proving backend:** [Barretenberg](https://github.com/AztecProtocol/barretenberg) v0.84.0 (UltraHonk)
- **WASM execution:** `@noir-lang/noir_js` + `@noir-lang/acvm_js`
- **Email crypto:** `@zk-email/zkemail-nr` v1.3.2-alpha.0

## The Circuit

**Source:** `src/circuit/src/main.nr`

```noir
fn main(
    header: BoundedVec<u8, MAX_EMAIL_HEADER_LENGTH>,
    body: BoundedVec<u8, MAX_EMAIL_BODY_LENGTH>,
    pubkey: RSAPubkey<KEY_LIMBS>,
    signature: [Field; KEY_LIMBS],
    body_hash_index: u32,
    dkim_header_sequence: Sequence,
    header_mask: [bool; MAX_EMAIL_HEADER_LENGTH],
    body_mask: [bool; MAX_EMAIL_BODY_LENGTH],
) -> pub ([Field; 2], [u8; MAX_EMAIL_HEADER_LENGTH], [u8; MAX_EMAIL_BODY_LENGTH])
```

### What the circuit proves

1. **DKIM signature is valid** — `pubkey.verify_dkim_signature(header, signature)` verifies the RSA signature over the canonicalized email header. This is the same [DKIM verification](/architecture/dkim-verification) that email servers perform, but executed inside a ZK circuit.

2. **Body matches the signed hash** — Extracts the body hash from the DKIM-Signature header field, computes SHA-256 over the provided body, and asserts they match.

3. **Masking is applied correctly** — `mask_text(header, header_mask)` and `mask_text(body, body_mask)` replace bytes where `mask[i] = false` with null bytes (`0x00`). This is conceptually similar to the [masking support in the Circom EmailVerifier](/zk-email-verifier/packages/zk-email-circuits#optional-inputs), but implemented natively in Noir using the `zkemail.nr` library.

### Public outputs

| Index | Value | Purpose |
|-------|-------|---------|
| `[0]` | `pubkey.hash()` | Pedersen hash of the DKIM public key — ties proof to a specific domain |
| `[1]` | `pedersen_hash(signature)` | Email nullifier — prevents proving the same email twice |
| `[2..2+H]` | `masked_header` | Header bytes with masked positions zeroed out |
| `[2+H..end]` | `masked_body` | Body bytes with masked positions zeroed out |

Where `H = MAX_EMAIL_HEADER_LENGTH` for the selected circuit variant.

### Circuit dependencies

From `src/circuit/Nargo.toml`:

| Dependency | Source | Purpose |
|------------|--------|---------|
| `zkemail` | `@zk-email/zkemail-nr` | RSA/DKIM verification, body hash extraction, masking |
| `sha256` | `aztec-packages` | SHA-256 variable-length hashing |

## Circuit Variants

Four pre-compiled circuits cover different email sizes. Defined in `src/circuit-configs.json`:

| Name | RSA Key | Max Header | Max Body | Use Case |
|------|---------|------------|----------|----------|
| `email_mask_1024_small` | 1024-bit | 2048 bytes | 4096 bytes (~4KB) | Short emails, older domains |
| `email_mask_1024_mid` | 1024-bit | 2048 bytes | 8448 bytes (~8.4KB) | Longer emails, older domains |
| `email_mask_2048_small` | 2048-bit | 2048 bytes | 4096 bytes (~4KB) | Short emails, modern domains |
| `email_mask_2048_mid` | 2048-bit | 2048 bytes | 8448 bytes (~8.4KB) | Longer emails, modern domains |

### Selection logic

```text
1. Detect RSA key size from DKIM result (1024 or 2048 bits)
2. Filter circuits matching that key size
3. Pick the smallest circuit where maxBodyLength >= actual body length
4. If body exceeds all circuits, use the largest one (with warning)
```

Circuits are lazy-loaded and cached in a `Map<string, CompiledCircuit>`. Call `clearCircuitCache()` to free memory.

## Proof Generation Pipeline

```typescript
// src/lib.ts — handleGenerateProof()

// 1. DKIM verification (or reuse cached result)
const dkimResult = existingDkimResult || await verifyDKIMSignature(email);

// 2. Select circuit
const circuitConfig = await selectCircuit(keyBits, headerMask.length, bodyMask.length);

// 3. Pad masks to circuit dimensions (pad with 1 = reveal)
const paddedHeaderMask = pad(headerMask, circuitConfig.maxHeaderLength, 1);
const paddedBodyMask = pad(bodyMask, circuitConfig.maxBodyLength, 1);

// 4. Generate circuit inputs from DKIM result
// See @zk-email/helpers docs: /zk-email-verifier/packages/zk-email-helpers
const inputs = await generateEmailVerifierInputsFromDKIMResult(dkimResult, {
  headerMask: paddedHeaderMask,
  bodyMask: paddedBodyMask,
  maxHeadersLength: circuitConfig.maxHeaderLength,
  maxBodyLength: circuitConfig.maxBodyLength,
});

// 5. Execute circuit → witness
const noir = new Noir(selectedCircuit);
const { witness } = await noir.execute(inputs);

// 6. Generate proof (multi-threaded if SharedArrayBuffer available)
const threads = self.crossOriginIsolated ? navigator.hardwareConcurrency : 1;
const backend = new UltraHonkBackend(selectedCircuit.bytecode, { threads });
const proof = await backend.generateProof(witness);
```

## Proof Verification

```typescript
// src/lib.ts — handleVerifyProof()

// 1. Detect circuit from metadata or publicInputs length
// 2. Load the matching circuit
// 3. Create backend and verify
const backend = new UltraHonkBackend(circuit.bytecode);
const isValid = await backend.verifyProof(proof);
```

**Circuit detection fallback:** If circuit metadata isn't embedded in the proof, the verifier infers the circuit from `publicInputs.length`:

```text
publicInputs.length = 2 + maxHeaderLength + maxBodyLength

e.g., 6146 = 2 + 2048 + 4096  →  email_mask_*_small
     10498 = 2 + 2048 + 8448  →  email_mask_*_mid
```

If the exact circuit can't be determined (same dimensions for 1024 vs 2048), both are tried sequentially.

## Proof Data Structure

```typescript
interface ProofData {
  publicInputs: string[];    // Hex strings, one per public output field
  proof: Uint8Array;         // Compressed proof bytes
}

// Extended with metadata (attached by frontend, stripped before upload)
interface ProofDataWithMetadata extends ProofData {
  __circuitName?: string;
  __maxHeaderLength?: number;
  __maxBodyLength?: number;
}
```

### Extracting masked content from publicInputs

```text
publicInputs[0]     → pubkey hash (Field, hex string)
publicInputs[1]     → email nullifier (Field, hex string)
publicInputs[2]     → masked_header[0] (u8 as hex, e.g., "0x46" = 'F')
publicInputs[3]     → masked_header[1]
...
publicInputs[2+H-1] → masked_header[H-1]
publicInputs[2+H]   → masked_body[0]
...
publicInputs[2+H+B-1] → masked_body[B-1]
```

Null bytes (`0x00`) indicate masked positions. The UI renders these as solid black blocks (`U+2588`).

## WASM Initialization

Two WASM modules must be initialized before any circuit operations:

```typescript
import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";

await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);
```

This runs as a top-level `await` in `lib.ts` — the module blocks until both WASMs are loaded.

## Performance

- **Multi-threading:** Enabled when `self.crossOriginIsolated === true` (requires COOP/COEP headers). Uses `navigator.hardwareConcurrency` threads.
- **Circuit caching:** Compiled circuits are cached in memory after first load. Circuit JSON files are ~1-5MB each.
- **DKIM caching:** The `existingDkimResult` parameter avoids redundant DKIM verification when the result is already available from email parsing.
