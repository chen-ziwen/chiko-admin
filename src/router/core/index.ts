import type { AppRouteObject, RouteModule } from './types';
import { normalizePath, processRoutes } from './utils';

/** 基础路由模块类 所有路由模块都应该继承此类 */
export class BaseRouteModule implements RouteModule {
  readonly path: string;
  readonly routes: AppRouteObject[];

  constructor(path: string, routes: AppRouteObject[]) {
    this.path = normalizePath(path);
    this.routes = routes;
  }

  /**
   * 生成处理后的路由配置
   *
   * @param parentPath 父路径，默认为空字符串
   * @returns 处理后的路由配置
   */
  generateRoutes(parentPath = ''): AppRouteObject[] {
    const basePath = parentPath || this.path;
    return processRoutes(this.routes, normalizePath(basePath));
  }
}

/**
 * 创建路由模块
 *
 * @param basePath 基础路径
 * @param routes 路由配置
 * @returns 处理后的路由配置
 */
export function createRoutes(basePath: string, routes: AppRouteObject[]): AppRouteObject[] {
  const routeModule = new BaseRouteModule(basePath, routes);
  return routeModule.generateRoutes();
}

/**
 * 创建根路由模块（基础路径为根路径'/'）
 *
 * @param routes 路由配置
 * @returns 处理后的路由配置
 */
export function createRootRoutes(routes: AppRouteObject[]): AppRouteObject[] {
  return createRoutes('/', routes);
}
