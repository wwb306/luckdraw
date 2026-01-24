# UI Fixes Spec

## ADDED Requirements

### Requirement: The Lucky Draw interface must fit within a single screen
The system SHALL optimize the Lucky Draw interface to fit within a single browser viewport. The main page MUST NOT exhibit vertical scrolling under normal conditions.

#### Scenario: Viewing the lucky draw dashboard
- **Given** I am on the Project View page
- **Then** the entire interface (header, rolling area, controls, winners list) should be visible without vertical scrolling
- **And** the winners list should be scrollable independently if it contains many items
- **And** the rolling area should scale appropriately to leave space for other elements

#### Scenario: Many winners are drawn
- **Given** I have drawn 50 winners for a prize
- **Then** the winners list container should show a scrollbar
- **But** the rest of the page (header, start button) should remain fixed in position
