# Reset Specification

## ADDED Requirements

### Requirement: Reset Winners
The system SHALL allow users to reset the lottery progress by clearing all winners for a specific project while preserving participants and prize configurations.

#### Scenario: Reset Project Winners
- Given a project with existing winners recorded
- When the user clicks the "Reset" button and confirms
- Then all winners for this project MUST be removed from the database
- And the UI MUST update to show 0 winners and full batch sizes for all prizes
