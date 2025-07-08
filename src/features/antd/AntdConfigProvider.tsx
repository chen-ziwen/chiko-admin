import type { WatermarkProps } from 'antd';
import type { PropsWithChildren } from 'react';

import { useLang } from '@/features/lang';
import { useThemeSettings } from '@/features/theme';
import { getAntdTheme, setupThemeVarsToHtml } from '@/features/theme/shared';
import { useTheme } from '@/features/theme/themeContext';
import { antdLocales } from '@/locales/antd';
import { themeColors } from '@/stores/modules';

const WATERMARK_CONFIG = {
  font: {
    fontSize: 16
  },
  height: 136,
  offset: [15, 65],
  rotate: -20,
  width: 255,
  zIndex: 9999
} satisfies WatermarkProps;

function useAntdTheme() {
  const themeSettings = useThemeSettings();

  const colors = useAppSelector(themeColors);

  const { darkMode } = useTheme();

  const antdTheme = getAntdTheme(colors, darkMode, themeSettings.tokens);

  useEffect(() => {
    setupThemeVarsToHtml(colors, themeSettings.tokens, themeSettings.recommendColor);
    localStg.set('themeColor', colors.primary);
  }, [colors, themeSettings]);

  return { antdTheme, watermarkText: themeSettings.watermark.text, watermarkVisible: themeSettings.watermark.visible };
}

function AntdConfig({ children }: PropsWithChildren) {
  const { locale } = useLang();

  const { antdTheme, watermarkText, watermarkVisible } = useAntdTheme();

  return (
    <AConfigProvider
      button={{ classNames: { icon: 'text-icon align-1px' } }}
      locale={antdLocales[locale]}
      theme={antdTheme}
      card={{
        styles: { body: { flex: 1, overflow: 'hidden', padding: '12px 16px' } }
      }}
    >
      <AWatermark
        className="h-full"
        content={watermarkVisible ? watermarkText || 'chiko' : ''}
        {...WATERMARK_CONFIG}
      >
        {children}
      </AWatermark>
    </AConfigProvider>
  );
}

export default AntdConfig;
