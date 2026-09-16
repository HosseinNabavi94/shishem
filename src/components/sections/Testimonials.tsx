import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import { images } from "@/data/images";
import styles from "./home.module.css";

const TESTIMONIAL_IMAGE = images.coast;

const testimonials = [
  {
    title: "سفری بی‌نقص با خانواده",
    score: "۵٫۰",
    text: "همه‌چیز دقیقاً مطابق تصاویر بود؛ خانه تمیز، حیاط بزرگ و میزبان بسیار محترم. بچه‌ها استخر را عاشق شدند.",
    author: "نیلوفر رحیمی",
  },
  {
    title: "اقامتی رمانتیک و آرام",
    score: "۴٫۹",
    text: "کلبهٔ کوهستانی دقیقاً همان چیزی بود که می‌خواستیم؛ دنج، گرم و با منظره‌ای که تا همیشه یادمان می‌ماند.",
    author: "مانی دهقان",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <Parallax src={TESTIMONIAL_IMAGE} strength={0.2} sizes="100vw" />
      <div className={styles.testimonialsScrim} />

      <div className={styles.testimonialsInner}>
        <Reveal variant="up">
          <h2 className={styles.testimonialsTitle}>مهمانان ما چه می‌گویند</h2>
        </Reveal>
        <div className={styles.testimonialGrid}>
          {testimonials.map((item, i) => (
            <Reveal key={item.author} variant="rise" delay={i * 140}>
              <figure className={styles.testimonial} style={{ margin: 0 }}>
                <h3 className={styles.testimonialTitle}>{item.title}</h3>
                <div className={styles.testimonialStars}>
                  ★★★★★ <span className={styles.testimonialScore}>{item.score}</span>
                </div>
                <blockquote className={styles.testimonialText} style={{ margin: 0 }}>
                  {item.text}
                </blockquote>
                <figcaption className={styles.testimonialAuthor}>— {item.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
