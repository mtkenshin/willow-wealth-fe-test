import { useCallback, useReducer } from 'react'
import type { Dispatch } from 'react'

export interface OnboardingAccount {
  firstName: string
  lastName: string
  email: string
  password: string
  termsAccepted: boolean
}

export interface InvestorProfile {
  householdIncome: string
  netWorth: string
  isQualifiedPurchaser: boolean | null
}

export interface OnboardingRegulatory {
  citizenship: string[]
  taxResidence: string
  employmentStatus: string
}

export interface OnboardingState {
  step: number
  account: OnboardingAccount
  investorProfile: InvestorProfile
  regulatory: OnboardingRegulatory
  selectedPath: 'self_directed' | 'managed' | null
  isSubmitting: boolean
  error: string | null
}

export type OnboardingAction =
  | { type: 'UPDATE_ACCOUNT'; payload: Partial<OnboardingAccount> }
  | { type: 'UPDATE_INVESTOR_PROFILE'; payload: Partial<InvestorProfile> }
  | { type: 'UPDATE_REGULATORY'; payload: Partial<OnboardingRegulatory> }
  | { type: 'SET_SELECTED_PATH'; payload: OnboardingState['selectedPath'] }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; payload: string }

export const initialOnboardingState: OnboardingState = {
  step: 0,
  account: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    termsAccepted: false,
  },
  investorProfile: {
    householdIncome: '',
    netWorth: '',
    isQualifiedPurchaser: null,
  },
  regulatory: {
    citizenship: ['United States'],
    taxResidence: '',
    employmentStatus: '',
  },
  selectedPath: null,
  isSubmitting: false,
  error: null,
}

export function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction,
): OnboardingState {
  switch (action.type) {
    case 'UPDATE_ACCOUNT':
      return { ...state, account: { ...state.account, ...action.payload } }
    case 'UPDATE_INVESTOR_PROFILE':
      return {
        ...state,
        investorProfile: { ...state.investorProfile, ...action.payload },
      }
    case 'UPDATE_REGULATORY':
      return { ...state, regulatory: { ...state.regulatory, ...action.payload } }
    case 'SET_SELECTED_PATH':
      return { ...state, selectedPath: action.payload }
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 }
    case 'PREV_STEP':
      return { ...state, step: state.step - 1 }
    case 'SET_STEP':
      return { ...state, step: action.payload }
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, error: null }
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, error: null }
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, error: action.payload }
  }
}


export interface UseOnboardingStateResult {
  state: OnboardingState
  dispatch: Dispatch<OnboardingAction>
}

export function useOnboardingState() {
  const [state, dispatch] = useReducer(onboardingReducer, initialOnboardingState)
  return { state, dispatch }
}
