import styles from "./landing.module.scss";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerInner}`}>
        <div className={styles.socialRow}>
          {siteConfig.social.map((link) => (
            <a
              key={link.label}
              className={styles.socialLink}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className={styles.footerNote}>
          © {year} {siteConfig.brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
