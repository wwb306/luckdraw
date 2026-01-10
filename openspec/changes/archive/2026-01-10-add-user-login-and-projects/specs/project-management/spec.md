# Project Management Spec

## ADDED Requirements

### Requirement: Project CRUD
The system SHALL allow authenticated users to create, read, update, and delete lottery projects.

#### Scenario: Create Project
- Given a logged-in user
- When they click "New Project" on the Dashboard
- And they enter a project name "Annual Party 2025"
- Then a new Project is created with empty participants and prizes
- And the user is automatically navigated to the Workspace for this project

#### Scenario: List Projects
- Given a user has created multiple projects
- When they view the Dashboard
- Then they see a list of cards, one for each project
- And each card shows the project name and creation date

#### Scenario: Enter Project
- Given a list of projects
- When the user clicks on a project card
- Then the Workspace loads with that project's specific data (Participants, Prizes)

#### Scenario: Data Isolation
- Given a user has two projects "A" and "B"
- When they add a participant to Project "A"
- Then Project "B" remains unchanged

#### Scenario: Delete Project
- Given a project on the dashboard
- When the user clicks the delete button (and confirms)
- Then the project and all its associated data are permanently removed
