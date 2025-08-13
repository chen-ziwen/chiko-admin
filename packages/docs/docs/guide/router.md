---
sidebar_position: 1
---

# 路由配置

ChikoAdmin 使用 React Router v7 进行路由管理，支持基于文件系统的路由生成和动态路由配置。

## 路由结构

项目采用约定式路由，页面文件放在 `src/pages/` 目录下：

```
src/pages/
├── (base)/           # 基础布局路由组
│   ├── home/        # 首页
│   ├── system/      # 系统管理
│   ├── personal/    # 个人中心
│   └── layout.tsx   # 基础布局
├── (blank)/         # 空白布局路由组
│   ├── login/       # 登录页
│   └── layout.tsx   # 空白布局
└── _error/      # 错误页面
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

每个页面可以通过 `handle` 属性进行配置：

```tsx
// src/pages/(base)/home/index.tsx
import type { RouteObject } from 'react-router-dom';

const HomePage = () => {
  return <div>首页内容</div>;
};

// 页面配置
HomePage.handle = {
  title: '首页',
  icon: 'mdi:home',
  keepAlive: true,      // 是否缓存页面
  constant: false,      // 是否为常量路由（不需要权限）
  hideInMenu: false,    // 是否在菜单中隐藏
  order: 1             // 菜单排序
};

export default HomePage;
```

## 动态路由

支持动态路由参数：

```tsx
// src/pages/(base)/user/[id].tsx
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  return <div>用户详情: {id}</div>;
};

export default UserDetail;
```

## 嵌套路由

支持多级嵌套路由：

```tsx
// src/pages/(base)/system/user/index.tsx
const UserList = () => {
  return <div>用户列表</div>;
};

// src/pages/(base)/system/user/[id].tsx
const UserDetail = () => {
  return <div>用户详情</div>;
};
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

项目支持路由守卫功能，可以在路由跳转前进行权限检查：

```tsx
// src/features/router/initRouter.ts
import { createBrowserRouter } from 'react-router-dom';

export function initRouter() {
  const router = createBrowserRouter(routes, {
    basename: import.meta.env.VITE_BASE_URL,
  });

  // 路由守卫
  router.subscribe((state) => {
    const { pathname } = state.location;
    
    // 检查权限
    if (!hasPermission(pathname)) {
      router.navigate('/403');
    }
  });

  return router;
}
```

## 路由缓存

支持页面缓存功能，通过 `keepAlive` 配置：

```tsx
// 启用页面缓存
HomePage.handle = {
  keepAlive: true
};
```

## 路由配置示例

```tsx
// src/pages/(base)/system/index.tsx
const SystemPage = () => {
  return <div>系统管理</div>;
};

SystemPage.handle = {
  title: '系统管理',
  icon: 'mdi:cog',
  children: [
    {
      path: 'user',
      title: '用户管理',
      icon: 'mdi:account-group'
    },
    {
      path: 'role',
      title: '角色管理', 
      icon: 'mdi:shield-account'
    }
  ]
};

export default SystemPage;
```

## 常见问题

### Q: 如何添加新页面？

A: 在 `src/pages/` 目录下创建对应的文件，系统会自动生成路由。

### Q: 如何配置页面权限？

A: 在页面的 `handle` 中设置 `constant: false`，然后在权限管理中添加对应配置。

### Q: 如何自定义路由布局？

A: 在路由组目录下创建 `layout.tsx` 文件，定义该组的布局组件。 
