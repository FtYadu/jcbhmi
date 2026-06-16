import styles from "./landing.module.scss";
import { siteConfig } from "@/config/site";

export function ValueProps() {
  return (
    <section id="services" className={`${styles.container} ${styles.section}`}>
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>Why work with me</p>
        <h2 className={styles.sectionTitle}>
          Creative that earns its place in the budget
        </h2>
        <p className={styles.sectionSub}>
          Niche-native video built around outcomes, delivered without the agency
          overhead.
        </p>
      </div>

      <div className={styles.cardGrid}>
        {siteConfig.valueProps.map((prop) => (
          <article key={prop.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{prop.title}</h3>
            <p className={styles.cardText}>{prop.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
