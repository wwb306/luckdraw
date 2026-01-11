# project-management Specification

## Purpose
The system provides a localized environment for managing multiple lottery events (projects) without requiring a user account. It includes simple password protection for individual projects to prevent unauthorized access in shared environments.

## Requirements
### Requirement: Project CRUD
The system SHALL allow users to create, read, update, and delete lottery projects.

#### Scenario: Create Project (No Password)
- Given the application is open at the Dashboard
- When they click "New Project"
- And they enter a project name "Annual Party 2025" and leave password blank
- Then a new Project is created
- And the user is navigated to the Workspace for this project

#### Scenario: Create Project (With Password)
- Given the application is open at the Dashboard
- When they click "New Project"
- And they enter a project name "Confidential Draw" and a password "secret"
- Then a new Project is created with password protection

#### Scenario: List Projects
- Given multiple projects exist in local storage
- When the user views the Dashboard
- Then they see a list of cards, one for each project
- And cards for password-protected projects show a lock icon

#### Scenario: Enter Project (No Password)
- Given a project without a password
- When the user clicks on the project card
- Then the Workspace loads immediately

#### Scenario: Enter Project (With Password - Success)
- Given a project with a password "1234"
- When the user clicks on the project card
- And they enter "1234" in the verification dialog
- Then the Workspace loads

#### Scenario: Enter Project (With Password - Failure)
- Given a project with a password "1234"
- When the user clicks on the project card
- And they enter "wrong" in the verification dialog
- Then an error message is shown and the user remains on the Dashboard

#### Scenario: Delete Project
- Given a project on the dashboard
- When the user clicks the delete button (and confirms)
- Then the project and all its associated data are permanently removed
