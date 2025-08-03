import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { selectActiveFirstLevelMenuKey, setActiveFirstLevelMenuKey } from '@/stores/modules';

import { useLang } from '../lang';
import { useRoute, useRouter } from '../router';

import { filterRoutesToMenus, getActiveFirstLevelMenuKey, getSelectKey } from './MenuUtil';
import { MixMenuContext } from './menuContext';
import { getBaseChildrenRoutes } from '@/features/router';

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const route = useRoute();

  const { router } = useRouter();

  const dispatch = useAppDispatch();

  const { locale } = useLang();

  const activeFirstLevelMenuKey = useAppSelector(selectActiveFirstLevelMenuKey);

  const menus = useMemo(
    () => filterRoutesToMenus(getBaseChildrenRoutes(router.routes)),
    [router.routes, locale]
  );

  const firstLevelMenu = menus.map(menu => {
    const { children: _, ...rest } = menu;
    return rest;
  }) as App.Global.Menu[];

  const childLevelMenus = menus.find(menu => menu.key === activeFirstLevelMenuKey)?.children as App.Global.Menu[];

  const selectKey = getSelectKey(route);

  const isActiveFirstLevelMenuHasChildren = activeFirstLevelMenuKey ? Boolean(childLevelMenus) : false;

  function changeActiveFirstLevelMenuKey(key?: string) {
    const routeKey = key || getActiveFirstLevelMenuKey(route);
    dispatch(setActiveFirstLevelMenuKey(routeKey || ''));
  }

  const mixMenuContext = {
    activeFirstLevelMenuKey,
    allMenus: menus,
    childLevelMenus: childLevelMenus || [],
    firstLevelMenu,
    isActiveFirstLevelMenuHasChildren,
    route,
    selectKey,
    setActiveFirstLevelMenuKey: changeActiveFirstLevelMenuKey
  };

  return <MixMenuContext value={mixMenuContext}>{children}</MixMenuContext>;
};

export default MenuProvider;
