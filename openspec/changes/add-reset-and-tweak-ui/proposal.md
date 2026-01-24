# Proposal: Add Reset and Tweak UI

## Problem
1. The lucky draw reset functionality is not implemented on the backend, making it impossible for users to restart a draw without manually deleting the database or project.
2. The UI in `ProjectView.vue` shows a prize thumbnail in the center area when a prize is selected, which contradicts the user's preference for a cleaner interface with just the user icon and text.

## Proposed Changes
1. **Reset Functionality**:
    - Add a `DELETE /projects/{project_id}/winners` endpoint to clear all winners for a specific project.
    - Add a `resetProjectData` action in the frontend store.
    - Connect the "Reset" button in `ProjectView.vue` to this new action.
2. **UI Tweak**:
    - Revert the central "ready" state in `ProjectView.vue` to show a user icon instead of the prize image.
    - Ensure the prize image is still available in the sidebar but doesn't distract in the main rolling area before starting.

## Goals
- Functional reset button that clears winners.
- Clean, consistent UI in the rolling area.
