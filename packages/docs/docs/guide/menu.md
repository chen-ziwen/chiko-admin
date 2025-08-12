---
sidebar_position: 2
---

# 菜单配置

ChikoAdmin 提供了灵活的菜单配置系统，支持多级菜单、权限控制、图标配置等功能。

## 菜单结构

菜单基于路由自动生成，通过页面的 `handle` 配置来控制菜单的显示和样式：

```tsx
// 页面配置示例
PageComponent.handle = {
  title: '页面标题',           // 菜单显示名称
  icon: 'mdi:home',          // 菜单图标
  hideInMenu: false,         // 是否在菜单中隐藏
  order: 1,                  // 菜单排序
  children: []               // 子菜单配置
};
```

## 菜单配置选项

| 属性         | 类型    | 说明                         | 默认值     |
| ------------ | ------- | ---------------------------- | ---------- |
| `title`      | string  | 菜单显示名称                 | -          |
| `icon`       | string  | 菜单图标                     | `mdi:menu` |
| `hideInMenu` | boolean | 是否在菜单中隐藏             | `false`    |
| `order`      | number  | 菜单排序（数字越小越靠前）   | `0`        |
| `children`   | array   | 子菜单配置                   | `[]`       |
| `constant`   | boolean | 是否为常量路由（不需要权限） | `false`    |

## 图标配置

项目支持多种图标类型：

### Iconify 图标

```tsx
PageComponent.handle = {
  icon: 'mdi:home',           // Material Design Icons
  icon: 'carbon:user',        // Carbon Icons
  icon: 'fa:user',            // Font Awesome
  icon: 'ri:user-line'        // Remix Icons
};
```

### 本地图标

```tsx
PageComponent.handle = {
  icon: 'icon-local:custom-icon'  // 本地 SVG 图标
};
```

## 多级菜单

支持无限层级的菜单嵌套：

```tsx
// 一级菜单
const SystemPage = () => <div>系统管理</div>;

SystemPage.handle = {
  title: '系统管理',
  icon: 'mdi:cog',
  children: [
    {
      path: 'user',
      title: '用户管理',
      icon: 'mdi:account-group',
      children: [
        {
          path: 'list',
          title: '用户列表',
          icon: 'mdi:format-list-bulleted'
        },
        {
          path: 'add',
          title: '添加用户',
          icon: 'mdi:account-plus'
        }
      ]
    },
    {
      path: 'role',
      title: '角色管理',
      icon: 'mdi:shield-account'
    }
  ]
};
```

## 菜单布局

项目支持多种菜单布局模式：

### 垂直菜单

```tsx
// src/layouts/modules/menu/components/VerticalMenu.tsx
<VerticalMenu 
  mode="vertical"
  collapsed={collapsed}
  items={menuItems}
/>
```

### 水平菜单

```tsx
// src/layouts/modules/menu/components/HorizontalMenu.tsx
<HorizontalMenu 
  mode="horizontal"
  items={menuItems}
/>
```

### 混合菜单

```tsx
// src/layouts/modules/menu/components/HorizontalMix.tsx
<HorizontalMix 
  mode="horizontal-mix"
  items={menuItems}
/>
```

## 菜单权限

菜单支持基于权限的显示控制：

```tsx
// 配置需要权限的菜单
PageComponent.handle = {
  title: '用户管理',
  icon: 'mdi:account-group',
  constant: false,  // 需要权限验证
  permission: 'system:user:view'  // 所需权限
};
```

## 菜单状态管理

菜单状态通过 Redux 进行管理：

```tsx
// src/stores/modules/menu.ts
import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    collapsed: false,
    selectedKeys: [],
    openKeys: []
  },
  reducers: {
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    setSelectedKeys: (state, action) => {
      state.selectedKeys = action.payload;
    },
    setOpenKeys: (state, action) => {
      state.openKeys = action.payload;
    }
  }
});
```

## 菜单 Hook

提供了便捷的菜单操作 Hook：

```tsx
import { useMenu } from '@/features/menu';

const MyComponent = () => {
  const { 
    collapsed, 
    toggleCollapsed, 
    selectedKeys, 
    openKeys 
  } = useMenu();

  return (
    <div>
      <button onClick={toggleCollapsed}>
        {collapsed ? '展开' : '收起'}
      </button>
    </div>
  );
};
```

## 菜单配置示例

### 基础菜单

```tsx
// src/pages/(base)/home/index.tsx
const HomePage = () => <div>首页</div>;

HomePage.handle = {
  title: '首页',
  icon: 'mdi:home',
  order: 1
};
```

### 带子菜单的页面

```tsx
// src/pages/(base)/system/index.tsx
const SystemPage = () => <div>系统管理</div>;

SystemPage.handle = {
  title: '系统管理',
  icon: 'mdi:cog',
  order: 2,
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
    },
    {
      path: 'permission',
      title: '权限管理',
      icon: 'mdi:shield-check'
    }
  ]
};
```

### 隐藏菜单的页面

```tsx
// src/pages/(base)/user/detail.tsx
const UserDetailPage = () => <div>用户详情</div>;

UserDetailPage.handle = {
  title: '用户详情',
  hideInMenu: true  // 在菜单中隐藏
};
```

## 菜单样式定制

可以通过 CSS 变量定制菜单样式：

```css
:root {
  --menu-bg-color: #001529;
  --menu-text-color: #fff;
  --menu-hover-bg-color: #1890ff;
  --menu-selected-bg-color: #1890ff;
}
```

## 常见问题

### Q: 如何添加新的菜单项？

A: 在 `src/pages/` 目录下创建页面文件，并在页面组件上配置 `handle` 属性。

### Q: 如何控制菜单的显示顺序？

A: 使用 `order` 属性，数字越小排序越靠前。

### Q: 如何隐藏某个菜单项？

A: 在页面的 `handle` 中设置 `hideInMenu: true`。

### Q: 如何配置菜单权限？

A: 设置 `constant: false` 并配置相应的权限标识。 