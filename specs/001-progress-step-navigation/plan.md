# Implementation Plan: Progress Step Navigation

**Branch**: `001-progress-step-navigation` | **Date**: 2026-09-17 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-progress-step-navigation/spec.md`

## Summary

Update the progress indicator so completed status reflects validated form data, pending and
invalid steps never show a check icon, and each step can navigate to its corresponding form
section. Preserve the existing React/Vite structure by keeping rendering in `ProgressSteps`,
deriving completion state in `useMultiStepForm`, and wiring navigation through `MultiStepForm`.
Indicator navigation is review-only: it changes `currentStep` without invoking validation or
changing `formData`; existing Next and Submit actions remain responsible for validation.

## Technical Context

**Language/Version**: JavaScript with React 19 and Vite 8

**Primary Dependencies**: Existing React, react-icons, Tailwind CSS utilities, and React Router

**Storage**: N/A for progress state; existing form data remains in hook state

**Testing**: Existing project validation commands and browser workflow checks; no new framework

**Target Platform**: Browser-based React application supported by the existing Vite setup

**Project Type**: Web application

**Performance Goals**: Progress state updates must remain synchronous from the user's perspective;
indicator navigation must not introduce a visible delay

**Constraints**: Preserve entered form data, use accessible interactive controls, maintain existing
styling and step order, do not validate on indicator selection, and avoid introducing a second state
or routing system

**Scale/Scope**: Three existing form steps and the `ProgressSteps`, `MultiStepForm`, and
`useMultiStepForm` modules

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. User-Centered Form Flow**: PASS. The plan preserves step state, validation feedback, and
  ordered personal, professional, and billing steps while adding review-only direct navigation.
- **II. Reuse Before Reinvention**: PASS. The plan reuses the existing hook, step definitions,
  component, icon dependency, and form page; no new package or abstraction is required.
- **III. Contract-Safe Data Handling**: PASS. Form data shape and API behavior are unchanged;
  completion state is derived from existing step data and validation rules.
- **IV. Simple, Accessible Interfaces**: PASS. The change uses native interactive controls with
  accessible step names, keyboard activation, and visual state distinctions beyond color.
- **Technical Constraints**: PASS. The existing React/Vite structure and build/lint entry points
  remain unchanged.

## Project Structure

### Documentation (this feature)

```text
specs/001-progress-step-navigation/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── ProgressSteps.jsx
├── hooks/
│   └── useMultiStepForm.jsx
└── pages/
    └── MultiStepForm.jsx
```

**Structure Decision**: Keep the existing single-project React layout. `useMultiStepForm` remains
the owner of step data and completion derivation, `MultiStepForm` owns active-step navigation, and
`ProgressSteps` remains a focused renderer and interaction surface.

## Post-Design Constitution Check

- **I. User-Centered Form Flow**: PASS. The data model preserves entered values while allowing
  direct review without triggering validation, and makes completion dependent on successful validation.
- **II. Reuse Before Reinvention**: PASS. The design uses existing step definitions, hook state,
  page navigation, Tailwind utilities, and icon components.
- **III. Contract-Safe Data Handling**: PASS. The UI contract changes only progress-state inputs
  and navigation behavior; form data and API payloads remain unchanged.
- **IV. Simple, Accessible Interfaces**: PASS. Native named controls provide pointer and keyboard
  navigation, and state differences are represented by icon and text semantics as well as color.
- **Technical Constraints**: PASS. No new package, storage layer, route, or frontend framework is
  introduced.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
