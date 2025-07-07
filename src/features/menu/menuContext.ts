import { createContext, useContext } from 'react';

export interface MixMenuContextProps<T = unknown> {
  activeFirstLevelMenuKey: string;
  allMenus: App.Global.Menu[];
  childLevelMenus: App.Global.Menu[];
  firstLevelMenu: App.Global.Menu[];
  isActiveFirstLevelMenuHasChildren: boolean;
  route: Router.Route<T>;
  selectKey: string[];
  setActiveFirstLevelMenuKey: (key?: string) => void;
}

function voidFunc() {}

export const MixMenuContext = createContext<MixMenuContextProps<unknown>>({
  activeFirstLevelMenuKey: '',
  allMenus: [],
  childLevelMenus: [],
  firstLevelMenu: [],
  isActiveFirstLevelMenuHasChildren: false,
  route: {} as Router.Route<unknown>,
  selectKey: [],
  setActiveFirstLevelMenuKey: voidFunc
});

export function useMixMenuContext<T = unknown>() {
  const context = useContext(MixMenuContext);

  if (!context) {
    // 返回默认值而不是抛出错误或打印警告，这样UI仍然可以渲染
    return {
      activeFirstLevelMenuKey: '',
      allMenus: [],
      childLevelMenus: [],
      firstLevelMenu: [],
      isActiveFirstLevelMenuHasChildren: false,
      route: {} as Router.Route<T>,
      selectKey: [],
      setActiveFirstLevelMenuKey: () => {}
    } as MixMenuContextProps<T>;
  }

  return context as MixMenuContextProps<T>;
}
