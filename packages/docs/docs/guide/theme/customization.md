---
sidebar_position: 2
---

# 主题配置

本章节介绍如何配置和自定义 ChikoAdmin 的主题系统，包括颜色配置、布局模式、主题 tokens 等。

## 配置文件

主题配置主要集中在以下文件中：

- `src/theme/settings.ts` - 主题默认配置和覆盖配置
- `src/theme/vars.ts` - CSS 变量定义和主题 tokens
- `src/stores/modules/theme.ts` - 主题状态管理和 Redux actions
- `src/features/theme/shared.ts` - 主题工具函数和 Ant Design 集成

## 布局模式配置

项目支持四种布局模式：

### 垂直布局 (vertical)
侧边栏在左侧，顶部导航栏，主内容区在右侧。适合内容较多的应用。

### 水平布局 (horizontal)
导航栏在顶部，主内容区在下方。适合导航项较少的应用。

### 垂直混合布局 (vertical-mix)
一级菜单在左侧，二级菜单在顶部，主内容区在右下。适合多级菜单的应用。

### 水平混合布局 (horizontal-mix)
一级菜单在顶部，二级菜单在左侧，主内容区在右下。适合复杂导航结构。

### 布局切换

使用 Redux 的 `setLayoutMode` action 来切换布局模式：

```tsx
import { useAppDispatch } from '@/stores';
import { setLayoutMode } from '@/stores/modules/theme';

const dispatch = useAppDispatch();

// 切换到垂直布局
dispatch(setLayoutMode('vertical'));

// 切换到水平布局  
dispatch(setLayoutMode('horizontal'));
```

## 颜色配置

### 主题色配置

主题色是应用的核心颜色，在 `src/theme/settings.ts` 中定义：

```typescript
export const themeSettings: App.Theme.ThemeSetting = {
  themeColor: '#F43F5E',  // 主色调
  otherColor: {
    error: '#f5222d',      // 错误色
    info: '#2080f0',       // 信息色
    success: '#52c41a',    // 成功色
    warning: '#faad14'     // 警告色
  }
};
```

### 颜色调色板

项目使用 `@chiko-admin/color` 包自动生成颜色调色板，支持 50-950 的色阶：

```typescript
// 自动生成的颜色变量
const colorPaletteVars = {
  primary: 'rgb(var(--primary-color))',
  'primary-50': 'rgb(var(--primary-50-color))',
  'primary-100': 'rgb(var(--primary-100-color))',
  // ... 更多色阶
  'primary-950': 'rgb(var(--primary-950-color))'
};
```

### 推荐颜色模式

启用推荐颜色模式后，系统会自动调整颜色以提供更好的视觉体验：

```typescript
// 启用推荐颜色
dispatch(setRecommendColor(true));
```

## 主题 Tokens

主题 tokens 是主题系统的核心，定义了设计系统的基础变量。

### 基础 Tokens

```typescript
// 亮色主题基础 tokens
light: {
  colors: {
    'base-text': 'rgb(31, 31, 31)',      // 基础文字色
    container: 'rgb(255, 255, 255)',      // 容器背景色
    layout: 'rgb(247, 250, 252)'          // 布局背景色
  },
  boxShadow: {
    header: '0 1px 2px rgb(0, 21, 41, 0.08)',  // 头部阴影
    sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)' // 侧边栏阴影
  }
}

// 暗色主题基础 tokens
dark: {
  colors: {
    'base-text': 'rgb(224, 224, 224)',   // 基础文字色
    container: 'rgb(28, 28, 28)',         // 容器背景色
    layout: 'rgb(18, 18, 18)'             // 布局背景色
  }
}
```

### 动态 Tokens

主题系统会根据主题色动态生成相关的 tokens：

```typescript
// 动态生成的主题色相关 tokens
const dynamicTokens = {
  colors: {
    primary: themeColor,                    // 主色
    'primary-50': colorPalette.primary[50], // 主色 50 色阶
    'primary-100': colorPalette.primary[100], // 主色 100 色阶
    // ... 更多动态生成的色阶
  }
};
```

## Ant Design 主题集成

项目使用 Ant Design 作为 UI 组件库，主题配置会同步到 Ant Design。

### ConfigProvider 配置

通过 `getAntdTheme` 函数生成 Ant Design 主题配置：

```typescript
import { getAntdTheme } from '@/features/theme/shared';

const antdTheme = getAntdTheme(themeColors, darkMode, tokens);

// 在 ConfigProvider 中使用
<ConfigProvider theme={antdTheme}>
  {children}
</ConfigProvider>
```

### 主题算法

系统会根据当前主题模式自动选择 Ant Design 的主题算法：

- **亮色模式**: 使用 `defaultAlgorithm`
- **暗色模式**: 使用 `darkAlgorithm`

## 辅助功能

### 色弱模式

为色弱用户提供辅助支持：

```typescript
// 启用色弱模式
dispatch(setColourWeakness(true));
```

### 灰度模式

提供灰度显示模式：

```typescript
// 启用灰度模式
dispatch(setGrayscale(true));
```

## 主题设置管理

### 获取主题设置

```tsx
import { useAppSelector } from '@/stores';
import { getThemeSettings } from '@/stores/modules/theme';

function MyComponent() {
  const themeSettings = useAppSelector(getThemeSettings);
  
  return (
    <div>
      <p>布局模式: {themeSettings.layout.mode}</p>
      <p>主题色: {themeSettings.themeColor}</p>
    </div>
  );
}
```

### 更新主题设置

```tsx
import { useAppDispatch } from '@/stores';
import { updateThemeColors } from '@/stores/modules/theme';

function ThemeCustomizer() {
  const dispatch = useAppDispatch();
  
  const changePrimaryColor = (color: string) => {
    dispatch(updateThemeColors({ color, key: 'primary' }));
  };
  
  return (
    <input 
      type="color" 
      onChange={(e) => changePrimaryColor(e.target.value)}
    />
  );
}
```