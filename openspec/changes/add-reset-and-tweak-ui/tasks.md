# Tasks: Add Reset and Tweak UI

## Backend Tasks
- [x] Add `reset_winners` endpoint in `backend/app/routers/projects.py` <!-- id: 1 -->
    - Validate: Use curl to call DELETE `/api/projects/{id}/winners` and verify that `winners` table is empty for that project.

## Frontend Store Tasks
- [x] Add `resetProjectWinners` action in `frontend/src/store/project.ts` <!-- id: 2 -->
    - Validate: Verify that `currentProject.winners` is cleared after calling.

## UI Tweak Tasks
- [x] Connect reset button in `ProjectView.vue` to store action <!-- id: 3 -->
- [x] Adjust `ProjectView.vue` rolling area UI <!-- id: 4 -->
    - Remove prize image from "ready" state.
    - Ensure `Users` icon is displayed.
- [x] Verify UI fits one screen after tweaks <!-- id: 5 -->
