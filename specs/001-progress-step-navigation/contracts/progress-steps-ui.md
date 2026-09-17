# UI Contract: Progress Steps

## Purpose

Define the observable contract between the multi-step form page and its progress indicator.

## Inputs

The progress indicator receives:

- The ordered form step definitions, including `id`, `name`, and step-specific visual symbol.
- The zero-based active step index.
- Completion or validation state for each configured step.
- A step-selection action that receives the selected step index or identifier.

## Observable behavior

- Renders exactly one named step control for each configured step.
- Renders a connector only between adjacent controls.
- Marks exactly one step as current while the form is active.
- Shows a completion check only for validated completed steps that are no longer current.
- Shows the configured step symbol for current, pending, and invalid steps.
- Activating a control changes the visible form section to that step.
- Activation does not clear or replace values in other form sections.
- Activation does not trigger validation or mark the previously active step completed; validation
  remains associated with the existing Next and Submit actions.
- Each control is keyboard focusable and has an accessible name containing the destination step
  name.
- Current, completed, pending, and invalid states remain distinguishable without color alone.

## Failure behavior

- An incomplete or invalid step MUST NOT be represented as completed.
- A missing step identifier or malformed step entry is outside the current feature scope; existing
  step configuration remains the source of truth.
