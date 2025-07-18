import DarkModeContainer from '@/components/DarkModeContainer.tsx';
import { GLOBAL_SIDER_MENU_ID } from '@/constants/app';
import { ThemeContext } from '@/features/theme';
import Logo from '@/layouts/modules/header/components/Logo';

interface Props {
  headerHeight: number;
  inverted: boolean;
  isHorizontalMix: boolean;
  isVerticalMix: boolean;
  siderCollapse: boolean;
}

export const LayoutSider: FC<Props> = memo(
  ({ headerHeight, inverted, isHorizontalMix, isVerticalMix, siderCollapse }) => {
    const { darkMode } = useContext(ThemeContext);

    const showLogo = !isVerticalMix && !isHorizontalMix;

    const darkMenu = !darkMode && !isHorizontalMix && inverted;

    return (
      <DarkModeContainer
        className="size-full flex-col-stretch shadow-sider"
        inverted={darkMenu}
      >
        {showLogo && (
          <Logo
            showTitle={!siderCollapse}
            style={{ height: `${headerHeight}px` }}
          />
        )}
        <div
          className={showLogo ? 'flex-1-hidden' : 'h-full'}
          id={GLOBAL_SIDER_MENU_ID}
        />
      </DarkModeContainer>
    );
  }
);
