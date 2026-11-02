# AI Workflow & Documentation

## Tools Used
- Codex CLI / VS Code AI agent
- React + TypeScript + Vite
- SCSS / CSS Modules
- ESLint, TypeScript compiler, Vite build, and npm validation scripts

## Prompts & Working Docs
- Used `AGENT.md` to lock in the onboarding stack, reducer pattern, flow rules, and responsive/accessibility constraints.
- Used `PLAN.md` as the implementation checklist for scaffolding, state setup, layout shell, interstitial flow, validation, and final polish.
- Referenced the prompt history in `docs/prompts/` for each iteration: `01-scss-support.md`, `02-layout-shell-and-typography.md`, `03-interstitial-screen.md`, `04-account-creation-screen.md`, `05-option-card-questions.md`, `06-dropdown-questions.md`, `07-onboarding-review.md`, `08-onboarding-step-transitions.md`, and `09-styling-layout-screens.md`.

## AI Suggestions Kept vs. Rejected
- **Kept:** top-level reducer state, explicit back-routing logic, reusable interstitial component, SCSS design tokens, native form controls, and a local mock API with a 10% failure path.
- **Kept:** modular screen components in `src/screens/` and a centered layout shell to preserve a clean multi-step wizard flow.
- **Rejected / Reworked:** custom onboarding context provider, third-party modal or form libraries, adding a real backend dependency, and numeric-step inference that attempted to determine special screens from the step index alone.

## AI Missteps & Corrections
- **Issue:** the initial B1 citizenship control was treated as a single-select dropdown instead of a dynamic multi-value list.
- **Correction:** refactored the question to support an array of countries with add/remove controls, duplicate prevention, and required validation before continuing.
- **Issue:** early transition logic inferred interstitial/final routing from `step` values rather than the explicit screen flow.
- **Correction:** moved to parent-provided back navigation and explicit transition rules for forward, backward, and bypass navigation.
- **Issue:** account validation was too generic and did not fully cover empty, malformed, or mobile-target-size requirements.
- **Correction:** tightened required-field checks, elevated target sizes to 44px, and added an accessible live summary for form errors.

## Ownership Summary
- **AI Generated (~70%):** initial JSX structure, TypeScript interfaces, reducer wiring, reusable components, SCSS styling tokens, and mock API behavior.
- **Hand-Edited / Directed (~30%):** final step logic, validation nuance, edge-case routing, mobile polish, and the final review pass.

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

[useOnboardingState-review.md](docs/reviews/useOnboardingState-review.md)
[interstitialScreen-review.md](docs/reviews/interstitialScreen-review.md)
[accountStep-review.md](docs/reviews/accountStep-review.md)
[screensA1toA3.md](docs/reviews/screensA1toA3.md)
[onboarding-api-review.md](docs/reviews/onboarding-api-review.md)

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
- **Verification performed:** Lint and Vite build passed during final onboarding-flow validation.
- **Accept vs. Reject decisions:** Kept regulatory answers in the existing reducer, used native accessible country/status selects, and disabled Continue until every required selection is valid; rejected third-party form dependencies and automatic advancement.

## Final Investment Path & Submission
- **Files touched/created:** `src/screens/ReadyStep.tsx`, `src/screens/ReadyStep.module.scss`, `src/api/onboardingApi.ts`, `src/App.tsx`, `AI_WORKFLOW.md`.
- **Verification performed:** `npm run lint`, `npx vite build`, targeted TypeScript checking, and `git diff --check` passed. Browser verification covered the final-step route, simulated submission failure, disabled cards during submission, retry, and successful confirmation.
- **Accept vs. Reject decisions:** Kept path selection and loading/error state in the existing onboarding reducer, used the mock API's 1.2-second delay and 90/10 success/failure simulation, and kept success confirmation local to the final screen; rejected adding a server or third-party dependency.

## Complete Onboarding Review
- **Files touched/created:** `src/screens/AccountStep.tsx`, `src/screens/AccountStep.module.scss`, `src/screens/QualifiedPurchaserInfo.module.scss`, `src/screens/RegulatoryQuestions.module.scss`, `src/screens/ReadyStep.module.scss`, `src/api/onboardingApi.ts`, `PLAN.md`, `docs/prompts/07-onboarding-review.md`, `AI_WORKFLOW.md`.
- **Architectural decisions:** Preserved the top-level reducer and explicit Back routing, kept progress limited to the six question screens, and retained native form/select/disclosure controls with the existing SCSS design tokens. Added an announced account-error summary, tightened email validation against empty dotted labels, and raised undersized mobile controls to 44px. The mock API now implements the already documented 10% failure path.
- **Verification performed:** Browser-tested blank and malformed account input, both Back routes (A1 → Screen 0; B1 → A3), progress 1/6–6/6 and hidden states, required B2/B3 selections, duplicate citizenship prevention, A3 disclosure, forced mock submission failure and retry success. At 375px, the flow had no horizontal overflow and all measured interactive targets were at least 44px; cards stacked. At 768px and 1440px, forms/options were centered with 544–560px content widths; ready-path cards used two columns. `npm run lint`, `npx vite build`, and `git diff --check` passed. `npm run build` remains blocked by the installed TypeScript/compiler configuration (`erasableSyntaxOnly` unsupported and Vite plugin declaration parse errors).
- **Accept vs. Reject decisions:** Kept the reducer, existing centered shell, SCSS modules, native controls, and local mock API; accepted a concise live error summary and target-size fixes. Rejected adding a context provider, a blocking modal, third-party form/icon packages, or a real server solely for this review.

