import type { RouteObject } from 'react-router-dom';

/** 应用路由处理器接口 定义路由元数据和UI展示相关属性 */
export interface AppRouteHandle {
  /** 路由标题 */
  title: string;

  /** 国际化键名 */
  i18nKey?: string;

  /** 菜单图标 */
  icon?: string;

  /** 本地图标 */
  localIcon?: string;

  /** 菜单排序 */
  order?: number;

  /** 是否保持组件状态 */
  keepAlive?: boolean;

  /** 是否在菜单中隐藏 */
  hideInMenu?: boolean;

  /** 是否为常量路由 即不需要权限的路由 */
  constant?: boolean;

  /** 激活菜单键 用于指定当前路由激活哪个菜单项 */
  activeMenu?: string;

  /** 角色权限 */
  roles?: string[];

  /** 外链地址 */
  href?: string;

  /** 是否多标签页 */
  multiTab?: boolean;

  /** 查询参数 */
  query?: Array<{ key: string; value: string }>;
}

/** 应用路由对象类型 扩展自React Router的RouteObject */
export type AppRouteObject = RouteObject & {
  /** 路由元数据 */
  handle?: AppRouteHandle;

  /** 子路由 */
  children?: AppRouteObject[];
};

/** 路由配置验证结果 */
export interface RouteValidationResult {
  /** 是否有效 */
  valid: boolean;
  /** 错误信息 */
  errors: string[];
  /** 警告信息 */
  warnings: string[];
}

/** 路由模块接口 所有路由模块类都应实现此接口 */
export interface RouteModule {
  /** 模块路径前缀 */
  path: string;

  /** 路由配置列表 */
  routes: AppRouteObject[];

  /**
   * 生成处理后的路由配置
   *
   * @param parentPath 父路径
   */
  generateRoutes: (parentPath?: string) => AppRouteObject[];

  /** 验证路由配置 */
  validate?: () => RouteValidationResult;
}
