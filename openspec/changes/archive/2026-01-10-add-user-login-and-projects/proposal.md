# Proposal: Add User Login and Project Management

## Summary
Introduce a multi-tenant capability to the Lucky Draw application by adding a user login system and project management features. This allows users to create, save, and switch between different lottery events (projects), with data persisting across browser sessions.

## Why
Currently, `luckydraw-pro` is a single-session application.
- **Data Loss**: Refreshing the page clears all participants and prize settings.
- **Single Context**: Users cannot manage multiple different events (e.g., "Annual Meeting" vs "Team Building") without exporting/importing Excel files manually every time.
- **No Identity**: There is no concept of a "user" to own or organize these events.

## What Changes
We will implement a client-side "User" and "Project" system backed by `localStorage`.

1.  **User Login**: A simple entry screen to establish identity (username).
2.  **Project Management**: A dashboard to create new projects or resume existing ones.
3.  **Data Isolation**: Each project will contain its own isolated set of:
    - Participants
    - Prizes and their configurations
    - Winners and draw history
4.  **Persistence**: All changes within a project will be automatically saved to local storage.

## Impact
- **Architecture**: Moves from ephemeral in-memory state to persistent local state. Introduces a "View Manager" or Routing concept to switch between Login, Dashboard, and Workspace.
- **UX**: Users now start at a Login screen, move to a Dashboard, and then enter the Draw Workspace.
- **Data**: New data models for `User` and `Project`.

## Risks
- **Storage Limits**: `localStorage` has a size limit (usually 5MB). If users import massive lists or large images for prizes, we might hit limits.
    - *Mitigation*: We will strip base64 images if they are too large or warn the user, but for the MVP we will assume reasonable usage.
- **Concurrency**: Opening the same project in two tabs might overwrite data.
    - *Mitigation*: We will not handle complex conflict resolution in this MVP; last write wins.
