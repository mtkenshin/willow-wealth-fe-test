# `App.tsx` guide

Source: [`src/App.tsx`](../../src/App.tsx)

## Purpose

`App` coordinates the onboarding flow. It reads state and dispatch from `useOnboardingState`, maps the current step to a screen, connects screen callbacks to state actions, and implements the special Back transitions.

## Props

`App` has no props. Onboarding state is owned by the `useOnboardingState` hook.

## Events and navigation

- Account Continue moves from step `0` to interstitial step `1`.
- Interstitial Continue moves to the first investor-profile question, step `2`, or the first regulatory question, step `6`.
- Investor-profile option selection updates its answer and advances to the next step.
- Regulatory callbacks update citizenship, tax residence, or employment status; Continue advances the flow.
- Back from step `2` returns to step `0`; Back from step `6` returns to step `4`; other question steps use the previous step.

## Usage

`App` is the root UI component. It is mounted by `src/main.tsx`:

```tsx
import App from './App'

<App />
```

## Recommended unit-test scenarios

- Render `App` with initial state and verify account creation is shown.
- Complete the account screen and verify the welcome interstitial appears.
- Verify Back from the first investor question returns to account creation.
- Verify Back from the first regulatory question returns to the qualified-purchaser question at step `4`, bypassing the regulatory interstitial.
- Verify each step renders its expected screen and the final step renders `ReadyStep`.
- Verify regulatory and investor answer actions update state and allow the flow to advance.
- Verify an unexpected step shows fallback content instead of crashing.

## Room for improvement

- Add integration coverage for the complete flow, including back-navigation boundaries.
- If the step flow grows, use a typed step definition or screen mapping to make step-to-screen relationships easier to maintain than nested conditional rendering.
- Keep orchestration tests separate from individual screen unit tests.
