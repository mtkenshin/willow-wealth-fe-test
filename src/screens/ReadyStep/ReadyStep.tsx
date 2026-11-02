import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Dispatch } from 'react'
import { submitOnboarding } from '../../api/onboardingApi'
import type { OnboardingSubmissionResponse } from '../../api/onboardingApi'
import type {
  OnboardingAction,
  OnboardingState,
} from '../../hooks/useOnboardingState'
import checkmark from '../../assets/checkmark.svg'
import closeIcon from '../../assets/close.svg'
import { InterstitialIllustration } from '../Interstitial/InterstitialIllustration'
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

type Toast = {
  kind: 'success' | 'error'
  message: string
} | null

export interface ReadyStepProps {
  state: OnboardingState
  dispatch: Dispatch<OnboardingAction>
}

export function ReadyStep({ state, dispatch }: ReadyStepProps) {
  const [confirmation, setConfirmation] =
    useState<OnboardingSubmissionResponse | null>(null)
  const [toast, setToast] = useState<Toast>(null)
  const submissionInProgress = useRef(false)
  const userId = useRef<string | null>(null)
  const titleId = 'ready-step-title'
  const confirmedPath = confirmation
    ? investmentPaths.find((path) => path.value === confirmation.selectedPath)
    : undefined

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeoutId = window.setTimeout(() => setToast(null), 5000)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  async function submitSelection(path: InvestmentPath) {
    if (submissionInProgress.current || state.isSubmitting) {
      return
    }

    submissionInProgress.current = true
    setConfirmation(null)
    setToast(null)
    dispatch({ type: 'SET_SELECTED_PATH', payload: path })
    dispatch({ type: 'SUBMIT_START' })

    try {
      if (userId.current === null) {
        userId.current = crypto.randomUUID()
      }

      const submission = {
        userId: userId.current,
        selectedPath: path,
        stepData: {
          account: state.account,
          investorProfile: state.investorProfile,
          regulatory: state.regulatory,
        },
        timestamp: new Date().toISOString(),
      }
      const response = await submitOnboarding(submission)
      dispatch({ type: 'SUBMIT_SUCCESS' })
      setConfirmation(response)
      setToast({
        kind: 'success',
        message: 'Onboarding completed successfully.',
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred during submission.'
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: message,
      })
      setToast({
        kind: 'error',
        message: 'Onboarding submission failed. Please try again.',
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
      {toast &&
        createPortal(
          <div
            className={`${styles.toast} ${
              toast.kind === 'success' ? styles.toastSuccess : styles.toastError
            }`}
            role={toast.kind === 'success' ? 'status' : 'alert'}
            aria-live={toast.kind === 'success' ? 'polite' : 'assertive'}
          >
            <span>{toast.message}</span>
            <button
              className={styles.toastDismiss}
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setToast(null)}
            >
              <img src={closeIcon} alt="" aria-hidden="true" />
            </button>
          </div>,
          document.body,
        )}
      <div className={styles.content}>
        <InterstitialIllustration className={styles.illustration} />
        <div>
          <header className={styles.header}>
            <h1 className={styles.title} id={titleId}>
              You're ready to invest on Willow Wealth &nbsp;
              <span className={styles.checkmark} aria-hidden="true">
                <img src={checkmark} alt="" />
              </span>{' '}
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
        </div>
      </div>
    </section>
  )
}
