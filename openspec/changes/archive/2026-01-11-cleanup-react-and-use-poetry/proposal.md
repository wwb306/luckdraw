# OpenSpec Proposal: Cleanup React and Use Poetry

## Why
项目目前正在从 React 迁移到 Vue 3 和 FastAPI。根目录下保留了大量的旧 React 代码和配置文件，这导致了项目结构的混乱。此外，后端目前使用 `requirements.txt` 进行包管理，缺乏依赖锁定和版本管理的灵活性，建议迁移到现代的包管理工具 Poetry。

## What Changes
1. **移除旧代码**：彻底删除根目录下与旧 React 开发相关的所有文件和目录。
2. **后端包管理迁移**：在 `backend/` 目录下初始化 Poetry，将 `requirements.txt` 中的依赖迁移到 `pyproject.toml`，并删除 `requirements.txt`。

## Impact
- **代码库简化**：移除不必要的文件，使开发者能够专注于新的技术栈。
- **依赖管理增强**：Poetry 提供更好的依赖解析、环境隔离和版本锁定。
- **目录结构清晰**：根目录将不再混杂前端构建配置，前端相关内容统一在 `frontend/` 目录下（由之前的迁移工作处理）。

## Relationship
- 依赖于之前的迁移工作 `migrate-to-fastapi-vue3`。
- 影响 `backend/` 的开发流程。
