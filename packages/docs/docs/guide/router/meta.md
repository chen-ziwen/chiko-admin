---
sidebar_position: 2
---

# 路由元信息

路由元信息用于配置路由的各种属性，包括标题、权限、缓存等。

## 元信息接口

```typescript
interface RouteMeta {
  /** 路由标题，可用于文档标题中 */
  title: string;
  /** 路由的国际化键值，如果设置，将用于i18n，此时title将被忽略 */
  i18nKey?: App.I18n.I18nKey;
  /** 路由的角色列表，当前用户拥有至少一个角色时，允许访问该路由 */
  roles?: string[];
  /** 是否缓存该路由 */
  keepAlive?: boolean;
  /** 是否为常量路由，无需登录，并且该路由在前端定义 */
  constant?: boolean;
  /** Iconify 图标，可用于菜单或面包屑中 */
  icon?: string;
  /** 本地图标，存在于 "src/assets/svg-icon" 目录下 */
  localIcon?: string;
  /** 路由排序顺序 */
  order?: number;
  /** 路由的外部链接 */
  href?: string;
  /** 是否在菜单中隐藏该路由 */
  hideInMenu?: boolean;
  /** 进入该路由时激活的菜单键 */
  activeMenu?: import('@elegant-router/types').RouteKey;
  /** 默认情况下，相同路径的路由会共享一个标签页，若设置为true，则使用多个标签页 */
  multiTab?: boolean;
  /** 若设置，路由将在标签页中固定显示，其值表示固定标签页的顺序 */
  fixedIndexInTab?: number;
  /** 路由查询参数，如果设置的话，点击菜单进入该路由时会自动携带的query参数 */
  query?: { key: string; value: string }[] | null;
}
```

## 基础属性

### title - 路由标题

```tsx
/**
 * @handle {
 *   title: '用户管理'
 * }
 */
export default function UserPage() {
  return <div>用户管理页面</div>;
}
```

### i18nKey - 国际化键值

```tsx
/**
 * @handle {
 *   title: '用户管理',
 *   i18nKey: 'route.user'
 * }
 */
export default function UserPage() {
  return <div>用户管理页面</div>;
}
```

## 权限控制

### roles - 角色权限

```tsx
/**
 * @handle {
 *   title: '管理员面板',
 *   roles: ['admin', 'super_admin']
 * }
 */
export default function AdminPage() {
  return <div>管理员页面</div>;
}
```

### constant - 常量路由

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

## 图标配置

### icon - Iconify 图标

```tsx
/**
 * @handle {
 *   title: '用户管理',
 *   icon: 'mdi:account-group'
 * }
 */
export default function UserPage() {
  return <div>用户管理页面</div>;
}
```

### localIcon - 本地图标

```tsx
/**
 * @handle {
 *   title: '系统设置',
 *   localIcon: 'system'
 * }
 */
export default function SystemPage() {
  return <div>系统设置页面</div>;
}
```

## 菜单控制

### hideInMenu - 隐藏菜单

```tsx
/**
 * @handle {
 *   title: '403',
 *   hideInMenu: true
 * }
 */
export default function ForbiddenPage() {
  return <div>无权限访问</div>;
}
```

### activeMenu - 激活菜单

```tsx
/**
 * @handle {
 *   title: '用户详情',
 *   activeMenu: 'user_list'
 * }
 */
export default function UserDetailPage() {
  return <div>用户详情页面</div>;
}
```

## 标签页控制

### keepAlive - 路由缓存

```tsx
/**
 * @handle {
 *   title: '用户列表',
 *   keepAlive: true
 * }
 */
export default function UserListPage() {
  return <div>用户列表页面</div>;
}
```

### multiTab - 多标签页

```tsx
/**
 * @handle {
 *   title: '用户详情',
 *   multiTab: true
 * }
 */
export default function UserDetailPage() {
  return <div>用户详情页面</div>;
}
```

### fixedIndexInTab - 固定标签页

```tsx
/**
 * @handle {
 *   title: '首页',
 *   fixedIndexInTab: 0
 * }
 */
export default function HomePage() {
  return <div>首页</div>;
}
```

## 外部链接

### href - 外部链接

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
```

## 查询参数

### query - 自动携带参数

```tsx
/**
 * @handle {
 *   title: '用户列表',
 *   query: [
 *     { key: 'page', value: '1' },
 *     { key: 'size', value: '10' }
 *   ]
 * }
 */
export default function UserListPage() {
  return <div>用户列表页面</div>;
}
```

## 排序控制

### order - 排序顺序

```tsx
/**
 * @handle {
 *   title: '首页',
 *   order: 1
 * }
 */
export default function HomePage() {
  return <div>首页</div>;
}
```

## 注意事项

- **图标来源**: `icon` 属性使用 [Iconify](https://icones.js.org/) 图标
- **本地图标**: `localIcon` 对应 `src/assets/svg-icon/` 目录下的文件
- **角色权限**: `roles` 为空数组时表示无需权限
- **菜单隐藏**: 使用 `hideInMenu: true` 隐藏菜单项
- **标签页固定**: 首页会自动固定，其他页面需要手动设置 