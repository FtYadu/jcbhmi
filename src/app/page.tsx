import styles from "@/components/landing/landing.module.scss";
import {
  Header,
  Hero,
  ValueProps,
  ReelEmbed,
  Portfolio,
  Contact,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <ReelEmbed />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
