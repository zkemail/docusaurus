---
title: Email Parsing & DKIM | Redacted
sidebar_label: Email Parsing & DKIM
description: How Redacted parses raw email files, verifies DKIM signatures, and aligns UI masking with canonicalized email content for ZK proof generation.
keywords: [email parsing, DKIM verification, canonicalization, RFC 6376, email masking, postal-mime, field range extraction]
---

# Email Parsing & DKIM Verification

## Overview

Email parsing converts a raw `.eml` file into structured fields (From, To, Subject, Date, Body) and produces a `DKIMResult` used for ZK proof generation. The key challenge is ensuring the UI masking aligns with the **canonicalized** email representation that the circuit verifies.

**Source:** `src/utils/emlParser.ts`

## Parsing Pipeline

```text
Raw .eml file (RFC 5322)
    │
    ▼
PostalMime parser
    ├── from, to, subject, date (structured)
    ├── text body, html body
    └── raw headers string
    │
    ▼
DKIM Verification (@zk-email/helpers)
    ├── Canonicalized headers (per DKIM spec, RFC 6376)
    ├── Canonicalized body
    ├── RSA public key + modulus length (1024 or 2048)
    ├── RSA signature
    └── DKIMResult object
    │
    ▼
Field Range Extraction
    ├── Maps each field to byte positions in raw EML
    ├── Stores displayOffset + displayLength
    └── Enables character-level masking in the UI
    │
    ▼
ParsedEmail object → UI + proof generation
```

## ParsedEmail Interface

```typescript
interface ParsedEmail {
  from: string;
  to: string;
  subject: string;
  time: string;
  body: string;                        // Plain text body
  bodyText: string;                    // Fallback text extraction
  bodyHtml?: string;                   // HTML body (if present)
  raw: string;                         // Original .eml content
  ranges: {
    from?: EmailFieldRange;
    to?: EmailFieldRange;
    subject?: EmailFieldRange;
    body: EmailFieldRange;
  };
  dkimCanonicalizedHeaders?: string;   // Headers as DKIM sees them
  dkimCanonicalizedBody?: string;      // Body as DKIM sees them
  dkimResult?: DKIMResult;             // Full DKIM output for proof gen
}

interface EmailFieldRange {
  displayOffset: number;               // Start byte in raw EML
  displayLength: number;               // Length in bytes
}
```

## DKIM Verification

DKIM (DomainKeys Identified Mail) is the cryptographic anchor that makes Redacted work. Every email from a major provider (Gmail, Outlook, etc.) is signed with the sender's domain RSA key.

For a detailed explanation of how DKIM works — including the signing process, signature structure, and verification flow — see the [DKIM Verification](/architecture/dkim-verification) architecture docs.

Redacted uses [`verifyDKIMSignature`](/zk-email-verifier/packages/zk-email-helpers#dkim-verification) from `@zk-email/helpers` to parse the DKIM signature and extract the data needed for proof generation:

```text
verifyDKIMSignature(rawEmail) returns:
    {
      modulusLength: 2048,             // RSA key size
      publicKey: BigInt,               // RSA public key modulus
      signature: BigInt,               // RSA signature value
      headers: Uint8Array,             // Canonicalized headers
      body: Uint8Array,                // Canonicalized body
      bodyHash: string,                // Base64 body hash from signature
      ...
    }
```

### Canonicalization and masking

DKIM uses "relaxed" canonicalization (RFC 6376 Section 3.4), which normalizes whitespace, lowercases header names, and adjusts line endings. This means the bytes the circuit verifies may differ from what the raw `.eml` file contains.

**This is critical for Redacted** — the UI must display the canonicalized versions so that masking positions align with what the circuit actually proves. A mask applied to the raw email would produce incorrect proofs.

## Masking Alignment

The mask arrays (`headerMask[]`, `bodyMask[]`) are indexed by byte position in the canonicalized content, not the raw email. Each element is:

- `1` = reveal (include in proof output)
- `0` = mask (replaced with `0x00` null byte in proof output)

### UI to Circuit alignment

```text
User selects text "John" in the From field
    │
    ▼
UI maps selection to byte positions in canonicalized header
    e.g., bytes [12, 13, 14, 15]
    │
    ▼
headerMask[12] = 0, headerMask[13] = 0, headerMask[14] = 0, headerMask[15] = 0
    │
    ▼
Mask padded to MAX_EMAIL_HEADER_LENGTH (extra positions = 1/reveal)
    │
    ▼
Circuit applies mask → output header has 0x00 at positions 12-15
```

## Supported Email Formats

**RSA key sizes:**
- 1024-bit (older domains, some enterprise mail)
- 2048-bit (Gmail, Outlook, most modern providers)
- Other key sizes result in an error with a descriptive message

**Body size limits:**
- Small circuit: up to ~4KB body
- Mid circuit: up to ~8.4KB body
- Emails exceeding 8.4KB body are validated during upload and rejected with an error

**MIME types:**
- `text/plain` — directly used
- `text/html` — extracted as-is (the circuit operates on raw body bytes, including HTML tags)
- Multipart — all MIME boundaries and parts included in body bytes

## Error Handling

| Error | Cause | User message |
|-------|-------|-------------|
| Unsupported key size | RSA key other than 1024 or 2048-bit | "This application only supports 1024 and 2048-bit RSA keys" |
| Body too large | Email body exceeds ~8.4KB | Validation error during upload |
| DKIM verification failure | Corrupted email, modified after sending, or missing signature | Upload rejected |
| No DKIM signature | Email has no DKIM-Signature header | Upload rejected |
