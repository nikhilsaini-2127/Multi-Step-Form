# Research: Progress Step Navigation

## Decision: Keep completion state in the existing form hook

**Rationale**: `useMultiStepForm` already owns `formData`, the ordered `steps` definition,
validation rules, and `currentStep`. Deriving each step's completion state there keeps the
progress indicator from duplicating validation logic or maintaining a second source of truth.

**Alternatives considered**:
- Derive completion inside `ProgressSteps`: rejected because the component would need to know
  every field and validation rule for personal, professional, and billing data.
- Track a separate completed-step state: rejected because it can become stale when a user edits
  a previously completed step.

## Decision: Permit direct navigation through a named interactive control

**Rationale**: The progress indicator is already rendered at the top of `MultiStepForm`, and the
page owns `setCurrentStep`. Passing a step-selection callback keeps navigation local and preserves
the existing form state. Native buttons provide keyboard activation and accessible naming.

**Alternatives considered**:
- Use router navigation for each step: rejected because steps are sections of one form, not pages.
- Make only completed steps clickable: rejected because the feature requires review and correction
  of incomplete sections while preserving entered values.

## Decision: Use step identifiers as stable rendering identity

**Rationale**: Each configured step already has a unique `id` (`personal`, `professional`, and
`billing`). Using that identity for the repeated step group keeps each indicator associated with
its configured step as active and completion state changes.

**Alternatives considered**:
- Use the array index as the repeated group identity: rejected because it is less stable if the
  configured step order changes.
- Render separate arrays for indicators and connectors: rejected because grouping each indicator
  with its following connector keeps the adjacency rule local and avoids duplicated ordering logic.

## Decision: Preserve current visual language and add non-color state cues

**Rationale**: The existing component uses the project's Tailwind utility classes and react-icons.
Completed steps can retain the check icon, while current and pending states need an accessible name
and visible icon/state distinction that is not color-dependent.

**Alternatives considered**:
- Introduce a new component library: rejected because it violates the reuse principle and adds no
  value for this focused change.
