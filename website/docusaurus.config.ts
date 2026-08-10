import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Lesan',
  tagline: 'The new way to build web servers and NoSQL models — GraphQL-like flexibility with unmatched performance.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://miaadteam.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/lesan/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'MiaadTeam', // Usually your GitHub org/user name.
  projectName: 'lesan', // Usually your repo name.

  onBrokenLinks: 'throw',

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
          editUrl:
            'https://github.com/MiaadTeam/lesan/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/docs',
        searchBarPosition: 'navbar',
        searchContextByPaths: ['docs'],
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        searchResultContextMaxLength: 120,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/lesan-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Lesan',
      logo: {
        alt: 'Lesan Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/api-docs', label: 'API', position: 'left'},
        {
          href: 'https://github.com/MiaadTeam/lesan',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'API Reference',
              to: '/docs/api/intro',
            },
            {
              label: 'Concepts',
              to: '/docs/concepts/what-is-the-relationship',
            },
            {
              label: 'Migrating to Lesan',
              to: '/docs/migration',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/MiaadTeam/lesan',
            },
            {
              label: 'Playground',
              href: 'https://github.com/MiaadTeam/lesan/tree/main/examples',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Lesan. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['typescript', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
