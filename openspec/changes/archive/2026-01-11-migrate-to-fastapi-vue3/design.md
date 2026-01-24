# Design: Migrate to FastAPI + Vue3

## Backend Architecture (FastAPI)
### Tech Stack
- **Framework**: FastAPI
- **ORM**: SQLAlchemy
- **Database**: SQLite (local file)
- **Schema Validation**: Pydantic
- **Dependencies**: `python-multipart` (for file uploads), `pandas` or `openpyxl` (for excel processing)

### Data Models
- `Project`: `id`, `name`, `description`, `password`, `created_at`, `updated_at`
- `Participant`: `id`, `project_id`, `name`, `um`, `department`
- `Prize`: `id`, `project_id`, `tier`, `name`, `count`, `image`, `order`
- `Winner`: `id`, `project_id`, `prize_id`, `participant_id`, `won_at`

### API Design
- `GET /api/projects`: List all projects
- `POST /api/projects`: Create a new project
- `GET /api/projects/{id}`: Get project details (including participants and prizes)
- `PUT /api/projects/{id}`: Update project metadata
- `DELETE /api/projects/{id}`: Delete a project
- `POST /api/projects/{id}/import`: Import participants and prizes from Excel
- `POST /api/projects/{id}/draw`: Record draw results
- `GET /api/projects/{id}/export`: Export winners to Excel

## Frontend Architecture (Vue 3)
### Tech Stack
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Store**: Pinia (for global state management)
- **Router**: Vue Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide Vue Next
- **HTTP Client**: Axios

### Component Migration Map
- `App.tsx` -> `App.vue` & `router/index.ts`
- `components/ProjectDashboard.tsx` -> `views/Dashboard.vue`
- `components/Workspace.tsx` -> `views/ProjectView.vue`
- `components/Sidebar.tsx` -> `components/Sidebar.vue`
- `components/ConfigPanel.tsx` -> `components/ConfigPanel.vue`
- `utils/excelHelper.ts` -> `utils/excelHelper.ts` (Keep most logic, adapt if needed)

## Migration Strategy
1. **Scaffold Backend**: Set up FastAPI structure and database models.
2. **Implement API**: Create endpoints matching the current React state management needs.
3. **Scaffold Frontend**: Set up Vue 3 project with Tailwind and Pinia.
4. **Component Porting**: Re-implement React components in Vue 3, maintaining the same look and feel (Tailwind classes will be reused).
5. **Data Integration**: Connect Vue components to FastAPI endpoints.
6. **Cleanup**: Once verified, remove React-specific files.

## Directory Structure (Planned)
```
/
├── backend/                # FastAPI project
│   ├── app/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   ├── routers/
│   │   └── main.py
│   ├── requirements.txt
│   └── data/               # SQLite db location
├── frontend/               # Vue 3 project
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.vue
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml      # Orchestrate both
└── openspec/               # Project specs
```
