import { getPaletteColorByNumber, mixColor } from '@chiko-admin/color';
import { Outlet } from 'react-router-dom';

import WaveBg from '@/components/WaveBg';
import { useTheme } from '@/features/theme';
import { getThemeSettings } from '@/stores/modules';

import Header from './modules/Header';

function useBgColor() {
  const COLOR_WHITE = '#ffffff';

  const { darkMode } = useTheme();

  const { themeColor } = useAppSelector(getThemeSettings);

  const bgThemeColor = darkMode ? getPaletteColorByNumber(themeColor, 600) : themeColor;

  const ratio = darkMode ? 0.5 : 0.2;

  const bgColor = mixColor(COLOR_WHITE, themeColor, ratio);

  return {
    bgColor,
    bgThemeColor
  };
}

const LoginLayout = () => {
  const { bgColor, bgThemeColor } = useBgColor();

  return (
    <div
      className="relative size-full flex-center overflow-hidden bg-layout"
      style={{ backgroundColor: bgColor }}
    >
      <WaveBg themeColor={bgThemeColor} />

      <ACard
        className="relative z-4 w-auto rd-12px"
        variant="borderless"
      >
        <div className="w-400px lt-sm:w-300px">
          <Header />
          <main className="pt-24px">
            <Outlet />
          </main>
        </div>
      </ACard>
    </div>
  );
};

export default LoginLayout;