## Onboarding Step Transitions
- **Files touched/created:** `src/components/LayoutShell.tsx`, `src/components/LayoutShell.scss`, `src/App.tsx`, `PLAN.md`, `docs/prompts/08-onboarding-step-transitions.md`, `AI_WORKFLOW.md`.
- **Verification performed:** `npm run lint`, `npx vite build`, and `git diff --check` passed. `npm run build` remains blocked by the installed TypeScript/compiler configuration (`erasableSyntaxOnly` unsupported and Vite plugin declaration parse errors).
- **Accept vs. Reject decisions:** Kept transitions in the shared layout shell and inferred direction from the current step index, covering forward, backward, and bypass navigation without duplicating animation logic in screen components. Used lightweight CSS keyframes instead of adding Framer Motion; honored reduced-motion preferences with an opacity-only, near-instant animation.

## Final Screen Illustration
- **Files touched/created:** `src/screens/ReadyStep/ReadyStep.tsx`, `src/screens/ReadyStep/ReadyStep.module.scss`, `src/screens/Interstitial/InterstitialIllustration.tsx`, `docs/guides/ReadyStep-Guide.md`, `docs/guides/InterstitialIllustration-Guide.md`, `docs/prompts/10-final-screen-illustration.md`, `PLAN.md`, `AI_WORKFLOW.md`.
- **Verification performed:** Targeted ESLint on both changed TSX files, `npx vite build`, and `git diff --check` passed. `npm run lint` is blocked by the existing unused `useCallback` import in `src/hooks/useOnboardingState.ts`; `npm run build` is blocked by the installed TypeScript version, which does not support the configured `erasableSyntaxOnly` option and cannot parse the installed Vite React plugin declarations. Browser verification could not be completed because the browser session was unavailable.
- **Accept vs. Reject decisions:** Reuse the existing decorative illustration and extend it with an optional class for the final-screen layout; keep the illustration beside a single-column stack of investment options on desktop and stack it above the content on mobile. Rejected adding a new image asset or dependency.

## Path Selection Submission and Toasts
- **Files touched/created:** `src/screens/ReadyStep/ReadyStep.tsx`, `src/screens/ReadyStep/ReadyStep.module.scss`, `src/api/onboardingApi.ts`, `docs/guides/ReadyStep-Guide.md`, `docs/prompts/11-path-selection-submissions-and-toasts.md`, `PLAN.md`, `AI_WORKFLOW.md`.
- **Verification performed:** Focused ESLint on `ReadyStep.tsx` and `onboardingApi.ts`, `npx vite build`, and `git diff --check` passed. `npx tsc --noEmit -p tsconfig.app.json` is blocked by the existing TypeScript configuration (`tsBuildInfoFile` without incremental/composite and unsupported `erasableSyntaxOnly`). An integrated-browser walkthrough could not proceed past the account-consent checkbox, so the final-screen interaction was not browser-verified.
- **Accept vs. Reject decisions:** Kept the API local and deterministic, with a 700ms HTTP 200 response for self-directed selection and HTTP 400 failure for managed selection; sent a full structured onboarding payload, and rendered accessible, dismissible five-second toasts in a portal so top-right positioning remains viewport-fixed. Preserved the existing loading guard, error banner, retry action, and success confirmation; rejected using a real network request or adding a notification dependency.

## Fetch API Submission
- **Files touched/created:** `src/api/onboardingApi.ts`, `vite.config.ts`, `docs/guides/ReadyStep-Guide.md`, `AI_WORKFLOW.md`.
- **Verification performed:** Focused ESLint on `srrec/api/onboardingApi.ts` and `vite.config.ts`, `npx vite build`, and `git diff --check` passed. POST requests to the running Vite mock endpoint returned HTTP 200 with a success JSON response for `self_directed`, and HTTP 400 with a JSON error for `managed`.
- **Accept vs. Reject decisions:** Use browser Fetch to POST JSON to `/api/onboarding`, with a local Vite development/preview middleware providing the existing deterministic 700ms mock results; rejected simulating the request solely with a timer in the client helper.

## Toast Close Icon
- **Files touched/created:** `src/assets/close.svg`, `src/screens/ReadyStep/ReadyStep.tsx`, `src/screens/ReadyStep/ReadyStep.module.scss`, `docs/guides/ReadyStep-Guide.md`, `AI_WORKFLOW.md`.
- **Verification performed:** Focused ESLint on `ReadyStep.tsx`, `npx vite build`, and `git diff --check` passed.
- **Accept vs. Reject decisions:** Added a dedicated SVG asset in `src/assets/` and used it as decorative iconography inside the existing accessible toast dismiss button; retained the button's screen-reader label and behavior.

## Citizenship Remove Icon
- **Files touched/created:** `src/assets/trash.svg`, `src/screens/RegulatoryQuestions/RegulatoryQuestions.tsx`, `src/screens/RegulatoryQuestions/RegulatoryQuestions.module.scss`, `AI_WORKFLOW.md`.
- **Verification performed:** Focused ESLint on `RegulatoryQuestions.tsx`, `npx vite build`, and `git diff --check` passed.
- **Accept vs. Reject decisions:** Replaced the visible Remove label with a trash SVG stored in `src/assets/`; kept the existing button action and its per-country accessible name, with a 44px icon-button target and focus styling.