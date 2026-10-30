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