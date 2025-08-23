---
sidebar_position: 3
---

# 路由守卫

ChikoAdmin 通过 `createRouteGuard` 函数实现路由守卫，支持登录验证、权限控制等功能。

## 路由守卫原理

路由守卫在路由跳转前执行，用于：
- 验证用户登录状态
- 检查用户权限
- 处理重定向逻辑
- 控制路由访问

## createRouteGuard 函数

```tsx
// src/pages/layout.tsx
function createRouteGuard(
  to: Router.Route,
  roles: string[],
  isSuper: boolean,
  previousRoute: Router.Route | null
) {
  const loginRoute = '/login';
  const isLogin = Boolean(localStg.get('token'));
  const notFoundRoute = 'notFound';
  const isNotFoundRoute = to.id === notFoundRoute;

  // 未登录状态处理
  if (!isLogin) {
    if (to.handle.constant && !isNotFoundRoute) {
      return null; // 常量路由允许访问
    }
    // 重定向到登录页，并记录原路径
    const query = to.fullPath;
    return `${loginRoute}?redirect=${query}`;
  }

  const rootRoute = '/';
  const noAuthorizationRoute = '/403';
  const needLogin = !to.handle.constant;
  const routeRoles = to.handle.roles || [];

  // 检查用户角色权限
  const hasRole = roles.some(role => routeRoles.includes(role));
  const hasAuth = isSuper || !routeRoles.length || hasRole;

  // 已登录用户访问登录页，重定向到首页
  if (to.fullPath.includes('login') && to.pathname !== '/login-out' && isLogin) {
    return rootRoute;
  }

  // 404 路由处理
  if (to.id === 'notFound') {
    const exist = matchRoutes(allRoutes[0].children || [], to.pathname);
    if (exist && exist.length > 1) {
      return noAuthorizationRoute;
    }
    return null;
  }

  // 常量路由不需要登录验证
  if (!needLogin) {
    return handleRouteSwitch(to, previousRoute);
  }

  // 权限不足时重定向到 403 页面
  if (!hasAuth && import.meta.env.VITE_AUTH_ROUTE_MODE === 'static') {
    return noAuthorizationRoute;
  }

  return handleRouteSwitch(to, previousRoute);
}
```

## 守卫逻辑说明

### 登录状态检查

```typescript
// 检查用户是否已登录
const isLogin = Boolean(localStg.get('token'));

if (!isLogin) {
  if (to.handle.constant && !isNotFoundRoute) {
    return null; // 常量路由允许访问
  }
  // 重定向到登录页
  return `${loginRoute}?redirect=${query}`;
}
```

### 权限验证

```typescript
// 检查用户角色权限
const routeRoles = to.handle.roles || [];
const hasRole = roles.some(role => routeRoles.includes(role));
const hasAuth = isSuper || !routeRoles.length || hasRole;

// 权限不足时重定向到 403 页面
if (!hasAuth && import.meta.env.VITE_AUTH_ROUTE_MODE === 'static') {
  return noAuthorizationRoute;
}
```

### 特殊路由处理

```typescript
// 已登录用户访问登录页，重定向到首页
if (to.fullPath.includes('login') && to.pathname !== '/login-out' && isLogin) {
  return rootRoute;
}

// 404 路由处理
if (to.id === 'notFound') {
  const exist = matchRoutes(allRoutes[0].children || [], to.pathname);
  if (exist && exist.length > 1) {
    return noAuthorizationRoute;
  }
  return null;
}
```

## 路由类型

### 常量路由

无需登录验证的路由：

```tsx
/**
 * @handle {
 *   title: '登录',
 *   constant: true
 * }
 */
export default function LoginPage() {
  return <div>登录页面</div>;
}
```

### 权限路由

需要特定角色才能访问的路由：

```tsx
/**
 * @handle {
 *   title: '管理员面板',
 *   roles: ['R_Admin']
 * }
 */
export default function AdminPage() {
  return <div>管理员页面</div>;
}
```

### 公开路由

所有已登录用户都可以访问的路由：

```tsx
/**
 * @handle {
 *   title: '首页'
 * }
 */
export default function HomePage() {
  return <div>首页</div>;
}
```

## 环境变量配置

```bash
# 权限路由模式：static(静态) 或 dynamic(动态)
VITE_AUTH_ROUTE_MODE=static

# 超级管理员角色标识
VITE_STATIC_SUPER_ROLE=R_SUPER
```

## 常见场景

### 登录重定向

用户访问需要登录的页面时，自动重定向到登录页并记录原路径。

### 权限不足

用户访问没有权限的页面时，重定向到 403 页面。

### 已登录用户访问登录页

已登录用户访问登录页时，自动重定向到首页。

### 404 处理

访问不存在的路由时，根据情况重定向到 403 或显示 404 页面。 