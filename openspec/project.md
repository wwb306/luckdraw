# Project Context

## Purpose
本项目是一个**年会抽奖系统 (Lucky Draw Pro)**，旨在为企业年会或活动提供一个简单、有趣且功能强大的抽奖解决方案。

主要功能包括：
- **人员与奖项管理**：支持通过 Excel 模板批量导入参与者名单和奖项配置。
- **抽奖互动**：提供激动人心的滚动抽奖动画效果，支持分批次抽取。
- **数据导出**：支持将中奖结果导出为 Excel 文件。
- **持久化存储**：前端通过 FastAPI 后端接口与数据库交互，实现数据的持久化管理。

## Tech Stack
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
  - `src/components/`: UI 组件
  - `src/views/`: 页面组件
  - `src/store/`: 状态管理 (Pinia)
  - `src/router/`: 路由配置
- `backend/`: FastAPI 后端代码
  - `app/main.py`: 后端入口
  - `app/routers/`: API 路由
  - `app/models.py`: 数据库模型
  - `pyproject.toml`: Poetry 依赖管理
- `openspec/`: 项目规范与变更记录

### Architecture Patterns
- **Frontend-Backend Separation**: 前端通过 RESTful API 与后端进行通信。
- **Modular Design**: 前后端均采用模块化开发，确保代码的可维护性和扩展性。

### Git Workflow
- Standard feature-branch workflow.

## Domain Context
- **Participant (人员)**: Attributes: `id`, `name`, `um` (User ID), `department`.
- **Prize (奖项)**: Attributes: `id`, `tier`, `name`, `count`, `winners`, `image`.
- **Project (项目)**: 每个抽奖活动作为一个独立的项目进行管理。

## Important Constraints
- **Environment**: 后端依赖 Python 3.10+ 和 Poetry。
- **Data Persistence**: 抽奖结果和配置存储在本地 SQLite 数据库中。
