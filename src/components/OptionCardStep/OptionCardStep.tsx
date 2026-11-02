import type { ReactNode } from 'react'
import styles from './OptionCardStep.module.scss'

export interface OptionCard<Value extends string = string> {
  value: Value
  label: string
  description?: string
}

export interface OptionCardStepProps<Value extends string = string> {
  title: string
  subtitle: string
  options: readonly OptionCard<Value>[]
  onSelect: (value: Value) => void
  selectedValue?: Value
  children?: ReactNode
}

export function OptionCardStep<Value extends string>({
  title,
  subtitle,
  options,
  onSelect,
  selectedValue,
  children,
}: OptionCardStepProps<Value>) {
  return (
    <section className={styles.step} aria-labelledby="option-card-step-title">
      <header className={styles.header}>
        <h1 className={styles.title} id="option-card-step-title">
          {title}
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>

      <div className={styles.options} role="group" aria-label={title}>
        {options.map((option) => (
          <button
            aria-pressed={selectedValue === option.value}
            className={styles.option}
            key={option.value}
            onClick={() => onSelect(option.value)}
            type="button"
          >
            <span className={styles.optionLabel}>{option.label}</span>
            {option.description && (
              <span className={styles.optionDescription}>{option.description}</span>
            )}
          </button>
        ))}
      </div>

      {children && <div className={styles.supplemental}>{children}</div>}
    </section>
  )
}
