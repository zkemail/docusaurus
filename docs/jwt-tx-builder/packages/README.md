# Packages

The jwt-tx-builder repository consists of three core packages: **Circuits**, **Contracts**, and **Helpers**.

## Circuits

Generates zero-knowledge proofs for JWT verification using circom, designed for 2048-bit RSA keys.

The system consists of two core circuits. The **[JWTVerifier](https://github.com/zkemail/jwt-tx-builder/blob/main/packages/circuits/jwt-verifier-template.circom)** circuit handles JWT verification, RSA signature validation, claim extraction, and selective disclosure through command masking. The **[JWTVerifierWithAnonymousDomain](https://github.com/zkemail/jwt-tx-builder/blob/main/packages/circuits/jwt-verifier-with-anon-domain-template.circom)** circuit extends the base verifier by adding Merkle tree verification to enable anonymous domain-based access control.

Both circuits are provided as templates that can be imported and customized with different parameters for message lengths, key sizes, and other verification requirements. The JWTVerifier serves as the foundation, while JWTVerifierWithAnonymousDomain adds domain verification capabilities for more complex authentication scenarios.


## Contracts

Manages on-chain verification of JWT proofs through smart contracts.

The contract system centers around three core contracts. The **[JwtRegistry](https://github.com/zkemail/jwt-tx-builder/blob/main/packages/contracts/src/utils/JwtRegistry.sol)** contract maintains valid JWT issuers and their public keys. The **[JwtVerifier](https://github.com/zkemail/jwt-tx-builder/blob/main/packages/contracts/src/utils/JwtVerifier.sol)** contract handles on-chain validation of zk-proofs, while the **[JwtGroth16Verifier](https://github.com/zkemail/jwt-tx-builder/blob/main/packages/contracts/src/utils/JwtGroth16Verifier.sol)** contract provides specialized proof verification capabilities.

Essential components include the **JWTRegistry** for managing JWT statuses and DKIM public key hashes, the **JWTVerifier** for on-chain proof verification using Groth16, and a **Proxy Pattern** implementation supporting future contract upgrades.

## Helpers

Provides utilities for circuit inputs, JWT handling, and crypto operations.

Core utilities encompass **JWT Handling** for parsing and validation, **RSA Utilities** for key and signature management, and **Merkle Operations** for proof generation and verification.

The helper components consist of **Input Generators** for JWT to circuit format conversion, **Crypto Utils** for JWT parsing and RSA operations, and a **Testing Framework** for circuit constraint validation.