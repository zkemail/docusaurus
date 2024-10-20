import DocCardList from '@theme/DocCardList';

# Quickstart

<div style={{fontSize: '1.2em'}}>
Learn how to implement account recovery into your wallet using ZK Email.
</div>

---

ZK Email allows developers to implement a secure Account Recovery mechanism into their wallet using ZK Email. Account Recovery can be implemented in wallets implementing both ERC-4337 and ERC-7579.

Wallets using ERC-7579 can implement ZK Email by installing our 7579 Module directly.

## Implementation Guides

These guides provide detailed instructions for implementing account recovery using ZK Email in different scenarios.

Whether you're working with an ERC-7579 compatible wallet, building a custom implementation, or integrating with a Safe smart contract wallet, we have you covered.

Each guide offers step-by-step instructions tailored to your specific use case, ensuring a smooth implementation process.

<DocCardList 
  items={[
    {
      type: 'link',
      href: '/account-recovery/quickstart/existing-modules',
      label: 'Using Existing Modules',
      description: 'Implement account recovery using our existing modules.',
    },
    {
      type: 'link',
      href: '/account-recovery/custom-command-handlers',
      label: 'Custom CommandHandlers',
      description: 'Add account recovery to your Safe smart contract wallet.',
    },
    {
      type: 'link',
      href: '/account-recovery/ether-email-auth',
      label: 'Custom Implementation with SDK',
      description: 'Build a custom account recovery solution using our SDK.',
    },
  ]}
/>
