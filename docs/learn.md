# Overview

ZK Email enables trustless verification of email contents on-chain using zero-knowledge proofs. It allows proving properties of emails without revealing the full contents, providing programmable provenance for web2 data in web3 applications.

[Image: Diagram showing the flow of data from an email to a blockchain, with a ZK proof in between]

## Key Concepts

- Uses DKIM signatures already present in most emails to verify authenticity
- Generates zero-knowledge proofs to selectively reveal email contents
- Allows verifying email properties on-chain without trusted oracles

<details>
<summary>Context</summary>

DKIM (DomainKeys Identified Mail) is a standard email authentication method. Most email providers already use DKIM to sign outgoing emails, which allows recipients to verify that an email actually came from the claimed sender and wasn't altered in transit. ZK Email leverages this existing infrastructure to provide a foundation for its proofs.

Zero-knowledge proofs allow one party (the prover) to prove to another party (the verifier) that a statement is true, without revealing any information beyond the validity of the statement itself. In the context of ZK Email, this means proving certain properties of an email without exposing its entire contents.

By eliminating the need for trusted oracles, ZK Email reduces centralization risks and aligns more closely with web3 principles of trustlessness and decentralization.

</details>

## How It Works

ZK Email enables trustless verification of email contents on-chain using a multi-step process. This process leverages existing email infrastructure and zero-knowledge proofs to bring verified email data on-chain securely and privately.

[Image: Flowchart of the ZK Email process, from receiving an email to on-chain verification]

### ZK Email Process

Each email verification goes through a flow that can be separated into four main phases:

1. Email Reception and Parsing
2. ZK Proof Generation
3. On-chain Submission
4. On-chain Verification and Execution

#### 1. Email Reception and Parsing

- User receives a signed email containing information they want to prove on-chain
- The email client parses the email structure, extracting key components:
  - DKIM signature
  - Headers
  - Relevant content

#### 2. ZK Proof Generation

