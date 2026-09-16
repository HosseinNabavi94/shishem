import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { getAllPosts, getLatestPosts, getPostBySlug } from "@/data/posts";
import { site, siteUrl } from "@/data/site";
import styles from "./post.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "مقاله یافت نشد" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/magazine/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.isoDate,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const latest = getLatestPosts(post.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.isoDate,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${siteUrl}/magazine/${post.slug}`,
  };

  return (
    <>
      <header className={styles.masthead}>
        <div className={styles.mastheadInner}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </header>

      <div className={styles.coverWrap}>
        <div className={styles.cover}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            quality={74}
            sizes="(max-width: 1180px) 100vw, 1180px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <Section compact>
        <div className={styles.layout}>
          <article className={styles.article}>
            {post.body.map((paragraph, i) => (
              <Reveal key={i} variant="up" delay={Math.min(i, 3) * 80}>
                <p className={styles.paragraph}>{paragraph}</p>
              </Reveal>
            ))}
            <Reveal variant="up">
              <div className={styles.articleMeta}>
                <span>◇ ۰ دیدگاه</span>
                <span>◇ {post.category}</span>
              </div>
            </Reveal>
          </article>

          <Reveal variant="side" delay={120}>
            <aside>
              <h2 className={styles.sidebarTitle}>تازه‌ترین‌ها</h2>
              <div className={styles.latest}>
                {latest.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/magazine/${item.slug}`}
                    className={styles.latestItem}
                  >
                    <span className={styles.latestThumb}>
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="84px"
                        quality={60}
                        style={{ objectFit: "cover" }}
                      />
                    </span>
                    <span>
                      <span className={styles.latestTitle}>{item.title}</span>
                      <span className={styles.latestDate} style={{ display: "block" }}>
                        {item.date}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
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
