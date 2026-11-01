import type { Dispatch } from 'react'
import { OptionCardStep } from '../components/OptionCardStep'
import type {
  InvestorProfile,
  OnboardingAction,
} from '../hooks/useOnboardingState'
import qualifiedPurchaserInfoStyles from './QualifiedPurchaserInfo.module.scss'

export type InvestorProfileQuestionStep = 2 | 3 | 4

export interface InvestorProfileQuestionsProps {
  step: InvestorProfileQuestionStep
  profile: InvestorProfile
  dispatch: Dispatch<OnboardingAction>
}

const householdIncomeOptions = [
  { value: 'Under $200,000', label: 'Under $200,000' },
  { value: '$201,000 - $500,000', label: '$201,000 - $500,000' },
  { value: '$501,000 - $1,000,000', label: '$501,000 - $1,000,000' },
  { value: '$1,000,000+', label: '$1,000,000+' },
]

const netWorthOptions = [
  { value: '$0 - $500,000', label: '$0 - $500,000' },
  { value: '$500,001 - $1,000,000', label: '$500,001 - $1,000,000' },
  { value: '$1,000,001 - $5,000,000', label: '$1,000,001 - $5,000,000' },
  { value: '$5,000,001+', label: '$5,000,001+' },
]

const qualifiedPurchaserOptions = [
  { value: 'yes', label: 'Yes', description: 'I meet the qualified purchaser requirements' },
  { value: 'no', label: 'No', description: 'I do not meet the qualified purchaser requirements' },
] as const

export function InvestorProfileQuestions({
  step,
  profile,
  dispatch,
}: InvestorProfileQuestionsProps) {
  if (step === 2) {
    return (
      <OptionCardStep
        title="What is your annual household income?"
        subtitle="Please include all sources of income, such as salary, bonuses, rental properties and investments. If you have a spouse or spousal equivalent, please choose your joint income level."
        options={householdIncomeOptions}
        selectedValue={profile.householdIncome}
        onSelect={(householdIncome) => {
          dispatch({
            type: 'UPDATE_INVESTOR_PROFILE',
            payload: { householdIncome },
          })
          dispatch({ type: 'SET_STEP', payload: 3 })
        }}
      />
    )
  }

  if (step === 3) {
    return (
      <OptionCardStep
        title="What is your net worth?"
        subtitle="Please include all your assets, minus your primary residence and liabilities. If you have a spouse or spousal equivalent, please choose your joint net worth."
        options={netWorthOptions}
        selectedValue={profile.netWorth}
        onSelect={(netWorth) => {
          dispatch({
            type: 'UPDATE_INVESTOR_PROFILE',
            payload: { netWorth },
          })
          dispatch({ type: 'SET_STEP', payload: 4 })
        }}
      />
    )
  }

  return (
    <OptionCardStep
      title="Are you a qualified purchaser?"
      subtitle="Individual qualified purchasers own $5,000,000 in investments, but you are not required to be one to invest on Willow Wealth."
      options={qualifiedPurchaserOptions}
      selectedValue={
        profile.isQualifiedPurchaser === null
          ? undefined
          : profile.isQualifiedPurchaser
            ? 'yes'
            : 'no'
      }
      onSelect={(value) => {
        dispatch({
          type: 'UPDATE_INVESTOR_PROFILE',
          payload: { isQualifiedPurchaser: value === 'yes' },
        })
        dispatch({ type: 'SET_STEP', payload: 5 })
      }}
    >
      <details className={qualifiedPurchaserInfoStyles.disclosure}>
        <summary className={qualifiedPurchaserInfoStyles.summary}>
          (?) What is a qualified purchaser?
        </summary>
        <p className={qualifiedPurchaserInfoStyles.description}>
          Under the SEC definition, an individual qualified purchaser generally owns at
          least $5 million in investments. You do not need to be a qualified purchaser to
          invest on Willow Wealth.
        </p>
      </details>
    </OptionCardStep>
  )
}
