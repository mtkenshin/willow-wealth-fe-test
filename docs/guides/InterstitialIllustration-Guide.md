# `InterstitialIllustration.tsx` guide

Source: [`src/screens/Interstitial/InterstitialIllustration.tsx`](../../src/screens/Interstitial/InterstitialIllustration.tsx)

## Purpose

`InterstitialIllustration` displays the shared interstitial SVG as decorative content. Its wrapper is marked `aria-hidden`, and the image has empty alternative text.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string \| undefined` | `undefined` | Optional additional class for layout-specific styling. |

The illustration asset and base styling are fixed by the component.

## Events

There are no events or interactive controls.

## Usage

It is included by `InterstitialScreen`; normally use the parent screen instead of rendering it independently:

```tsx
<InterstitialScreen
  title="Welcome"
  description="Let's get started."
  onContinue={continueOnboarding}
/>
```

For use in another layout, provide an additional class without replacing the base styling:

```tsx
<InterstitialIllustration className={styles.readyStepIllustration} />
```

## Recommended unit-test scenarios

- Verify the illustration image renders with the decorative accessibility treatment.
- Verify no interactive controls or accessible-name noise are introduced by the illustration.

## Room for improvement

- If interstitial variants need different artwork, accept an illustration asset or variant as a prop.
- Keep the illustration decorative unless product content requires meaningful alternative text.
