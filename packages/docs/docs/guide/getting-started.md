---
sidebar_position: 1
---

# 快速开始

本指南将帮助你快速上手 ChikoAdmin，了解如何安装、配置和运行项目。

## 环境要求

在开始之前，请确保你的开发环境满足以下要求：

### Node.js
- **版本**: 18.0 或更高版本
- **下载**: [https://nodejs.org](https://nodejs.org)

### 包管理器
> 项目采用 pnpm monorepo 管理方式，请勿使用其他包管理工具！

```bash
# 安装 pnpm
npm install -g pnpm

# 检查版本
pnpm --version  # 需要 10.13.1+
```

### 开发工具
- **编辑器**: VS Code (推荐)
- **浏览器**: Chrome, Firefox, Safari, Edge
- **Git**: 用于版本控制

## 快速安装

### 克隆项目

```bash
# 克隆项目
git clone git@github.com:chen-ziwen/chiko-admin.git

# 进入项目目录
cd chiko-admin
```

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

启动成功后，你可以在浏览器中访问 `http://localhost:5210` 查看项目。

## 环境配置

### 基础配置

项目使用 `.env` 文件进行环境配置，主要配置项包括：

```bash
# 项目基础信息
VITE_APP_TITLE=ChikoAdmin
VITE_BASE_URL=/

# 存储配置
VITE_STORAGE_PREFIX=Chiko-Admin_

# 路由配置
VITE_ROUTE_HOME=/home
VITE_AUTH_ROUTE_MODE=static
VITE_ROUTER_HISTORY_MODE=history

# 接口配置
VITE_SERVICE_SUCCESS_CODE=200
VITE_MOCK_MODE=msw

# 权限配置
VITE_STATIC_SUPER_ROLE=R_SUPER
```

### 环境文件说明

- **`.env`**: 开发环境配置
- **`.env.test`**: 测试环境配置  
- **`.env.prod`**: 生产环境配置

## 常用命令

| 命令             | 说明                |
| ---------------- | ------------------- |
| `pnpm dev`       | 启动开发服务器      |
| `pnpm build`     | 构建生产版本        |
| `pnpm preview`   | 预览构建结果        |
| `pnpm test`      | 启动测试环境        |
| `pnpm lint`      | 代码检查            |
| `pnpm lint:fix`  | 自动修复代码问题    |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm cleanup`   | 清理项目文件        |

## 项目结构

```
chiko-admin/
├── packages/                # Monorepo 包
│   ├── axios/              # HTTP 请求封装
│   ├── color/              # 颜色工具库
│   ├── docs/               # 项目文档
│   ├── hooks/              # 通用 Hooks
│   ├── layout/             # 布局组件
│   └── utils/              # 工具函数
├── src/                    # 主项目源码
│   ├── features/           # 功能模块
│   │   ├── auth/           # 认证相关
│   │   ├── lang/           # 国际化
│   │   ├── router/         # 路由管理
│   │   ├── theme/          # 主题管理
│   │   └── ...             # 其他功能
│   ├── pages/              # 页面组件
│   ├── stores/             # 状态管理
│   ├── types/              # 类型定义
│   └── utils/              # 工具函数
└── 配置文件...
```

## 开发工具配置

### VS Code 扩展推荐

```json
{
  "recommendations": [
    "antfu.unocss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

## 常见问题

### Q: 安装依赖时出现错误怎么办？

A: 
1. 清除缓存：`pnpm store prune`
2. 删除 node_modules：`rm -rf node_modules`
3. 重新安装：`pnpm install`

### Q: 启动开发服务器失败怎么办？

A: 
1. 检查端口是否被占用：`lsof -i :5210`
2. 检查环境配置是否正确
3. 查看控制台错误信息

### Q: 如何切换 Node.js 版本？

A: 推荐使用 nvm 管理 Node.js 版本：
```bash
# 安装 nvm
npm install -g nvm

# 安装 Node.js 18
nvm install 18
nvm use 18
```

### Q: 如何配置代理？

A: 在 `.env` 文件中配置：
```bash
VITE_HTTP_PROXY=Y
VITE_SERVICE_BASE_URL=http://localhost:3000
```

## 下一步

安装完成后，你可以：

- 学习 [路由系统](../guide/router/basics) 了解路由基础
- 设置 [主题系统](../guide/theme/basics) 定制界面 
- 了解 [国际化配置](../guide/i18n/basics) 支持多语言
- 学习 [后端请求](../guide/request/backend) 了解 API 调用
- 配置 [请求处理](../guide/request/msw) 设置接口模拟
