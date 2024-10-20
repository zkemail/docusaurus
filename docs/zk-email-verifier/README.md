# ZK-Email-Verifier

ZK Email is a library that allows for anonymous verification of email signatures while masking specific data. It enables verification of emails to/from specific domains or subsets of domains, as well as verification based on specific text in the email body. This technology can be used for web2 interoperability, decentralized anonymous KYC, or to create interesting on-chain anonymity sets.

You can use this set of SDKs to build new proof infrastructure from scratch. We recommend using the [ZK Email SDK](../zk-email-sdk/) for new users who just want to test new types of proofs easily, and users to switch to zk-email-verifier if/when they want more customizability.

## Sections

Our documentation for ZK-Email-Verifier is broken into three sections:

### [Installation](installation.md)

Get started with zkEmail, install our SDKs so that you can build your own application.

### [Package Overviews](packages)

Explore our npm sdk packages:

1. **zk-email/helpers**: Utility functions for generating proof inputs.
2. **zk-email/circuits**: Circuits for generating proofs and verifying DKIM signatures.
3. **zk-email/contracts**: Solidity contracts for email verification.

### [Usage Guide](usage-guide.md)

This section provides a comprehensive guide on how to use the zkEmail packages. It covers everything from generating proof inputs, creating circuits for proofs, to verifying DKIM signatures.

It is recommended to go through this guide to understand how to effectively use the packages for email verification.

## Terminology

* **DKIM**: DomainKeys Identified Mail. An email authentication method designed to detect email spoofing.
* **Zero-Knowledge Proofs**: A cryptographic method by which one party can prove to another that they know a value x, without conveying any information apart from the fact that they know the value x.
* **RSA**: Rivest–Shamir–Adleman. A public-key cryptosystem widely used for secure data transmission.
* **Circom**: A language for defining arithmetic circuits with a focus on zero-knowledge proofs.
* **SnarkJS**: A JavaScript library for zkSNARKs.
* **zkSNARKs**: Zero-Knowledge Succinct Non-Interactive Argument of Knowledge. A form of zero-knowledge proof that is particularly short and easy to verify.
* **Poseidon Hash**: A cryptographic hash function optimized for zk-SNARKs.
* **vkey**: A verification key used by the verifier to check the proof. Usually contained on the server side of an app.
* **zkey**: Proving key usually on the client side of an application.
* **witness**: In the context of zkSNARKs, a witness is the set of private inputs to the zkSNARK.
* **constraints**: Constraints are the conditions that the zkSNARK must satisfy. The proving time increases with additional constraints!
* **Regex**: Short for regular expression, this term represents sequence of characters that forms a search pattern, commonly used for string matching within text. In the context of zkEmail where it's used to parse email headers and extract relevant information.



## Additional Reading

Github Repo for double-blind: [https://github.com/doubleblind-xyz/double-blind](https://github.com/doubleblind-xyz/double-blind)

RSA: [https://en.wikipedia.org/wiki/RSA\_(cryptosystem)](https://en.wikipedia.org/wiki/RSA\_\(cryptosystem\))

Talk: [https://www.youtube.com/watch?v=sPCHiUT3TmA](https://www.youtube.com/watch?v=sPCHiUT3TmA)

Circom:[ https://github.com/iden3/circom](https://github.com/iden3/circom)

SnarkJS: [https://github.com/iden3/snarkjs](https://github.com/iden3/snarkjs)

JWT Circuit: [https://github.com/emmaguo13/zk-blind/blob/master/circuits/jwt.circom](https://github.com/emmaguo13/zk-blind/blob/master/circuits/jwt.circom)

## Tutorials

Circom Workshop 1: [https://learn.0xparc.org/materials/circom/learning-group-1/circom-1](https://learn.0xparc.org/materials/circom/learning-group-1/circom-1)

Circom Workshop 2: [https://learn.0xparc.org/materials/circom/learning-group-1/circom-2](https://learn.0xparc.org/materials/circom/learning-group-1/circom-2)

## Related Work

[https://semaphore.appliedzkp.org/](https://semaphore.appliedzkp.org/)

[https://stealthdrop.xyz/](https://stealthdrop.xyz/) + [https://github.com/stealthdrop/stealthdrop](https://github.com/stealthdrop/stealthdrop)

Everything we write is MIT licensed. Note that circom and circomlib is GPL. Broadly we are pro permissive open source usage with attribution! We hope that those who derive profit from this, contribute that money altruistically back to this technology and open source public good.
