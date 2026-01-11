## ADDED Requirements

### Requirement: Dockerization
系统 MUST 提供 Docker 支持，以便在容器化环境中运行。

#### Scenario: Dockerfile build success
- **WHEN** 运行 `docker build -t luckydraw-pro .`
- **THEN** 镜像构建成功且包含生产环境静态资源

### Requirement: Orchestration
系统 MUST 支持使用 Docker Compose 进行一键部署。

#### Scenario: Compose up success
- **WHEN** 运行 `docker-compose up -d`
- **THEN** 服务在指定的端口（默认 8080）启动并可访问

### Requirement: Static Serving
容器内的 Web 服务器 MUST 正确配置以提供静态资源。

#### Scenario: Access application
- **WHEN** 访问容器暴露的 HTTP 地址
- **THEN** 能够正常加载 SPA 应用并执行抽奖逻辑
