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

## Reusable Interstitial Screen
- **Files touched/created:** `src/screens/InterstitialScreen.tsx`, `src/screens/InterstitialScreen.module.scss`, `docs/INTERSTITIAL_USAGE.md`, `docs/prompts/03-interstitial-screen.md`, `PLAN.md`, `AI_WORKFLOW.md`.
- **Verification performed:** `npm run lint`, a targeted `tsc --noEmit` check of `InterstitialScreen.tsx`, `npx sass src/screens/InterstitialScreen.module.scss --no-source-map --quiet`, `npx vite build`, and `git diff --check` passed. `npm run build` remains blocked by the installed TypeScript version, which does not support the existing `erasableSyntaxOnly` setting and reports incompatible `@vitejs/plugin-react` declaration syntax.
- **Accept vs. Reject decisions:** Kept a self-contained React component, CSS Modules, the existing global design tokens, and a decorative inline SVG; rejected changing the current account-creation screen so the component remains an opt-in wizard screen.


## Layout Shell & Typography Foundation
- **Files touched/created:** `src/components/LayoutShell.tsx`, `src/components/LayoutShell.scss`, `src/index.scss`, `src/App.scss`, `src/App.tsx`, `PLAN.md`, `AI_WORKFLOW.md`, `docs/prompts/02-layout-shell-and-typography.md`.
- **Verification performed:** `npm run lint`, a targeted `tsc --noEmit` check of the changed React files, and `npx vite build` passed. `npm run build` remains blocked by the installed TypeScript 5.5.4, which does not support the existing `erasableSyntaxOnly` setting and reports incompatible `@vitejs/plugin-react` declaration syntax.
- **Accept vs. Reject decisions:** 

[useOboardingState-review.md](docs/reviews/useOnboardingState-review.md)
[interstitialScreen-review.md](docs/reviews/interstitialScreen-review.md)
[accountStep-review.md](docs/reviews/accountStep-review.md)
[screensA1toA3.md](docs/reviews/screensA1toA3.md)

Kept global CSS custom properties and a reusable centered shell/card. Kept progress restricted to question steps and made back routing a parent-provided callback so the caller can bypass interstitials. Rejected inferring interstitial/final navigation from a numeric step because the shell contract does not identify those screens.

## Screen 0 Account Creation
- **Files touched/created:** `src/screens/AccountStep.tsx`, `src/screens/AccountStep.module.scss`, `src/App.tsx`, `PLAN.md`, `AI_WORKFLOW.md`, `docs/prompts/04-account-creation-screen.md`.
- **Verification performed:** `npm run lint`, `npx vite build`, a targeted `npx tsc` check of the changed React files, browser verification of required-field errors and successful submission to Interstitial A, and `git diff --check`. `npm run build` is blocked by the installed TypeScript version: it does not support the existing `erasableSyntaxOnly` option and fails to parse the installed Vite React plugin declarations.
- **Accept vs. Reject decisions:** Kept account state in the existing reducer and form edits local until valid submission; used inline accessible errors and a disabled non-navigating Log in control; rejected adding third-party form or icon dependencies.

## Option-Card Questions A1–A3
- **Files touched/created:** `src/components/OptionCardStep.tsx`, `src/components/OptionCardStep.module.scss`, `src/screens/QualifiedPurchaserInfo.module.scss`, `src/App.tsx`, `PLAN.md`, `AI_WORKFLOW.md`, `docs/prompts/05-option-card-questions.md`.
- **Verification performed:** `npm run lint`, targeted `tsc --noEmit` for the changed React screens, `npx vite build`, and `git diff --check` passed. `npm run build` remains blocked by the installed TypeScript version, which does not support the existing `erasableSyntaxOnly` option and cannot parse the installed Vite React plugin declarations.
- **Accept vs. Reject decisions:** Kept profile answers in the existing reducer, advanced immediately on card selection, and used a native inline `<details>` disclosure for the SEC definition; rejected a Continue button and a blocking modal.

## Dropdown Questions B1–B3
- **Files touched/created:** `src/screens/RegulatoryQuestions.tsx`, `src/screens/RegulatoryQuestions.module.scss`, `src/App.tsx`, `PLAN.md`, `AI_WORKFLOW.md`, `docs/prompts/06-dropdown-questions.md`.
- **Verification performed:** Pending lint and Vite build validation.
- **Accept vs. Reject decisions:** Kept regulatory answers in the existing reducer, used native accessible country/status selects, and disabled Continue until every required selection is valid; rejected third-party form dependencies and automatic advancement.