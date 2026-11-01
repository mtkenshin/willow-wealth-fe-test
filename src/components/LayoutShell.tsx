import type { ReactNode } from 'react'
import './LayoutShell.scss'

export interface LayoutShellProps {
  currentQuestionStep?: number
  totalQuestionSteps?: number
  onBack?: () => void
  showBack?: boolean
  children: ReactNode
}

export function LayoutShell({
  currentQuestionStep,
  totalQuestionSteps = 6,
  onBack,
  showBack = currentQuestionStep !== undefined,
  children,
}: LayoutShellProps) {
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
                &lt;
              </button>
            )}
          </div>
          <span className="layout-shell__brand">WillowWealth</span>
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
        <div className="layout-shell__card">{children}</div>
      </main>
    </div>
  )
}
