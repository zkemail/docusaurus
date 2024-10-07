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
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          path: 'changelog',
          routeBasePath: 'changelog',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ZK Email',
      logo: {
        alt: 'ZK Email Logo',
        src: 'img/zk-email-logo-small-white.svg',
      },
      items: [
        {to: '/docs/zk-email-sdk/', label: 'SDK', position: 'left'},
        {to: '/docs/email-wallet/', label: 'Email Wallet', position: 'left'},
        {to: '/docs/account-recovery/', label: 'Account Recovery', position: 'left'},
        {to: '/changelog', label: 'Changelog', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
            {
              label: 'Changelog',
              to: '/changelog',
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
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

// Custom function to set favicon based on color mode
const setFaviconForColorMode = `
  (function() {
    var lightFavicon = '/img/zk-email-logo-small.svg';
    var darkFavicon = '/img/zk-email-logo-small-white.svg';
    
    function updateFavicon() {
      var favicon = document.querySelector('link[rel="icon"]');
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        favicon.href = darkFavicon;
      } else {
        favicon.href = lightFavicon;
      }
    }
    
    // Set initial favicon
    updateFavicon();
    
    // Update favicon when color mode changes
    var observer = new MutationObserver(updateFavicon);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  })();
`;

// Add the custom script to the config
config.scripts = config.scripts || [];
config.scripts.push({
  src: 'data:text/javascript,' + encodeURIComponent(setFaviconForColorMode),
  defer: true,
});

export default config;
