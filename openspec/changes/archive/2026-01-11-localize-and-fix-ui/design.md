# Design: Localize and Fix UI

## Architecture Decisions

### 1. Image Upload Strategy
- **Option A**: Store image as Base64 in the SQLite database.
- **Option B**: Store image as a file on the server and save the path.
- **Decision**: **Option A (Base64)**. Since this is a lightweight "toolbox" application and the number of prizes is small, storing Base64 strings in SQLite is the simplest implementation and avoids managing a separate static files directory or volume mapping in Docker.

### 2. UI Layout for ProjectView
- Use `flex-col` with `h-screen` and `overflow-hidden` on the main container.
- The `header` will have a fixed height.
- The `main` content will use `flex-1` and `flex flex-col`.
- The "Rolling Area" will have a flexible but bounded height.
- The "Winners List" will be placed at the bottom with a `max-h` and `overflow-y-auto`, ensuring it doesn't push the rest of the content off-screen.
- Adjust the grid for participants to use smaller cards when the count is high, ensuring they stay within the viewport.

### 3. Localization
- Directly replace English strings with Chinese in Vue templates and scripts.
- No need for a full i18n library (like `vue-i18n`) for now, as the requirement is specifically for Chinese and we want to keep it minimal.

## Component Changes

### Backend
- `routers/projects.py`: Add `PATCH /projects/{project_id}/prizes/{prize_id}` endpoint to update `image` (Base64 string).

### Frontend
- `store/project.ts`: Add `updatePrizeImage(projectId, prizeId, base64Image)` action.
- `ConfigPanel.vue`: Update `handleImageChange` to read file as Base64 and call the new store action.
- `ProjectView.vue`: 
    - Adjust CSS for "one-screen" layout.
    - Translate all remaining English.
- `LuckyDrawDashboard.vue`: Translate all English.
- `Home.vue`: Translate all English.
- `Sidebar.vue`: Translate all English.
