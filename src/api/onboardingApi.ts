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

  return {
    selectedPath: payload.selectedPath,
    message: 'Your onboarding selection has been submitted successfully.',
  }
}
