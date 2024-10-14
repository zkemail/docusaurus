import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  docs: [
    {
      type: 'html',
      value: '<span class="sidebar-heading first">Welcome</span>',
    },
    'introduction',
    'quickstart',

    {
      type: 'html',
      value: '<span class="sidebar-heading">How ZK Email Works</span>',
    },
    'learn',
    {
      type: 'category',
      label: 'Architecture',
      link: {
        type: 'doc',
        id: 'architecture/README',
      },
      items: [
        'architecture/dkim-verification',
        'architecture/zk-proofs',
        'architecture/on-chain',
        'architecture/security-considerations',
      ],
    },
    {
      type: 'html',
      value: '<span class="sidebar-heading">SDK</span>',
    },
    {
      type: 'category',
      label: 'ZK Email SDK',
      link: {
        type: 'doc',
        id: 'zk-email-sdk/README',
      },
      items: [
        'zk-email-sdk/running-the-example',
        'zk-email-sdk/creating-a-new-pattern',
        'zk-email-sdk/using-the-sdk',
      ],
    },

    {
      type: 'html',
      value: '<span class="sidebar-heading">ZK Email Verifier</span>',
    },
    {
      type: 'category',
      label: 'ZK-Email-Verifier',
      link: {
        type: 'doc',
        id: 'zk-email-verifier/README',
      },
      items: [
        'zk-email-verifier/installation',
        'zk-email-verifier/packages-components',
        'zk-email-verifier/usage-guide',
      ],
    },

    {
      type: 'html',
      value: '<span class="sidebar-heading">Email Wallet</span>',
    },
    {
      type: 'category',
      label: 'Email Wallet',
      link: {
        type: 'doc',
        id: 'email-wallet/README',
      },
      items: [
        'email-wallet/api-documentation',
        'email-wallet/circuit-architecture',
        'email-wallet/contract-architecture',
        'email-wallet/relayer-infrastructure',
        'email-wallet/email-wallet-extensions-sdk',
        'email-wallet/deployed-contract-addresses',
      ],
    },

    {
      type: 'html',
      value: '<span class="sidebar-heading">Account Recovery</span>',
    },
    'account-recovery/README',
    'account-recovery/quickstart-guides',
    {
      type: 'category',
      label: 'Contracts Reference',
      link: {
        type: 'doc',
        id: 'account-recovery/api-reference/README'
      },
      items: [
        {
          type: 'category',
          label: 'Core Contracts',
          items: [
            'account-recovery/api-reference/core-contracts/email-recovery-manager',
            'account-recovery/api-reference/core-contracts/guardian-manager',
          ],
        },
        {
          type: 'category',
          label: 'Modules',
          items: [
            'account-recovery/api-reference/modules/email-recovery-module',
          ],
        },
        {
          type: 'category',
          label: 'Factories',
          items: [
            'account-recovery/api-reference/factories/email-recovery-factory',
          ],
        },
        {
          type: 'category',
          label: 'Command Handlers',
          items: [
            'account-recovery/api-reference/command-handlers/email-recovery-command-handler',
            'account-recovery/api-reference/command-handlers/account-hiding-recovery-command-handler',
            'account-recovery/api-reference/command-handlers/safe-recovery-command-handler',
          ],
        },
        {
          type: 'category',
          label: 'Interfaces',
          items: [
            'account-recovery/api-reference/interfaces/i-email-recovery-module',
            'account-recovery/api-reference/interfaces/i-email-recovery-manager',
            'account-recovery/api-reference/interfaces/i-email-recovery-command-handler',
            'account-recovery/api-reference/interfaces/i-guardian-manager',
            'account-recovery/api-reference/interfaces/i-safe',
            'account-recovery/api-reference/interfaces/i-universal-email-recovery-module',
          ],
        },
        {
          type: 'category',
          label: 'Libraries',
          items: [
            'account-recovery/api-reference/libraries/enumerable-guardian-map',
            'account-recovery/api-reference/libraries/string-utils',
            'account-recovery/api-reference/libraries/l2-contract-helper',
          ],
        },
      ],
    },
    'account-recovery/email-controlled-smart-contracts',
    'account-recovery/novel-concepts',
    'account-recovery/package-components',
    {
      type: 'category',
      label: 'Relayer API',
      link: {
        type: 'doc',
        id: 'account-recovery/relayer-api/README'
      },
      items: [
        'account-recovery/relayer-api/echo-endpoint',
        'account-recovery/relayer-api/request-status',
        'account-recovery/relayer-api/acceptance-request',
        'account-recovery/relayer-api/recovery-request',
        'account-recovery/relayer-api/complete-recovery-request',
        'account-recovery/relayer-api/get-account-salt',
      ],
    },
    'account-recovery/deployed-contracts',

    {
      type: 'html',
      value: '<span class="sidebar-heading">Additional Resources</span>',
    },
    'projects',
    'login-with-zk-email-oauth-api',
    'audits',
    'zk-regex',
    'frequently-asked-questions',
    'contributing',
  ],
};

export default sidebars;
