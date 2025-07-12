import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';
import type { RouteObject } from 'react-router-dom';

import { selectActiveFirstLevelMenuKey, setActiveFirstLevelMenuKey } from '@/stores/modules';

import { useLang } from '../lang';
import { useRoute, useRouter } from '../router';

import { filterRoutesToMenus, getActiveFirstLevelMenuKey, getSelectKey } from './MenuUtil';
import { MixMenuContext } from './menuContext';

function getBaseChildrenRoutes(rs: RouteObject[]) {
  // 查找根路由'/' 的 children
  const rootRoute = rs.find(route => route.path === '/');

  // 无法找到根路由或根路由没有子路由，返回空数组
  if (!rootRoute || !rootRoute.children) {
    return [];
  }

  // 因为返回的是 children 层级，所以不包含根路由 '/'
  return rootRoute.children;
}

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const route = useRoute();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { locale } = useLang();

  const activeFirstLevelMenuKey = useAppSelector(selectActiveFirstLevelMenuKey);

  // 获取根路由的子路由
  const menus = useMemo(
    () => filterRoutesToMenus(getBaseChildrenRoutes(router.router.routes)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.router.routes, locale]
  );

  const firstLevelMenu = menus.map(menu => {
    const { children: _, ...rest } = menu;
    return rest;
  }) as App.Global.Menu[];

  const childLevelMenus = menus.find(menu => menu.key === activeFirstLevelMenuKey)?.children as App.Global.Menu[];

  const selectKey = getSelectKey(route);

  /** - 可以手动指定菜单或者是默认当前路由的一级菜单 */
  function changeActiveFirstLevelMenuKey(key?: string) {
    const routeKey = key || getActiveFirstLevelMenuKey(route);
    dispatch(setActiveFirstLevelMenuKey(routeKey || ''));
  }

  const mixMenuContext = {
    activeFirstLevelMenuKey,
    allMenus: menus,
    childLevelMenus: childLevelMenus || [],
    firstLevelMenu,
    isActiveFirstLevelMenuHasChildren: activeFirstLevelMenuKey ? Boolean(childLevelMenus) : false,
    route,
    selectKey,
    setActiveFirstLevelMenuKey: changeActiveFirstLevelMenuKey
  };

  return <MixMenuContext value={mixMenuContext}>{children}</MixMenuContext>;
};

export default MenuProvider;
