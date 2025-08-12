---
sidebar_position: 1
---

# 快速开始

本指南将帮助你快速上手 ChikoAdmin，了解如何安装、配置和运行项目。

## 环境要求

- **Node.js**: 18.0 或更高版本
- **包管理器**: 推荐使用 pnpm (10.13.1+)

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/chen-ziwen/chiko-admin.git
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

启动后，你可以在浏览器中访问 `http://localhost:5210` 查看项目。

## 项目脚本

| 命令             | 说明                |
| ---------------- | ------------------- |
| `pnpm dev`       | 启动开发服务器      |
| `pnpm build`     | 构建生产版本        |
| `pnpm preview`   | 预览构建结果        |
| `pnpm lint`      | 代码检查            |
| `pnpm lint:fix`  | 自动修复代码问题    |
| `pnpm typecheck` | TypeScript 类型检查 |

## 开发模式

项目支持多种开发模式：

### 开发环境
```bash
pnpm dev
```

### 测试环境
```bash
pnpm test
```

### 生产环境
```bash
pnpm build
```

## 目录结构说明

```
src/
├── pages/           # 页面组件
│   ├── (base)/     # 基础布局页面
│   ├── (blank)/    # 空白布局页面
│   └── _exception/ # 异常页面
├── components/      # 公共组件
├── features/        # 功能模块
│   ├── router/     # 路由管理
│   ├── menu/       # 菜单管理
│   ├── theme/      # 主题管理
│   └── auth/       # 权限管理
├── layouts/         # 布局组件
├── stores/          # 状态管理
└── utils/           # 工具函数
```

## 下一步

- 了解 [路由配置](./router.md)
- 学习 [菜单管理](./menu.md)
- 配置 [主题系统](./theme.md) 