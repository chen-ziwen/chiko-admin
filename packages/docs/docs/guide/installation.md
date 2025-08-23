---
sidebar_position: 2
---

# 安装指南

本指南将详细介绍如何安装和配置 ChikoAdmin 项目。

## 环境要求

在开始安装之前，请确保你的开发环境满足以下要求：

### Node.js

- **版本**: 18.0 或更高版本
- **下载**: [https://nodejs.org](https://nodejs.org)

### 包管理器

> [!WARNING]
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
# 使用 HTTPS
git clone https://github.com/chen-ziwen/chiko-admin.git

# 或使用 SSH
git clone git@github.com:chen-ziwen/chiko-admin.git

# 进入项目目录
cd chiko-admin
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 环境配置

复制环境配置文件：

```bash
# 复制环境配置文件
cp .env.example .env

# 编辑环境配置
# 根据你的需求修改 .env 文件中的配置
```

### 4. 启动开发服务器

```bash
pnpm dev
```

启动成功后，你可以在浏览器中访问 `http://localhost:5210` 查看项目。

## 环境配置文件

### 基础配置 (.env)

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

### 生产环境配置 (.env.prod)

```bash
# ===== 生产环境配置 =====
# 生产环境的后端服务地址，必须使用真实的 HTTPS 地址
VITE_SERVICE_BASE_URL=https://api.chiko.com

# Mock 服务模式：生产环境必须使用真实接口
VITE_MOCK_MODE=real
```

### 测试环境配置 (.env.test)

```bash
# ===== 测试环境配置 =====
# 测试环境的后端服务地址
VITE_SERVICE_BASE_URL=https://test-api.chiko.com

# Mock 服务模式：测试环境可以使用 Mock 数据
VITE_MOCK_MODE=msw
```

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

### 编辑器配置

项目包含 `.editorconfig` 文件，确保代码格式一致：

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

## 项目脚本

### 开发脚本

```bash
# 启动开发服务器
pnpm dev

# 启动测试环境
pnpm test

# 预览构建结果
pnpm preview
```

### 构建脚本

```bash
# 构建生产版本
pnpm build

# 构建文档
pnpm docs:build

# 启动文档服务器
pnpm docs:start
```

### 代码质量脚本

```bash
# 代码检查
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# TypeScript 类型检查
pnpm typecheck
```

### 其他脚本

```bash
# 清理构建文件
pnpm cleanup

# 提交代码 (使用 conventional commits)
pnpm cz

# 更新包版本
pnpm upk
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

- 查看 [快速开始](./getting-started.md) 了解基本使用
- 学习 [路由配置](./router.md) 了解路由系统
- 配置 [菜单管理](./menu.md) 自定义菜单
- 设置 [主题系统](./theme.md) 定制界面 