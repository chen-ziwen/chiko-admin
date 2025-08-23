---
sidebar_position: 2
---

# MSW Mock

ChikoAdmin 使用 MSW (Mock Service Worker) 来模拟 API 请求，让你可以在没有后端服务的情况下进行前端开发。

## 什么是 MSW

MSW 是一个 API 模拟库，它通过 Service Worker 拦截网络请求，让你可以：

- 在开发环境中模拟真实的 API 响应
- 测试各种网络场景（成功、失败、延迟等）
- 在没有后端的情况下进行前端开发

## 快速开始

### 启动 MSW

在开发环境中，MSW 会自动启动。你可以在浏览器控制台看到 MSW 的启动信息。

### 使用 Mock 数据

一旦 MSW 启动，所有的 API 请求都会被拦截并返回 Mock 数据。你不需要修改任何业务代码。

## 配置说明

### 浏览器环境

MSW 在浏览器环境中通过 Service Worker 工作，配置文件位于 `src/mocks/browser.ts`。

### Node 环境

在 Node 环境中（如测试），MSW 使用不同的配置方式，配置文件位于 `src/mocks/node.ts`。

## Mock 处理器

### 内置处理器

项目内置了以下 Mock 处理器：

- **认证相关**: 登录、登出、用户信息等
- **用户管理**: 用户列表、用户详情、角色管理等
- **路由权限**: 菜单数据、权限验证等

### 添加新的 Mock 处理器

你可以在 `src/mocks/handlers/` 目录下添加新的处理器文件，然后在 `src/mocks/handlers/index.ts` 中导入。

## 开发技巧

### 模拟网络延迟

```tsx
import { delay } from 'msw';

// 模拟 1 秒延迟
delay(1000)
```

### 模拟错误状态

```tsx
import { http } from 'msw';

// 模拟 500 错误
http.get('/api/error', () => {
  return http.error(500, 'Internal Server Error');
})
```

## 环境配置

- **开发环境**: MSW 会自动启动并拦截所有匹配的请求
- **生产环境**: MSW 不会启动，所有请求会正常发送到后端
- **测试环境**: MSW 会使用 Node 配置，确保测试的一致性

## 常见问题

### Q: MSW 没有启动怎么办？

A: 检查浏览器控制台是否有 MSW 相关的错误信息，确保 Service Worker 正确注册。

### Q: 请求没有被拦截怎么办？

A: 确认请求的 URL 和 HTTP 方法是否与 Mock 处理器中定义的规则匹配。