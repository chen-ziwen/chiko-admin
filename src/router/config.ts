import type { AppRouteObject } from '@/router/core/types';
import { globalRoutes as globalRoutesConfig } from '@/router/modules/_global';
import { exceptionRoutes } from '@/router/modules/exception';
import { homeRoutes } from '@/router/modules/home';
import { personalRoutes } from '@/router/modules/personal';
import { systemRoutes } from '@/router/modules/system';

// 路由配置 将不同类型的路由进行分类管理，提高代码可读性和维护性

// 菜单路由配置 这些路由会显示在侧边栏菜单中
export const menuRoutes: AppRouteObject[] = [...homeRoutes, ...personalRoutes, ...exceptionRoutes, ...systemRoutes];

// 全局路由配置 这些路由不会显示在菜单中，直接挂载在根路径下
// 包括登录、注册、全局异常页面等
export const globalRoutes: AppRouteObject[] = [...globalRoutesConfig];

// 获取菜单路由配置 这些路由会显示在侧边栏菜单中，作为AppLayout的子路由
export function getMenuRoutes(): AppRouteObject[] {
  return menuRoutes;
}

// 获取全局路由配置 这些路由直接挂载在根路径下，不作为AppLayout的子路由
export function getGlobalRoutes(): AppRouteObject[] {
  return globalRoutes;
}

// 获取所有需要作为AppLayout子路由的路由 即菜单路由
export function getAllRoutes(): AppRouteObject[] {
  return menuRoutes;
}
