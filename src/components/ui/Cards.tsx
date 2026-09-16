import Image from "next/image";
import Link from "next/link";
import type { Villa } from "@/data/villas";
import type { Post } from "@/data/posts";
import { TextLink } from "./Pill";
import styles from "./Cards.module.css";

const CARD_SIZES = "(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 380px";
const WIDE_SIZES = "(max-width: 720px) 100vw, (max-width: 1180px) 60vw, 780px";

/** Portrait villa card with a floating location badge. */
export function VillaCard({ villa }: { villa: Villa }) {
  return (
    <article className={styles.villa}>
      <Link href={`/villas/${villa.slug}`} className={styles.frame} aria-label={villa.name}>
        <Image
          src={villa.image}
          alt={villa.name}
          fill
          sizes={CARD_SIZES}
          quality={72}
          style={{ objectFit: "cover" }}
        />
        <span className={styles.badge}>
          <span className={styles.badgePlace}>◈ {villa.place}</span>
          <span className={styles.badgeRate}>★ {villa.rate}</span>
        </span>
      </Link>
      <h3 className={styles.villaName}>{villa.name}</h3>
      <p className={styles.villaDesc}>{villa.desc}</p>
      <TextLink href={`/villas/${villa.slug}`} className={styles.villaLink}>
        مشاهدهٔ ویلا
      </TextLink>
    </article>
  );
}

/** Full-bleed image card with the copy sitting inside the scrim. */
export function OverlayCard({
  villa,
  wide = false,
  center = false,
  tagLabel,
}: {
  villa: Villa;
  wide?: boolean;
  center?: boolean;
  tagLabel?: string;
}) {
  return (
    <article
      className={[
        styles.overlay,
        wide ? styles.overlayWide : "",
        center ? styles.overlayCenter : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.overlayMedia}>
        <Image
          src={villa.image}
          alt={villa.name}
          fill
          sizes={wide ? WIDE_SIZES : CARD_SIZES}
          quality={72}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.overlayScrim} />
      <span className={styles.tag}>{tagLabel ?? villa.place}</span>
      <h3
        className={[styles.overlayTitle, wide ? "" : styles.overlayTitleSm]
          .filter(Boolean)
          .join(" ")}
      >
        {villa.name}
      </h3>
      <p className={styles.overlayMeta}>{villa.meta}</p>
      <TextLink href={`/villas/${villa.slug}`} light className={styles.overlayLink}>
        مشاهدهٔ جزئیات
      </TextLink>
    </article>
  );
}

/** Magazine card. */
export function PostCard({ post, showDate = false }: { post: Post; showDate?: boolean }) {
  return (
    <Link href={`/magazine/${post.slug}`} className={styles.post}>
      <div className={styles.postFrame}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={CARD_SIZES}
          quality={72}
          style={{ objectFit: "cover" }}
        />
      </div>
      <h3 className={styles.postTitle}>{post.title}</h3>
      <p className={styles.postExcerpt}>{post.excerpt}</p>
      {showDate ? <span className={styles.postDate}>{post.date}</span> : null}
    </Link>
  );
}

/** Tall destination tile. */
export function DestinationCard({
  name,
  image,
  priority = false,
}: {
  name: string;
  image: string;
  priority?: boolean;
}) {
  return (
    <Link href="/villas" className={styles.destination} aria-label={`ویلاهای ${name}`}>
      <Image
        src={image}
        alt={name}
        fill
        priority={priority}
        sizes="(max-width: 720px) 50vw, 280px"
        quality={72}
        style={{ objectFit: "cover" }}
      />
      <span className={styles.destinationLabel}>{name}</span>
    </Link>
  );
}

/** Row in the “villas by region” list. */
export function RegionCard({ name, type }: { name: string; type: string }) {
  return (
    <div className={styles.region}>
      <span className={styles.regionIcon} aria-hidden="true">
        ◈
      </span>
      <div>
        <div className={styles.regionName}>{name}</div>
        <div className={styles.regionType}>{type}</div>
      </div>
    </div>
  );
}

export const cardStyles = styles;
