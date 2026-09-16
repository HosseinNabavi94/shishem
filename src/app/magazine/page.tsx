import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PostCard, cardStyles } from "@/components/ui/Cards";
import { getAllPosts } from "@/data/posts";
import { images } from "@/data/images";

const HERO = images.mountain;

export const metadata: Metadata = {
  title: "مجله",
  description:
    "مجلهٔ شیشِم؛ راهنمای سفر، معرفی مقصد و نکته‌های کاربردی برای تجربه‌ای بی‌نقص در ویلاهای لوکس ایران.",
  alternates: { canonical: "/magazine" },
};

export default function MagazinePage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero title="مجله" image={HERO} />

      <Section compact>
        <SectionHeading
          title="روایت‌های اقامت"
          lead="راهنمای سفر، معرفی مقصد و نکته‌های کاربردی برای تجربه‌ای بی‌نقص در ویلاهای شیشِم."
          center
          large
        />
        <div className={cardStyles.grid} style={{ marginTop: 52, gap: 34 }}>
          {posts.map((post, i) => (
            <Reveal key={post.slug} variant="up" delay={(i % 3) * 120}>
              <PostCard post={post} showDate />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
