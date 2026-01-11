# Project Structure Specification

## Purpose
规范项目的目录结构和职责划分，确保前后端分离的架构清晰且易于维护。
## Requirements
### Requirement: 明确前后端分离目录结构
项目 MUST 采用清晰的前后端分离结构，根目录仅保留全局配置和 OpenSpec 文档。

#### Scenario: 验证目录布局
- **Given** 项目初始化完成
- **Then** 前端代码应位于 `frontend/`
- **And** 后端代码应位于 `backend/`
- **And** 文档和提案应位于 `openspec/`

