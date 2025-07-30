import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';
import type { RouteObject } from 'react-router-dom';

import { selectActiveFirstLevelMenuKey, setActiveFirstLevelMenuKey } from '@/stores/modules';

import { useLang } from '../lang';
import { useRoute, useRouter } from '../router';

import { filterRoutesToMenus, getActiveFirstLevelMenuKey, getSelectKey } from './MenuUtil';
import { MixMenuContext } from './menuContext';

function getBaseChildrenRoutes(routes: RouteObject[]) {
  const baseRoutes = routes[0].children?.find(item => item.id === '(base)')?.children;

  return baseRoutes || [];
}

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const route = useRoute();

  const { router } = useRouter();

  const dispatch = useAppDispatch();

  const { locale } = useLang();

  // 获取当前选中路由的第一层级路由
  const activeFirstLevelMenuKey = useAppSelector(selectActiveFirstLevelMenuKey);

  // 获取根路由下的子路由
  const menus = useMemo(
    () => filterRoutesToMenus(getBaseChildrenRoutes(router.routes)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.routes, locale]
  );

  // 获取第一层级的路由，过滤掉子路由，用于某个布局
  const firstLevelMenu = menus.map(menu => {
    const { children: _, ...rest } = menu;
    return rest;
  }) as App.Global.Menu[];

  // 根据当前选中的一级菜单路径，获取对应的子菜单
  const childLevelMenus = menus.find(menu => menu.key === activeFirstLevelMenuKey)?.children as App.Global.Menu[];

  // 获取当前选中的菜单（完整的 path 路径）
  const selectKey = getSelectKey(route);

  // 判断当前选中的一级菜单下是否有子菜单
  const isActiveFirstLevelMenuHasChildren = activeFirstLevelMenuKey ? Boolean(childLevelMenus) : false;

  // 可以手动指定菜单或者是默认当前路由的一级菜单
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
