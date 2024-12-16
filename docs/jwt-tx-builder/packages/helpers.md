---
title: "@zk-jwt/helpers | JWT Transaction Builder"
sidebar_label: "@zk-jwt/helpers"
description: Developer utilities for JWT verification and cryptographic operations, including RSA signature handling, input generation for JWTVerifier circuit, and anonymous domain management
keywords: [JWT helpers, cryptographic utilities, RSA signatures, input generation, anonymous domains, JWT verification, ZK circuit inputs, TypeScript interfaces, blockchain authentication]
---

# @zk-jwt/helpers

The @zk-jwt/helpers package provides utility functions for JWT verification and cryptographic operations. It includes functions for handling RSA signatures, public keys, JWT messages, and hashes.

## Installation

```bash
yarn add @zk-jwt/helpers
```

### input-generators.ts

The [input-generators.ts](https://github.com/zkemail/jwt-tx-builder/blob/main/packages/helpers/src/input-generators.ts) file provides functions for generating inputs to the JWTVerifier circuit. It includes utilities for JWT verification, input generation, and handling anonymous domains.

#### Key Interfaces:

```typescript
export interface RSAPublicKey {
    n: string;    // Base64-encoded modulus
    e: number;    // Public exponent
}

export interface JWTInputGenerationArgs {
    maxMessageLength?: number;
    verifyAnonymousDomains?: boolean;
    anonymousDomainsTreeHeight?: number;
    anonymousDomainsTreeRoot?: bigint;
    emailDomainPath?: bigint[];
    emailDomainPathHelper?: number[];
}
```

#### Main Function:

```typescript
async function generateJWTVerifierInputs(
    rawJWT: string,
    publicKey: RSAPublicKey,
    accountCode: bigint,
    params: JWTInputGenerationArgs = {}
)
```

## Testing

To test the input generator, you can run the following command:

```bash
yarn test
```