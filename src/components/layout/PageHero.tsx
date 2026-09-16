import Parallax from "@/components/ui/Parallax";
import styles from "./PageHero.module.css";

type PageHeroProps = {
  title: string;
  image: string;
  /** Slightly shorter banner, used on villa detail pages. */
  short?: boolean;
  /** Overrides the default scrim opacity. */
  scrim?: string;
};

/** The banner that opens every inner page. */
export default function PageHero({ title, image, short, scrim }: PageHeroProps) {
  return (
    <div className={[styles.hero, short ? styles.short : ""].filter(Boolean).join(" ")}>
      <Parallax src={image} strength={0.22} priority sizes="100vw" />
      <div className={styles.scrim} style={scrim ? { background: scrim } : undefined} />
      <div className={styles.inner}>
        <h1
          className={[styles.title, short ? styles.titleShort : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {title}
        </h1>
        <span className={styles.rule} aria-hidden="true" />
      </div>
    </div>
  );
}
