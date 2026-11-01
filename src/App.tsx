
import './App.scss';
import { LayoutShell } from './components/LayoutShell'

function App() {
  return (
    <LayoutShell showBack={false}>
      <section aria-labelledby="onboarding-title">
        <h1 className="app__title" id="onboarding-title">
          Create your account
        </h1>
        <p className="app__description">
          Start your WillowWealth investor onboarding.
        </p>
      </section>
    </LayoutShell>
  )
}

export default App
