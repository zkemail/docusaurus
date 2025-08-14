---
title: Choose Your Path to Email-Based Verification
sidebar_label: Getting Started
description: Role-based entry points for business leaders, developers, and researchers. Start building with ZK Email in minutes with clear paths for every audience.
keywords: [ZK Email getting started, developer quickstart, zero-knowledge proofs, email verification, blockchain integration, privacy-preserving authentication, role-based onboarding]
---

import DocCardList from '@theme/DocCardList';

# Choose Your Path to Email-Based Verification

<div style={{fontSize: '1.2em', marginBottom: '2em'}}>
Whether you're integrating ZK Email into applications, researching the cryptographic foundations, or exploring implementation options—we have the right starting point for you.
</div>

## For Builders
**Build with ZK Email in your applications**

<div className="row" style={{marginBottom: '2em'}}>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">🎯 Live Demo</h3>
      </div>
      <div className="zk-card__body">
        <p>Experience ZK Email proofs instantly</p>
        <div className="zk-card__link-wrapper">
          <a href="https://prove.email" className="zk-card__main-link">Try Now →</a>
        </div>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">📖 Use Cases</h3>
      </div>
      <div className="zk-card__body">
        <p>See technical implementation examples</p>
        <div className="zk-card__link-wrapper">
          <a href="https://github.com/zkemail" className="zk-card__main-link">Example Apps →</a>
        </div>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">📋 Architecture</h3>
      </div>
      <div className="zk-card__body">
        <p>System design and components</p>
        <div className="zk-card__link-wrapper">
          <a href="architecture/" className="zk-card__main-link">Learn More →</a>
        </div>
      </div>
    </div>
  </div>
</div>

**Key Technical Benefits:**
- **Privacy-preserving authentication** - Cryptographic proofs without revealing email contents
- **Decentralized verification** - No trusted third parties required for email validation  
- **Composable system** - Integrate with existing authentication and identity infrastructure

## For Developers & Technical Teams  
**Start building in 15 minutes**

<div className="row" style={{marginBottom: '2em'}}>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">⚡ Quick Start</h3>
      </div>
      <div className="zk-card__body">
        <p>Working proof in your browser</p>
        <div className="zk-card__link-wrapper">
          <a href="zk-email-sdk/create-blueprint" className="zk-card__main-link">5-Min Tutorial →</a>
        </div>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">🛠️ SDK Setup</h3>
      </div>
      <div className="zk-card__body">
        <p>Install and integrate SDKs</p>
        <div className="zk-card__link-wrapper">
          <a href="zk-email-sdk/setup" className="zk-card__main-link">Install Guide →</a>
        </div>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">📚 Examples</h3>
      </div>
      <div className="zk-card__body">
        <p>Copy-paste implementations</p>
        <div className="zk-card__link-wrapper">
          <a href="https://github.com/zkemail" className="zk-card__main-link">Browse Code →</a>
        </div>
      </div>
    </div>
  </div>
</div>

**Developer Resources:**
- **TypeScript/JavaScript SDK** with full type safety
- **Pre-built templates** for common email patterns  
- **Auto-deployed infrastructure** (no server management)

## For Researchers & Cryptographers
**Explore the cryptographic foundations**

<div className="row" style={{marginBottom: '2em'}}>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">📄 Papers</h3>
      </div>
      <div className="zk-card__body">
        <p>Peer-reviewed research</p>
        <div className="zk-card__link-wrapper">
          <a href="https://zk.email/papers" className="zk-card__main-link">Read Research →</a>
        </div>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">🔐 Audits</h3>
      </div>
      <div className="zk-card__body">
        <p>Third-party security reviews</p>
        <div className="zk-card__link-wrapper">
          <a href="audits" className="zk-card__main-link">Security Reports →</a>
        </div>
      </div>
    </div>
  </div>
  <div className="col col--4">
    <div className="zk-card">
      <div className="zk-card__header">
        <h3 className="zk-card__title">🌐 Open Source</h3>
      </div>
      <div className="zk-card__body">
        <p>Contribute to the protocol</p>
        <div className="zk-card__link-wrapper">
          <a href="contributing" className="zk-card__main-link">Contribute →</a>
        </div>
      </div>
    </div>
  </div>
</div>

**Research Highlights:**
- **DKIM-based ZK proofs** leveraging RSA signature verification in zero-knowledge circuits
- **Selective disclosure protocols** using regex-based pattern matching with information-theoretic privacy
- **Multi-framework compatibility**: Circom SNARKs, Noir, SP1/RISC0 zkVMs for diverse deployment scenarios

## Understanding ZK Email

ZK Email transforms emails into cryptographic proofs using a simple but powerful principle:

**The Analogy**: Traditional identity verification reveals excessive information—showing ID at a bar exposes your address, full name, and ID number just to prove you're over 21. ZK Email enables selective disclosure—proving "Yes, over 21" without revealing anything else, backed by cryptographic guarantees.

**Technical Process**:
1. **DKIM Signature Verification**: Every email contains an RSA signature that cryptographically proves sender authenticity
2. **Zero-Knowledge Proof Generation**: Prove DKIM signature validity without revealing email contents through circuit-based verification  
3. **Selective Disclosure**: Extract specific data fields using regex patterns while keeping all other content private
4. **Universal Verification**: Anyone can verify proofs using publicly available DKIM keys without accessing private information

*Security Note: Privacy guarantees assume proper DKIM implementation by email providers and computational security of the underlying zero-knowledge proof system.*

:::info Learn More
For technical details, see our [Architecture](architecture) section. For hands-on learning, try the [5-minute tutorial](zk-email-sdk/create-blueprint).
:::

## Real-World Applications

Transform how users interact with your application:

**Anonymous Whistleblowing**: Healthcare workers report violations while proving their credentials—without revealing their identity.

**Fraud-Proof KYC**: Financial services verify user attributes (age, residency) without storing personal data—eliminating data breach risks.

**Seamless Web3 Onboarding**: E-commerce users control crypto payments through email—no wallet apps or seed phrases required.

**Private Social Verification**: Dating apps verify university attendance or employer without exposing personal details.

## Next Steps by Role

### Application Developers
1. **[Quick Tutorial](zk-email-sdk/create-blueprint)** - Create your first proof in 5 minutes
2. **[SDK Installation](zk-email-sdk/setup)** - Integrate into your project
3. **[Example Implementations](https://github.com/zkemail)** - Study full applications

### Protocol Developers
1. **[Architecture Deep Dive](architecture/)** - System design and components
2. **[Circuit Implementation](zk-email-verifier/)** - Low-level ZK circuit development
3. **[Contribute](contributing)** - Extend the protocol

### Security Researchers  
1. **[Security Model](architecture/security-considerations)** - Threat analysis and assumptions
2. **[Audit Reports](audits)** - Third-party security reviews
3. **[Research Papers](https://zk.email/papers)** - Academic foundations

## Community & Support

**Get Help:**
- 💬 [Telegram Community](https://t.me/zkemail) - Real-time support
- 📖 [Documentation](/) - Comprehensive guides
- 🐛 [GitHub Issues](https://github.com/zkemail) - Bug reports & features

**Stay Updated:**
- 📝 [Blog](https://zk.email/blog) - Latest developments
- 🐦 [Twitter](https://twitter.com/zkemail) - Announcements
- 📺 [YouTube](https://youtube.com/@zkemail) - Technical talks

:::tip Ready to Start?
**Quick wins**: [Try the demo](https://prove.email) → [Follow tutorial](zk-email-sdk/create-blueprint) → [Join Telegram](https://t.me/zkemail)
:::
