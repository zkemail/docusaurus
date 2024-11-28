import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import 'dotenv/config';

const config: Config = {
  title: 'ZK Email',
  tagline: 'ZK Email Documentation',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  url: 'https://docs.prove.email/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zkemail', // Usually your GitHub org/user name.
  projectName: 'docosaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/zkemail/docusaurus/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ["@docusaurus/theme-mermaid"],

  markdown: {
    mermaid: true,
  },

  plugins: [
    [
      "posthog-docusaurus",
      {
        apiKey: process.env.POSTHOG_API_KEY,
        appUrl: "https://eu.i.posthog.com",
        enableInDevelopment: false,
      },
    ],
  ],

  themeConfig: {
    image: 'img/zk-email-docs-banner.png',
    navbar: {
      title: 'ZK Email',
      items: [
        {to: '/zk-email-sdk/', label: 'SDK', position: 'left'},
        {to: '/email-wallet/', label: 'Email Wallet', position: 'left'},
        {to: '/account-recovery/', label: 'Account Recovery', position: 'left'},
        {to: '/email-tx-builder/', label: 'Email Transaction Builder', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: [
            {
              label: 'SDK Registry',
              to: 'https://sdk.prove.email/',
              target: '_blank',
            },
            {
              label: 'Account Recovery Demo',
              to: 'https://recovery.prove.email/',
              target: '_blank',
            },
            {
              label: 'DKIM Archive',
              to: 'https://archive.prove.email/',
              target: '_blank',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/zkemail',
            },
            {
              label: 'X (previously Twitter)',
              href: 'https://x.com/zkemail',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/zkemail',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ZK Email.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['solidity'],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    api: {
      authPersistenceDisabled: false,
    },
    languageTabs: [
      {
        highlight: "bash",
        language: "curl",
        logoClass: "curl",
      },
      {
        highlight: "javascript",
        language: "nodejs",
        logoClass: "nodejs",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },
      {
        highlight: "rust",
        language: "rust",
        logoClass: "rust",
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
      },
    ],
    algolia: {
      appId: 'PZE9L5QV7Z',
      apiKey: '7c9876d50df48d8abaa712a816d8935f',
      indexName: 'prove',
      contextualSearch: true,
      searchParameters: {},
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
      options: {
        maxTextSize: 1000,
        flowchart: { curve: 'basis' },
        htmlLabels: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;