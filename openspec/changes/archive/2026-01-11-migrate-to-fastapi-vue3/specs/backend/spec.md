# Spec Delta: Backend Storage and API

## ADDED Requirements
### Requirement: Project CRUD
The system SHALL allow users to create, read, update, and delete lottery projects. Data MUST be persisted in a server-side SQLite database.

#### Scenario: List Projects from Backend
- Given multiple projects exist in the backend database
- When the user views the Dashboard
- Then the frontend fetches the project list via `GET /api/projects`
- And they see a list of cards, one for each project

#### Scenario: Create Project on Backend
- Given the application is open at the Dashboard
- When they click "New Project" and submit the form
- Then the frontend sends a `POST /api/projects` request
- And a new record is created in the SQLite database
- And the user is navigated to the Workspace

### Requirement: Data Persistence
The system SHALL ensure data is not lost on page refresh by storing all project data (participants, prizes, winners) in the backend.

#### Scenario: Refresh Workspace
- Given a user is in the Workspace of a project
- When they refresh the page
- Then the frontend fetches the latest state from `GET /api/projects/{id}`
- And all participants and prize configurations are restored correctly
