# Spec Delta: Project Structure Cleanup

## REMOVED Requirements

### Requirement: 移除根目录下的 React 开发环境
为了保持项目整洁，根目录不再作为 React 前端的开发和构建环境。

#### Scenario: 验证 React 文件已移除
- **Given** 项目根目录
- **When** 搜索 `App.tsx`, `index.tsx`, `vite.config.ts` (根目录下)
- **Then** 这些文件不应存在

#### Scenario: 验证 React 组件和工具类已移除
- **Given** 项目根目录
- **When** 检查 `components/` 和 `utils/` 目录
- **Then** 这些目录不应存在（在根目录下）

## MODIFIED Requirements

### Requirement: 明确前后端分离目录结构
项目 MUST 采用清晰的前后端分离结构，根目录仅保留全局配置和 OpenSpec 文档。

#### Scenario: 验证目录布局
- **Given** 项目初始化完成
- **Then** 前端代码应位于 `frontend/`
- **And** 后端代码应位于 `backend/`
- **And** 文档和提案应位于 `openspec/`
