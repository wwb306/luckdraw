# Proposal: Center Start Button

## Problem
In the lucky draw workspace (`ProjectView.vue`), the "Start Draw" button is positioned below the rolling area. For better visibility and user experience, the user wants the "Start Draw" button to be centered vertically on the screen when a prize is selected but the draw hasn't started yet.

## Proposed Changes
1. **Layout Adjustment**:
    - Modify the flex layout in `ProjectView.vue`.
    - When not rolling and no participants are displayed, use a container that centers the "Start Draw" button vertically.
    - Reduce the height of the "Ready" state container (the one with the `Users` icon) to allow the button to be more prominent in the center.

## Goals
- "Start Draw" button is vertically centered when ready to draw.
- Improved visual focus on the primary action.
