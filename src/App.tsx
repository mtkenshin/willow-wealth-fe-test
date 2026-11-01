
import './App.scss'
import { LayoutShell } from './components/LayoutShell'
import { useOnboardingState } from './hooks/useOnboardingState'
import { AccountStep } from './screens/AccountStep'
import { InvestorProfileQuestions } from './screens/InvestorProfileQuestions'
import type { InvestorProfileQuestionStep } from './screens/InvestorProfileQuestions'
import { InterstitialScreen } from './screens/InterstitialScreen'

function isInvestorProfileQuestionStep(step: number): step is InvestorProfileQuestionStep {
  return step === 2 || step === 3 || step === 4
}

function App() {
  const { state, dispatch } = useOnboardingState()
  const questionStep = isInvestorProfileQuestionStep(state.step) ? state.step : undefined
  const currentQuestionStep = questionStep === undefined ? undefined : questionStep - 1

  function goBack() {
    if (state.step === 2) {
      dispatch({ type: 'SET_STEP', payload: 0 })
    } else {
      dispatch({ type: 'PREV_STEP' })
    }
  }

  return (
    <LayoutShell
      currentQuestionStep={currentQuestionStep}
      onBack={questionStep === undefined ? undefined : goBack}
      showBack={questionStep !== undefined}
    >
      {state.step === 0 ? (
        <AccountStep
          account={state.account}
          dispatch={dispatch}
          onContinue={() => dispatch({ type: 'SET_STEP', payload: 1 })}
        />
      ) : state.step === 1 ? (
        <InterstitialScreen
          title={`Welcome to Willow Wealth, ${state.account.firstName || 'there'}`}
          description="Let's begin setting up your individual account. Next, we'll ask a few quick questions to better understand your investor profile."
          onContinue={() => dispatch({ type: 'SET_STEP', payload: 2 })}
        />
      ) : questionStep !== undefined ? (
        <InvestorProfileQuestions
          step={questionStep}
          profile={state.investorProfile}
          dispatch={dispatch}
        />
      ) : (
        <section aria-labelledby="investor-questions-title">
          <h1 className="app__title" id="investor-questions-title">
            Investor profile questions
          </h1>
          <p className="app__description">
            Your next onboarding questions will appear here.
          </p>
        </section>
      )}
    </LayoutShell>
  )
}

export default App
