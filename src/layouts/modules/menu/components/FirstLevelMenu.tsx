import { transformColorWithOpacity } from '@chiko-admin/color';
import { SimpleScrollbar } from '@chiko-admin/layout';
import clsx from 'clsx';
import { cloneElement } from 'react';

import { MenuToggler, useMixMenuContext } from '@/features/menu';
import { useRouter } from '@/features/router';
import { ThemeContext } from '@/features/theme';
import { getSiderCollapse, getThemeSettings } from '@/stores/modules';

interface Props {
  children?: React.ReactNode;
  inverted?: boolean;
  onSelect?: () => void;
}

interface MixMenuItemProps {
  active: boolean;
  inverted?: boolean;
  menu: App.Global.Menu;
  onClick?: () => void;
  setActiveFirstLevelMenuKey: (key: string) => void;
}

function MixMenuItem(Props: MixMenuItemProps) {
  const {
    active,
    inverted,
    menu: { children, icon, key, label },
    onClick,
    setActiveFirstLevelMenuKey
  } = Props;

  const themeSettings = useAppSelector(getThemeSettings);

  const { navigate } = useRouter();

  const { darkMode } = useContext(ThemeContext);

  const siderCollapse = useAppSelector(getSiderCollapse);

  const selectedBgColor = getSelectedBgColor();

  function getSelectedBgColor() {
    const light = transformColorWithOpacity(themeSettings.themeColor, 0.1, '#ffffff');
    const dark = transformColorWithOpacity(themeSettings.themeColor, 0.3, '#000000');

    return darkMode ? dark : light;
  }

  function handleSelectMixMenu() {
    setActiveFirstLevelMenuKey(key);

    if (children?.length) {
      if (onClick) {
        onClick();
      }
    } else {
      navigate(key);
    }
  }

  return (
    <div
      style={{ backgroundColor: active ? selectedBgColor : '' }}
      className={clsx(
        'mx-4px mb-6px flex-col-center cursor-pointer rounded-8px bg-transparent px-4px py-8px transition-300 hover:bg-[rgb(0,0,0,0.08)]',
        { 'selected-mix-menu text-primary': active },
        { 'text-white:65 hover:text-white': inverted },
        { '!bg-primary !text-white': active && inverted }
      )}
      onClick={handleSelectMixMenu}
    >
      {icon && cloneElement(icon, { className: siderCollapse ? 'text-icon-small' : 'text-icon-large' } as any)}

      <p
        className={clsx(
          'w-full ellipsis-text text-center text-12px transition-height-300',
          siderCollapse ? 'h-0 pt-0' : 'h-24px pt-4px'
        )}
      >
        {label}
      </p>
    </div>
  );
}

const FirstLevelMenu: FC<Props> = memo(({ children, inverted, onSelect }) => {
  const { activeFirstLevelMenuKey, allMenus, setActiveFirstLevelMenuKey } = useMixMenuContext();

  return (
    <div className="h-full flex-col-stretch flex-1-hidden">
      {children}
      <SimpleScrollbar>
        {allMenus.map(item => (
          <MixMenuItem
            active={item.key === activeFirstLevelMenuKey}
            inverted={inverted}
            key={item.key}
            menu={item}
            setActiveFirstLevelMenuKey={setActiveFirstLevelMenuKey}
            onClick={onSelect}
          />
        ))}
      </SimpleScrollbar>
      <MenuToggler
        arrowIcon
        className={clsx({ 'text-white:88 !hover:text-white': inverted })}
      />
    </div>
  );
});

export default FirstLevelMenu;
