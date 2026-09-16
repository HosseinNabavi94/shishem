import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Steps from "@/components/sections/Steps";
import Promise from "@/components/sections/Promise";
import Testimonials from "@/components/sections/Testimonials";
import Reveal from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PillLink } from "@/components/ui/Pill";
import { OverlayCard, PostCard, VillaCard, cardStyles } from "@/components/ui/Cards";
import {
  getFeaturedVillas,
  getHotPicks,
  getSpotlightVillas,
} from "@/data/villas";
import { getTeaserPosts } from "@/data/posts";
import { site } from "@/data/site";
import home from "@/components/sections/home.module.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeaturedVillas();
  const [hotWide, hotNarrow] = getHotPicks();
  const spotlight = getSpotlightVillas();
  const posts = getTeaserPosts();

  return (
    <>
      <Hero />

      {/* FEATURED --------------------------------------------------------- */}
      <Section>
        <SectionHeading
          title="فراتر از یک اقامت معمولی"
          lead="ویلاهای منتخب ما بر اساس موقعیت بی‌نظیر، امکانات لوکس و تجربهٔ مهمانان انتخاب شده‌اند. سفر بی‌نقص شما از همین‌جا آغاز می‌شود."
          center
          large
        />
        <div className={cardStyles.grid}>
          {featured.map((villa, i) => (
            <Reveal key={villa.slug} variant="rise" delay={i * 120}>
              <VillaCard villa={villa} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* HOT PICKS -------------------------------------------------------- */}
      <Section tight>
        <div className="sh-container">
          <SectionHeading
            title="انتخاب‌های داغ این هفته"
            lead="این ویلاها بیشترین درخواست رزرو را داشته‌اند؛ منظره، امکانات مدرن و اقامتی فراموش‌نشدنی — پیش از پرشدن تقویم، رزرو کنید."
          />
          <div className={`${cardStyles.grid} ${cardStyles.gridTight}`}>
            <Reveal variant="curtain">
              <OverlayCard villa={hotWide} wide tagLabel="مازندران" />
            </Reveal>
            <Reveal variant="curtain" delay={140}>
              <OverlayCard villa={hotNarrow} tagLabel="اردبیل" />
            </Reveal>
          </div>
          <Reveal variant="up">
            <div className={home.rowAction}>
              <PillLink href="/villas" variant="jade">
                همهٔ ویلاها
              </PillLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Steps />
      <Promise />

      {/* CTA STRIP -------------------------------------------------------- */}
      <Section tight>
        <Reveal variant="up">
          <div className={home.ctaStrip}>
            <div>
              <h2 className={home.ctaTitle}>سفر خود را همین امروز آغاز کنید</h2>
              <p className={home.ctaText}>
                سؤالی دارید؟ با ما در تماس باشید یا فرم درخواست را پر کنید؛ در کنارتان
                هستیم.
              </p>
            </div>
            <PillLink href="/contact" variant="gold">
              تماس با ما
            </PillLink>
          </div>
        </Reveal>
      </Section>

      {/* SPOTLIGHT -------------------------------------------------------- */}
      <Section tight>
        <div className="sh-container">
          <SectionHeading
            title="درخشش این فصل"
            lead="پرطرفدارترین اقامتگاه‌های فصل، منتخب بر اساس نظر مهمانان و منظرهٔ بی‌نظیرشان."
          />
          <div className={`${cardStyles.grid} ${cardStyles.gridTight}`}>
            {spotlight.map((villa, i) => (
              <Reveal key={villa.slug} variant="curtain" delay={i * 140}>
                <OverlayCard villa={villa} center />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* MAGAZINE TEASER -------------------------------------------------- */}
      <Section tight>
        <div className="sh-container">
          <SectionHeading
            title="الهام‌بخش سفر بعدی شما"
            lead="راهنماها، روایت‌های سفر و معرفی ویلاها؛ هرآنچه برای یک اقامت بی‌نقص باید بدانید."
            split
          />
          <div className={cardStyles.grid} style={{ marginTop: 42, gap: 30 }}>
            {posts.map((post, i) => (
              <Reveal key={post.slug} variant="up" delay={i * 120}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Testimonials />
    </>
  );
}
