# Design: Add Reset and Tweak UI

## Architecture Decisions

### 1. Reset Implementation
- **Endpoint**: `DELETE /projects/{project_id}/winners`.
- **Logic**: Use SQLAlchemy to delete all records from the `winners` table where `project_id` matches. This leaves `participants` and `prizes` intact.
- **Frontend**: The store action will clear `currentProject.winners` after a successful API call.

### 2. UI Tweak in ProjectView.vue
- Remove the conditional rendering of `currentPrize.image` in the main "ready" state (lines 100+ in the updated version).
- Keep the `Users` icon as the default visual cue when no rolling is active.
- Remove the absolute-positioned prize image background overlay (if any).

## Component Changes

### Backend
- `routers/projects.py`: Add `DELETE /projects/{project_id}/winners`.

### Frontend
- `store/project.ts`: Add `resetProjectWinners(projectId)`.
- `ProjectView.vue`: 
    - Update `handleReset` to call `projectStore.resetProjectWinners`.
    - Modify template to remove prize image from the rolling area's initial state.
