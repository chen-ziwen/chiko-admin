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

## 下一步

- 了解 [路由配置](./router.md)
- 学习 [菜单管理](./menu.md)
- 配置 [主题系统](./theme.md) 
