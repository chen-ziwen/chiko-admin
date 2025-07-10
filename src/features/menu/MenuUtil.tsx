import type { RouteObject } from 'react-router-dom';

import BeyondHiding from '@/components/BeyondHiding';
import { $t } from '@/locales';

/** 处理路由的子节点，创建菜单项 */
function processRouteNode(route: RouteObject, parentPath: string = ''): App.Global.Menu[] {
  // 如果节点不隐藏在菜单中
  if (!route.handle?.hideInMenu) {
    // 创建菜单节点
    const newNode = getGlobalMenuByBaseRoute(route);

    // 如果有父路径，确保当前路由的key是完整路径
    if (parentPath && !route.handle?.key) {
      const currentPath = route.path || '';
      // 避免重复的斜杠
      const separator = parentPath.endsWith('/') || currentPath.startsWith('/') ? '' : '/';
      newNode.key = `${parentPath}${separator}${currentPath}`;
    }

    // 如果存在 children，则递归处理子路由
    if (route.children && route.children.length) {
      const filteredChildren = filterRoutesToMenus(route.children, newNode.key);

      if (filteredChildren?.length) {
        newNode.children = filteredChildren;
      }
    }

    return [newNode];
  } else if (route.children && route.children.length) {
    // 如果当前节点被隐藏但有子节点，则递归处理子节点
    return filterRoutesToMenus(route.children, parentPath);
  }

  return [];
}

/**
 * Get global menus by auth routes
 *
 * @param routes Auth routes
 * @param parentPath 父路由路径
 */
export function filterRoutesToMenus(routes: RouteObject[], parentPath: string = '') {
  // 支持路由排序功能 通过 handle?.order 属性
  const sortedRoutes = sortRoutesByOrder(routes);

  const menus: App.Global.Menu[] = [];

  for (const route of sortedRoutes) {
    // 只处理有path且不是index路由的路由
    if (!(route.index || !route.path)) {
      const routeMenus = processRouteNode(route, parentPath);
      menus.push(...routeMenus);
    }
  }

  return menus;
}

/**
 * sort routes by order
 *
 * @param routes routes
 */
export function sortRoutesByOrder(routes: RouteObject[]) {
  routes.sort((next, prev) => (Number(next.handle?.order) || 0) - (Number(prev.handle?.order) || 0));
  routes.forEach(sortRouteByOrder);

  return routes;
}

/**
 * sort route by order
 *
 * @param route route
 */
function sortRouteByOrder(route: RouteObject) {
  if (route.children?.length) {
    route.children.sort((next, prev) => (Number(next.handle?.order) || 0) - (Number(prev.handle?.order) || 0));
    route.children.forEach(sortRouteByOrder);
  }

  return route;
}

/**
 * Get global menu by route
 *
 * @param route
 */
export function getGlobalMenuByBaseRoute(route: RouteObject): App.Global.Menu {
  const { path } = route;

  const { i18nKey, icon = import.meta.env.VITE_MENU_ICON, localIcon, title, key } = route.handle ?? {};

  const label = i18nKey ? $t(i18nKey) : title;

  // 使用默认图标，如果没有提供
  let iconComponent = null;
  if (icon) {
    try {
      iconComponent = (
        <SvgIcon
          icon={icon}
          localIcon={localIcon}
          style={{ fontSize: '20px' }}
        />
      );
    } catch {
      // 捕获错误但不打印日志
    }
  }

  // 确保 key 是完整路径，而不仅仅是路径的最后一部分
  const fullPath = key || (path && path.startsWith('/') ? path : `/${path}`);

  const menu: App.Global.Menu = {
    icon: iconComponent as any,
    key: fullPath,
    label: <BeyondHiding title={label} />,
    title: label
  };

  return menu;
}

/**
 * Get active first level menu key
 *
 * @param route
 */
export function getActiveFirstLevelMenuKey(route: App.Global.TabRoute) {
  const { activeMenu, hideInMenu } = route.handle ?? {};

  const name = route.pathname;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  const [_, firstLevelRouteName] = routeName.split('/');

  return `/${firstLevelRouteName}`;
}

/** 检查菜单路径是否匹配并添加子菜单 */
function checkAndAddMenu(menu: App.Global.Menu, newMenu: App.Global.Menu, menuPath: string[]): boolean {
  const menuKeyParts = menu.key.split('/');

  // 如果路径前缀不匹配，直接返回false
  if (menuKeyParts[1] !== menuPath[1]) {
    return false;
  }

  // 初始化children数组（如果需要）
  if (!menu.children) {
    menu.children = [];
  }

  // 处理完全匹配的情况
  if (menuPath.length === 3) {
    menu.children.push(newMenu);
    return true;
  }

  // 处理部分匹配，递归检查子菜单
  return findAndMergeParent(menu.children, menuPath.slice(1));
}

/** 在菜单数组中查找并合并父级菜单 */
function findAndMergeParent(currentMenus: App.Global.Menu[], menuPath: string[]): boolean {
  for (const menu of currentMenus) {
    if (checkAndAddMenu(menu, null as any, menuPath)) {
      return true;
    }
  }
  return false;
}

export function mergeMenus(menus: App.Global.Menu[], newMenus: App.Global.Menu[]) {
  newMenus.forEach(newMenu => {
    const newMenuKey = newMenu.key.split('/'); // 分割路径

    // 定义特定于当前newMenu的findAndMergeParent函数
    const findParentForCurrentMenu = (currentMenus: App.Global.Menu[]): boolean => {
      for (const menu of currentMenus) {
        const menuKeyParts = menu.key.split('/');

        // 如果路径前缀匹配
        if (menuKeyParts[1] === newMenuKey[1]) {
          // 初始化children数组（如果需要）
          if (!menu.children) {
            menu.children = [];
          }

          // 完全匹配的情况
          if (newMenuKey.length === 3) {
            menu.children.push(newMenu);
            return true;
          }

          // 部分匹配，递归检查子菜单
          return findParentForCurrentMenu(menu.children);
        }
      }
      return false;
    };

    // 如果没有找到父级，将newMenu直接添加到menus
    if (!findParentForCurrentMenu(menus)) {
      menus.push(newMenu);
    }
  });

  return menus;
}

export function getSelectKey(route: Router.Route) {
  const { activeMenu, hideInMenu } = route.handle ?? {};

  const name = route.pathname as string;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  return [routeName];
}
