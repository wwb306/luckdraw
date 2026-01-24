# Proposal: Localize and Fix UI

## Problem
1. The user interface contains a mix of English and Chinese, making it inconsistent for Chinese users.
2. The image upload functionality for prizes is not implemented; selecting an image has no effect.
3. The lucky draw interface (ProjectView) does not fit well on a single screen, requiring scrolling and having poor proportions on different screen sizes.

## Proposed Changes
1. **Localization**: Translate all remaining English text in `Home.vue`, `LuckyDrawDashboard.vue`, `ProjectView.vue`, and `Sidebar.vue` to Chinese.
2. **Image Upload Fix**:
    - Implement a backend endpoint to update prize images.
    - Implement a frontend store action to call this endpoint.
    - Update `ConfigPanel.vue` to upload images and refresh the project data.
3. **UI Adaptation**:
    - Refactor `ProjectView.vue` layout to use a fixed-height container that fits the viewport.
    - Make the winners list scrollable within its own container to prevent the whole page from scrolling.
    - Adjust font sizes and grid gaps based on the number of participants to optimize space usage.

## Goals
- 100% Chinese interface.
- Functional prize image upload.
- Single-screen lucky draw experience (no page scrolling for typical use cases).
