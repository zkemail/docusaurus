import DocCardList from '@theme/DocCardList';

# Architecture

<div style={{fontSize: '1.2em'}}>
Learn how we combine email verification with zero-knowledge proofs to enable trustless, privacy-preserving validation of email contents on blockchains, leveraging existing email infrastructure.
</div>

ZK Email is built on top of the DKIM signature algorithm, which is a widely used email authentication method.

It uses zero-knowledge proofs to verify the authenticity of DKIM signatures and the properties of the email content, without revealing the full email.

## Learn more

Find out more information about the individual of ZK Email:

<DocCardList 
  items={[
    {
      type: 'link',
      href: '/architecture/dkim-verification',
      label: 'DKIM Verification',
      description: 'Learn about the DKIM verification process used in ZK Email.',
    },
    {
      type: 'link',
      href: '/architecture/zk-proofs',
      label: 'Zero-Knowledge Proofs',
      description: 'Explore how zero-knowledge proofs are used to verify emails.',
    },
    {
      type: 'link',
      href: '/architecture/on-chain',
      label: 'On-chain Integration',
      description: 'Discover how ZK Email enables trustless blockchain verification.',
    },
    {
      type: 'link',
      href: '/architecture/security-considerations',
      label: 'Security Considerations',
      description: 'Explore the trust assumptions and security measures in ZK Email.',
    }
  ]}
/>

## How it works