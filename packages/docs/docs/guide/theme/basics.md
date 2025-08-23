---
sidebar_position: 1
---

# 主题概述

ChikoAdmin 的主题系统分为两个部分：组件库的主题配置和 UnoCSS 的主题配置。为了统一两个部分的主题配置，在这之上维护了一些主题配置，通过这些主题配置分别控制组件库和 UnoCSS 的主题配置。

## 原理

- 定义一些主题配置的变量，包括各种主题颜色、布局的参数配置等
- 通过这些配置产出符合组件库的主题变量  
- 通过这些配置产出一些主题 tokens 并衍生出对应的 CSS 变量，再将这些 CSS 变量传递给 UnoCSS

## 主题模式

项目支持三种主题模式：

- **light**: 亮色主题
- **dark**: 暗色主题  
- **system**: 跟随系统主题

### 主题切换

使用 `useTheme` Hook 进行主题切换，这个 Hook 提供了以下功能：

- `themeScheme`: 当前主题模式
- `darkMode`: 是否为暗色模式
- `setThemeScheme()`: 设置主题模式
- `toggleThemeScheme()`: 切换主题模式

### 主题图标

每种主题模式都有对应的图标，图标来自 Material Symbols 图标库：

```typescript
export const icons: Record<ThemeModeType, string> = {
  dark: 'material-symbols:nightlight-rounded',
  light: 'material-symbols:sunny',
  system: 'material-symbols:brightness-auto'
};
```

## 主题上下文

项目使用 React Context 管理主题状态，通过 `ThemeProvider` 包裹应用，让所有子组件都能访问主题状态。

### ThemeProvider 功能

- 从本地存储读取主题设置
- 监听系统主题变化
- 自动切换 CSS 类名
- 提供主题上下文给子组件

## CSS 变量系统

项目使用 CSS 变量实现主题切换，主要变量包括：

- **主色调**: 按钮、链接等主要元素的颜色
- **背景色**: 页面、卡片、弹窗等背景颜色
- **文字色**: 主要文字、次要文字、禁用文字等颜色

### 主题 Tokens

主题系统使用 tokens 来管理设计变量：

```typescript
// 亮色主题 tokens
light: {
  colors: {
    'base-text': 'rgb(31, 31, 31)',
    container: 'rgb(255, 255, 255)',
    layout: 'rgb(247, 250, 252)'
  },
  boxShadow: {
    header: '0 1px 2px rgb(0, 21, 41, 0.08)',
    sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)'
  }
}

// 暗色主题 tokens
dark: {
  colors: {
    'base-text': 'rgb(224, 224, 224)',
    container: 'rgb(28, 28, 28)',
    layout: 'rgb(18, 18, 18)'
  }
}
```

## 主题设置

项目的主题设置存储在 Redux store 中，包括布局模式、菜单配置等。你可以通过 `useAppSelector` 获取主题设置，通过 `useAppDispatch` 更新主题设置。

### 主要设置项

- **布局模式**: vertical、horizontal、vertical-mix、horizontal-mix
- **主题色**: 主色调和辅助色配置
- **页面设置**: 动画、水印等配置
- **辅助功能**: 色弱模式、灰度模式等

## 主题组件

项目提供了预制的主题切换组件：

- `ThemeSchemaSwitch`: 主题切换开关
- `ThemeSchemaSegmented`: 主题选择器

## 主题持久化

主题设置会自动保存到本地存储，页面刷新后会自动恢复。支持存储主题模式、布局配置等设置。

## 响应式主题

### 跟随系统主题

当主题模式设置为 `system` 时，会自动跟随系统主题变化。项目使用媒体查询 `prefers-color-scheme` 来检测系统主题。

### 主题监听

项目会自动监听系统主题变化，当系统主题改变时，如果当前设置为跟随系统，会自动切换主题。 