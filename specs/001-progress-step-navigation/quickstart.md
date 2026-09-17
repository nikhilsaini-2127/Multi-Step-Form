# Quickstart: Progress Step Navigation

## Prerequisites

- Node.js and npm installed.
- Repository dependencies installed with `npm install`.
- The existing form application available from the repository root.

## Run the application

```powershell
npm run dev
```

Open the local Vite URL printed by the command and navigate to the multi-step form.

## Validation scenarios

1. **Initial state**
   - Open the form.
   - Confirm Personal Info is current.
   - Confirm Professional Info and Billing Info show their own symbols, not check icons.

2. **Invalid step does not complete**
   - Leave required Personal Info fields empty or enter invalid values.
   - Attempt to advance.
   - Confirm Personal Info does not show a completion check.

3. **Validated completion**
   - Enter valid Personal Info values and advance.
   - Confirm Personal Info shows a check icon and Professional Info is current.
   - Confirm Billing Info remains pending with its own symbol.

4. **Direct navigation and preservation**
   - Enter values in more than one section.
   - Select a different progress step.
   - Confirm the selected section opens and previously entered values remain present when returning.

5. **Keyboard navigation**
   - Use Tab to focus each progress control.
   - Activate a focused control with Enter or Space.
   - Confirm the corresponding section opens and the control has an accessible destination name.

6. **Stable rendering**
   - Move forward and backward repeatedly.
   - Confirm there is one progress control per configured step and one connector between adjacent
     steps, with no visible rendering warnings.

## Project checks

From the repository root, run the existing validation commands relevant to the change:

```powershell
npm run lint
npm run build
```

Expected outcome: both commands complete successfully, and all scenarios above remain true.
