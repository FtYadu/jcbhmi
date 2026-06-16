import Link from "next/link";
import styles from "./landing.module.scss";
import { siteConfig, whatsappHref } from "@/config/site";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <Link href="/" className={styles.logo}>
          {siteConfig.brand.name}
          <span className={styles.logoDot}>.</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <a className={styles.navLink} href="#work">
            Work
          </a>
          <a className={styles.navLink} href="#services">
            Services
          </a>
          <a className={styles.navLink} href="#contact">
            Contact
          </a>
          <Link className={styles.navLink} href="/chat">
            AI assistant
          </Link>
        </nav>

        <a
          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
