---
sidebar_position: 3
---

# 主题配置

ChikoAdmin 提供了完整的主题系统，支持明暗主题切换、主题色定制、布局模式切换等功能。

## 主题特性

- **明暗主题切换**: 支持亮色和暗色主题
- **主题色定制**: 可自定义主题色
- **布局模式**: 支持多种布局模式
- **响应式设计**: 适配不同屏幕尺寸
- **CSS 变量**: 基于 CSS 变量的主题系统

## 主题配置

### 基础配置

```tsx
// src/features/theme/themeContext.tsx
import { createContext, useContext } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  primaryColor: string;
  layoutMode: 'vertical' | 'horizontal' | 'horizontal-mix';
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
  setLayoutMode: (mode: string) => void;
}
```

### 主题 Hook

```tsx
import { useTheme } from '@/features/theme';

const MyComponent = () => {
  const { 
    theme, 
    primaryColor, 
    layoutMode,
    toggleTheme, 
    setPrimaryColor,
    setLayoutMode 
  } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>
        切换主题: {theme === 'light' ? '暗色' : '亮色'}
      </button>
      
      <input 
        type="color" 
        value={primaryColor}
        onChange={(e) => setPrimaryColor(e.target.value)}
      />
      
      <select value={layoutMode} onChange={(e) => setLayoutMode(e.target.value)}>
        <option value="vertical">垂直布局</option>
        <option value="horizontal">水平布局</option>
        <option value="horizontal-mix">混合布局</option>
      </select>
    </div>
  );
};
```

## 主题色配置

### 预设主题色

项目提供了多种预设主题色：

```tsx
const presetColors = [
  '#1890ff',  // 蓝色
  '#52c41a',  // 绿色
  '#faad14',  // 橙色
  '#f5222d',  // 红色
  '#722ed1',  // 紫色
  '#13c2c2',  // 青色
  '#eb2f96',  // 粉色
  '#fa8c16'   // 深橙色
];
```

### 自定义主题色

```tsx
// 使用颜色选择器
const ColorPicker = () => {
  const { primaryColor, setPrimaryColor } = useTheme();
  
  return (
    <input 
      type="color" 
      value={primaryColor}
      onChange={(e) => setPrimaryColor(e.target.value)}
    />
  );
};
```

## 布局模式

### 垂直布局 (Vertical)

```tsx
// 侧边栏在左侧的垂直布局
<Layout>
  <Sider>
    <Menu />
  </Sider>
  <Layout>
    <Header />
    <Content />
  </Layout>
</Layout>
```

### 水平布局 (Horizontal)

```tsx
// 菜单在顶部的水平布局
<Layout>
  <Header>
    <Menu mode="horizontal" />
  </Header>
  <Content />
</Layout>
```

### 混合布局 (Horizontal-Mix)

```tsx
// 一级菜单在顶部，子菜单在侧边
<Layout>
  <Header>
    <Menu mode="horizontal" />
  </Header>
  <Layout>
    <Sider>
      <SubMenu />
    </Sider>
    <Content />
  </Layout>
</Layout>
```

## 主题切换

### 自动主题切换

```tsx
// 根据系统主题自动切换
import { usePreferredColorScheme } from '@/hooks/business/usePreferredColorScheme';

const ThemeProvider = ({ children }) => {
  const systemTheme = usePreferredColorScheme();
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    if (systemTheme) {
      setTheme(systemTheme);
    }
  }, [systemTheme]);
  
  return children;
};
```

### 手动主题切换

```tsx
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
```

## CSS 变量

主题系统基于 CSS 变量实现：

```css
/* 亮色主题 */
[data-theme='light'] {
  --primary-color: #1890ff;
  --bg-color: #ffffff;
  --text-color: #000000;
  --border-color: #d9d9d9;
  --menu-bg: #001529;
  --menu-text: #ffffff;
}

/* 暗色主题 */
[data-theme='dark'] {
  --primary-color: #1890ff;
  --bg-color: #141414;
  --text-color: #ffffff;
  --border-color: #434343;
  --menu-bg: #001529;
  --menu-text: #ffffff;
}
```

## 主题持久化

主题配置会自动保存到本地存储：

```tsx
// src/features/theme/themeContext.tsx
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('primaryColor') || '#1890ff';
  });
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem('primaryColor', primaryColor);
  }, [primaryColor]);
  
  return (
    <ThemeContext.Provider value={{
      theme,
      primaryColor,
      setTheme,
      setPrimaryColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## 主题配置组件

### 主题设置抽屉

```tsx
// src/layouts/modules/theme-drawer/index.tsx
import { Drawer, Switch, ColorPicker } from 'antd';
import { useTheme } from '@/features/theme';

const ThemeDrawer = ({ open, onClose }) => {
  const { theme, primaryColor, toggleTheme, setPrimaryColor } = useTheme();
  
  return (
    <Drawer title="主题设置" open={open} onClose={onClose}>
      <div>
        <h4>主题模式</h4>
        <Switch 
          checked={theme === 'dark'}
          onChange={toggleTheme}
          checkedChildren="暗色"
          unCheckedChildren="亮色"
        />
      </div>
      
      <div>
        <h4>主题色</h4>
        <ColorPicker 
          value={primaryColor}
          onChange={(color) => setPrimaryColor(color.toHexString())}
        />
      </div>
    </Drawer>
  );
};
```

## 响应式主题

支持在不同设备上自动调整主题：

```css
/* 移动端主题调整 */
@media (max-width: 768px) {
  [data-theme='light'] {
    --menu-bg: #ffffff;
    --menu-text: #000000;
  }
  
  [data-theme='dark'] {
    --menu-bg: #141414;
    --menu-text: #ffffff;
  }
}
```

## 主题配置示例

### 完整主题配置

```tsx
// src/features/theme/index.ts
export const themeConfig = {
  // 主题色配置
  primaryColors: [
    '#1890ff', '#52c41a', '#faad14', '#f5222d',
    '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'
  ],
  
  // 布局模式配置
  layoutModes: [
    { value: 'vertical', label: '垂直布局' },
    { value: 'horizontal', label: '水平布局' },
    { value: 'horizontal-mix', label: '混合布局' }
  ],
  
  // 主题配置
  themes: {
    light: {
      primaryColor: '#1890ff',
      bgColor: '#ffffff',
      textColor: '#000000'
    },
    dark: {
      primaryColor: '#1890ff',
      bgColor: '#141414',
      textColor: '#ffffff'
    }
  }
};
```

## 常见问题

### Q: 如何自定义主题色？

A: 使用 `useTheme` Hook 中的 `setPrimaryColor` 方法，或通过主题设置抽屉进行配置。

### Q: 如何切换布局模式？

A: 使用 `useTheme` Hook 中的 `setLayoutMode` 方法，支持 vertical、horizontal、horizontal-mix 三种模式。

### Q: 主题配置会保存吗？

A: 是的，主题配置会自动保存到 localStorage，刷新页面后会保持设置。

### Q: 如何添加新的主题色？

A: 在 `themeConfig.primaryColors` 数组中添加新的颜色值。 