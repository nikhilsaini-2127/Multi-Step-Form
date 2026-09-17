# Data Model: Progress Step Navigation

## Form Step

Represents one configured section in the multi-step form.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Unique identifier used to locate the section's form data. Existing values are `personal`, `professional`, and `billing`. |
| `name` | string | Human-readable destination name used for accessible navigation labels. |
| `icon` | visual symbol | Step-specific symbol shown while the step is current, pending, or invalid. |
| `order` | number | Position in the configured step list; zero-based for active-step state. |
| `completionState` | enum | Derived state: `current`, `completed`, `pending`, or `invalid`. |

## Step Completion State

Completion is derived from the existing form data and validation behavior rather than stored as a
separate independent flag.

### State rules

- `current`: `order` equals `currentStep`; show the step-specific icon and current styling.
- `completed`: required fields for the step pass validation and `order` is less than `currentStep`;
  show the completion check icon.
- `pending`: the step has not been completed and has no active validation failure; show the
  step-specific icon and pending styling.
- `invalid`: the step has missing or invalid required data after validation; show the step-specific
  icon and invalid styling, never the completion check icon.

## Relationships

- `Form Step` maps to one top-level object in `formData` using `id`.
- `currentStep` identifies one `Form Step` as active.
- `ProgressSteps` receives the ordered steps, current index, completion states, and a navigation
  action from the form page.
- Selecting a step updates `currentStep` only; it does not replace or clear `formData`.

## State Transitions

```text
pending -> current        user selects the step or moves to it
current -> completed      current step passes required validation and user advances
current -> invalid        validation runs and required data is missing or invalid
completed -> current      user selects a previously completed step
completed -> invalid      user edits a required value and validation marks it invalid
invalid -> current        user selects the invalid step to correct it
```
