---
sidebar_position: 3
---

# 主题加载

ChikoAdmin 的主题加载机制确保主题在应用启动时能够正确初始化，并提供了优化的加载体验。

## 加载原理

主题系统在应用启动时按以下顺序执行：

1. **读取本地存储** - 从 `localStorage` 获取用户上次设置的主题
2. **应用系统偏好** - 如果没有存储的主题，则检测系统主题偏好
3. **初始化主题变量** - 设置 CSS 变量和类名
4. **同步组件库主题** - 更新 Ant Design 和其他组件库的主题

## 主题初始化

### ThemeProvider

`ThemeProvider` 是主题系统的核心组件，负责：

- 从本地存储读取主题设置
- 计算实际主题模式（考虑系统偏好）
- 应用主题到 DOM 元素
- 提供主题上下文给子组件

主题初始化完成后，会标记 `initialized` 状态，避免在主题未准备好时渲染应用。

### 系统主题监听

项目会自动监听系统主题变化，当系统主题改变时，如果当前设置为跟随系统，会自动切换主题：

```typescript
// 监听系统主题变化
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const handler = (event: MediaQueryListEvent) => {
  if (themeMode !== 'system') {
    return;
  }
  changeThemeMode(event.matches ? 'dark' : 'light');
};

mediaQuery.addEventListener('change', handler);
```

## CSS 变量注入

### 动态 CSS 变量

主题系统会动态生成 CSS 变量并注入到页面中：

```typescript
// 生成 CSS 变量字符串
const cssVarStr = getCssVarByTokens(tokens);
const darkCssVarStr = getCssVarByTokens(darkTokens);

// 注入到 style 标签
const css = `
  :root {
    ${cssVarStr}
  }
`;

const darkCss = `
  :root.${DARK_CLASS} {
    ${darkCssVarStr}
  }
`;
```

### 主题类名切换

通过添加/移除 CSS 类名来切换主题：

```typescript
export function toggleCssDarkMode(darkMode = false) {
  const htmlElementClassList = document.documentElement.classList;

  if (darkMode) {
    htmlElementClassList.add(DARK_CLASS);
  } else {
    htmlElementClassList.remove(DARK_CLASS);
  }
}
```

## 主题设置初始化

### 本地存储读取

主题设置从本地存储读取，如果没有则使用默认配置：

```typescript
export function initThemeSettings() {
  const settings = localStg.get('themeSettings') || themeSettings;
  return settings;
}
```

### 生产环境覆盖

在生产环境中，可以通过 `overrideThemeSettings` 覆盖某些主题设置：

```typescript
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {
  watermark: {
    text: 'ChikoAdmin',
    visible: false
  }
};
```

## 主题颜色生成

### 颜色调色板

使用 `@chiko-admin/color` 包自动生成颜色调色板：

```typescript
function createThemePaletteColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[];
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  colorKeys.forEach(key => {
    const colorMap = getColorPalette(colors[key], recommended);
    
    colorPaletteVar[key] = colorMap.get(500)!;
    
    colorMap.forEach((hex, number) => {
      colorPaletteVar[`${key}-${number}`] = hex;
    });
  });

  return colorPaletteVar;
}
```

### 推荐颜色模式

启用推荐颜色模式后，系统会自动调整颜色以提供更好的视觉体验：

```typescript
if (state.settings.recommendColor) {
  colorValue = getPaletteColorByNumber(color, 500, true);
}
```

## Ant Design 主题同步

### 主题算法选择

根据当前主题模式自动选择 Ant Design 的主题算法：

```typescript
export function getAntdTheme(
  colors: App.Theme.ThemeColor,
  darkMode: boolean,
  tokens: App.Theme.ThemeSetting['tokens']
) {
  const { darkAlgorithm, defaultAlgorithm } = antdTheme;

  const theme: ConfigProviderProps['theme'] = {
    algorithm: [darkMode ? darkAlgorithm : defaultAlgorithm],
    // ... 其他配置
  };

  return theme;
}
```

### 组件样式定制

为特定组件定制样式：

```typescript
components: {
  Button: {
    controlHeightSM: 28
  },
  Menu: {
    itemSelectedBg: bgColor,
    darkItemBg: 'transparent'
  }
}
```

## 性能优化

### CSS 变量优化

- 使用 CSS 变量实现主题切换，避免重复的样式计算
- 通过 `requestAnimationFrame` 批量更新 CSS 变量
- 使用 CSS containment 优化重绘

### 缓存策略

- 主题设置缓存到本地存储
- 避免重复的主题计算
- 使用 `useMemo` 缓存翻译结果

## 错误处理

### 主题加载错误

如果主题加载失败，系统会：

- 记录错误信息
- 自动降级到默认主题
- 通知用户并提供重试选项

### 兜底方案

`ThemeFallback` 组件在主题出现问题时提供友好的错误提示和恢复选项。