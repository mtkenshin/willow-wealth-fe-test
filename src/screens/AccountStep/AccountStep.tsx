import { useState, type Dispatch, type FormEvent } from 'react'
import type { OnboardingAccount, OnboardingAction } from '../../hooks/useOnboardingState'
import styles from './AccountStep.module.scss'

type AccountFields = Pick<
  OnboardingAccount,
  'firstName' | 'lastName' | 'email' | 'password' | 'termsAccepted'
>
type AccountField = keyof AccountFields
type AccountErrors = Partial<Record<AccountField, string>>

export interface AccountStepProps {
  account: OnboardingAccount
  dispatch: Dispatch<OnboardingAction>
  onContinue: () => void
}

const emailPattern = /^[^\s@.]+(?:\.[^\s@.]+)*@(?:[^\s@.]+\.)+[^\s@.]+$/

export function AccountStep({ account, dispatch, onContinue }: AccountStepProps) {
  const [form, setForm] = useState<AccountFields>(() => ({ ...account }))
  const [errors, setErrors] = useState<AccountErrors>({})
  const [passwordVisible, setPasswordVisible] = useState(false)

  function updateField<Field extends AccountField>(
    field: Field,
    value: AccountFields[Field],
  ) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: AccountErrors = {}
    if (!form.firstName.trim()) nextErrors.firstName = 'Enter your first name.'
    if (!form.lastName.trim()) nextErrors.lastName = 'Enter your last name.'
    
    const trimmedEmail = form.email.trim()
    if (!trimmedEmail) {
      nextErrors.email = 'Enter your email address.'
    } else if (!emailPattern.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Enter a password.'
    } else if (form.password.length < 8) {
      nextErrors.password = 'Your password must be at least 8 characters.'
    }
    
    if (!form.termsAccepted) {
      nextErrors.termsAccepted = 'You must accept the terms and disclosures to continue.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    dispatch({
      type: 'UPDATE_ACCOUNT',
      payload: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: trimmedEmail,
        password: form.password,
        termsAccepted: form.termsAccepted,
      },
    })
    onContinue()
  }

  return (
    <section className={styles.accountStep} aria-labelledby="account-title">
      <header className={styles.header}>
        <h1 className={styles.title} id="account-title">
          Create your account
        </h1>
        <p className={styles.description}>
          Start building a portfolio tailored to your objectives.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {Object.keys(errors).length > 0 && (
          <div className={styles.errorSummary} role="alert">
            <p>Please correct the following before continuing:</p>
            <ul>
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="account-first-name">
            First name
          </label>
          <input
            autoComplete="given-name"
            className={styles.input}
            id="account-first-name"
            name="firstName"
            onChange={(event) => updateField('firstName', event.currentTarget.value)}
            aria-describedby={errors.firstName ? 'account-first-name-error' : undefined}
            aria-invalid={Boolean(errors.firstName)}
            value={form.firstName}
          />
          {errors.firstName && (
            <p className={styles.error} id="account-first-name-error">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="account-last-name">
            Last name
          </label>
          <input
            autoComplete="family-name"
            className={styles.input}
            id="account-last-name"
            name="lastName"
            onChange={(event) => updateField('lastName', event.currentTarget.value)}
            aria-describedby={errors.lastName ? 'account-last-name-error' : undefined}
            aria-invalid={Boolean(errors.lastName)}
            value={form.lastName}
          />
          {errors.lastName && (
            <p className={styles.error} id="account-last-name-error">
              {errors.lastName}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="account-email">
            Email address
          </label>
          <input
            autoComplete="email"
            className={styles.input}
            id="account-email"
            name="email"
            onChange={(event) => updateField('email', event.currentTarget.value)}
            aria-describedby={errors.email ? 'account-email-error' : undefined}
            aria-invalid={Boolean(errors.email)}
            type="email"
            value={form.email}
          />
          {errors.email && (
            <p className={styles.error} id="account-email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="account-password">
            Password
          </label>
          <div className={styles.passwordInput}>
            <input
              autoComplete="new-password"
              className={styles.input}
              id="account-password"
              name="password"
              onChange={(event) => updateField('password', event.currentTarget.value)}
              aria-describedby={errors.password ? 'account-password-error' : undefined}
              aria-invalid={Boolean(errors.password)}
              type={passwordVisible ? 'text' : 'password'}
              value={form.password}
            />
            <button
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              aria-pressed={passwordVisible}
              className={styles.visibilityButton}
              onClick={() => setPasswordVisible((visible) => !visible)}
              type="button"
            >
              {passwordVisible ? (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 3 18 18" />
                  <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                  <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a15.7 15.7 0 0 1-3 3.8" />
                  <path d="M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7a10.7 10.7 0 0 0 4-.8" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className={styles.error} id="account-password-error">
              {errors.password}
            </p>
          )}
        </div>

        <div className={styles.termsField}>
          <label className={styles.termsLabel} htmlFor="account-terms">
            <input
              checked={form.termsAccepted}
              className={styles.checkbox}
              id="account-terms"
              name="termsAccepted"
              onChange={(event) => updateField('termsAccepted', event.currentTarget.checked)}
              aria-describedby={errors.termsAccepted ? 'account-terms-error' : undefined}
              aria-invalid={Boolean(errors.termsAccepted)}
              type="checkbox"
            />
            <span>
              I have read and accepted the Privacy Policy, Electronic Disclosure and Consent
              and Terms of Service and I consent to the use of electronic records in
              connection with this application.
            </span>
          </label>
          {errors.termsAccepted && (
            <p className={styles.error} id="account-terms-error">
              {errors.termsAccepted}
            </p>
          )}
        </div>

        <button className={styles.continueButton} type="submit">
          Continue
        </button>
      </form>

      <p className={styles.loginPrompt}>
        Already have an account?{' '}
        <button className={styles.loginLink} type="button" disabled>
          Log in
        </button>
      </p>
    </section>
  )
}