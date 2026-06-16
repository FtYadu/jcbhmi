import styles from "./landing.module.scss";
import { siteConfig } from "@/config/site";

export function ReelEmbed() {
  const { reel } = siteConfig;
  const embedUrl = reel.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${reel.youtubeId}?rel=0`
    : null;

  return (
    <section className={`${styles.container} ${styles.section}`}>
      <div className={styles.sectionHead}>
        <p className={styles.eyebrow}>Showreel</p>
        <h2 className={styles.sectionTitle}>{reel.heading}</h2>
        <p className={styles.sectionSub}>{reel.subheading}</p>
      </div>

      <div className={styles.videoFrame}>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={`${siteConfig.brand.name} showreel`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className={styles.videoPlaceholder}>
            Showreel coming soon — set <code>NEXT_PUBLIC_YOUTUBE_REEL_ID</code>{" "}
            to embed it here.
          </div>
        )}
      </div>
    </section>
  );
}
