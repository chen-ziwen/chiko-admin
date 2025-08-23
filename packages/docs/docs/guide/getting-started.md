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

## 安装步骤

### 1. 克隆项目

```bash
# 克隆项目
git clone git@github.com:chen-ziwen/chiko-admin.git

# 进入项目目录
cd chiko-admin
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm dev
```

启动成功后，你可以在浏览器中访问 `http://localhost:5210` 查看项目。

## 环境配置文件

### 环境配置说明

- **开发环境**: 使用 `.env` 文件
- **测试环境**: 使用 `.env.test` 文件
- **生产环境**: 使用 `.env.prod` 文件

### 内置环境变量

```bash
# ===== 基础信息 =====
# 项目名称，会显示在浏览器标题栏
VITE_APP_TITLE=ChikoAdmin

# 项目部署的基础路径，如果部署在子目录需要修改
VITE_BASE_URL=/

# ===== 存储配置 =====
# 本地存储的键名前缀，避免与其他项目冲突
VITE_STORAGE_PREFIX=Chiko-Admin_

# ===== 图标配置 =====
# 在线图标的前缀标识
VITE_ICON_PREFIX=icon

# 本地图标的前缀标识
VITE_ICON_LOCAL_PREFIX=icon-local

# ===== 路由配置 =====
# 登录后的默认首页路径
VITE_ROUTE_HOME=/home

# 权限路由模式：static(静态) 或 dynamic(动态)
VITE_AUTH_ROUTE_MODE=static

# 默认的菜单图标
VITE_MENU_ICON=mdi:menu

# 路由历史模式：history(HTML5) 或 hash(#)
VITE_ROUTER_HISTORY_MODE=history

# ===== 接口配置 =====
# 接口请求成功时的状态码
VITE_SERVICE_SUCCESS_CODE=200

# 需要自动登出的状态码（多个用逗号分隔）
VITE_SERVICE_LOGOUT_CODES=8888,8889

# 需要显示登出提示框的状态码
VITE_SERVICE_MODAL_LOGOUT_CODES=7777,7778

# Token 过期时的状态码
VITE_SERVICE_EXPIRED_TOKEN_CODES=9999,9998,3333

# ===== 权限配置 =====
# 超级管理员角色标识，拥有所有权限
VITE_STATIC_SUPER_ROLE=R_SUPER

# ===== 开发配置 =====
# 是否生成源码映射文件：Y(是) 或 N(否)
VITE_SOURCE_MAP=N

# 是否自动检测更新：Y(是) 或 N(否)
VITE_AUTOMATICALLY_DETECT_UPDATE=Y

# Mock 服务模式：msw(使用) 或 real(真实接口)
VITE_MOCK_MODE=msw
```

## 项目脚本

| 命令              | 说明                   |
| ----------------- | ---------------------- |
| `pnpm dev`        | 启动开发服务器         |
| `pnpm preview`    | 预览构建结果           |
| `pnpm test`       | 启动测试环境           |
| `pnpm build`      | 构建生产版本           |
| `pnpm cleanup`    | 清理项目文件           |
| `pnpm cz`         | 提交代码（规范化提交） |
| `pnpm docs:build` | 构建文档               |
| `pnpm docs:clear` | 清理文档构建文件       |
| `pnpm docs:serve` | 启动文档服务           |
| `pnpm docs:start` | 启动文档开发服务器     |
| `pnpm lint`       | 代码检查               |
| `pnpm lint:fix`   | 自动修复代码问题       |
| `pnpm prepare`    | 安装 Git hooks         |
| `pnpm typecheck`  | TypeScript 类型检查    |
| `pnpm upk`        | 更新包版本             |

## 开发工具配置

### VS Code 扩展推荐

安装以下 VS Code 扩展以获得更好的开发体验：

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "antfu.unocss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 目录结构说明

```
chiko-admin/
├── packages/                # Monorepo 包
│   ├── axios/               # HTTP 请求封装
│   ├── color/               # 颜色工具库
│   ├── docs/                # 项目文档
│   ├── hooks/               # 通用 Hooks
│   ├── layout/              # 布局组件
│   ├── scripts/             # 构建脚本
│   ├── unocss/              # UnoCSS 配置
│   └── utils/               # 工具函数
├── public/                  # 静态资源
├── src/                     # 主项目源码
│   ├── assets/              # 资源文件
│   ├── components/          # 公共组件
│   ├── constants/           # 常量定义
│   ├── features/            # 功能模块
│   │   ├── animate/         # 动画相关
│   │   ├── antd/            # Ant Design 配置
│   │   ├── auth/            # 认证相关
│   │   ├── form/            # 表单相关
│   │   ├── lang/            # 国际化
│   │   ├── menu/            # 菜单管理
│   │   ├── router/          # 路由管理
│   │   ├── tab/             # 标签页管理
│   │   ├── table/           # 表格管理
│   │   └── theme/           # 主题管理
│   ├── hooks/               # 业务 Hooks
│   ├── layouts/             # 布局组件
│   ├── locales/             # 国际化文件
│   ├── mocks/               # Mock 数据
│   ├── pages/               # 页面组件
│   ├── plugins/             # 插件配置
│   ├── router/              # 路由配置
│   ├── services/            # API 服务
│   ├── stores/              # 状态管理
│   ├── styles/              # 样式文件
│   ├── theme/               # 主题配置
│   ├── types/               # 类型定义
│   └── utils/               # 工具函数
├── package.json             # 项目配置
├── pnpm-workspace.yaml      # 工作区配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── uno.config.ts            # UnoCSS 配置
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

- 学习 [路由配置](./router.md) 了解路由系统
- 设置 [主题系统](./theme.md) 定制界面 
- 配置 [菜单管理](./menu.md) 自定义菜单
