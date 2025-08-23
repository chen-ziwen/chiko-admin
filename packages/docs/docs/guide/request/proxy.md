---
sidebar_position: 3
---

# Vite 代理

ChikoAdmin 使用 Vite 的代理功能来解决开发环境中的跨域问题，让你可以轻松连接后端服务。

## 什么是 Vite 代理

Vite 代理是一个开发时功能，它：

- 在开发服务器和浏览器之间充当中间层
- 将特定的 API 请求转发到后端服务器
- 解决浏览器的同源策略限制
- 只在开发环境中生效，不影响生产环境

## 快速开始

### 启用代理

在 `.env` 文件中配置：

```bash
# 是否启用 HTTP 代理
VITE_HTTP_PROXY=Y
```

### 配置代理规则

代理规则在 `vite.config.ts` 中配置，项目已经预设了常用的代理规则。

## 代理配置

### 基础配置

代理配置位于 `vite.config.ts` 文件中，使用 `server.proxy` 选项：

```tsx
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
```

### 环境配置

项目支持不同环境的代理配置，通过环境变量控制：

- **开发环境**: 使用本地后端服务
- **测试环境**: 使用测试服务器
- **生产环境**: 不使用代理

## 代理规则

### API 代理

所有以 `/api` 开头的请求都会被代理到后端服务器。

### 静态资源代理

静态资源（如图片、文件）的请求也会被代理，确保资源能正确加载。

### WebSocket 代理

支持 WebSocket 连接的代理，用于实时通信功能。

## 环境变量

### 代理开关

- `VITE_HTTP_PROXY=Y`: 启用代理
- `VITE_HTTP_PROXY=N`: 禁用代理

### 后端地址

- `VITE_API_BASE_URL`: 后端 API 的基础地址
- `VITE_API_TIMEOUT`: API 请求超时时间

## 使用方式

### 发送请求

在代码中正常发送 API 请求，代理会自动处理：

```tsx
// 这个请求会被代理到后端
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

### 请求拦截器

项目配置了请求拦截器，自动添加必要的请求头和处理响应。

### 错误处理

代理请求的错误会被统一处理，包括网络错误、超时等。

## 常见配置

### 跨域处理

```tsx
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,        // 修改请求头中的 Origin
    secure: false,             // 支持 HTTPS
    ws: true                   // 支持 WebSocket
  }
}
```

### 路径重写

```tsx
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    rewrite: (path) => path.replace(/^\/api/, '')  // 移除 /api 前缀
  }
}
```

### 多个后端

```tsx
proxy: {
  '/api': {
    target: 'http://localhost:3000'
  },
  '/auth': {
    target: 'http://localhost:3001'
  }
}
```

## 调试技巧

### 查看代理日志

在 Vite 开发服务器的控制台中可以看到代理请求的日志信息。

### 检查网络面板

在浏览器的开发者工具中查看网络请求，确认请求是否被正确代理。

### 验证代理配置

可以通过修改代理配置来测试不同的后端地址。

## 常见问题

### Q: 代理不生效怎么办？

A: 检查环境变量 `VITE_HTTP_PROXY` 是否设置为 `Y`，以及代理配置是否正确。

### Q: 跨域问题仍然存在怎么办？

A: 确认代理配置中的 `changeOrigin: true` 选项已启用。

### Q: 请求超时怎么办？

A: 检查 `VITE_API_TIMEOUT` 配置，以及后端的响应时间。

### Q: WebSocket 连接失败怎么办？

A: 确认代理配置中启用了 `ws: true` 选项。