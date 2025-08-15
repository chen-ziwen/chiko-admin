<div align="center">
	<img src="./public/logo.svg" width="160" />
	<h1>ChikoAdmin</h1>
</div>

<div align="center">

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-10.13.1-orange.svg)](https://pnpm.io/)
[![node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![react](https://img.shields.io/badge/react-19.1.1-blue.svg)](https://react.dev/)
[![typescript](https://img.shields.io/badge/typescript-5.7.3-blue.svg)](https://www.typescriptlang.org/)

</div>

> [!IMPORTANT]
> 如果 `ChikoAdmin` 对您有帮助，请给我一个 ⭐️ 支持！您的支持是我持续改进的动力！

## 项目介绍

`ChikoAdmin` 是一个现代化的中后台管理系统模板，采用最新的技术栈和最佳实践构建。项目使用 Monorepo 架构，提供了完整的开发工具链和丰富的功能组件。采用 MSW (Mock Service Worker) 提供强大的 Mock 数据方案。

### 主要特性

- 现代化技术栈: React 19 + TypeScript + Vite + Ant Design
- 优雅的 UI 设计: 基于 Ant Design 5.x，支持暗色模式
- 约定式路由: 基于文件系统的自动路由生成。更多细节请查看 [Better Pages Create](https://github.com/chen-ziwen/better-pages-create)
- 响应式布局: 完美适配桌面端和移动端
- 国际化支持: 内置中英文语言切换
- 权限管理: 完整的路由权限和菜单权限控制
- 数据可视化: 集成 ECharts 图表库
- TypeScript: 完整的类型支持
- 高性能: 基于 Vite 的快速构建和热更新
- 主题定制: 支持主题色和布局模式自定义
- Monorepo: 模块化架构，易于维护和扩展

## 预览

- [项目预览](https://admin.chiko.store)
- [文档地址](https://admin-docs.chiko.store)

## 示例图片

目前项目尚未完工，完成后会补充上！

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 克隆

```bash
git clone git@github.com:chen-ziwen/chiko-admin.git
```

### 安装依赖

> [!WARNING]
> 项目采用 pnpm monorepo 管理方式，请勿使用其他包管理工具！

```bash
# 安装 pnpm (如果未安装)
npm install -g pnpm

# 安装项目依赖
pnpm install
```

## 项目结构

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

## 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

#### 提交示例

```bash
feat: 添加用户登录功能
fix(auth): 修复登录验证失败的问题
docs: 更新 README 文档
style: 格式化代码风格
refactor(utils): 重构工具函数
perf: 优化页面加载性能
build: 更新构建配置
ci: 配置 GitHub Actions
chore: 更新依赖包版本
```

#### 提交命令

项目已内置 `cz` 命令，您可以通过执行以下命令来生成符合规范的提交信息：

```bash
pnpm cz
```

## 联系方式

QQ: 2452559902

## 致谢

- 感谢 `Soybean` 团队多年来的不断维护，让 `ChikoAdmin` 能够站在巨人的肩膀上。
- 感谢所有为这个项目做出贡献的开发者！

## 许可证

本项目基于 [MIT](LICENSE) 许可证开源。
