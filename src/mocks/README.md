# MSW Mock 服务配置

本项目使用 [MSW (Mock Service Worker)](https://mswjs.io/) 来提供本地 Mock 数据服务。

## 功能特性

- 🚀 **零配置启动**：无需额外的后端服务
- 🔄 **请求拦截**：在浏览器层面拦截网络请求
- 📝 **完整 API**：覆盖所有后台管理系统的核心接口
- 🎯 **类型安全**：使用 TypeScript 编写，提供完整的类型支持
- 🔧 **易于扩展**：模块化设计，方便添加新的 Mock 接口

## 快速开始

### 1. 启用 MSW 模式

在 `.env` 文件中设置：

```env
VITE_MOCK_MODE=msw
```

### 2. 启动开发服务器

```bash
pnpm dev
```

启动后，控制台会显示：
```
🔶 MSW Mock Service Worker started successfully
```

### 3. 测试登录

使用以下测试账号登录：
- **用户名**：`Chiko`
- **密码**：`123456`

## Mock 模式切换

项目支持多种 Mock 模式，通过环境变量 `VITE_MOCK_MODE` 控制：

- `msw`: 使用 MSW (Mock Service Worker) 进行接口模拟（推荐）
- `real`: 使用真实后端接口

在 `.env` 文件中设置：
```bash
# 使用 MSW Mock（推荐）
VITE_MOCK_MODE=msw

# 使用真实接口
VITE_MOCK_MODE=real
```

## API 接口列表

### 认证模块 (`/auth`)

- `POST /auth/login` - 用户登录
- `GET /auth/getUserInfo` - 获取用户信息
- `POST /auth/refreshToken` - 刷新令牌
- `GET /auth/error` - 自定义后端错误

### 系统管理模块 (`/systemManage`)

- `GET /systemManage/getRoleList` - 获取角色列表（支持分页和搜索）
- `GET /systemManage/getAllRoles` - 获取所有角色
- `GET /systemManage/getUserList` - 获取用户列表（支持分页和搜索）
- `GET /systemManage/getMenuList/v2` - 获取菜单列表 v2
- `GET /systemManage/getAllPages` - 获取所有页面
- `GET /systemManage/getMenuTree` - 获取菜单树

### 路由模块 (`/route`)

- `GET /route/getConstantRoutes` - 获取常量路由
- `GET /route/getUserRoutes` - 获取用户路由
- `GET /route/getReactUserRoutes` - 获取 React 用户路由
- `GET /route/isRouteExist` - 判断路由是否存在

## 文件结构

```
src/mocks/
├── handlers/
│   ├── auth.ts          # 认证相关接口
│   ├── system.ts        # 系统管理相关接口
│   ├── route.ts         # 路由相关接口
│   └── index.ts         # 导出所有 handlers
├── browser.ts           # MSW 浏览器配置
└── README.md           # 说明文档
```

## 扩展开发

### 添加新的 Mock 接口

1. 在对应的 handler 文件中添加新接口：

```typescript
// src/mocks/handlers/auth.ts
export const authHandlers = [
  // 现有接口...
  
  // 新增接口
  http.post('/auth/logout', () => {
    return HttpResponse.json({
      code: 200,
      message: '退出登录成功'
    });
  })
];
```

2. 如果需要新的模块，创建新的 handler 文件：

```typescript
// src/mocks/handlers/newModule.ts
import { http, HttpResponse } from 'msw';

export const newModuleHandlers = [
  http.get('/newModule/getData', () => {
    return HttpResponse.json({
      code: 200,
      message: '获取数据成功',
      data: []
    });
  })
];
```

3. 在 `src/mocks/handlers/index.ts` 中导入并导出：

```typescript
import { newModuleHandlers } from './newModule';

export const handlers = [
  ...authHandlers,
  ...systemHandlers,
  ...routeHandlers,
  ...newModuleHandlers  // 新增
];
```

### 模拟不同的响应状态

```typescript
// 成功响应
http.get('/api/success', () => {
  return HttpResponse.json({ code: 200, data: 'success' });
});

// 错误响应
http.get('/api/error', () => {
  return HttpResponse.json(
    { code: 500, message: '服务器错误' },
    { status: 500 }
  );
});

// 延迟响应
http.get('/api/slow', async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return HttpResponse.json({ code: 200, data: 'slow response' });
});
```

## 注意事项

1. **开发环境专用**：MSW 只在开发环境 (`import.meta.env.DEV`) 中启用
2. **Service Worker**：首次启动可能需要刷新页面以激活 Service Worker
3. **网络面板**：在浏览器开发者工具的网络面板中，被 MSW 拦截的请求会显示为 "(from service worker)"
4. **CORS**：MSW 在浏览器层面工作，不会遇到 CORS 问题

## MSW 的优势

1. **无需额外服务器**: MSW 运行在浏览器的 Service Worker 中，无需启动额外的 Mock 服务器
2. **更接近真实环境**: 拦截发生在网络层，更真实地模拟 HTTP 请求
3. **开发体验更好**: 无需管理额外的服务进程，开发更简单
4. **部署友好**: 可以轻松部署到静态托管服务
5. **调试方便**: 可以在浏览器开发者工具中查看网络请求
6. **类型安全**: 与 TypeScript 完美集成，提供完整的类型检查
7. **离线开发**: 不依赖外部 Mock 服务，支持完全离线开发

## 故障排除

### MSW 未启动

检查控制台是否有错误信息，确保：
- `VITE_MOCK_MODE=msw` 已设置
- 在开发环境中运行
- `public/mockServiceWorker.js` 文件存在

### 请求未被拦截

确保：
- 请求路径与 handler 中定义的路径完全匹配
- HTTP 方法（GET、POST 等）正确
- 检查浏览器网络面板，确认请求显示为 "(from service worker)"

### 切换到其他模式

如需使用真实后端：

```bash
# 使用真实接口
VITE_MOCK_MODE=real

# 使用真实后端
VITE_MOCK_MODE=real
```

重启开发服务器即可生效。
