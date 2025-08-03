import type { RouteObject } from 'react-router-dom';

/**
 * 判断是否是路由组
 * 约定：以 "(" 开头、")" 结尾的 id 为路由组
 * @param id 路由ID
 * @returns Boolean
 */
export function isGroup(id?: string): boolean {
  if (!id) {
    return false;
  }
  return id.endsWith(')');
}

/**
 * 过滤路由并收集需要权限的路由
 * @param routes - 当前路由数组
 * @param parent - 当前节点的父路由，根节点时为 null
 * @param authRoutes - 用于记录需要权限的路由和对应父级的数组
 * @returns 返回过滤后的路由数组
 */
export function filterRoutes(
  routes: RouteObject[],
  parent: string | null = null,
  authRoutes: Router.SingleAuthRoute[] = [],
  cacheRoutes: string[] = [],
  parentPath: string = ''
) {
  return routes.reduce((acc, route) => {
    const noPermission = route.handle && route.handle.constant;

    const newRoute = { ...route };

    const isRouteGroup = route.id?.startsWith('(') && route.id.endsWith(')');

    if (newRoute.handle?.keepAlive) {
      cacheRoutes.push(route.path || '');
    }

    if (newRoute.children && newRoute.children.length > 0) {
      newRoute.children = filterRoutes(newRoute.children, route.id, authRoutes, cacheRoutes, route.path);
    }

    if (!noPermission) {
      if (isRouteGroup || newRoute.children?.[0]?.index) {
        const children = newRoute.children?.map(item => {
          if (item.handle?.constant || isGroup(item.id) || item.children?.[0]?.index) {
            return item;
          }
          return null;
        }).filter(Boolean) as RouteObject[];

        newRoute.children = children;

        acc.push(newRoute);
      } else {
        authRoutes.push({
          parent: parent || null,
          parentPath,
          route: newRoute
        });
      }
    } else {
      acc.push(newRoute);
    }
    return acc;
  }, [] as RouteObject[]);
}
/**
 * 过滤缓存路由
 * @param routes - 当前路由数组
 * @returns 返回缓存路由数组
 */
export function filterCacheRoutes(routes: RouteObject[]) {
  const cacheRoutes: string[] = [];

  for (const route of routes) {
    const { children, handle, path } = route;
    if (path) {
      if (handle?.keepAlive) {
        cacheRoutes.push(path);
      }

      if (children && children.length) {
        cacheRoutes.push(...filterCacheRoutes(children));
      }
    } else if (children && children.length) {
      cacheRoutes.push(...filterCacheRoutes(children));
    }
  }

  return cacheRoutes;
}

/**
 * 过滤权限路由
 * @param routes - 权限路由
 * @returns 返回权限路由数组
 */
export function mergeValuesByParent(routes: Router.SingleAuthRoute[]) {
  const merged: Record<string, Router.AuthRoute> = {};

  routes.forEach(item => {
    const key = item.parent === null ? 'null' : item.parent;
    if (!merged[key]) {
      merged[key] = {
        parent: item.parent,
        parentPath: item.parentPath,
        route: []
      };
    }
    merged[key].route.push(item.route);
  });
  return Object.values(merged).sort((a, b) => a.parent?.localeCompare(b.parent || '') || 0);
}

/**
 * 根据用户角色过滤权限路由
 * @param routes - 权限路由
 * @param roles - 用户角色
 * @returns 返回过滤后的权限路由数组
 */
export function filterAuthRoutesByRoles(routes: { parent: string | null; route: RouteObject[] }[], roles: string[]) {
  return routes.map(item => {
    if (item.route[0]?.index) {
      const routeRoles: string[] = (item.route[0].handle && item.route[0].handle.roles) || [];
      const hasPermission = routeRoles.some(role => roles.includes(role));
      const isEmptyRoles = !routeRoles.length;

      if (!isEmptyRoles && !hasPermission) {
        return {
          parent: item.parent,
          route: []
        };
      }
    }

    const filteredRoute = item.route.filter(routeObj => {
      const routeRoles: string[] = (routeObj.handle && routeObj.handle.roles) || [];

      const isEmptyRoles = !routeRoles.length;

      const hasPermission = routeRoles.some(role => roles.includes(role));

      return hasPermission || isEmptyRoles;
    });

    return {
      parent: item.parent,
      route: filteredRoute
    };
  }).filter(item => item.route.length >= 1);
}

/**
 * 根据用户角色过滤权限路由
 * @param routes - 权限路由
 * @param hasRoutes - 已授权的路由
 * @returns
 */
export function filterAuthRoutesByDynamic(routes: Router.AuthRoute[], hasRoutes: string[]) {
  return routes.map(item => {
    const filteredRoute = item.route.filter(routeObj => {
      if (routeObj?.index && hasRoutes.includes(item?.parentPath || '')) {
        return true;
      }
      return hasRoutes.includes(routeObj.path || '');
    });

    return {
      parent: item.parent,
      route: filteredRoute
    };
  }).filter(item => item.route.length >= 1);
}


/**
 * 获取基础路由
 * @param routes
 * @returns 返回基础路由数组
 */
export function getBaseChildrenRoutes(routes: RouteObject[]) {
  const baseRoutes = routes[0].children?.find(route => route.id === '(base)')?.children;

  return baseRoutes || [];
}
