import Parallax from "@/components/ui/Parallax";
import { PillLink } from "@/components/ui/Pill";
import { images } from "@/data/images";
import styles from "./home.module.css";

const HERO_IMAGE = images.north;

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* priority + fill: this is the LCP element, so it is fetched first. */}
      <Parallax src={HERO_IMAGE} strength={0.16} priority sizes="100vw" />
      <div className={styles.heroScrim} />

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <div className={styles.heroEyebrow}>
            <span className={styles.heroRule} aria-hidden="true" />
            <span className={styles.heroEyebrowText}>آرامش · خلوت · اصالت</span>
          </div>
          <h1 className={styles.heroTitle}>اقامتی که به یاد می‌ماند</h1>
          <p className={styles.heroSubtitle}>بهشت خصوصی شما</p>
        </div>

        <div className={styles.heroPanel}>
          <p className={styles.heroPanelText}>
            ویلاهای دست‌چین‌شدهٔ شیشِم؛ طراحی‌شده برای نهایت آسایش، حریم خصوصی کامل و
            میزبانی‌ای در تراز جهانی.
          </p>
          <PillLink href="/villas" variant="ghost">
            کاوش ویلاها
          </PillLink>
        </div>
      </div>

      <span className={styles.scrollHint} aria-hidden="true" />
    </section>
  );
}
