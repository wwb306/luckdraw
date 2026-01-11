# Project Context

## Purpose
本项目是一个**个人工具箱 (Toolbox)**，旨在集成日常开发与办公中积累的各种实用工具。

目前已集成的工具：
- **Lucky Draw Pro (抽奖应用)**：支持人员/奖项管理、滚动抽奖及结果导出的完整解决方案。

## Tech Stack
- **Platform**: Single Page Application (SPA) with shared Backend.
- **Frontend Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Frontend Build Tool**: [Vite](https://vitejs.dev/)
- **Frontend Router**: [Vue Router](https://router.vuejs.org/)
- **Frontend State Management**: [Pinia](https://pinia.vuejs.org/)
- **Backend Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Backend Package Manager**: [Poetry](https://python-poetry.org/)
- **Database**: [SQLite](https://www.sqlite.org/) (via SQLAlchemy)
- **Language**: [TypeScript](https://www.typescriptlang.org/) / [Python 3](https://www.python.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide Vue](https://lucide.dev/)

## Project Conventions

### Directory Structure
- `frontend/`: Vue 3 前端代码
  - `src/views/`: 页面组件，包含 `Home.vue` (工具箱首页) 和各个工具的视图
  - `src/components/`: 通用 UI 组件
  - `src/store/`: 状态管理
  - `src/router/`: 统一路由管理
- `backend/`: FastAPI 后端代码，为各个工具提供 API 支持
- `openspec/`: 项目规范与变更记录

### Architecture Patterns
- **Toolbox Architecture**: 根路径提供工具索引与搜索，各工具作为独立的子路由或模块。
- **Frontend-Backend Separation**: 前端通过 RESTful API 与后端进行通信。

## Domain Context
- **Tool**: 工具箱中的基本单元，包含名称、描述、图标、路由和标签。
- **Lucky Draw Domain**:
  - **Participant (人员)**: Attributes: `id`, `name`, `um`, `department`.
  - **Prize (奖项)**: Attributes: `id`, `tier`, `name`, `count`, `winners`, `image`.
  - **Project (项目)**: 每个抽奖活动作为一个独立的项目进行管理。
