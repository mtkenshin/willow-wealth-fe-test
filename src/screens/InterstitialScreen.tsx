import { useId, type ReactNode } from 'react'
import styles from './InterstitialScreen.module.scss'
import { InterstitialIllustration } from './InterstitialIllustration';

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
      <InterstitialIllustration />
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
