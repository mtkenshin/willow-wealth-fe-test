import type { OnboardingState } from '../hooks/useOnboardingState'

export interface OnboardingSubmissionPayload {
  userId: string
  selectedPath: Exclude<OnboardingState['selectedPath'], null>
  stepData: Pick<OnboardingState, 'account' | 'investorProfile' | 'regulatory'>
  timestamp: string
}

export interface OnboardingSubmissionResponse {
  status: 200
  selectedPath: OnboardingSubmissionPayload['selectedPath']
  message: string
}

export async function submitOnboarding(
  payload: OnboardingSubmissionPayload,
): Promise<OnboardingSubmissionResponse> {
  const response = await fetch('/api/onboarding', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const responseBody: unknown = await response.json()

  if (!response.ok) {
    const message =
      typeof responseBody === 'object' &&
      responseBody !== null &&
      'message' in responseBody &&
      typeof responseBody.message === 'string'
        ? responseBody.message
        : `HTTP ${response.status}: The onboarding submission failed.`
    throw new Error(message)
  }

  if (
    typeof responseBody !== 'object' ||
    responseBody === null ||
    !('status' in responseBody) ||
    responseBody.status !== 200 ||
    !('selectedPath' in responseBody) ||
    responseBody.selectedPath !== payload.selectedPath ||
    !('message' in responseBody) ||
    typeof responseBody.message !== 'string'
  ) {
    throw new Error('The onboarding API returned an invalid success response.')
  }

  console.log('Onboarding submission successful:',  {
    status: 200,
    selectedPath: payload.selectedPath,
    message: responseBody.message,
  }, responseBody);

  return {
    status: 200,
    selectedPath: payload.selectedPath,
    message: responseBody.message,
  }
}
