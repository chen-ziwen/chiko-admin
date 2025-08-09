import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';

export function setupAutoImport(env: Env.ImportMeta) {
  // 设置默认值，确保即使环境变量缺失也能正常工作
  const VITE_ICON_PREFIX = env.VITE_ICON_PREFIX || 'icon';
  const VITE_ICON_LOCAL_PREFIX = env.VITE_ICON_LOCAL_PREFIX || 'icon-local';
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '');

  return AutoImport({
    dirs: [
      // 目录下模块自动导入
      'src/hooks/**',
      'src/utils/**',
      'src/components/**'
    ],
    dts: 'src/types/auto-imports.d.ts',
    imports: [
      // 自动导入预设中的 API
      'react',
      'react-router-dom',
      'react-i18next',
      'ahooks',
      { from: 'react', imports: ['FC', 'PropsWithChildren'], type: true }
    ], // 生成相应的 .d.ts 文件
    include: [/\.[tj]sx?$/],
    resolvers: [
      // 自定义解析器
      IconsResolver({
        componentPrefix: VITE_ICON_PREFIX,
        customCollections: [collectionName],
        extension: 'tsx',
        prefix: VITE_ICON_PREFIX
      }),
      autoImportAntd
    ]
  });
}

// 1. 利用正则匹配到以A开头的组件
// 2. 一旦存在这个格式，就会从 antd 组件库中去寻找去掉 A 开头的组件，比如 AButton 就会找到 Button 组件
// 3. 这样就可以在组件中直接使用 Button 组件，而不需要手动引入
function autoImportAntd(componentName: string) {
  const pattern = /^A[A-Z]/;
  if (pattern.test(componentName)) {
    return { from: 'antd', name: componentName.slice(1) };
  }
  return null;
}
