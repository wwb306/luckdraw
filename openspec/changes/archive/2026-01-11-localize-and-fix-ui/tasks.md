# Tasks: Localize and Fix UI

## Backend Tasks
- [x] Add `prize_image_update` endpoint in `backend/app/routers/projects.py` <!-- id: 1 -->
    - Validate: Test with curl or Postman to update a prize image with a Base64 string.
- [x] Update `schemas.py` to include prize update schema if necessary <!-- id: 2 -->

## Frontend Store Tasks
- [x] Add `updatePrizeImage` action in `frontend/src/store/project.ts` <!-- id: 3 -->
    - Validate: Call action from console and verify network request.

## UI Localization Tasks
- [x] Translate `frontend/src/views/Home.vue` <!-- id: 4 -->
- [x] Translate `frontend/src/views/LuckyDrawDashboard.vue` <!-- id: 5 -->
- [x] Translate `frontend/src/views/ProjectView.vue` <!-- id: 6 -->
- [x] Translate `frontend/src/components/Sidebar.vue` <!-- id: 7 -->
- [x] Translate any remaining English in `frontend/src/components/ConfigPanel.vue` <!-- id: 8 -->

## UI Fixes Tasks
- [x] Implement prize image upload in `ConfigPanel.vue` using the new store action <!-- id: 9 -->
- [x] Refactor `ProjectView.vue` layout to fit one screen <!-- id: 10 -->
    - Fix main container to `h-screen` and `overflow-hidden`.
    - Make winners list independently scrollable.
    - Adjust proportions of rolling area and controls.
- [x] Verify image display in `ProjectView.vue` when a prize is selected <!-- id: 11 -->
