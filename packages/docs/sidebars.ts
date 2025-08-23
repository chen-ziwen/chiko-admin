import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'guide/getting-started',
    {
      type: 'category',
      label: '路由系统',
      items: [
        'guide/router/basics',
        'guide/router/guard',
        'guide/router/meta'
      ]
    },
    {
      type: 'category',
      label: '主题配置',
      items: [
        'guide/theme/basics',
        'guide/theme/customization',
        'guide/theme/loading'
      ]
    },
    {
      type: 'category',
      label: '国际化',
      items: [
        'guide/i18n/basics',
        'guide/i18n/advanced'
      ]
    },
    {
      type: 'category',
      label: '请求配置',
      items: [
        'guide/request/backend',
        'guide/request/msw',
        'guide/request/proxy'
      ]
    }
  ]
};

export default sidebars;
