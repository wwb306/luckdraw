# Design: Docker Deployment Strategy

## Context
本项目是一个纯前端的单页应用 (SPA)，使用 Vite 构建。部署时需要将源代码构建为静态资源，并通过 Web 服务器（如 Nginx）进行分发。

## Goals
- 提供一键部署的能力。
- 确保构建过程在容器内完成，避免环境差异。
- 生产环境镜像体积尽可能小。

## Decisions

### 1. 多阶段构建 (Multi-stage Build)
- **阶段一 (Build)**: 使用 `node:22-alpine` 作为基础镜像，安装依赖并执行 `npm run build`。
- **阶段二 (Production)**: 使用 `nginx:stable-alpine` 作为运行环境，仅拷贝构建产物。

### 2. Nginx 配置
需要配置 Nginx 以支持 SPA 的路由（虽然目前项目较简单，但应考虑 `history` 模式兼容性），并开启 Gzip 压缩。

### 3. Docker Compose
- 映射端口 8080 到容器的 80 端口。
- 支持通过环境变量配置基础路径（可选）。

## Risks / Trade-offs
- **构建时间**: 在容器内安装依赖可能会比本地构建慢。
  - *缓解*: 利用 Docker 层缓存。
- **镜像版本**: 使用 `alpine` 镜像以减小体积，但需确保构建环境一致。

## Migration Plan
无需迁移现有部署方式，新增方式为可选。
