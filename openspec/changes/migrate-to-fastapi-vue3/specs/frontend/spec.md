# Spec Delta: Vue 3 Frontend Implementation

## MODIFIED Requirements
### Requirement: UI Framework
The frontend SHALL be implemented using Vue 3 and the Composition API.

#### Scenario: Reactive State Management
- Given the lottery is in progress
- When the state of winners or prizes changes
- Then Vue's reactive system (ref/reactive) MUST update the UI efficiently without full page re-renders.

#### Scenario: Component Structure
- Given the existing React component hierarchy
- When migrating to Vue 3
- Then each React component SHOULD be mapped to a corresponding Vue Single File Component (.vue), maintaining the same CSS classes and accessibility features.

### Requirement: Lottery Animation
The core scrolling animation and confetti effects SHALL be preserved.

#### Scenario: Start Drawing
- Given a prize is selected and participants are available
- When the user clicks "Start"
- Then the Vue component triggers a `setInterval` or `requestAnimationFrame` loop to update the displayed name
- And the UI remains responsive during the animation.
