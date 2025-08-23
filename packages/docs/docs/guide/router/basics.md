---
sidebar_position: 1
---

# 路由基础

ChikoAdmin 基于 React Router v7 和 Better Pages Create 实现文件系统路由。

## 文件系统路由

项目使用 Better Pages Create 插件，根据 `src/pages` 目录结构自动生成路由。

### 目录结构示例

```
src/pages/
├── (base)/           # 基础布局路由组
│   ├── home/         # 首页
│   │   └── index.tsx
│   ├── system/       # 系统管理
│   │   ├── index.tsx
│   │   ├── user/     # 用户管理
│   │   │   └── index.tsx
│   │   └── role/     # 角色管理
│   │       └── index.tsx
│   └── layout.tsx    # 基础布局
├── (blank)/          # 空白布局路由组
│   ├── login/        # 登录页
│   │   └── index.tsx
│   └── layout.tsx    # 空白布局
└── index.tsx         # 根路由
```

### 路由生成规则

- 目录名用 `()` 包围表示路由组，不会影响 URL 路径
- `index.tsx` 文件生成对应路径的路由
- 目录结构直接映射为 URL 路径

## 路由元信息

使用 JSDoc 注释 `@handle` 定义路由元信息：

```tsx
/**
 * @handle {
 *   title: '用户管理',
 *   icon: 'mdi:account-group',
 *   roles: ['admin']
 * }
 */
export default function UserPage() {
  return <div>用户管理页面</div>;
}
```

### 常用元信息

```typescript
interface RouteMeta {
  /** 路由标题 */
  title: string;
  /** 国际化键值 */
  i18nKey?: App.I18n.I18nKey;
  /** 角色权限 */
  roles?: string[];
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 是否常量路由（无需登录） */
  constant?: boolean;
  /** 图标 */
  icon?: string;
  /** 本地图标 */
  localIcon?: string;
  /** 排序 */
  order?: number;
  /** 外部链接 */
  href?: string;
  /** 隐藏菜单 */
  hideInMenu?: boolean;
  /** 激活菜单 */
  activeMenu?: string;
  /** 多标签页 */
  multiTab?: boolean;
  /** 固定标签页 */
  fixedIndexInTab?: number;
  /** 查询参数 */
  query?: { key: string; value: string }[];
}
```

## 路由守卫

项目使用 `createRouteGuard` 函数实现路由权限控制：

```tsx
// src/pages/layout.tsx
function createRouteGuard(
  to: Router.Route,
  roles: string[],
  isSuper: boolean,
  previousRoute: Router.Route | null
) {
  const isLogin = Boolean(localStg.get('token'));
  
  // 未登录处理
  if (!isLogin) {
    if (to.handle.constant) {
      return null; // 常量路由允许访问
    }
    return `/login?redirect=${to.fullPath}`;
  }
  
  // 已登录处理
  const routeRoles = to.handle.roles || [];
  const hasAuth = isSuper || !routeRoles.length || roles.some(role => routeRoles.includes(role));
  
  if (!hasAuth) {
    return '/403';
  }
  
  return null; // 允许访问
}
```

## 路由使用

### 导航

```tsx
import { useRouter } from '@/features/router';

function MyComponent() {
  const { navigate } = useRouter();
  
  const handleClick = () => {
    navigate('/system/user');
  };
  
  return <button onClick={handleClick}>跳转到用户管理</button>;
}
```

### 获取路由信息

```tsx
import { useRoute } from '@/features/router';

function MyComponent() {
  const route = useRoute();
  
  console.log('当前路径:', route.pathname);
  console.log('路由参数:', route.params);
  console.log('查询参数:', route.search);
  
  return <div>当前页面: {route.pathname}</div>;
}
```

## 路由缓存

设置 `keepAlive: true` 启用路由缓存：

```tsx
/**
 * @handle {
 *   title: '用户管理',
 *   keepAlive: true
 * }
 */
export default function UserPage() {
  return <div>用户管理页面</div>;
}
```

## 外部链接

设置 `href` 创建外部链接：

```tsx
/**
 * @handle {
 *   title: 'GitHub',
 *   href: 'https://github.com/chen-ziwen/chiko-admin'
 * }
 */
export default function GitHubPage() {
  return <div>跳转到 GitHub</div>;
} 