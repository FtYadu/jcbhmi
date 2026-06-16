import styles from "./landing.module.scss";
import { siteConfig, whatsappHref } from "@/config/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" className={`${styles.container} ${styles.section}`}>
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>Let&apos;s talk</p>
        <h2 className={styles.sectionTitle}>Start your project</h2>
        <p className={styles.sectionSub}>
          Tell me what you&apos;re building and I&apos;ll come back with ideas
          and a quote.
        </p>
      </div>

      <div className={styles.contactWrap}>
        <ContactForm />

        <aside className={styles.contactAside}>
          <h3 className={styles.contactAsideTitle}>Prefer something faster?</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactListItem}>
              Book a free 20-minute intro call to scope your project live.
            </li>
            <li className={styles.contactListItem}>
              Message on WhatsApp for quick questions and availability.
            </li>
            <li className={styles.contactListItem}>
              Typical reply time: within one business day.
            </li>
          </ul>
          <div className={styles.heroActions}>
            <a
              className={`${styles.btn} ${styles.btnPrimary}`}
              href={siteConfig.cta.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
            </a>
            <a
              className={`${styles.btn} ${styles.btnGhost}`}
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
