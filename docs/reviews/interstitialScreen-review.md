AI gave me the following

``` tsx

import { useId, type ReactNode } from 'react'
import styles from './InterstitialScreen.module.scss'

export interface InterstitialScreenProps {
  title: string | ReactNode
  description: string
  onContinue: () => void
  buttonText?: string
}

export function InterstitialScreen({
  title,
  description,
  onContinue,
  buttonText = 'Continue',
}: InterstitialScreenProps) {
  const titleId = useId()

  return (
    <section className={styles.interstitial} aria-labelledby={titleId}>
      <div className={styles.illustration} aria-hidden="true">
        <svg
          className={styles.illustrationGraphic}
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="120" cy="120" r="88" className={styles.illustrationHalo} />
          <path
            d="M66 158.5C79.8 143.8 92.4 136.5 104 136.5C118.6 136.5 124.5 148 140 148C151.5 148 163.1 142.5 175 131.5"
            className={styles.illustrationLine}
          />
          <path
            d="M82 124C82 107.4 95.4 94 112 94C112 110.6 98.6 124 82 124Z"
            className={styles.illustrationLeaf}
          />
          <path
            d="M119 107C119 88.8 133.8 74 152 74C152 92.2 137.2 107 119 107Z"
            className={styles.illustrationLeaf}
          />
          <path
            d="M112 94L91 115M152 74L124 103"
            className={styles.illustrationLine}
          />
          <rect x="91" y="158" width="79" height="13" rx="6.5" className={styles.illustrationBase} />
          <rect x="101" y="176" width="59" height="8" rx="4" className={styles.illustrationBase} />
          <circle cx="172" cy="94" r="13" className={styles.illustrationAccent} />
        </svg>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title} id={titleId}>
          {title}
        </h1>
        <p className={styles.description}>{description}</p>
        <button className={styles.continueButton} type="button" onClick={onContinue}>
          {buttonText}
        </button>
      </div>
    </section>
  )
} 
```
Nothing functionally wrong but the svg occupies alot of the components visibility, so moved it to its own Component.