# Codex Instructions — Willow Wealth Onboarding

## Tech Stack & Tooling
- React + TypeScript + Vite
- Styling:  SCSS/CSS Modules

## Flow & State Rules
- Single `OnboardingContext` holds user form responses and current step index.
- Top Shell Layout: Shows brand wordmark, back button (`<`), and step indicator (`x / x`).
- Step behavior:
  - Screens A1–A3 (Option Cards): Selecting an option saves state and auto-advances.
  - Screens B1–B3 (Dropdowns): Requires selecting an option and clicking "Continue".
  - Back button reverses step without losing form state.
- Mock API: Async POST to `/api/onboarding` with artificial delay and error handling.

## Constraints
- Timebox: 2 hours.
- Keep components modular and self-contained in `src/screens/`.

## Automatic Documentation Rule (Mandatory)
Whenever you create, modify, or complete a code-related task, you MUST:
1. Automatically update `PLAN.md` by checking off completed items (`[x]`).
2. Automatically append a brief entry to `AI_WORKFLOW.md` detailing:
   - What components/files were created or modified.
   - Any missteps or initial mistakes you made and how they were corrected.
   - What was kept vs. rejected.
Perform these updates in the exact same turn as your code changes without requiring a separate prompt.