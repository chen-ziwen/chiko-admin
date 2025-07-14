import type { AppRouteObject } from './types';

/**
 * 标准化路径，确保路径以/开头
 *
 * @param path 路径
 * @returns 标准化后的路径
 */
export function normalizePath(path: string): string {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * 拼接路径
 *
 * @param parentPath 父路径
 * @param childPath 子路径
 * @returns 完整路径
 */
export function joinPaths(parentPath: string, childPath: string): string {
  if (!parentPath) return normalizePath(childPath);
  if (!childPath) return normalizePath(parentPath);

  const normalizedParent = normalizePath(parentPath);
  const parentWithoutTrailingSlash = normalizedParent.endsWith('/') ? normalizedParent.slice(0, -1) : normalizedParent;

  const childWithoutLeadingSlash = childPath.startsWith('/') ? childPath.slice(1) : childPath;

  return `${parentWithoutTrailingSlash}/${childWithoutLeadingSlash}`;
}

/**
 * 处理路由配置，将子路径拼接成完整路径
 *
 * @param routes 路由配置
 * @param parentPath 父路径
 * @returns 处理后的路由配置
 */
export function processRoutes(routes: AppRouteObject[], parentPath = ''): AppRouteObject[] {
  return routes.map(route => {
    // 如果路由有index属性，则不需要拼接路径
    if (route.index) return route;

    // 拼接路径
    const fullPath = route.path ? joinPaths(parentPath, route.path) : normalizePath(parentPath);

    // 处理子路由
    const children = route.children ? processRoutes(route.children, fullPath) : undefined;

    return {
      ...route,
      path: fullPath,
      children
    };
  });
}
