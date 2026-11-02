import styles from './InterstitialScreen.module.scss'
import illustration from '../../assets/interstitial-illustration.svg'

export interface InterstitialIllustrationProps {
  className?: string
}

export function InterstitialIllustration({
  className,
}: InterstitialIllustrationProps) {
  return (
    <div
      className={[styles.illustration, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <img
        className={styles.illustrationGraphic}
        src={illustration}
        alt=""
      />
    </div>
  )
}