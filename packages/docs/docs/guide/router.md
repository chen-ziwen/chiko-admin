---
sidebar_position: 1
---

# 路由配置

ChikoAdmin 使用 [Better Pages Create](https://github.com/chen-ziwen/better-pages-create) 进行基于文件系统的路由管理。该插件基于 React Router v7，支持约定式路由、动态路由、嵌套布局等功能。

> 该文档只介绍 `ChikoAdmin` 项目使用到的功能以及一些内置配置。
> 如需了解 Better Pages Create 的完整功能和配置，请访问 [Better Pages Create 官方文档](https://github.com/chen-ziwen/better-pages-create)。

## 路由结构

项目采用约定式路由，页面文件默认放在 `src/pages/` 目录下：

```
src/pages/
├── (base)/          # 基础布局路由组
│   ├── home/        # 首页
│   ├── system/      # 系统管理
│   ├── user-center/ # 个人中心
│   └── layout.tsx   # 基础布局
├── (blank)/         # 空白布局路由组
│   ├── login/       # 登录页
│   └── layout.tsx   # 空白布局
└── _error/          # 错误页面
    ├── 403/         # 403 错误
    ├── 404/         # 404 错误
    └── 500/         # 500 错误
```

## 路由组

使用 `(groupName)` 格式创建路由组，路由组内的页面共享相同的布局。

### 基础布局组 `(base)`

包含主应用的所有页面，使用 `BaseLayout` 布局：

```tsx
// src/pages/(base)/layout.tsx
import { BaseLayout } from '@/layouts/base';

export default function Layout() {
  return <BaseLayout />;
}
```

### 空白布局组 `(blank)`

用于登录、注册等不需要主布局的页面：

```tsx
// src/pages/(blank)/layout.tsx
import { BlankLayout } from '@/layouts/blank';

export default function Layout() {
  return <BlankLayout />;
}
```

## 页面配置

每个页面可以通过 `@handle` 注释进行配置，支持丰富的路由元信息：

```tsx
// src/pages/(base)/home/index.tsx
import React from 'react';

/**
 * @handle {
 *   "title": "首页",
 *   "icon": "lucide:laptop-minimal",
 *   "keepAlive": true,
 *   "order": 1
 * }
 */
const HomePage = () => {
  return <div>首页内容</div>;
};

export default HomePage;
```

## 路由元信息

以下是 ChikoAdmin 内置的路由元信息配置：

```typescript
interface RouteMeta {
  /** 路由标题，可用于文档标题中 */
  title: string;
  
  /** 路由的国际化键值，如果设置，将用于i18n，此时title将被忽略 */
  i18nKey?: App.I18n.I18nKey;
  
  /** 是否缓存该路由 */
  keepAlive?: boolean;
  
  /** 是否为常量路由，无需登录，并且该路由在前端定义 */
  constant?: boolean;
  
  /** 路由排序顺序 */
  order?: number;
  
  /** 路由的外部链接 */
  href?: string;
  
  /** 默认情况下，相同路径的路由会共享一个标签页，若设置为true，则使用多个标签页 */
  multiTab?: boolean;
  
  /** 若设置，路由将在标签页中固定显示，其值表示固定标签页的顺序（首页是特殊的，它将自动保持fixed） */
  fixedIndexInTab?: number;
  
  /** 路由查询参数，如果设置的话，点击菜单进入该路由时会自动携带的query参数 */
  query?: { key: string; value: string }[] | null;
}
```
### 注意事项

`icon` 图标值可以从 [Iconify](https://icones.js.org/) 获取，支持所有 Iconify 图标库。


### 配置示例

#### 基础路由配置

```tsx
// src/pages/(base)/home/index.tsx
/**
 * @handle {
 *   "title": "首页",
 *   "icon": "lucide:laptop-minimal",
 *   "keepAlive": true,
 *   "order": 1
 * }
 */
export default function HomePage() {
  return <div>首页内容</div>;
}
```

#### 权限路由配置

```tsx
// src/pages/(base)/system/index.tsx
/**
 * @handle {
 *   "title": "系统管理",
 *   "icon": "mdi:cog",
 *   "keepAlive": true,
 *   "roles": ["R_ADMIN"],
 *   "order": 1
 * }
 */
export default function SystemPage() {
  return <div>系统管理</div>;
}
```

#### 外部链接路由

```tsx
// src/pages/(base)/external/index.tsx
/**
 * @handle {
 *   "title": "外部链接",
 *   "href": "https://example.com",
 *   "icon": "mdi:external-link"
 * }
 */
export default function ExternalPage() {
  return <div>外部页面</div>;
}
```

## 动态路由

支持动态路由参数：

```tsx
// src/pages/(base)/user/[id]/index.tsx
import { useLoaderData } from 'react-router-dom';

const UserDetail = () => {
  const data = useLoaderData() as Api.SystemManage.User | undefined;
  return <div>用户详情: {data?.userName}</div>;
};

export async function loader({ params }: LoaderFunctionArgs) {
  // 获取用户数据
  const { data, error } = await fetchGetUserList();
  if (error) {
    return null;
  }
 
  const info = data.records.find(item => String(item.id) === params.id);
  return info;
}

export default UserDetail;
```

## 路由导航

使用内置的路由导航工具：

```tsx
import { reactRouter } from '@/features/router';

// 基本导航
reactRouter.navigate('/home');

// 带查询参数
reactRouter.push('/user', { id: 1, type: 'admin' });

// 替换当前路由
reactRouter.replace('/login');

// 返回上一页
reactRouter.back();

// 前进
reactRouter.forward();

// 跳转到首页
reactRouter.goHome();
```

## 路由守卫

项目通过 `createRouteGuard` 函数实现路由权限控制，在 `RootLayout` 组件中进行路由跳转前的权限检查。

### createRouteGuard 函数

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

### 权限检查逻辑

1. **登录状态检查**: 检查用户是否已登录（通过 token 判断）
2. **常量路由**: `constant: true` 的路由无需登录即可访问
3. **角色权限**: 检查用户角色是否匹配路由的 `roles` 配置
4. **超级管理员**: 超级管理员拥有所有路由的访问权限
5. **权限模式**: 根据 `VITE_AUTH_ROUTE_MODE` 环境变量决定权限控制模式

### 路由重定向

- **未登录**: 重定向到登录页，并记录原路径用于登录后跳转
- **权限不足**: 重定向到 403 无权限页面
- **已登录访问登录页**: 重定向到首页
- **外部链接**: 通过 `handleRouteSwitch` 处理外部链接跳转

### 使用方式

路由守卫在 `RootLayout` 组件中自动执行，每次路由变化时都会调用：

```tsx
const RootLayout = () => {
  const route = useRoute();
  const { roles } = useAppSelector(selectUserInfo);
  const isSuper = useAppSelector(isStaticSuper);
  
  // 路由变化时执行权限检查
  if (routeId.current !== route.id) {
    routeId.current = route.id;
    location.current = createRouteGuard(route, roles, isSuper, previousRoute);
  }
  
  // 根据权限检查结果决定是否重定向
  return location.current ? (
    <Navigate to={location.current} />
  ) : (
    <Outlet context={previousRoute} />
  );
};
```

## 常见问题

### Q: 如何添加新页面？

A: 在 `src/pages/` 目录下创建对应的文件，系统会自动生成路由。

### Q: 如何配置页面权限？

A: 在页面的 `@handle` 中设置 `roles` 属性，指定允许访问的角色列表。

### Q: 如何自定义路由布局？

A: 在路由组目录下创建 `layout.tsx` 文件，定义该组的布局组件。

### Q: 支持哪些文件扩展名？

A: 默认支持 `.tsx`, `.ts`, `.jsx`, `.js` 文件。

## 更多信息

- 📚 **完整文档**: [Better Pages Create 官方文档](https://github.com/chen-ziwen/better-pages-create)
- 🔧 **配置选项**: 查看 [配置选项](https://github.com/chen-ziwen/better-pages-create#配置选项)
- 💡 **示例项目**: 查看 [示例项目](https://github.com/chen-ziwen/better-pages-create/tree/main/examples/react)
- 🐛 **问题反馈**: [GitHub Issues](https://github.com/chen-ziwen/better-pages-create/issues)
