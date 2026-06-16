import styles from "./landing.module.scss";
import { siteConfig } from "@/config/site";

export function Portfolio() {
  const { portfolio } = siteConfig;

  return (
    <section id="work" className={`${styles.container} ${styles.section}`}>
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>Portfolio</p>
        <h2 className={styles.sectionTitle}>{portfolio.heading}</h2>
        <p className={styles.sectionSub}>{portfolio.subheading}</p>
      </div>

      <div className={styles.portfolioGrid}>
        {portfolio.items.map((item) => (
          <article key={item.title} className={styles.portfolioItem}>
            <span className={styles.portfolioCat}>{item.category}</span>
            <h3 className={styles.portfolioTitle}>{item.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
