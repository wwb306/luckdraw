# Design: Client-Side Persistence & Multi-Project Architecture

## Data Model

### 1. User
A simple identity marker.
```typescript
interface User {
  id: string;   // UUID
  name: string; // Display name
  createdAt: number;
}
```

### 2. Project
A container for a specific draw event.
```typescript
interface Project {
  id: string;
  ownerId: string; // Links to User.id
  name: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  
  // The state of the draw application
  data: {
    participants: Participant[];
    prizes: Prize[];
    // We do not store currentPrizeId or isRolling as those are ephemeral session states
    // But we might want to store 'winners' which are inside Prize objects
  }
}
```

## Storage Strategy (LocalStorage)

We will use a simple Key-Value pattern with namespacing.

- `luckydraw_users`: JSON array of all known users.
- `luckydraw_projects`: JSON array of all projects.
  - *Note*: As data grows, fetching all projects might be slow. In the future, we might separate `luckydraw_projects_meta` (list) from `luckydraw_project_<id>` (content). For this MVP, we will keep it simple: **One key for users, One key for projects**.

## Architecture Components

### 1. View Manager (App.tsx Refactor)
The `App` component will act as a State Machine for the high-level application view.
- **States**: `LOGIN` -> `DASHBOARD` -> `WORKSPACE`
- **Transitions**:
  - `LOGIN` -> `DASHBOARD`: User provides valid name.
  - `DASHBOARD` -> `WORKSPACE`: User selects or creates a project.
  - `WORKSPACE` -> `DASHBOARD`: User clicks "Back to Projects".
  - `DASHBOARD` -> `LOGIN`: User logs out.

### 2. Services
- **AuthService**: Handles login/logout (just storage wrappers).
- **StorageService**: Handles Project CRUD (Create, Read, Update, Delete) and auto-saving.

### 3. UI Components
- **LoginScreen**: Centered card, input for name, "Enter" button.
- **ProjectDashboard**: 
  - Header: User info, Logout.
  - Grid: List of existing projects (Card with name, date, summary).
  - Action: "New Project" button -> Modal for name -> Create & Enter.
- **Workspace (Existing App)**: 
  - Modify `App.tsx` logic to become `Workspace.tsx`.
  - Add "Back" button to Header.
  - Add `useEffect` to auto-save `participants` and `prizes` to the `StorageService` whenever they change.

## Security
- **None**: This is a client-side convenience feature. "Login" is just profile selection. Clearing browser cache wipes data. Users should be warned about this.
