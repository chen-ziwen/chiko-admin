import react from '@vitejs/plugin-react';
import type { PluginOption } from 'vite';
import Inspect from 'vite-plugin-inspect';
import removeConsole from 'vite-plugin-remove-console';

import { setupAutoImport } from './auto-import';
import { setupHtmlPlugin } from './html';
import { setupBetterRouter } from './router';
import { setupUnocss } from './unocss';
import { setupUnPluginIcon } from './unplugin-icon';

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  const plugins: PluginOption[] = [
    react(),
    setupBetterRouter(),
    setupUnocss(viteEnv),
    setupAutoImport(viteEnv), // 自动导入
    Inspect(), // 打包分析
    removeConsole(), // 生产环境下移除 console
    setupHtmlPlugin(buildTime), // 注入 buildTime
    ...setupUnPluginIcon(viteEnv) // 处理本地 svg 图标自动导入
  ];
  return plugins;
}
