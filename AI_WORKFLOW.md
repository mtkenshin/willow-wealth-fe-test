# AI Workflow & Documentation

## Tools Used
- Codex CLI (via WebStorm / Terminal)

## Prompts & Working Docs
- Used `AGENT.md` to feed Codex the tech stack, flow rules, and component constraints.
- Used `PLAN.md` to track step-by-step progress through the flow.

## AI Suggestions Kept vs. Rejected
- **Kept:** Initial project structure, TypeScript payload interfaces, and Tailwind styling for option cards.
- **Rejected / Reworked:** [e.g., Rejected AI's local state approach; moved state to central `OnboardingContext` so back button persists inputs.]

## AI Missteps & Corrections
- **Issue:** [e.g., Codex initially generated single-select dropdown for B1 Citizenship.]
- **Correction:** [e.g., Refactored it to handle an array of countries with an 'Add another country' button.]

## Ownership Summary
- **AI Generated (~70%):** JSX structure, initial TypeScript interfaces, mock API latency boilerplate.
- **Hand-Edited / Directed (~30%):** Step-routing logic, multi-select handling, `x / x` progress calculation, state retention.

## SCSS Support
- **Modified:** Added `sass` as a development dependency, switched the application stylesheet imports to `src/App.scss` and `src/index.scss`, and updated `README.md` and `PLAN.md`.
- **Missteps / Corrections:** None.
- **Kept vs. Rejected:** Kept Vite's built-in SCSS pipeline; no additional Vite plugin or CSS Modules configuration was needed.


## Accept/Reject Reviews
[useOboardingState-review.md](docs/reviews/useOnboardingState-review.md)

## Layout Shell & Typography Foundation
- **Files touched/created:** `src/components/LayoutShell.tsx`, `src/components/LayoutShell.scss`, `src/index.scss`, `src/App.scss`, `src/App.tsx`, `PLAN.md`, `AI_WORKFLOW.md`, `docs/prompts/02-layout-shell-and-typography.md`.
- **Verification performed:** `npm run lint`, a targeted `tsc --noEmit` check of the changed React files, and `npx vite build` passed. `npm run build` remains blocked by the installed TypeScript 5.5.4, which does not support the existing `erasableSyntaxOnly` setting and reports incompatible `@vitejs/plugin-react` declaration syntax.
- **Accept vs. Reject decisions:** Kept global CSS custom properties and a reusable centered shell/card. Kept progress restricted to question steps and made back routing a parent-provided callback so the caller can bypass interstitials. Rejected inferring interstitial/final navigation from a numeric step because the shell contract does not identify those screens.