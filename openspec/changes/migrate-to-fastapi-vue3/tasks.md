# Tasks: Migrate to FastAPI + Vue3

## Backend Setup (FastAPI)
- [x] 初始化后端目录结构 `backend/`
- [x] 创建 `requirements.txt` 并安装依赖 (fastapi, uvicorn, sqlalchemy, pydantic)
- [x] 配置 SQLAlchemy 数据库连接和 SQLite
- [x] 定义数据库模型 (Project, Participant, Prize, Winner)
- [x] 实现基础 CRUD API (Project)
- [x] 实现 Excel 导入逻辑 (将 excelHelper.ts 逻辑同步到后端)
- [x] 实现抽奖结果记录和导出 API

## Frontend Setup (Vue 3)
- [x] 初始化 Vue 3 目录结构 `frontend/` (使用 Vite)
- [x] 配置 Tailwind CSS
- [x] 设置 Pinia 状态管理和 Vue Router
- [x] 实现 Axios 拦截器处理 API 请求

## Component Porting (Vue 3)
- [x] 移植 `ProjectDashboard` 组件到 Vue 3 (`Dashboard.vue`)
- [x] 移植 `Workspace` 组件及其子组件 (`ConfigPanel`, `Sidebar`)
- [x] 移植抽奖核心动画逻辑 (使用 Vue 3 的生命周期钩子和响应式 API)
- [x] 实现与后端的 API 对接

## Data Migration & Cleanup
- [-] 编写脚本将 `localStorage` 数据迁移到 SQLite (可选，如果需要保留现有数据)
- [x] 验证所有功能完整性
- [x] 更新 `README.md` 和部署文档
- [-] 移除旧的 React 相关代码和配置文件 (`App.tsx`, `components/`, `vite.config.ts` 等)

## Validation
- [x] 确保 `docker-compose.yml` 能够同时启动后端和前端
- [x] 跨浏览器验证抽奖效果
- [x] 验证大量参与者数据下的系统性能
