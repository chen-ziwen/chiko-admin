import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';

import { defineConfig, loadEnv } from 'vite';

import { getBuildTime, setupVitePlugins } from './build';

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as Env.ImportMeta;
  const buildTime = getBuildTime();
  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/scss/global.scss" as *;`,
          api: 'modern-compiler'
        }
      }
    },
    plugins: setupVitePlugins(viteEnv, buildTime),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url))
      }
    },
    server: {
      open: true,
      port: 5210,
      warmup: {
        clientFiles: ['./index.html', './src/{pages,components}/*']
      }
    }
  };
});
