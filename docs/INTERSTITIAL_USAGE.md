# Interstitial screen usage

Render the reusable interstitial inside `LayoutShell` and provide navigation through `onContinue`.

## Interstitial A — Welcome

```tsx
<LayoutShell showBack={false}>
  <InterstitialScreen
    title={`Welcome to Willow Wealth, ${account.firstName || 'there'}`}
    description="Let's begin setting up your individual account. Next, we'll ask a few quick questions to better understand your investor profile."
    onContinue={() => dispatch({ type: 'CONTINUE_TO_A1' })}
  />
</LayoutShell>
```

## Interstitial B — Account set-up

```tsx
<LayoutShell showBack={false}>
  <InterstitialScreen
    title="A few more questions to complete your account set-up"
    description="You’re making great progress. Answer a few more questions to complete your investor profile."
    onContinue={() => dispatch({ type: 'CONTINUE_TO_B1' })}
  />
</LayoutShell>
```

Import `InterstitialScreen` from `src/screens/InterstitialScreen` and `LayoutShell` from `src/components/LayoutShell` where the wizard selects its current screen.
