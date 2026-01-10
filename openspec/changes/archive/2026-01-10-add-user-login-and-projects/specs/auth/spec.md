# Authentication Spec

## ADDED Requirements

### Requirement: User Authentication
The system SHALL provide a mechanism for users to identify themselves via a username.

#### Scenario: User Login
- Given a user visits the application for the first time
- When they see the Login screen
- And they enter a username "Alice"
- Then a new User record is created for "Alice"
- And they are redirected to the Project Dashboard

#### Scenario: User Relogin
- Given a user "Alice" already exists in local storage
- When she enters "Alice" on the Login screen
- Then the system retrieves her existing User ID
- And she is redirected to the Project Dashboard to see her existing projects

#### Scenario: Logout
- Given a logged-in user
- When they click "Logout" on the Dashboard
- Then their session is cleared (state only, not data)
- And they are returned to the Login screen
