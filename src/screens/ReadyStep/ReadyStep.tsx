import { useRef, useState } from 'react'
import type { Dispatch } from 'react'
import { submitOnboarding } from '../../api/onboardingApi'
import type { OnboardingSubmissionResponse } from '../../api/onboardingApi'
import type {
  OnboardingAction,
  OnboardingState,
} from '../../hooks/useOnboardingState'
import checkmark from '../../assets/checkmark.svg'
import styles from './ReadyStep.module.scss'

const investmentPaths = [
  {
    value: 'self_directed',
    label: 'Select your own investments',
    description:
      'Explore a wide range of curated private markets investments spanning real estate, private credit, private equity, and more.',
  },
  {
    value: 'managed',
    label: 'Set up a Managed Portfolio',
    description:
      "Select a strategy, and we'll assemble a portfolio of diversified funds from prominent asset managers.",
  },
] as const

type InvestmentPath = (typeof investmentPaths)[number]['value']

export interface ReadyStepProps {
  state: OnboardingState
  dispatch: Dispatch<OnboardingAction>
}

export function ReadyStep({ state, dispatch }: ReadyStepProps) {
  const [confirmation, setConfirmation] =
    useState<OnboardingSubmissionResponse | null>(null)
  const submissionInProgress = useRef(false)
  const titleId = 'ready-step-title'
  const confirmedPath = confirmation
    ? investmentPaths.find((path) => path.value === confirmation.selectedPath)
    : undefined

  async function submitSelection(path: InvestmentPath) {
    if (submissionInProgress.current || state.isSubmitting) {
      return
    }

    submissionInProgress.current = true
    setConfirmation(null)
    dispatch({ type: 'SET_SELECTED_PATH', payload: path })
    dispatch({ type: 'SUBMIT_START' })

    try {
      const submission = { ...state, selectedPath: path }
      console.log('Onboarding submission:', {
        ...submission,
        account: { ...submission.account, password: '[REDACTED]' },
      })
      const response = await submitOnboarding(submission)
      dispatch({ type: 'SUBMIT_SUCCESS' })
      setConfirmation(response)
    } catch (error) {
      dispatch({
        type: 'SUBMIT_ERROR',
        payload:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred during submission.',
      })
    } finally {
      submissionInProgress.current = false
    }
  }

  async function retrySubmission() {
    const path = state.selectedPath
    if (path === 'self_directed' || path === 'managed') {
      await submitSelection(path)
    }
  }

  return (
    <section
      className={styles.step}
      aria-labelledby={titleId}
      aria-busy={state.isSubmitting}
    >
      <header className={styles.header}>
        <h1 className={styles.title} id={titleId}>
          <span className={styles.checkmark} aria-hidden="true">
            <img src={checkmark} alt="" />
          </span>{' '}
          You're ready to invest on Willow Wealth
        </h1>
        <p className={styles.description}>
          Choose the path that's best for you below, whether you prefer to
          hand-pick your investment portfolio or let Willow Wealth do the work
          for you.
        </p>
      </header>

      {confirmation ? (
        <div className={styles.success} role="status">
          <h2 className={styles.messageTitle}>You're all set</h2>
          <p className={styles.message}>{confirmation.message}</p>
          {confirmedPath && (
            <p className={styles.selectedPath}>
              Selected path: {confirmedPath.label}
            </p>
          )}
        </div>
      ) : (
        <>
          {state.error && (
            <div className={styles.error} role="alert">
              <p className={styles.errorMessage}>{state.error}</p>
              {state.selectedPath && (
                <button
                  className={styles.retryButton}
                  type="button"
                  disabled={state.isSubmitting}
                  onClick={() => void retrySubmission()}
                >
                  Retry Submission
                </button>
              )}
            </div>
          )}

          <div className={styles.paths} role="group" aria-label="Investment paths">
            {investmentPaths.map((path) => (
              <button
                aria-pressed={state.selectedPath === path.value}
                className={styles.path}
                disabled={state.isSubmitting}
                key={path.value}
                onClick={() => void submitSelection(path.value)}
                type="button"
              >
                <span className={styles.pathTitle}>{path.label}</span>
                <span className={styles.pathDescription}>
                  {path.description}
                </span>
              </button>
            ))}
          </div>

          {state.isSubmitting && (
            <p className={styles.loading} role="status">
              <span className={styles.spinner} aria-hidden="true" />
              Submitting your selection…
            </p>
          )}
        </>
      )}
    </section>
  )
}
