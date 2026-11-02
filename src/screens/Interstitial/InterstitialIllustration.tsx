import styles from './InterstitialScreen.module.scss'
import illustration from '../../assets/interstitial-illustration.svg'

export function InterstitialIllustration() {
  return (
    <div className={styles.illustration} aria-hidden="true">
      <img
        className={styles.illustrationGraphic}
        src={illustration}
        alt=""
      />
    </div>
  )
}