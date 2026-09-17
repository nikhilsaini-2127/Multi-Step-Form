---

description: "Executable tasks for Progress Step Navigation"
---

# Tasks: Progress Step Navigation

**Input**: Design documents from `/specs/001-progress-step-navigation/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/progress-steps-ui.md, quickstart.md

**Tests**: No separate test-writing tasks are included because the feature specification does not explicitly request TDD or new test coverage. Existing lint/build validation is included in the final phase.

**Organization**: Tasks are grouped by user story so each increment can be implemented and reviewed independently.

## Phase 1: Setup

- [X] T001 Review the existing step definitions and validation ownership in `src/hooks/useMultiStepForm.jsx`, `src/pages/MultiStepForm.jsx`, and `src/components/ProgressSteps.jsx` against `specs/001-progress-step-navigation/plan.md`
- [X] T002 [P] Record the current three-step identifiers, labels, and icons as the unchanged input contract in `src/hooks/useMultiStepForm.jsx`

## Phase 2: Foundational State Support

- [X] T003 Add a single completion-state derivation in `src/hooks/useMultiStepForm.jsx` using the existing validation rules and the states `current`, `completed`, `pending`, and `invalid`; do not introduce a second form-data store
- [X] T004 Extend the progress-step data returned by `src/hooks/useMultiStepForm.jsx` or its returned props so the indicator can receive per-step state and a step-selection action without changing the form submission payload
- [X] T005 [P] Define the review-only step-selection handler in `src/pages/MultiStepForm.jsx` so selecting any step updates only `currentStep`, skips validation, and preserves every object in `formData`

## Phase 3: User Story 1 - Understand Step Progress (Priority: P1)

**Goal**: Show a check icon only for validated completed steps and show the configured step icon for current, pending, or invalid steps.

**Independent test criteria**: With empty, invalid, and valid step data, the indicator distinguishes current, completed, pending, and invalid states; no incomplete or active step displays a completion check.

- [X] T006 [US1] Update `src/components/ProgressSteps.jsx` to consume explicit per-step completion state instead of using only `index <= currentStep` to decide whether a step is completed
- [X] T007 [US1] Render the `FaCheck` icon in `src/components/ProgressSteps.jsx` only when a step is `completed`; render the configured step icon for `current`, `pending`, and `invalid` states
- [X] T008 [US1] Add non-color state cues and accessible labels in `src/components/ProgressSteps.jsx` so current, completed, pending, and invalid states remain distinguishable without relying on color alone
- [X] T009 [US1] Preserve active and pending connector behavior in `src/components/ProgressSteps.jsx` while deriving connector styling from adjacent step state and keeping one connector between each adjacent pair

## Phase 4: User Story 2 - Navigate Using Step Indicators (Priority: P1)

**Goal**: Allow users to select any configured step, including incomplete steps, without losing entered form data.

**Independent test criteria**: Selecting any step opens its corresponding form section, keyboard activation is possible, and values entered before navigation remain available after returning.

- [X] T010 [US2] Convert each step indicator in `src/components/ProgressSteps.jsx` into a named keyboard-accessible control that identifies the destination step
- [X] T011 [US2] Connect each progress control in `src/components/ProgressSteps.jsx` to the step-selection handler from `src/pages/MultiStepForm.jsx` using the configured step index or identifier
- [X] T012 [US2] Ensure `src/pages/MultiStepForm.jsx` passes review-only navigation and completion-state props to `ProgressSteps` without triggering validation, clearing form data, or changing existing Previous, Next, or Submit behavior
- [X] T013 [US2] Preserve focus order and current-step semantics in `src/components/ProgressSteps.jsx` for selecting the current, previous, future, or invalid step

## Phase 5: User Story 3 - Receive Stable Step Rendering (Priority: P2)

**Goal**: Keep each configured step associated with one stable indicator and render only the valid adjacent connectors during state changes.

**Independent test criteria**: Repeated forward and backward navigation preserves configured order, produces one indicator per step and one connector per adjacent pair, and does not emit repeated-element identity warnings.

- [X] T014 [US3] Replace the unkeyed fragment inside `steps.map()` in `src/components/ProgressSteps.jsx` with a stable keyed step group using each configured step `id`
- [X] T015 [US3] Keep indicator and following connector grouped in the same ordered mapping in `src/components/ProgressSteps.jsx` so connector count remains `steps.length - 1` for any configured step list
- [X] T016 [US3] Handle state changes and configured step-list length changes in `src/components/ProgressSteps.jsx` without duplicate, missing, or misassociated indicators

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T017 [P] Align class names, border utilities, focus styling, and responsive sizing in `src/components/ProgressSteps.jsx` with the existing visual language without changing unrelated form styles
- [X] T018 Run `npm run lint` and `npm run build` from the repository root, then resolve only feature-related issues in `src/components/ProgressSteps.jsx`, `src/hooks/useMultiStepForm.jsx`, or `src/pages/MultiStepForm.jsx`
- [X] T019 Review the implementation against `specs/001-progress-step-navigation/contracts/progress-steps-ui.md` and `specs/001-progress-step-navigation/quickstart.md`, recording any remaining requirement gap before marking the feature complete

## Dependencies & Execution Order

### Dependency Graph

```text
T001 -> T003 -> T004
T002 -> T003
T005 -> T011 -> T012
T003 -> T006 -> T007 -> T008 -> T009
T004 -> T006
T006 -> T010 -> T011 -> T013
T006 -> T014 -> T015 -> T016
T009, T013, T016 -> T017 -> T018 -> T019
```

### User Story Completion Order

1. **US1** depends on foundational completion-state derivation (T003-T004) and delivers the MVP state accuracy.
2. **US2** depends on the state inputs and page-level handler (T005), then adds direct navigation and preservation.
3. **US3** can begin after the indicator structure is updated in US1 and finalizes stable keyed rendering and connector behavior.

## Parallel Execution Examples

### Setup and foundation

- T002 can run in parallel with T001 because it documents existing step inputs only.
- T005 can run in parallel with T003-T004 because it changes the page-level navigation handler in a separate file, then joins before T011-T012.

### User Story 1

- T006 and T009 are separate indicator concerns but should merge through the same file before T007-T008 are finalized.
- T007 and T008 can be prepared in parallel after T006 when their changes remain localized to icon selection and state cues.

### User Story 2

- T010 can proceed in parallel with T012 because control semantics belong to `ProgressSteps.jsx` while prop wiring belongs to `MultiStepForm.jsx`.
- T011 and T013 depend on the control and handler contracts and should follow T010/T012.

### User Story 3

- T014 and T015 can be implemented together in `src/components/ProgressSteps.jsx`; T016 follows them to cover dynamic state and list changes.

## Implementation Strategy

1. **MVP**: Complete T001-T009 to make progress status accurate and remove misleading checkmarks.
2. **Navigation increment**: Complete T010-T013 to make every step selectable while preserving form data and keyboard access.
3. **Stability increment**: Complete T014-T016 to key repeated content and preserve indicator/connector structure.
4. **Polish and gate**: Complete T017-T019, then use the quickstart scenarios and existing lint/build commands as the final readiness check.

## Phase 7: Convergence

- [ ] T020 Add visible non-color cues for current and invalid states in `src/components/ProgressSteps.jsx` while preserving the configured step icon for non-completed steps, per FR-009 and SC-005 (partial)
