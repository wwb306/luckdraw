# Change: Add Docker Deployment

## Why
为了简化在服务器上的部署流程，提供一致的运行环境，并支持通过 Docker Compose 快速启动服务。

## What Changes
- 添加 `Dockerfile` 用于构建生产环境镜像。
- 添加 `.dockerignore` 优化构建上下文。
- 添加 `docker-compose.yml` 用于容器编排。
- 添加 Nginx 配置文件用于生产环境静态资源服务。

## Impact
- Affected specs: `deployment` (new)
- Affected code: 根目录新增配置文件，不影响现有业务逻辑代码。
