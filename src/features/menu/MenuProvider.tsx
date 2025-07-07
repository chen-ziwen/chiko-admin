import type { FC, PropsWithChildren } from 'react';
import { useEffect, useMemo } from 'react';
import type { RouteObject } from 'react-router-dom';

import routes from '@/router';
import { selectActiveFirstLevelMenuKey, setActiveFirstLevelMenuKey } from '@/stores/modules';

import { useLang } from '../lang';
import { useRoute } from '../router';

import { filterRoutesToMenus, getActiveFirstLevelMenuKey, getSelectKey } from './MenuUtil';
import { MixMenuContext } from './menuContext';

function getBaseChildrenRoutes(rs: RouteObject[]) {
  // 查找根路由('/')的children
  const rootRoute = rs.find(route => route.path === '/');

  if (!rootRoute || !rootRoute.children) {
    // 无法找到根路由或根路由没有子路由，返回空数组
    return [];
  }

  return rootRoute.children;
}

const MenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const route = useRoute();

  const dispatch = useAppDispatch();

  const { locale } = useLang();

  const activeFirstLevelMenuKey = useAppSelector(selectActiveFirstLevelMenuKey);

  const menus = useMemo(
    () => filterRoutesToMenus(getBaseChildrenRoutes(routes.routes)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [routes.routes, locale]
  );

  const firstLevelMenu = menus.map(menu => {
    const { children: _, ...rest } = menu;
    return rest;
  }) as App.Global.Menu[];

  const childLevelMenus = menus.find(menu => menu.key === activeFirstLevelMenuKey)?.children as App.Global.Menu[];

  const selectKey = route ? getSelectKey(route) : [];

  /** - 可以手动指定菜单或者是默认当前路由的一级菜单 */
  function changeActiveFirstLevelMenuKey(key?: string) {
    const routeKey = key || (route ? getActiveFirstLevelMenuKey(route) : '');

    dispatch(setActiveFirstLevelMenuKey(routeKey));
  }

  // 当路由变化时自动更新activeFirstLevelMenuKey
  useEffect(() => {
    if (route && route.pathname) {
      const currentFirstLevelKey = getActiveFirstLevelMenuKey(route);
      if (currentFirstLevelKey !== activeFirstLevelMenuKey) {
        dispatch(setActiveFirstLevelMenuKey(currentFirstLevelKey));
      }
    }
  }, [route, route?.pathname, dispatch, activeFirstLevelMenuKey]);

  const mixMenuContext = {
    activeFirstLevelMenuKey,
    allMenus: menus,
    childLevelMenus: childLevelMenus || [],
    firstLevelMenu,
    isActiveFirstLevelMenuHasChildren: activeFirstLevelMenuKey ? Boolean(childLevelMenus) : false,
    route: route || ({} as Router.Route),
    selectKey,
    setActiveFirstLevelMenuKey: changeActiveFirstLevelMenuKey
  };

  return <MixMenuContext.Provider value={mixMenuContext}>{children}</MixMenuContext.Provider>;
};

export default MenuProvider;
