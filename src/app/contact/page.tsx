import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import FaqList from "@/components/sections/FaqList";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { contactChannels } from "@/data/site";
import { faqs } from "@/data/destinations";
import { images } from "@/data/images";
import styles from "./contact.module.css";

const HERO = images.north;
const FORM_IMAGE = images.mountain;
const FAQ_IMAGE = images.coast;

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "با تیم شیشِم در تماس باشید؛ رزرو ویلا، مشاورهٔ سفر یا سپردن ویلای خود به شیشِم.",
  alternates: { canonical: "/contact" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="تماس با ما" image={HERO} />

      <Section compact>
        <SectionHeading
          title="سفرتان را با ما شروع کنید"
          lead="چه در حال برنامه‌ریزی سفر باشید، چه سؤالی داشته باشید یا بخواهید ویلای خود را به شیشِم بسپارید — کنارتان هستیم."
          center
          large
        />

        <div className={styles.channels} id="contact-info">
          {contactChannels.map((channel, i) => (
            <Reveal key={channel.title} variant="up" delay={i * 120}>
              <div className={styles.channel}>
                <div className={styles.channelIcon} aria-hidden="true">
                  ◈
                </div>
                <h3 className={styles.channelTitle}>{channel.title}</h3>
                <p className={styles.channelText}>
                  {channel.lines.map((line) => (
                    <span key={line} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FORM ---------------------------------------------------------- */}
        <div className={styles.formBand} id="contact-form">
          <Parallax
            src={FORM_IMAGE}
            strength={0.12}
            sizes="(max-width: 1180px) 100vw, 1180px"
          />
          <Reveal variant="side">
            <ContactForm />
          </Reveal>
        </div>

        {/* FAQ ----------------------------------------------------------- */}
        <div className={styles.faqBand} id="faq">
          <Reveal variant="up">
            <div>
              <h2 className={styles.faqTitle}>پرسش‌های پرتکرار</h2>
              <FaqList />
            </div>
          </Reveal>
          <Reveal variant="curtain" delay={140}>
            <div className={styles.faqImage}>
              <Image
                src={FAQ_IMAGE}
                alt="ویلای شیشِم"
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                quality={72}
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
