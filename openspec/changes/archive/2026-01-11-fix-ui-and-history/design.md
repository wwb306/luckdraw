# Design: UI Refinement and Bug Fixes

## UI Layout Improvements

### Start Button
Current: `px-16 py-6 text-2xl`
Proposed: `px-10 py-3 text-lg`
Reason: Reduce visual dominance while maintaining clickability.

### Content Spacing
Current: 
- `main` has `p-6` and `flex-col items-center`.
- Main container has `gap-6`.
- "Ready" state uses `justify-center` on the parent and a `h-24` spacer at the bottom.
- This creates a massive gap between the top header and the "Ready" box.

Proposed:
- Remove `justify-center` when in "Ready" state.
- Reduce or remove the `h-24` spacer.
- Ensure the stage box (`Rolling Area`) has a more natural top margin.

## History Display Logic

The issue is in the `v-if` of the winners list section:
```html
<div v-if="currentPrizeWinners.length > 0 && (isRolling || displayParticipants.length > 0)" ...>
```
When a user switches prizes and comes back, `isRolling` is false and `displayParticipants` is empty, so the list is hidden even if `currentPrizeWinners` has data.

Proposed:
```html
<div v-if="currentPrizeWinners.length > 0" ...>
```
This ensures that as long as there are winners for the selected prize, the list is visible.
