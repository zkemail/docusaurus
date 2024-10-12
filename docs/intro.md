# Introduction

Welcome to the ZK Email Documentation Hub, the central repository for comprehensive documentation on the ZK Email project suite. This hub serves as your one-stop guide to understanding and implementing our email verification solutions powered by zero-knowledge proof technology.

## Getting Started

To start building with ZK Email, check out our [Quickstart Guide](./quickstart.md) for step-by-step instructions on setting up your development environment and creating your first ZK Email project.


<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--6" style={{ marginBottom: '1rem' }}>
    <a href="quickstart" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>Quickstart Guide</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Get started with ZK Email by following our step-by-step quickstart guide.</p>
        </div>
      </div>
    </a>
  </div>
  <div className="col col--6" style={{ marginBottom: '1rem' }}>
    <a href="https://t.me/zkemail" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>Join Our Community</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Connect with other developers and get support in our Telegram group.</p>
        </div>
      </div>
    </a>
  </div>
</div>

## Learn More

ZK Email allows users to prove the contents of their emails on a blockchain by verifying DKIM signatures using zero-knowledge proofs. This enables trustless integration between web2 and web3 by allowing verification of email contents on-chain without revealing the full email, thus preserving privacy.

When we say "trustless", we mean reducing reliance on centralized attesters for off-chain facts. However, some trust assumptions remain, such as in DNS and email providers. We continually work to minimize these and empower users with greater control over their data verification.

Some key features and benefits of ZK Email:

- Verify email contents on-chain without revealing private data
- Prove ownership of email accounts and domains
- Enable web2 identity and data verification for web3 applications
- No need to trust centralized oracles or attestation services
- Fully open source and audited implementation

ZK Email opens up a wide range of use cases bridging web2 and web3, from account recovery to KYC to anonymous credentials.

## License

This documentation is licensed under the [MIT License](https://github.com/zkemail/prove-email-docs/blob/docs/LICENSE.md).

## Support and Contact

If you need help or have questions, please join our community chat on [Telegram](https://t.me/zkemail).