A zero-knowledge proof is generated off-chain (typically in the user's browser or a dedicated prover service) that:
- Verifies the validity of the DKIM signature
- Checks that the email structure matches the expected format
- Extracts and reveals only the desired information

#### 3. On-chain Submission

- The generated ZK proof is submitted to the blockchain
- This is done by calling the appropriate function on the ZK Email smart contract
- The transaction includes the proof and any public inputs required for verification

Example transaction (hypothetical): `0x123...abc`

#### 4. On-chain Verification and Execution

- The ZK Email smart contract verifies the submitted proof
- If valid, it executes any associated logic based on the proven email properties
- This could involve:
  - Updating on-chain state
  - Triggering other smart contract functions
  - Emitting events

Example transaction (hypothetical): `0x456...def`

This process enables trustless verification of email contents on-chain while preserving privacy and minimizing data storage requirements.

<details>
<summary>Context</summary>

The ZK Email process combines elements from traditional email systems with blockchain technology and zero-knowledge cryptography. Here's some additional context for each step:

1. Email Reception and Parsing: This step relies on standard email protocols and DKIM (DomainKeys Identified Mail) signatures, which are already widely used for email authentication.

2. ZK Proof Generation: This is the core innovation of ZK Email. It uses specialized ZK circuits to perform complex cryptographic operations that can verify email properties without revealing the full content.

3. On-chain Submission: This step bridges the gap between the off-chain email world and the on-chain blockchain environment. The proof submission is a standard blockchain transaction.

4. On-chain Verification and Execution: This final step leverages smart contract capabilities to verify the ZK proof and take action based on the verified email properties. This is what enables new web3 use cases based on email data.

</details>

## Key Components

- ZK circuits for DKIM signature verification
- Regex matching in ZK to parse email structure
- Smart contracts to verify proofs and manage DKIM public keys

[Image: Component diagram showing how ZK circuits, regex matching, and smart contracts interact]

<details>
<summary>Context</summary>

ZK circuits are specialized programs designed to be executed within a zero-knowledge proof system. In ZK Email, these circuits handle the complex cryptographic operations needed to verify DKIM signatures without revealing the signature itself.

Regex (Regular Expression) matching is a technique used for pattern matching in strings. Implementing regex in ZK allows the system to efficiently parse and extract relevant information from the email structure, all while maintaining privacy.

Smart contracts play a crucial role in the on-chain part of the system. They verify the ZK proofs submitted to the blockchain and manage a registry of DKIM public keys. This registry is essential for handling key rotations and ensuring the system remains secure over time.

</details>

## Trust Assumptions

- Sending mail server (holds DKIM private key)
- DNS for DKIM public keys (mitigated by on-chain key registry)
- Receiving mail server can see email contents

[Image: Trust model diagram showing the relationships between mail servers, DNS, and the blockchain]

<details>
<summary>Context</summary>

The sending mail server is trusted because it holds the DKIM private key used to sign emails. This is an inherent trust assumption in the email system itself, not specific to ZK Email.

DNS (Domain Name System) is typically used to publish DKIM public keys. However, relying solely on DNS introduces potential vulnerabilities. ZK Email mitigates this by implementing an on-chain key registry, which allows for more secure and verifiable key management.

The receiving mail server can see the full contents of incoming emails. While this doesn't affect the security of ZK Email proofs, it's important to consider for applications where the email content itself needs to remain private from the mail server.

</details>

## Benefits

- Trustless web2-web3 integration
- Selective disclosure of email contents
- Enables new on-chain use cases like identity, KYC, price oracles

<details>
<summary>Context</summary>

Trustless web2-web3 integration means that data from traditional internet services (web2) can be verified and used in blockchain applications (web3) without relying on centralized intermediaries. This opens up a wide range of possibilities for bringing real-world data and identities on-chain.

Selective disclosure allows users to prove specific facts from their emails without revealing the entire content. For example, a user could prove they received an email from a specific domain, or that an email contained a specific piece of information, without exposing any other details.

The ability to trustlessly verify email contents on-chain enables numerous new use cases. For identity verification, users could prove ownership of an email address without revealing the address itself. For KYC (Know Your Customer) processes, users could prove they passed checks without sharing personal data. Price oracles could be created based on official emails from trusted sources, providing reliable data for DeFi applications.

</details>

## Challenges

- Handling DKIM key rotations securely
- Optimizing proof generation for client-side use
- Standardizing email parsing across providers

[Image: Infographic showing the main challenges and potential solutions]

<details>
<summary>Context</summary>

DKIM keys are periodically rotated (changed) for security reasons. ZK Email needs to handle these rotations to ensure continued functionality. This involves updating the on-chain key registry in a secure and timely manner.

Generating zero-knowledge proofs can be computationally intensive. For the best user experience, proofs should be generated quickly on the client side (in the user's browser). Optimizing the proof generation process for efficiency and browser compatibility is an ongoing challenge.

Different email providers may structure their emails slightly differently. Standardizing the parsing process across these variations ensures that ZK Email works consistently regardless of the email provider used. This involves creating robust parsing algorithms that can handle a wide range of email formats.

</details>

## Applications

- Anonymous identity verification
- Decentralized KYC
- Price oracles from official sources
- Whistleblowing
- On-chain legal document verification

[Image: Mind map of potential ZK Email applications]

<details>
<summary>Context</summary>

Anonymous identity verification allows users to prove they own an email address from a specific domain (like a university or company) without revealing the actual email address. This can be used for creating verified, pseudonymous identities on-chain.

Decentralized KYC leverages ZK Email to allow users to prove they've passed KYC checks without storing personal data on-chain. This could significantly reduce data breach risks in DeFi and other blockchain applications requiring KYC.

Price oracles based on ZK Email could provide verifiable, tamper-proof price data from official sources like stock exchanges or commodity markets, improving the reliability of on-chain financial applications.

For whistleblowing, ZK Email could allow individuals to prove they have insider knowledge (by verifying their organizational email) without revealing their identity, providing a layer of protection for whistleblowers.

Legal document verification could involve proving the contents or existence of legal emails or attachments on-chain, potentially streamlining processes in decentralized legal or governance systems.

</details>

ZK Email provides a powerful primitive for bringing web2 data on-chain in a trustless and privacy-preserving way, enabling many new web3 use cases.
