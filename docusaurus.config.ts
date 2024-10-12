import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ZK Email',
  tagline: 'ZK Email Documentation',
  favicon: 'img/zk-email-logo-small.svg',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zkemail', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

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
          docItemComponent: "@theme/ApiItem",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Add the plugins configuration
  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "relayer-api",
        docsPluginId: "classic",
        config: {
          guardian: {
            specPath: "static/openapi/relayer-api.yaml",
            outputDir: "docs/account-recovery/relayer-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          },
        },
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ZK Email',
      logo: {
        alt: 'ZK Email Logo',
        src: 'img/zk-email-logo-small-white.svg',
      },
      items: [
        {to: '/zk-email-sdk/', label: 'SDK', position: 'left'},
        {to: '/email-wallet/', label: 'Email Wallet', position: 'left'},
        {to: '/account-recovery/', label: 'Account Recovery', position: 'left'},
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
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
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
  } satisfies Preset.ThemeConfig,
};

export default config;

