# Design: Cleanup React and Use Poetry

## Overview
本设计文档描述了如何系统地移除旧的 React 代码，并详细说明后端向 Poetry 迁移的步骤。

## 1. 移除 React 相关文件
为了确保不误删，我们将明确列出根目录下需要删除的文件和目录。

### 待删除清单：
- **目录**:
  - `components/` (包含旧的 React 组件)
  - `utils/` (包含旧的 React 工具函数，如 `excelHelper.ts`, `storage.ts`)
- **文件**:
  - `App.tsx`
  - `index.html` (根目录)
  - `index.tsx`
  - `package.json` (根目录)
  - `package-lock.json` (根目录)
  - `tsconfig.json` (根目录)
  - `types.ts` (根目录)
  - `vite.config.ts` (根目录)

*注意：`frontend/` 目录中的文件必须保留，因为那是新的 Vue 3 前端。*

## 2. 后端迁移到 Poetry
目前后端位于 `backend/` 目录。

### 迁移步骤：
1. 在 `backend/` 目录下运行 `poetry init`。
2. 将 `backend/requirements.txt` 中的依赖项添加到 `pyproject.toml`。
3. 运行 `poetry install` 生成 `poetry.lock`。
4. 验证后端服务（如 `main.py`）是否能在 poetry 环境下正常运行。
5. 删除 `backend/requirements.txt`。

## 3. 架构调整
- **项目入口**：项目不再从根目录启动前端开发服务器。前端开发服务器应在 `frontend/` 目录中启动。
- **环境隔离**：Poetry 会为后端创建一个独立的虚拟环境，不再依赖于外部的手动环境配置。
