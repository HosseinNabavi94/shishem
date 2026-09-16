import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import VillaTabs from "@/components/sections/VillaTabs";
import Reveal from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PillLink } from "@/components/ui/Pill";
import { getAllVillas, getVillaBySlug } from "@/data/villas";
import styles from "./detail.module.css";

type Params = { params: Promise<{ slug: string }> };

/** Pre-renders every villa at build time. */
export function generateStaticParams() {
  return getAllVillas().map((villa) => ({ slug: villa.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);

  if (!villa) return { title: "ویلا یافت نشد" };

  return {
    title: villa.name,
    description: `${villa.name} در ${villa.place} — ${villa.desc}`,
    alternates: { canonical: `/villas/${villa.slug}` },
    openGraph: {
      type: "article",
      title: villa.name,
      description: villa.desc,
      images: [{ url: villa.image, width: 1200, height: 900, alt: villa.name }],
    },
  };
}

export default async function VillaDetailPage({ params }: Params) {
  const { slug } = await params;
  const villa = getVillaBySlug(slug);

  if (!villa) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: villa.name,
    description: villa.about,
    image: villa.image,
    address: { "@type": "PostalAddress", addressLocality: villa.place, addressCountry: "IR" },
    amenityFeature: villa.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true,
    })),
  };

  return (
    <>
      <PageHero title={villa.name} image={villa.image} short />

      <Section compact>
        {/* GALLERY ------------------------------------------------------- */}
        <Reveal variant="curtain">
          <div className={styles.gallery}>
            <div className={styles.galleryMain}>
              <span className={styles.rateBadge}>★ {villa.rate}</span>
              <Image
                src={villa.image}
                alt={`نمای اصلی ${villa.name}`}
                fill
                sizes="(max-width: 900px) 100vw, 580px"
                quality={74}
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.galleryGrid}>
              {villa.gallery.map((src, i) => (
                <div key={src + i} className={styles.galleryThumb}>
                  <Image
                    src={src}
                    alt={`${villa.name} — تصویر ${i + 1}`}
                    fill
                    sizes="(max-width: 900px) 50vw, 280px"
                    quality={70}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* BODY ---------------------------------------------------------- */}
        <div className={styles.body}>
          <Reveal variant="up" className={styles.main}>
            <VillaTabs villa={villa} />
          </Reveal>

          <Reveal variant="side" delay={120}>
            <aside className={styles.booking}>
              <div className={styles.price}>
                <span className={styles.priceValue}>{villa.pricePerNight}</span>
                <span className={styles.priceUnit}>تومان / شب</span>
              </div>
              <p className={styles.bookingNote}>{villa.minStay}</p>
              <div className={styles.dates}>
                <div className={styles.dateRow}>
                  <span>تاریخ ورود</span>
                  <span className={styles.dateValue}>انتخاب کنید</span>
                </div>
                <div className={styles.dateRow}>
                  <span>تاریخ خروج</span>
                  <span className={styles.dateValue}>انتخاب کنید</span>
                </div>
              </div>
              <PillLink href="/contact" variant="block">
                درخواست رزرو
              </PillLink>
            </aside>
          </Reveal>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
