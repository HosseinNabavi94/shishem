import Image from "next/image";
import Link from "next/link";
import Parallax from "@/components/ui/Parallax";
import { footerColumns, site } from "@/data/site";
import { images } from "@/data/images";
import styles from "./Footer.module.css";

const FOOTER_IMAGE = images.coast;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Parallax src={FOOTER_IMAGE} strength={0.12} sizes="100vw" />
      <div className={styles.scrim} />

      <div className={styles.panel}>
          <div className={styles.brand}>
            <Image
              src="/brand/shishem-logo.png"
              alt=""
              width={180}
              height={52}
              className={styles.mark}
            />
            <div className={styles.name}>{site.name}</div>
            <div className={styles.tagline}>{site.tagline}</div>
            <p className={styles.intro}>{site.intro}</p>
          </div>

          <nav className={styles.columns} aria-label="پیوندهای فوتر">
            {footerColumns.map((column) => (
              <section key={column.title} className={styles.column}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <div className={styles.links}>
                  {column.links.map((link) => (
                    <Link key={link.label} href={link.href} className={styles.link}>
                      <span>{link.label}</span>
                      <span className={styles.linkArrow} aria-hidden="true">←</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </nav>

          <div className={styles.legal}>{site.copyright}</div>
      </div>
    </footer>
  );
}
