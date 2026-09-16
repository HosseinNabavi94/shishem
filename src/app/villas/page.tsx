import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { VillaCard, cardStyles } from "@/components/ui/Cards";
import { getAllVillas } from "@/data/villas";
import { images } from "@/data/images";

const HERO = images.north;

export const metadata: Metadata = {
  title: "ویلاهای شیشِم",
  description:
    "مجموعهٔ کامل ویلاهای لوکس شیشِم؛ از سواحل جنوب تا جنگل‌های شمال، هر اقامتگاه با بازدید میدانی تأیید شده است.",
  alternates: { canonical: "/villas" },
};

export default function VillasPage() {
  const villas = getAllVillas();

  return (
    <>
      <PageHero title="ویلاهای شیشِم" image={HERO} />

      <Section compact>
        <SectionHeading
          title="مجموعهٔ کامل اقامتگاه‌ها"
          lead="از سواحل جنوب تا جنگل‌های شمال؛ هر ویلا با بازدید میدانی تأیید شده است."
          center
          large
        />
        <div className={cardStyles.grid} style={{ marginTop: 52, gap: 36 }}>
          {villas.map((villa, i) => (
            <Reveal key={villa.slug} variant="rise" delay={(i % 3) * 120}>
              <VillaCard villa={villa} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
