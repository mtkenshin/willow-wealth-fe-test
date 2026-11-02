# `InvestorProfileQuestions.tsx` guide

Source: [`src/screens/InvestorProfileQuestions.tsx`](../../src/screens/InvestorProfileQuestions.tsx)

## Purpose

`InvestorProfileQuestions` renders one of three investor questions: household income (step `2`), net worth (step `3`), or qualified-purchaser status (step `4`). It uses `OptionCardStep`, writes the answer through the onboarding reducer, and advances to the next step. The final question also includes an SEC-definition disclosure.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `step` | `InvestorProfileQuestionStep` (`2 \| 3 \| 4`) | Chooses which question to render. |
| `profile` | `InvestorProfile` | Current income, net-worth, and qualified-purchaser answers. |
| `dispatch` | `Dispatch<OnboardingAction>` | Updates the answer and step in onboarding state. |

## Events and state changes

- Selecting an income option dispatches `UPDATE_INVESTOR_PROFILE` for `householdIncome`, then sets step `3`.
- Selecting a net-worth option updates `netWorth`, then sets step `4`.
- Selecting Yes/No updates `isQualifiedPurchaser`, then sets step `5`.
- The qualified-purchaser `<details>` disclosure expands and collapses natively.

## Usage

```tsx
<InvestorProfileQuestions
  step={2}
  profile={state.investorProfile}
  dispatch={dispatch}
/>
```

The `step` value should come from the current onboarding step after checking it is one of `2`, `3`, or `4`.

## Recommended unit-test scenarios

- At each supported step, verify the corresponding title, choices, and selected answer.
- Select each household-income option and verify its value is dispatched and the next step is `3`.
- Select each net-worth option and verify its value is dispatched and the next step is `4`.
- Select Yes and No and verify the boolean answer and next step `5`.
- Verify the qualified-purchaser disclosure content and its native open/closed behavior.

## Room for improvement

- Define literal unions for income and net-worth answer values to prevent unsupported strings.
- Consider extracting repeated dispatch-and-advance behavior only if the question set grows enough to justify the abstraction.
