---
sidebar_position: 2
---

# 国际化高级功能

ChikoAdmin 的国际化系统支持一些高级功能，让多语言支持更加完善。

## 复数形式

支持不同语言的复数规则：

```typescript
// 语言包
const common = {
  itemCount: '共 {{count}} 条',
  itemCount_plural: '共 {{count}} 条'
};

// 使用
t('common.itemCount', { count: 1 });  // "共 1 条"
t('common.itemCount', { count: 5 });  // "共 5 条"
```

## 嵌套对象

支持深层嵌套的语言包结构：

```typescript
const common = {
  buttons: {
    save: '保存',
    cancel: '取消'
  },
  messages: {
    success: '操作成功',
    error: '操作失败'
  }
};

// 使用
t('common.buttons.save');     // "保存"
t('common.messages.success'); // "操作成功"
```

## 类型安全

为语言包定义 TypeScript 类型，提供类型检查：

```typescript
declare namespace App {
  namespace I18n {
    interface LocaleSchema {
      common: {
        buttons: {
          save: string;
          cancel: string;
        };
        messages: {
          success: string;
          error: string;
        };
      };
    }
  }
}
```

## 性能优化

### 缓存翻译结果

```tsx
const translatedText = useMemo(() => {
  return t('common.welcome');
}, [t]);
```

### 懒加载语言包

```typescript
const loadLanguageAsync = async (language: string) => {
  const messages = await import(`./langs/${language}`);
  i18n.addResourceBundle(language, 'translation', messages.default, true, true);
  i18n.changeLanguage(language);
};
```