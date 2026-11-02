# `ReadyStep.tsx` guide

Source: [`src/screens/ReadyStep/ReadyStep.tsx`](../../src/screens/ReadyStep/ReadyStep.tsx)

## Purpose

`ReadyStep` presents a decorative illustration beside the heading and self-directed/managed investment choices, submits the selected path with `submitOnboarding`, and renders submitting, success, error, retry, and toast-notification states. It receives global onboarding state and dispatch from its parent.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `state` | `OnboardingState` | Current onboarding answers, selected path, and submission status. |
| `dispatch` | `Dispatch<OnboardingAction>` | Receives selected-path and submission lifecycle actions. |

## Events and submission behavior

- Selecting a path dispatches `SET_SELECTED_PATH` and `SUBMIT_START`, then uses Fetch to POST a payload containing a generated `userId`, selected path, account/profile/regulatory `stepData`, and ISO timestamp to `/api/onboarding`.
- The local Vite mock endpoint waits 700ms; the self-directed path succeeds with HTTP 200, while the managed path fails with HTTP 400.
- Success dispatches `SUBMIT_SUCCESS`, displays the returned confirmation, and shows a green toast.
- Failure dispatches `SUBMIT_ERROR`, displays an alert with a retry action, and shows a red toast.
- Both toasts appear at the viewport's top-right, can be dismissed with the close icon stored in `src/assets/close.svg`, and automatically dismiss after five seconds.
- Retry submits the previously selected supported path.
- A ref and the `isSubmitting` state guard against duplicate submission attempts.

## Usage

```tsx
<ReadyStep state={state} dispatch={dispatch} />
```

`state` and `dispatch` are provided by `useOnboardingState`.

## Recommended unit-test scenarios

- Verify both investment paths are rendered with their labels and descriptions.
- Select each path and verify selected-path and submission-start actions.
- Mock a successful API response and verify the confirmation message and selected path.
- Verify the self-directed path produces an HTTP 200 success and the managed path produces an HTTP 400 failure.
- Verify both outcomes display the corresponding toast, which can be dismissed manually and disappears after five seconds.
- Mock a rejected API call and verify the alert, error state, and retry button.
- Activate retry and verify the previous path is submitted again.
- While submission is pending, verify path buttons are disabled and repeat activation does not start another request.
- Verify loading and success/error content expose their status appropriately to assistive technology.
- Verify the decorative illustration is hidden from assistive technology and appears beside the choices on wide layouts and above them on narrow layouts.

## Room for improvement

- Consider injecting the submission function to make API outcomes and duplicate-request tests straightforward.
