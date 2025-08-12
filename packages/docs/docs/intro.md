---
sidebar_position: 1
---

# ChikoAdmin 介绍

ChikoAdmin 是一个基于 React19、Vite、TypeScript、Ant Design 和 UnoCSS 的现代化中后台管理模板。它提供了丰富的功能和优雅的代码结构，帮助你快速构建企业级管理系统。

## 主要特性

- **现代化技术栈**: React19 + Vite + TypeScript + Ant Design
- **优雅的代码结构**: 基于功能模块化的目录结构
- **丰富的功能组件**: 路由、菜单、主题、权限等核心功能
- **开发体验优化**: 热更新、类型检查、代码规范
- **部署友好**: 支持 Vercel、GitHub Pages 等平台部署

## 技术栈

| 技术          | 版本   | 说明       |
| ------------- | ------ | ---------- |
| React         | 19.1.1 | 前端框架   |
| Vite          | 7.0.6  | 构建工具   |
| TypeScript    | 5.7.3  | 类型系统   |
| Ant Design    | 5.26.7 | UI 组件库  |
| UnoCSS        | 66.3.3 | 原子化 CSS |
| React Router  | 7.7.1  | 路由管理   |
| Redux Toolkit | 2.8.2  | 状态管理   |

## 项目结构

```
chiko-admin/
├── src/                    # 源代码
│   ├── pages/             # 页面组件
│   ├── components/        # 公共组件
│   ├── features/          # 功能模块
│   ├── layouts/           # 布局组件
│   ├── stores/            # 状态管理
│   └── utils/             # 工具函数
├── packages/              # 子包
│   ├── docs/             # 文档站点
│   ├── hooks/            # 自定义 Hooks
│   ├── utils/            # 工具库
│   └── layout/           # 布局组件
├── build/                # 构建配置
└── public/               # 静态资源
```

## 快速开始

1. **克隆项目**
   ```bash
   git clone https://github.com/chen-ziwen/chiko-admin.git
   cd chiko-admin
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   pnpm dev
   ```

4. **构建生产版本**
   ```bash
   pnpm build
   ```

## 在线预览

- **管理后台**: [https://chiko-admin.vercel.app](https://chiko-admin.vercel.app)
- **文档站点**: [https://chiko-admin-docs.vercel.app](https://chiko-admin-docs.vercel.app)

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

MIT License
