# Codex Instructions — Willow Wealth Onboarding

## Tech Stack & Tooling
- React + TypeScript + Vite
- Styling: SCSS / CSS Modules

## Flow & State Rules
- Reference [Task.md](Task.md)

## Architectural & Judgment Rules (Handling Gaps in the Brief)
- **State Management:** Single central `useReducer` at top level (`App.tsx` or `OnboardingWizard.tsx`) — avoid over-engineered React Context APIs.
- **Back Navigation:** Hitting "Back" on `A1` bypasses Interstitial A back to Screen `0`. Hitting "Back" on `B1` bypasses Interstitial B back to Screen `A3`.
- **Step Counter (`x/x`):** Render ONLY on question screens (`A1–A3` as `1/3–3/3` or `1/6–3/6`, `B1–B3` as `4/6–6/6`). Do NOT show on Screen `0`, Interstitials `A`/`B`, or the final screen.
- **Qualified Purchaser Hint (A3):** Render `(?) What is a qualified purchaser?` as a clean inline collapsible card/accordion detailing the SEC $5M investment threshold.
- **Mock API (`POST /api/onboarding`):** Simulate a ~1s async delay handling both 200 OK success and a simulated failure state with an error banner and retry option.

## Constraints
- Timebox: 2 hours.
- Keep components modular and self-contained in `src/screens/` or `src/components/`.

## Mandatory Documentation & Prompt Tracking
Whenever you create, modify, or complete a code-related task, you MUST in the same turn:
1. Save the exact prompt used into a file under `docs/prompts/` (e.g., `docs/prompts/01-state-setup.md`).
2. Automatically update `PLAN.md` by checking off completed items (`[x]`).
3. Automatically append an entry to `AI_WORKFLOW.md` using the following structure:
   - **Files touched/created**
   - **Verification performed:** (e.g., tested empty input validation, back button routing)
   - **Accept vs. Reject decisions:** (e.g., "Rejected context provider in favor of a top-level reducer; rejected third-party modal in favor of an inline disclosure.")