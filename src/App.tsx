
import './App.scss'
import { LayoutShell } from './components/LayoutShell'
import { useOnboardingState } from './hooks/useOnboardingState'
import { AccountStep } from './screens/AccountStep'
import { InvestorProfileQuestions } from './screens/InvestorProfileQuestions'
import type { InvestorProfileQuestionStep } from './screens/InvestorProfileQuestions'
import { InterstitialScreen } from './screens/InterstitialScreen'
import { RegulatoryQuestions } from './screens/RegulatoryQuestions'
import type { RegulatoryQuestionStep } from './screens/RegulatoryQuestions'
import { ReadyStep } from './screens/ReadyStep'

function isInvestorProfileQuestionStep(step: number): step is InvestorProfileQuestionStep {
  return step === 2 || step === 3 || step === 4
}

function isRegulatoryQuestionStep(step: number): step is RegulatoryQuestionStep {
  return step === 6 || step === 7 || step === 8
}

function App() {
  const { state, dispatch } = useOnboardingState()
  const questionStep = isInvestorProfileQuestionStep(state.step) ? state.step : undefined
  const regulatoryQuestionStep = isRegulatoryQuestionStep(state.step)
    ? state.step
    : undefined
  const currentQuestionStep =
    questionStep !== undefined
      ? questionStep - 1
      : regulatoryQuestionStep !== undefined
        ? regulatoryQuestionStep - 2
        : undefined

  function goBack() {
    if (state.step === 2) {
      dispatch({ type: 'SET_STEP', payload: 0 })
    } else if (state.step === 6) {
      dispatch({ type: 'SET_STEP', payload: 4 })
    } else {
      dispatch({ type: 'PREV_STEP' })
    }
  }

  return (
    <LayoutShell
      currentQuestionStep={currentQuestionStep}
      onBack={currentQuestionStep === undefined ? undefined : goBack}
      showBack={currentQuestionStep !== undefined}
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
      ) : state.step === 5 ? (
        <InterstitialScreen
          title="A few more questions to complete your account set-up"
          description="As the last step in identity verification, FINRA, our regulator, requires us to ask about citizenship, employment and potential conflicts of interest."
          onContinue={() => dispatch({ type: 'SET_STEP', payload: 6 })}
        />
      ) : regulatoryQuestionStep !== undefined ? (
        <RegulatoryQuestions
          step={regulatoryQuestionStep}
          regulatory={state.regulatory}
          onCitizenshipChange={(citizenship) =>
            dispatch({ type: 'UPDATE_REGULATORY', payload: { citizenship } })
          }
          onTaxResidenceChange={(taxResidence) =>
            dispatch({ type: 'UPDATE_REGULATORY', payload: { taxResidence } })
          }
          onEmploymentStatusChange={(employmentStatus) =>
            dispatch({ type: 'UPDATE_REGULATORY', payload: { employmentStatus } })
          }
          onContinue={() => dispatch({ type: 'NEXT_STEP' })}
        />
      ) : state.step === 9 ? (
        <ReadyStep state={state} dispatch={dispatch} />
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
