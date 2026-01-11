# Tasks: Add User Login and Project Management

## 1. Foundation
- [x] **Define Data Models**: Update `types.ts` to include `User` and `Project` interfaces.
- [x] **Implement Storage Service**: Create `utils/storage.ts` to handle:
    - User storage (`saveUser`, `getUsers`, `login`).
    - Project storage (`saveProject`, `getProjects`, `createProject`, `deleteProject`).

## 2. UI Components
- [x] **Create Login View**: `components/LoginScreen.tsx`
    - Simple centered form.
    - Input: Username.
    - Action: Login (creates user if new, or just starts session).
- [x] **Create Dashboard View**: `components/ProjectDashboard.tsx`
    - List existing projects for the current user.
    - "New Project" button/modal.
    - "Delete Project" action.
    - "Enter Project" action.
    - "Logout" action.

## 3. Core Refactoring
- [x] **Extract Workspace**: Move the current logic from `App.tsx` into `components/Workspace.tsx`.
    - Props: `project: Project`, `onSave: (data: AppState) => void`, `onExit: () => void`.
    - Modify internal state to initialize from `project.data`.
    - Add `useEffect` hooks to trigger `onSave` when `participants` or `prizes` change.
- [x] **Update App Orchestrator**: Rewrite `App.tsx`.
    - Manage `currentUser` and `currentProject` state.
    - Render `LoginScreen`, `ProjectDashboard`, or `Workspace` based on state.

## 4. Integration
- [x] **Wire Up Storage**: Ensure `Workspace` calls `StorageService.updateProject` on changes.
- [x] **Test Flows**:
    - Login -> Create Project -> Add Data -> Exit -> Re-enter -> Verify Data.
    - Create 2nd Project -> Verify isolation.
