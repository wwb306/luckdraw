# Backend Specification

## Purpose
后端服务基于 FastAPI 构建，提供数据持久化、Excel 处理等核心业务逻辑，并使用 Poetry 进行依赖管理。
## Requirements
### Requirement: 使用 Poetry 管理 Python 依赖
后端 MUST 使用 Poetry 作为主要的包管理工具，以确保依赖的确定性和环境的可复现性。

#### Scenario: 初始化 Poetry 环境
- **Given** 后端代码位于 `backend/` 目录
- **When** 在 `backend/` 下运行 `poetry install`
- **Then** 应该成功创建虚拟环境并安装所有在 `pyproject.toml` 中定义的依赖
- **And** 应该生成或更新 `poetry.lock` 文件

#### Scenario: 移除 requirements.txt
- **Given** 后端已迁移到 Poetry
- **When** 检查 `backend/` 目录
- **Then** 不应存在 `requirements.txt` 文件

### Requirement: Project CRUD
The system SHALL allow users to create, read, update, and delete lottery projects. Data MUST be persisted in a server-side SQLite database.

#### Scenario: List Projects from Backend
- Given multiple projects exist in the backend database
- When the user views the Dashboard
- Then the frontend fetches the project list via `GET /api/projects`
- And they see a list of cards, one for each project

#### Scenario: Create Project on Backend
- Given the application is open at the Dashboard
- When they click "New Project" and submit the form
- Then the frontend sends a `POST /api/projects` request
- And a new record is created in the SQLite database
- And the user is navigated to the Workspace

### Requirement: Data Persistence
The system SHALL ensure data is not lost on page refresh by storing all project data (participants, prizes, winners) in the backend.

#### Scenario: Refresh Workspace
- Given a user is in the Workspace of a project
- When they refresh the page
- Then the frontend fetches the latest state from `GET /api/projects/{id}`
- And all participants and prize configurations are restored correctly

