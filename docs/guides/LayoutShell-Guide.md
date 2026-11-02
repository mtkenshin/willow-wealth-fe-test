# `LayoutShell.tsx` guide

Source: [`src/components/LayoutShell/LayoutShell.tsx`](../../src/components/LayoutShell/LayoutShell.tsx)

## Purpose

`LayoutShell` provides the shared header and page layout for onboarding screens. It displays the Willow Wealth brand, an optional Back button, question progress, and directional transition classes when the current step changes.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `currentStep` | `number` | Required | Overall flow step; used to detect step changes and key the screen card. |
| `currentQuestionStep` | `number` | `undefined` | Current question number; when valid, enables the progress indicator. |
| `totalQuestionSteps` | `number` | `6` | Total shown in progress text. |
| `onBack` | `() => void` | `undefined` | Callback invoked by the Back button. |
| `showBack` | `boolean` | `currentQuestionStep !== undefined` | Whether to show Back; the button also requires `onBack`. |
| `children` | `ReactNode` | Required | Screen content rendered inside the layout card. |

## Events and behavior

- Clicking the accessible “Go back” button invokes `onBack`.
- Changing `currentStep` applies a forward or backward transition class.
- Progress is shown only when the question index and total are valid and the index is within the supported range.

## Usage

```tsx
<LayoutShell
  currentStep={state.step}
  currentQuestionStep={2}
  onBack={goBack}
  showBack
>
  <InvestorQuestion />
</LayoutShell>
```

## Recommended unit-test scenarios

- Render children and the brand header.
- Verify progress is hidden without `currentQuestionStep`.
- Verify valid progress renders the expected fraction and accessible “Step x of y” label.
- Verify invalid, out-of-range, or non-integer progress values do not render progress.
- Verify Back is hidden when `showBack` is false or `onBack` is absent, and invokes the callback when both allow it.
- Rerender with a greater and lesser `currentStep` and verify the corresponding transition class.

## Room for improvement

- Make the six-question progress ceiling a named flow constant or an explicit prop if another flow will reuse this shell.
- Add targeted accessibility checks for progress announcements and decorative logo content.
