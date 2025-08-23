import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'guide/getting-started',
    {
      type: 'category',
      label: '核心功能',
      items: [
        'guide/router',
        'guide/menu',
        'guide/theme'
      ]
    }
  ]
};

export default sidebars;
