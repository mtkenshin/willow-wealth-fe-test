
AI Generated 

``` ts
export function useOnboardingState(): UseOnboardingStateResult {
  const [state, dispatch] = useReducer(onboardingReducer, initialOnboardingState)

  const updateAccount = useCallback(
    (updates: Partial<OnboardingAccount>) =>
      dispatch({ type: 'UPDATE_ACCOUNT', payload: updates }),
    [],
  )
  const updateInvestorProfile = useCallback(
    (updates: Partial<InvestorProfile>) =>
      dispatch({ type: 'UPDATE_INVESTOR_PROFILE', payload: updates }),
    [],
  )
  const updateRegulatory = useCallback(
    (updates: Partial<OnboardingRegulatory>) =>
      dispatch({ type: 'UPDATE_REGULATORY', payload: updates }),
    [],
  )
  const setSelectedPath = useCallback(
    (path: OnboardingState['selectedPath']) =>
      dispatch({ type: 'SET_SELECTED_PATH', payload: path }),
    [],
  )
  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), [])
  const prevStep = useCallback(() => dispatch({ type: 'PREV_STEP' }), [])
  const setStep = useCallback(
    (step: number) => dispatch({ type: 'SET_STEP', payload: step }),
    [],
  )
  const submitStart = useCallback(() => dispatch({ type: 'SUBMIT_START' }), [])
  const submitSuccess = useCallback(() => dispatch({ type: 'SUBMIT_SUCCESS' }), [])
  const submitError = useCallback(
    (error: string) => dispatch({ type: 'SUBMIT_ERROR', payload: error }),
    [],
  )

  return {
    state,
    dispatch,
    actions: {
      updateAccount,
      updateInvestorProfile,
      updateRegulatory,
      setSelectedPath,
      nextStep,
      prevStep,
      setStep,
      submitStart,
      submitSuccess,
      submitError,
    },
  }
}

```

The problem: 
 - Overengineering
 - Ten separate callback functions wrapped in useCallback.
 - Ten separate action dispatchers.

 In React, dispatch is already referentially stable by design. You do not need useCallback to wrap simple dispatch calls. Writing individual helper functions for every single update action adds unnecessary lines of code when you can just call dispatch({ type: '...', payload: ... }) directly or use a couple of concise general updaters.


 Therefore I changed it to:

``` ts
export function useOnboardingState() {
  const [state, dispatch] = useReducer(onboardingReducer, initialOnboardingState)
  return { state, dispatch }
}
```

Now instead of calling 

```ts
actions.updateAccount({ firstName: 'John' })
```
I simply call 

``` ts
dispatch({ type: 'UPDATE_ACCOUNT', payload: { firstName: 'John' } })
```