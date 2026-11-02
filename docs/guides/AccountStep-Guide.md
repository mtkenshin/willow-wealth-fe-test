# `AccountStep.tsx` guide

Source: [`src/screens/AccountStep/AccountStep.tsx`](../../src/screens/AccountStep/AccountStep.tsx)

## Purpose

`AccountStep` collects first name, last name, email, password, and terms acceptance. It keeps field values locally while editing, validates on submit, dispatches valid account values to onboarding state, and calls the parent Continue callback.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `account` | `OnboardingAccount` | Initial account values used to initialize the form. |
| `dispatch` | `Dispatch<OnboardingAction>` | Receives an `UPDATE_ACCOUNT` action after successful validation. |
| `onContinue` | `() => void` | Called after valid values are dispatched. |

## Events and validation

- Input changes update local form state and clear that field's current validation error.
- Submitting validates required names, email format, a password of at least eight characters, and terms acceptance.
- A valid submission trims names and email, dispatches the account update, and calls `onContinue`.
- The visibility button toggles the password input type and its accessible label.
- The Log in button is currently disabled.

## Usage

```tsx
<AccountStep
  account={state.account}
  dispatch={dispatch}
  onContinue={() => dispatch({ type: 'SET_STEP', payload: 1 })}
/>
```

`dispatch` and `state` can be obtained from `useOnboardingState`.

## Recommended unit-test scenarios

- Submit an empty form and verify all applicable validation messages and invalid-field attributes.
- Test malformed email, password shorter than eight characters, and unchecked terms independently.
- Submit valid data and verify trimmed values are sent in `UPDATE_ACCOUNT` before `onContinue` runs.
- Edit an invalid field and verify only its error is cleared.
- Toggle password visibility and verify input type, button label, and `aria-pressed`.
- Verify the disabled Log in button cannot be activated.

## Room for improvement

- Confirm email and password requirements with the eventual account service and keep client-side validation aligned.
- Consider focusing the error summary or first invalid field after submission to improve keyboard and screen-reader error recovery.
- The component initializes local form state from `account` once; define expected behavior if a parent replaces account values after mount.
