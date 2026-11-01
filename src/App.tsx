
import './App.scss'
import { LayoutShell } from './components/LayoutShell'
import { useOnboardingState } from './hooks/useOnboardingState'
import { AccountStep } from './screens/AccountStep'
import { InterstitialScreen } from './screens/InterstitialScreen'

function App() {
  const { state, dispatch } = useOnboardingState()

  return (
    <LayoutShell showBack={false}>
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
