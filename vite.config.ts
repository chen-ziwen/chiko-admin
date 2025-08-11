import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import { createViteProxy } from './build';

import { getBuildTime, setupVitePlugins } from './build';

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as Env.ImportMeta;
  const buildTime = getBuildTime();
  return {
    base: viteEnv.VITE_BASE_URL,
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
    define: {
      BUILD_TIME: JSON.stringify(buildTime)
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react': ['react', 'react-dom', 'react-error-boundary'],
            'reactRouter': ['react-router-dom'],
            'redux': ['react-redux', '@reduxjs/toolkit'],
            'antd': ['antd', '@ant-design/v5-patch-for-react-19'],
            'charts': ['echarts'],
            'il8n': ['react-i18next', 'i18next'],
            'chikoAdmin': ['@chiko-admin/utils', '@chiko-admin/axios', '@chiko-admin/color', '@chiko-admin/hooks', '@chiko-admin/layout']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        }
      },
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      commonjsOptions: {
        include: [/node_modules/, /packages/]
      }
    },
    server: {
      open: true,
      port: 5210,
      warmup: {
        clientFiles: ['./index.html', './src/{pages,components}/*']
      },
      proxy: createViteProxy(viteEnv, true)
    }
  };
});
