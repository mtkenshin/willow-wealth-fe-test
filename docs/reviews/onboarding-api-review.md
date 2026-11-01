AI gave me

``` ts
import type { OnboardingState } from '../hooks/useOnboardingState'

export interface OnboardingSubmissionResponse {
  selectedPath: OnboardingState['selectedPath']
  message: string
}

export async function submitOnboarding(
  payload: OnboardingState,
): Promise<OnboardingSubmissionResponse> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1200)
  })

  if (Math.random() >= 0.9) {
    throw new Error('Network error during submission. Please try again.')
  }

  return {
    selectedPath: payload.selectedPath,
    message: 'Your onboarding selection has been submitted successfully.',
  }
}
```

I removed the if condition to avoid request randomly failing the onboarding process.

```ts
  if (Math.random() >= 0.9) {
    throw new Error('Network error during submission. Please try again.')
  }
```
