import { useId } from 'react'
import type { ReactNode } from 'react'
import styles from './RegulatoryQuestions.module.scss'
import type { OnboardingRegulatory } from '../../hooks/useOnboardingState'

export type RegulatoryQuestionStep = 6 | 7 | 8

export interface RegulatoryQuestionsProps {
  step: RegulatoryQuestionStep
  regulatory: OnboardingRegulatory
  onCitizenshipChange: (citizenship: string[]) => void
  onTaxResidenceChange: (taxResidence: string) => void
  onEmploymentStatusChange: (employmentStatus: string) => void
  onContinue: () => void
}

const countries = [
  'United States',
  'Afghanistan',
  'Albania',
  'Algeria',
  'Argentina',
  'Australia',
  'Austria',
  'Bangladesh',
  'Belgium',
  'Brazil',
  'Cambodia',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Croatia',
  'Czech Republic',
  'Denmark',
  'Egypt',
  'Finland',
  'France',
  'Germany',
  'Ghana',
  'Greece',
  'Hong Kong',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Kenya',
  'Malaysia',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Nigeria',
  'Norway',
  'Pakistan',
  'Philippines',
  'Poland',
  'Portugal',
  'Romania',
  'Saudi Arabia',
  'Singapore',
  'South Africa',
  'South Korea',
  'Spain',
  'Sri Lanka',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Thailand',
  'Turkey',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'Vietnam',
] as const

const employmentStatuses = [
  'Employed',
  'Self-employed',
  'Retired',
  'Student',
  'Not employed',
] as const

function isValidCitizenship(citizenship: string[]) {
  return citizenship.length > 0 &&
    citizenship.every((country) => country !== '') &&
    new Set(citizenship).size === citizenship.length
}

export function RegulatoryQuestions({
  step,
  regulatory,
  onCitizenshipChange,
  onTaxResidenceChange,
  onEmploymentStatusChange,
  onContinue,
}: RegulatoryQuestionsProps) {
  const id = useId()

  if (step === 6) {
    const canContinue = isValidCitizenship(regulatory.citizenship)

    function updateCitizenship(index: number, country: string) {
      onCitizenshipChange(
        regulatory.citizenship.map((selectedCountry, selectedIndex) =>
          selectedIndex === index ? country : selectedCountry,
        ),
      )
    }

    function removeCitizenship(index: number) {
      onCitizenshipChange(
        regulatory.citizenship.filter((_, selectedIndex) => selectedIndex !== index),
      )
    }

    return (
      <QuestionStep
        title="What countries are you a citizen of?"
        body="We are required to collect this information for regulatory purposes and determine your account eligibility."
        onContinue={onContinue}
        canContinue={canContinue}
      >
        <div className={styles.fields}>
          {regulatory.citizenship.map((country, index) => {
            const fieldId = `${id}-citizenship-${index}`
            const availableCountries = countries.filter(
              (option) =>
                option === country || !regulatory.citizenship.includes(option),
            )

            return (
              <div className={styles.countryRow} key={fieldId}>
                <label className={styles.label} htmlFor={fieldId}>
                  {index === 0 ? 'Country of citizenship' : `Additional country ${index}`}
                </label>
                <select
                  className={styles.select}
                  id={fieldId}
                  value={country}
                  onChange={(event) => updateCitizenship(index, event.target.value)}
                >
                  <option value="">Select a country</option>
                  {availableCountries.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {index > 0 && (
                  <button
                    className={styles.removeButton}
                    type="button"
                    onClick={() => removeCitizenship(index)}
                    aria-label={`Remove additional country ${index}`}
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          })}
        </div>
        <button
          className={styles.addButton}
          type="button"
          onClick={() => onCitizenshipChange([...regulatory.citizenship, ''])}
        >
          Add another country
        </button>
      </QuestionStep>
    )
  }

  if (step === 7) {
    return (
      <QuestionStep
        title="What is your tax residence?"
        body="Willow Wealth's investments are currently only available for U.S. taxpayers. Please confirm your tax residence is correct."
        onContinue={onContinue}
        canContinue={regulatory.taxResidence !== ''}
      >
        <label className={styles.label} htmlFor={`${id}-tax-residence`}>
          Country of tax residence
        </label>
        <select
          className={styles.select}
          id={`${id}-tax-residence`}
          value={regulatory.taxResidence}
          onChange={(event) => onTaxResidenceChange(event.target.value)}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </QuestionStep>
    )
  }

  return (
    <QuestionStep
      title="What's your employment status?"
      body="We're required to ask for this information for regulatory purposes."
      onContinue={onContinue}
      canContinue={regulatory.employmentStatus !== ''}
    >
      <label className={styles.label} htmlFor={`${id}-employment-status`}>
        Employment status
      </label>
      <select
        className={styles.select}
        id={`${id}-employment-status`}
        value={regulatory.employmentStatus}
        onChange={(event) => onEmploymentStatusChange(event.target.value)}
      >
        <option value="">Select your employment status</option>
        {employmentStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </QuestionStep>
  )
}

interface QuestionStepProps {
  title: string
  body: string
  canContinue: boolean
  onContinue: () => void
  children: ReactNode
}

function QuestionStep({
  title,
  body,
  canContinue,
  onContinue,
  children,
}: QuestionStepProps) {
  const titleId = useId()

  return (
    <section className={styles.step} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h1 className={styles.title} id={titleId}>
          {title}
        </h1>
        <p className={styles.body}>{body}</p>
      </header>
      <div className={styles.fields}>{children}</div>
      <button
        className={styles.continueButton}
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
      >
        Continue
      </button>
    </section>
  )
}
