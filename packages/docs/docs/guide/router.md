---
sidebar_position: 1
---

# 路由配置

ChikoAdmin 使用 [Better Pages Create](https://github.com/chen-ziwen/better-pages-create) 进行基于文件系统的路由管理。该插件基于 React Router v7，支持约定式路由、动态路由、嵌套布局等功能。

> 📖 **详细文档**: 如需了解 Better Pages Create 的完整功能和配置，请访问 [Better Pages Create 官方文档](https://github.com/chen-ziwen/better-pages-create)

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

### 元信息配置说明

#### 基础配置项

| 属性              | 类型      | 说明                             |
| ----------------- | --------- | -------------------------------- |
| `title`           | `string`  | 路由标题，用于文档标题和菜单显示 |
| `i18nKey`         | `string`  | 国际化键值，如果设置将用于i18n   |
| `keepAlive`       | `boolean` | 是否缓存该路由                   |
| `constant`        | `boolean` | 是否为常量路由，无需登录         |
| `order`           | `number`  | 路由排序顺序                     |
| `href`            | `string`  | 路由的外部链接                   |
| `multiTab`        | `boolean` | 是否允许多标签页                 |
| `fixedIndexInTab` | `number`  | 固定标签页的顺序                 |
| `query`           | `array`   | 路由查询参数                     |

#### ChikoAdmin 扩展配置项

| 属性         | 类型       | 说明                     |
| ------------ | ---------- | ------------------------ |
| `roles`      | `string[]` | 路由的角色列表           |
| `icon`       | `string`   | Iconify 图标             |
| `localIcon`  | `string`   | 本地图标                 |
| `hideInMenu` | `boolean`  | 是否在菜单中隐藏该路由   |
| `activeMenu` | `string`   | 进入该路由时激活的菜单键 |

### 注意事项

#### 图标获取
`icon` 图标值可以从 [Iconify](https://icones.js.org/) 获取，支持所有 Iconify 图标库。

#### 隐藏菜单项
如果在 pages 中创建了一个路由页面，需要在其他地方调用但不在菜单中显示，那么需要设置 `hideInMenu: true`。

**示例：**
```tsx
// src/pages/_error/403/index.tsx
import React from 'react';

/**
 * @handle {
 *   "constant": true
 * }
 */
export default function Error403() {
  return <div>403 错误页面</div>;
}
```

#### 激活其他菜单
当进入一个不在菜单中的页面时，可以通过 `activeMenu` 指定要激活的菜单项：

```tsx
// src/pages/(base)/system/user/[id]/index.tsx
/**
 * @handle {
 *   "activeMenu": "/system/user",
 *   "hideInMenu": true
 * }
 */
const UserDetail = () => {
  // 用户详情页面
};
```

## 配置示例

### 基础路由配置

```tsx
// src/pages/(base)/system/index.tsx
/**
 * @handle {
 *   "keepAlive": true,
 *   "order": 1,
 *   "roles": ["R_ADMIN"]
 * }
 */
export default function SystemPage() {
  return <div>系统管理</div>;
}
```

### 权限路由配置

```tsx
// src/pages/(base)/system/user/index.tsx
/**
 * @handle {
 *   "keepAlive": true,
 *   "order": 1,
 *   "roles": ["R_ADMIN"]
 * }
 */
const UserManage = () => {
  // 用户管理页面
};
```

### 外部链接路由

```tsx
/**
 * @handle {
 *   "title": "外部链接",
 *   "href": "https://example.com",
 *   "icon": "mdi:external-link"
 * }
 */
const ExternalPage = () => <div>外部页面</div>;
```

### 多标签页路由

```tsx
/**
 * @handle {
 *   "title": "多标签页",
 *   "multiTab": true,
 *   "icon": "mdi:tab-plus"
 * }
 */
const MultiTabPage = () => <div>多标签页</div>;
```

### 固定标签页路由

```tsx
/**
 * @handle {
 *   "title": "固定标签页",
 *   "fixedIndexInTab": 1,
 *   "icon": "mdi:pin"
 * }
 */
const FixedTabPage = () => <div>固定标签页</div>;
```

### 带查询参数的路由

```tsx
/**
 * @handle {
 *   "title": "查询页面",
 *   "query": [
 *     { "key": "type", "value": "list" },
 *     { "key": "status", "value": "active" }
 *   ],
 *   "icon": "mdi:filter"
 * }
 */
const QueryPage = () => <div>查询页面</div>;
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

项目支持路由守卫功能，可以在路由跳转前进行权限检查：

```tsx
// src/features/router/initRouter.ts
import { createBrowserRouter } from 'react-router-dom';

export function initRouter() {
  const router = createBrowserRouter(routes, {
    basename: import.meta.env.VITE_BASE_URL,
    patchRoutesOnNavigation: async ({ patch, path }) => {
      // 动态路由权限控制
      if (getIsNeedPatch(path)) {
        isAlreadyPatch = true;
        await initAuthRoutes(patch);
      }
    }
  });

  // 权限路由初始化
  if (getIsLogin(store.getState()) && !isAlreadyPatch) {
    initAuthRoutes(router.patchRoutes);
    isAlreadyPatch = true;
  }

  return {
    router,
    resetRoutes
  };
}
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
