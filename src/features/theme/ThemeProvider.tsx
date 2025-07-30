import { ThemeMode, type ThemeModeType } from 'ahooks/lib/useTheme';
import type { FC, PropsWithChildren } from 'react';

import { localStg } from '@/utils/storage';

import { ThemeContext, toggleCssDarkMode } from './themeContext';

const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeModeType>((localStg.get('themeMode') as ThemeModeType) || 'light');

  const darkMode = themeMode === 'dark';

  // 切换主题模式
  function changeThemeMode(mode: ThemeModeType) {
    setThemeMode(mode);
    localStg.set('themeMode', mode);
  }

  // 循环切换主题模式
  const toggleThemeScheme = () => {
    const themeModes = Object.values(ThemeMode);
    const index = themeModes.findIndex(item => item === themeMode);
    const nextIndex = (index + 1) % themeModes.length;
    changeThemeMode(themeModes[nextIndex]);
  };

  // 监听 darkMode，当它发生变化时，切换主题
  useEffect(() => {
    toggleCssDarkMode(darkMode);
    localStg.set('darkMode', darkMode);
  }, [darkMode]);

  // 初始化主题配置
  useMount(() => {
    // 利用媒体查询判断当前系统是否处于暗黑模式
    const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);

    const handler = (event: MediaQueryListEvent) => {
      if (themeMode !== 'system') {
        return;
      }

      changeThemeMode(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);

    return () => {
      // 在组件卸载时清理监听器
      mediaQuery.removeEventListener('change', handler);
    };
  });

  return (
    <ThemeContext value={{ darkMode, setThemeScheme: changeThemeMode, themeScheme: themeMode, toggleThemeScheme }}>
      {children}
    </ThemeContext>
  );
};

export default ThemeProvider;
