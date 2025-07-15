import type { AppRouteObject } from '@/router/core/types';
import { homeRoutes } from '@/router/modules/home';
import { loginRoutes } from '@/router/modules/login';
import { personalRoutes } from '@/router/modules/personal';
import { systemRoutes } from '@/router/modules/system';

/** 路由配置 将不同类型的路由进行分类管理，提高代码可读性和维护性 */

/** 菜单路由配置 这些路由会显示在侧边栏菜单中 */
export const menuRoutes: AppRouteObject[] = [...homeRoutes, ...systemRoutes, ...personalRoutes];

/** 功能路由配置 这些路由不会显示在菜单中，通常是登录、注册、错误页面等功能性页面 */
export const functionalRoutes: AppRouteObject[] = [...loginRoutes];

export function getMenuRoutes(): AppRouteObject[] {
  return menuRoutes;
}

export function getFunctionalRoutes(): AppRouteObject[] {
  return functionalRoutes;
}

export function getAllRoutes(): AppRouteObject[] {
  return [...functionalRoutes, ...menuRoutes];
}
