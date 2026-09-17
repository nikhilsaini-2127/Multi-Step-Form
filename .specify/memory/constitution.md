<!--
Sync Impact Report
- Version change: 1.0.0 -> 2.0.0
- Modified principles: IV. Contract-Safe Data Handling -> III. Contract-Safe Data Handling;
	V. Simple, Accessible Interfaces -> IV. Simple, Accessible Interfaces
- Added sections: Technical Constraints, Development Workflow
- Removed sections: III. Testable User Outcomes
- Follow-up TODOs: determine the original ratification date
-->

# Multi-Step Form Constitution

## Core Principles

### I. User-Centered Form Flow
The form MUST present personal, professional, and billing details as clear, ordered steps.
Each step MUST preserve valid user input when navigating backward or forward, expose validation
errors near the affected field, and prevent submission until required data is valid. This keeps a
multi-step interaction understandable and prevents avoidable data loss.

### II. Reuse Before Reinvention
Features MUST use existing project components, hooks, utilities, API helpers, and installed
dependencies when they satisfy the requirement. New abstractions or packages MUST have a specific
gap-based rationale and MUST avoid duplicating an existing local capability. This limits maintenance
cost and keeps behavior consistent across the form and its surrounding views.

### III. Contract-Safe Data Handling
Data passed between form steps, API helpers, and views MUST use one documented shape and explicit
field names. Changes to request, response, or persistence behavior MUST preserve that shape and handle
success and failure states explicitly. Sensitive billing data MUST NOT be logged or exposed in
user-facing error messages.

### IV. Simple, Accessible Interfaces
The implementation MUST favor the smallest clear change that satisfies the requirement. Interactive
controls MUST have accessible names, validation feedback MUST be perceivable without relying on color
alone, and keyboard navigation MUST reach every form action in a logical order. Complexity MUST be
justified in the plan or review by a concrete user or maintenance benefit.

## Technical Constraints

The application MUST use the existing React and Vite frontend structure unless a documented change is
required. Existing dependencies MUST be reused where practical. The implementation MUST preserve the
current build and lint entry points and MUST avoid introducing a second frontend framework for the same
responsibility.

## Development Workflow

Changes MUST identify the affected user flow and data contract before implementation. A change is
ready for review when lint/build checks pass when applicable and the diff contains no unrelated
refactoring. Reviewers MUST verify step-state preservation, validation behavior, accessibility of
changed controls, and handling of failed API interactions.

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

This constitution defines the mandatory engineering baseline for the project. Amendments MUST be
documented in the constitution's Sync Impact Report, reviewed with the affected implementation plan,
and applied before dependent specifications or tasks are treated as authoritative. Every amendment
MUST update the semantic version and amendment date: MAJOR for incompatible governance changes,
MINOR for new or materially expanded principles or sections, and PATCH for clarifications that do not
change obligations. Each implementation review MUST check compliance with the principles and record
any justified exception with an owner and a follow-up date.

**Version**: 2.0.0 | **Ratified**: TODO(RATIFICATION_DATE): determine original adoption date | **Last Amended**: 2026-09-17
