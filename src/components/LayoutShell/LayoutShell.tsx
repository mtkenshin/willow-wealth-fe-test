import { useState } from 'react'
import type { ReactNode } from 'react'
import backArrow from '../../assets/back-arrow.svg'
import companyLogo from '../../assets/company-logo.webp'
import './LayoutShell.scss'

type TransitionDirection = 'forward' | 'backward'

export interface LayoutShellProps {
  currentStep: number
  currentQuestionStep?: number
  totalQuestionSteps?: number
  onBack?: () => void
  showBack?: boolean
  children: ReactNode
}

export function LayoutShell({
  currentStep,
  currentQuestionStep,
  totalQuestionSteps = 6,
  onBack,
  showBack = currentQuestionStep !== undefined,
  children,
}: LayoutShellProps) {
  const [transition, setTransition] = useState<{
    step: number
    direction: TransitionDirection | undefined
  }>({ step: currentStep, direction: undefined })

  if (transition.step !== currentStep) {
    setTransition({
      step: currentStep,
      direction: currentStep > transition.step ? 'forward' : 'backward',
    })
  }

  const showProgress =
    currentQuestionStep !== undefined &&
    Number.isInteger(currentQuestionStep) &&
    Number.isInteger(totalQuestionSteps) &&
    totalQuestionSteps > 0 &&
    currentQuestionStep >= 1 &&
    currentQuestionStep <= Math.min(totalQuestionSteps, 6)
    
  const renderBackButton = showBack && onBack !== undefined

  return (
    <div className="layout-shell">
      <header className="layout-shell__header">
        <nav className="layout-shell__header-inner" aria-label="Onboarding">
          <div className="layout-shell__back-slot">
            {renderBackButton && (
              <button
                className="layout-shell__back-button"
                type="button"
                aria-label="Go back"
                onClick={onBack}
              >
                <img
                  aria-hidden="true"
                  src={backArrow}
                  alt=""
                />
              </button>
            )}
          </div>
          <div className="layout-shell__brand-lockup">
            <img src={companyLogo} alt="" className="layout-shell__logo" />
            <span className="layout-shell__brand">Willow Wealth</span>
          </div>
          <div className="layout-shell__progress-slot">
            {showProgress && (
              <span className="layout-shell__progress" aria-label={`Step ${currentQuestionStep} of ${totalQuestionSteps}`}>
                {currentQuestionStep} / {totalQuestionSteps}
              </span>
            )}
          </div>
        </nav>
      </header>

      <main className="layout-shell__main">
        <div
          key={currentStep}
          className={[
            'layout-shell__card',
            transition.direction
              ? `layout-shell__card--enter-${transition.direction}`
              : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
