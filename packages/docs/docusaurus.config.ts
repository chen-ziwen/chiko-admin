import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ChikoAdmin',
  tagline: '基于 React19 的现代化中后台管理模板',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://chiko-admin.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'chen-ziwen', // Usually your GitHub org/user name.
  projectName: 'chiko-admin', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans']
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/chen-ziwen/chiko-admin/tree/main/packages/docs/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ChikoAdmin',
      logo: {
        alt: 'ChikoAdmin Logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文档'
        },
        {
          href: 'https://github.com/chen-ziwen/chiko-admin',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '快速开始',
              to: '/docs/intro'
            },
            {
              label: '路由配置',
              to: '/docs/guide/router'
            },
            {
              label: '菜单配置',
              to: '/docs/guide/menu'
            },
            {
              label: '主题配置',
              to: '/docs/guide/theme'
            }
          ]
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/chen-ziwen/chiko-admin'
            },
            {
              label: 'Issues',
              href: 'https://github.com/chen-ziwen/chiko-admin/issues'
            },
            {
              label: 'Discussions',
              href: 'https://github.com/chen-ziwen/chiko-admin/discussions'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ChikoAdmin. Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  } satisfies Preset.ThemeConfig
};

export default config;
