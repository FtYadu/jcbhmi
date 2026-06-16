import styles from "./landing.module.scss";
import { siteConfig, whatsappHref } from "@/config/site";

export function Hero() {
  const { hero, cta } = siteConfig;

  return (
    <section className={`${styles.container} ${styles.hero}`}>
      <p className={styles.eyebrow}>{hero.eyebrow}</p>
      <h1 className={styles.heroTitle}>{hero.headline}</h1>
      <p className={styles.heroSub}>{hero.subhead}</p>

      <div className={styles.heroActions}>
        <a
          className={`${styles.btn} ${styles.btnPrimary}`}
          href={cta.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {hero.primaryCtaLabel}
        </a>
        <a
          className={`${styles.btn} ${styles.btnGhost}`}
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
        >
          {hero.secondaryCtaLabel}
        </a>
      </div>
    </section>
  );
}
