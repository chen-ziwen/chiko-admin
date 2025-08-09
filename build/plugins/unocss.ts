import path from 'node:path';
import process from 'node:process';

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import presetIcons from '@unocss/preset-icons';
import unocss from '@unocss/vite';

export function setupUnocss(viteEnv: Env.ImportMeta) {
  // 设置默认值，确保即使环境变量缺失也能正常工作
  const VITE_ICON_PREFIX = viteEnv.VITE_ICON_PREFIX || 'icon';
  const VITE_ICON_LOCAL_PREFIX = viteEnv.VITE_ICON_LOCAL_PREFIX || 'icon-local';

  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icon');

  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '');

  return unocss({
    presets: [
      presetIcons({
        collections: {
          [collectionName]: FileSystemIconLoader(localIconPath, svg =>
            svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
          )
        },
        extraProperties: {
          display: 'inline-block'
        },
        prefix: `${VITE_ICON_PREFIX}-`,
        scale: 1,
        warn: false
      })
    ]
  });
}
