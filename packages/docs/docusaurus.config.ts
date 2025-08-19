import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ChikoAdminDocs',
  tagline: '基于 React19 的现代化中后台管理模板文档',
  favicon: 'img/favicon.svg',
  url: 'https://admin-docs.chiko.store',
  baseUrl: '/',

  organizationName: 'chen-ziwen',
  projectName: 'chiko-admin-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ChikoAdminDocs',
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
      style: 'light',
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
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ChikoAdmin. Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'javascript', 'jsx', 'tsx']
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true
      }
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4
    }
  } satisfies Preset.ThemeConfig,

  // 添加粒子效果脚本
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js',
      async: true
    }
  ],

  // 添加现代化字体
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      type: 'text/css'
    }
  ]
};

export default config;
