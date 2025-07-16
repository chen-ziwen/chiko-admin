import type { PluginOption } from 'vite';
import Pages from 'vite-plugin-pages';

/** 配置 vite-plugin-pages 自动根据文件系统生成路由 */
export function setupPagesPlugin(): PluginOption {
  return Pages({
    dirs: [{ dir: 'src/pages', baseRoute: '/' }],
    extensions: ['tsx', 'jsx', 'ts', 'js'],
    exclude: ['**/components/**/*', '**/modules/**/*', '**/hooks/**/*'],
    importMode: 'async',
    resolver: 'react',
    routeStyle: 'remix',
    extendRoute: async route => {
      // const pageModule = await import(/* @vite-ignore */ route.file);

      return {
        ...route,
        meta: {}
      };
    }
  });
}
