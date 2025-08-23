---
sidebar_position: 1
---

# 国际化基础

ChikoAdmin 基于 `react-i18next` 实现了完整的国际化支持，支持中文和英文两种语言。

## 快速开始

### 在组件中使用翻译

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('common.title')}</h1>
      <button>{t('common.confirm')}</button>
    </div>
  );
}
```

### 切换语言

```tsx
import { useLang } from '@/features/lang';

function LanguageSwitcher() {
  const { locale, setLocale, localeOptions } = useLang();

  return (
    <div>
      {localeOptions.map(option => (
        <button
          key={option.key}
          onClick={() => setLocale(option.key)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
```

## 核心原理

### 国际化初始化

```typescript
// src/locales/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { localStg } from '@/utils/storage';
import locales from './locales';

export const i18nInstance = i18n.use(initReactI18next);

export async function setupI18n() {
  await i18nInstance.init({
    interpolation: {
      escapeValue: false
    },
    lng: localStg.get('lang') || 'zh-CN',
    resources: locales
  });
}

export const $t = i18nInstance.t;
```

### 语言资源映射

```typescript
// src/locales/locales.ts
import enUS from './langs/en-us';
import zhCN from './langs/zh-cn';

const locales = {
  'en-US': {
    translation: enUS
  },
  'zh-CN': {
    translation: zhCN
  }
};

export default locales;
```

## 语言包结构

```
src/locales/langs/
├── zh-cn/           # 中文语言包
│   ├── common.ts    # 通用翻译
│   ├── form.ts      # 表单相关翻译
│   ├── route.ts     # 路由相关翻译
│   └── index.ts     # 中文语言包入口
├── en-us/           # 英文语言包
│   ├── common.ts    # 通用翻译
│   ├── form.ts      # 表单相关翻译
│   ├── route.ts     # 路由相关翻译
│   └── index.ts     # 英文语言包入口
└── index.ts         # 语言包统一导出
```

## 语言包配置

### 中文语言包

```typescript
// src/locales/langs/zh-cn/common.ts
export default {
  title: 'ChikoAdmin',
  confirm: '确认',
  cancel: '取消',
  save: '保存',
  delete: '删除',
  edit: '编辑',
  add: '添加',
  search: '搜索',
  reset: '重置',
  loading: '加载中...',
  success: '操作成功',
  error: '操作失败',
  warning: '警告提示'
};
```

### 英文语言包

```typescript
// src/locales/langs/en-us/common.ts
export default {
  title: 'ChikoAdmin',
  confirm: 'Confirm',
  cancel: 'Cancel',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  add: 'Add',
  search: 'Search',
  reset: 'Reset',
  loading: 'Loading...',
  success: 'Operation successful',
  error: 'Operation failed',
  warning: 'Warning'
};
```

## 路由国际化

### 路由标题国际化

在路由元信息中使用 `i18nKey` 进行国际化：

```tsx
/**
 * @handle {
 *   title: '用户管理',
 *   i18nKey: 'route.user.title',
 *   icon: 'mdi:account-group'
 * }
 */
export default function UserPage() {
  return <div>用户管理页面</div>;
}
```

### 语言包配置

```typescript
// src/locales/langs/zh-cn/route.ts
export default {
  'user.title': '用户管理',
  'user.list': '用户列表',
  'user.add': '添加用户',
  'user.edit': '编辑用户',
  'user.delete': '删除用户'
};

// src/locales/langs/en-us/route.ts
export default {
  'user.title': 'User Management',
  'user.list': 'User List',
  'user.add': 'Add User',
  'user.edit': 'Edit User',
  'user.delete': 'Delete User'
};
```

## 表单国际化

### 表单标签国际化

```tsx
import { useTranslation } from 'react-i18next';

function UserForm() {
  const { t } = useTranslation();

  return (
    <form>
      <label>{t('form.user.name')}</label>
      <input type="text" placeholder={t('form.user.namePlaceholder')} />
      
      <label>{t('form.user.email')}</label>
      <input type="email" placeholder={t('form.user.emailPlaceholder')} />
      
      <button type="submit">{t('form.submit')}</button>
    </form>
  );
}
```

### 表单语言包

```typescript
// src/locales/langs/zh-cn/form.ts
export default {
  user: {
    name: '姓名',
    namePlaceholder: '请输入姓名',
    email: '邮箱',
    emailPlaceholder: '请输入邮箱地址'
  },
  submit: '提交',
  reset: '重置'
};

// src/locales/langs/en-us/form.ts
export default {
  user: {
    name: 'Name',
    namePlaceholder: 'Please enter your name',
    email: 'Email',
    emailPlaceholder: 'Please enter your email address'
  },
  submit: 'Submit',
  reset: 'Reset'
};
```

## 动态语言切换

### 语言切换 Hook

```tsx
// src/features/lang/useLang.ts
import { useTranslation } from 'react-i18next';
import { localStg } from '@/utils/storage';

export function useLang() {
  const { i18n } = useTranslation();
  
  const locale = i18n.language;
  
  const setLocale = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
    localStg.set('lang', newLocale);
  };
  
  const localeOptions = [
    { key: 'zh-CN', label: '中文' },
    { key: 'en-US', label: 'English' }
  ];
  
  return { locale, setLocale, localeOptions };
}
```

### 语言切换组件

```tsx
import { useLang } from '@/features/lang';

export function LanguageSwitcher() {
  const { locale, setLocale, localeOptions } = useLang();
  
  return (
    <div className="language-switcher">
      {localeOptions.map(option => (
        <button
          key={option.key}
          className={locale === option.key ? 'active' : ''}
          onClick={() => setLocale(option.key)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
```

## 常见问题

### Q: 翻译键不存在怎么办？

A: 如果翻译键不存在，系统会返回键名本身。确保所有使用的键都在语言包中定义。

### Q: 语言切换不生效怎么办？

A: 检查是否正确调用了 `i18n.changeLanguage()` 和 `localStg.set('lang')`。

### Q: 如何处理动态内容国际化？

A: 对于动态内容，可以使用参数化翻译或根据语言动态选择内容。