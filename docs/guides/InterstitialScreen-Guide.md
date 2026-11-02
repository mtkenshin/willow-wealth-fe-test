# `InterstitialScreen.tsx` guide

Source: [`src/screens/Interstitial/InterstitialScreen.tsx`](../../src/screens/Interstitial/InterstitialScreen.tsx)

## Purpose

`InterstitialScreen` introduces a stage of the onboarding flow. It combines a decorative illustration, a title and description, and a Continue action.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string \| ReactNode` | Required | Heading content; supports a string or composed React content. |
| `description` | `string` | Required | Supporting paragraph. |
| `onContinue` | `() => void` | Required | Callback invoked when Continue is clicked. |
| `buttonText` | `string` | `"Continue"` | Optional action label. |

## Events

Clicking the action button invokes `onContinue`. The section is labelled by its generated heading ID.

## Usage

```tsx
<InterstitialScreen
  title={<>Welcome, {firstName}</>}
  description="Next, answer a few questions to complete your profile."
  onContinue={continueOnboarding}
/>
```

## Recommended unit-test scenarios

- Render string and React-node titles, the description, and decorative illustration.
- Verify the section is labelled by its heading.
- Verify the default button label and a custom `buttonText`.
- Click Continue and verify `onContinue` is called exactly once.

## Room for improvement

- Consider heading focus management on screen changes if accessibility testing finds users need focus moved to new content.
- If the action later needs loading or disabled behavior, model that explicitly as a prop rather than embedding submission logic in this presentation component.
