import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import RegionTabs from "@/components/sections/RegionTabs";
import Reveal from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DestinationCard } from "@/components/ui/Cards";
import { destinations } from "@/data/destinations";
import { images } from "@/data/images";
import styles from "./destinations.module.css";

const HERO = images.coast;

export const metadata: Metadata = {
  title: "مقاصد",
  description:
    "مقاصد شیشِم؛ از سواحل نیلگون جنوب تا جنگل‌های هیرکانی و برف کوهستان — ویلاهای لوکس در سراسر ایران.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero title="مقاصد" image={HERO} scrim="rgba(12, 26, 21, 0.45)" />

      <Section compact>
        <SectionHeading
          title="ایران را دوباره کشف کنید"
          lead="چه دلتان سواحل نیلگون جنوب را بخواهد، چه سکوت جنگل‌های هیرکانی یا برف کوهستان — مقصد شما اینجاست."
          center
          large
        />

        <div className={styles.tiles}>
          {destinations.map((destination, i) => (
            <Reveal key={destination.name} variant="curtain" delay={i * 110}>
              <DestinationCard
                name={destination.name}
                image={destination.image}
                priority={i < 2}
              />
            </Reveal>
          ))}
        </div>

        <div className={styles.regions} id="regions">
          <SectionHeading title="ویلاها بر اساس منطقه" />
          <Reveal variant="up">
            <RegionTabs />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
