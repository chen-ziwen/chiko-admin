import { type ButtonProps, type TooltipProps } from 'antd';
import type { CSSProperties } from 'react';

import ButtonIcon from '@/components/ButtonIcon';

import { icons, useTheme } from './themeContext';

interface ThemeSwitchProps {
  className?: string;
  showTooltip?: boolean;
  style?: CSSProperties;
  tooltipPlacement?: TooltipProps['placement'];
}

const DEFAULT_ANIMATION_DURATION = 400;
const DEFAULT_ANIMATION_EASING = 'ease-in-out';

const ThemeSchemaSwitch: React.FC<ThemeSwitchProps> = memo(
  ({ showTooltip = true, tooltipPlacement = 'bottom', ...props }) => {
    const { t } = useTranslation();
    const { darkMode, themeScheme, toggleThemeScheme } = useTheme();
    const tooltipContent = showTooltip ? t('icon.themeSchema') : '';

    const toggleDark: ButtonProps['onClick'] = event => {
      const isAppearanceTransition = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!isAppearanceTransition) {
        toggleThemeScheme();
        return;
      }

      const transition = document.startViewTransition(() => {
        toggleThemeScheme();
      });

      if (themeScheme === 'system') {
        return;
      }

      const rect = { x: event.clientX, y: event.clientY };
      const endRadius = Math.hypot(Math.max(rect.x, innerWidth - rect.x), Math.max(rect.y, innerHeight - rect.y));

      // 当主题切换时，创建一个圆形的过渡动画 类似 vitepress
      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${rect.x}px ${rect.y}px)`,
          `circle(${endRadius}px at ${rect.x}px ${rect.y}px)`
        ];
        document.documentElement.animate(
          {
            clipPath: darkMode ? [...clipPath].reverse() : clipPath
          },
          {
            duration: DEFAULT_ANIMATION_DURATION,
            easing: DEFAULT_ANIMATION_EASING,
            pseudoElement: darkMode ? '::view-transition-old(root)' : '::view-transition-new(root)'
          }
        );
      });
    };
    return (
      <ButtonIcon
        icon={icons[themeScheme]}
        tooltipContent={tooltipContent}
        tooltipPlacement={tooltipPlacement}
        {...props}
        onClick={toggleDark}
      />
    );
  }
);

export default ThemeSchemaSwitch;
