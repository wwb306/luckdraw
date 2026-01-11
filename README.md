<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Toolbox - Daily Utility Tools

这是一个集成了多种日常实用工具的项目。目前已包含以下工具：

### 1. 抽奖应用 (Lucky Draw Pro)
一个激动人心的抽奖系统，支持：
- 批量导入参与者和奖项。
- 炫酷的滚动抽奖效果。
- 中奖结果导出。
- 多项目并行管理及密码保护。

## 运行与部署

### 本地运行

**前提条件:** Node.js, Python 3.10+, Poetry

1. **安装依赖:**
   ```bash
   # 安装前端依赖
   cd frontend && npm install
   # 安装后端依赖
   cd ../backend && poetry install
   ```
2. **启动应用:**
   ```bash
   # 在根目录下运行 (需要安装了相关的 dev 脚本)
   npm run dev
   ```

### Docker 部署

**前提条件:** Docker and Docker Compose

1. **启动容器:**
   ```bash
   docker-compose up -d --build
   ```
2. **访问应用:** `http://localhost:8080`

## 项目结构

- `frontend/`: 基于 Vue 3 + Vite 的工具箱前端。
- `backend/`: 基于 FastAPI 的后端服务。
- `openspec/`: 项目规范与变更提案。
