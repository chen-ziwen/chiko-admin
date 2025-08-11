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
    optimizeDeps: {
      include: [
        '@chiko-admin/utils',
        '@chiko-admin/axios',
        '@chiko-admin/color',
        '@chiko-admin/hooks',
        '@chiko-admin/layout'
      ]
    },
    build: {
      // 启用代码分割
      rollupOptions: {
        output: {
          // 手动分块策略
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'antd-vendor': ['antd', '@ant-design/icons'],
            'charts-vendor': ['echarts'],
            'utils-vendor': ['lodash', 'dayjs', 'clsx'],
            'crypto-vendor': ['crypto-js'],
            'color-vendor': ['colord']
          },
          // 文件名策略
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      // 启用压缩
      minify: 'terser',
      terserOptions: {
        compress: {
          // 移除 console
          drop_console: true,
          drop_debugger: true,
          // 移除未使用的代码
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        }
      },
      // 启用 CSS 代码分割
      cssCodeSplit: true,
      // 设置块大小警告限制
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
