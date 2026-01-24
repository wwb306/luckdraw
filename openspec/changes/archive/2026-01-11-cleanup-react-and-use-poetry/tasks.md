# Tasks: Cleanup React and Use Poetry

## 1. 移除旧 React 代码 [x:100%]
- [x] 删除根目录下的 React 组件目录 `components/` [id:1.1]
- [x] 删除根目录下的工具函数目录 `utils/` [id:1.2]
- [x] 删除根目录下的 React 配置文件 [id:1.3]
  - `App.tsx`
  - `index.html`
  - `index.tsx`
  - `package.json`
  - `package-lock.json`
  - `tsconfig.json`
  - `types.ts`
  - `vite.config.ts`
- [x] 验证根目录仅包含 `frontend/`, `backend/`, `openspec/` 等核心目录及必要的全局配置 [id:1.4]

## 2. 后端 Poetry 迁移 [x:100%]
- [x] 在 `backend/` 目录下初始化 Poetry [id:2.1]
- [x] 从 `backend/requirements.txt` 迁移依赖到 `pyproject.toml` [id:2.2]
- [x] 生成 `poetry.lock` 文件 [id:2.3]
- [x] 删除 `backend/requirements.txt` [id:2.4]
- [x] 验证后端服务可在 Poetry 环境下运行 [id:2.5]

## 3. 更新项目规范 [x:100%]
- [x] 更新 `openspec/project.md` 以反映新的技术栈和包管理工具 [id:3.1]
- [x] 更新相关的 Spec 文档 [id:3.2]
