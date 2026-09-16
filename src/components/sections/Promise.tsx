import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { images } from "@/data/images";
import styles from "./home.module.css";

const PROMISE_IMAGE = images.north;

const promises = [
  {
    title: "انتخاب دست‌چین",
    text: "هر ویلا پیش از انتشار، از نظر کیفیت، سبک و موقعیت بازدید و تأیید می‌شود.",
  },
  {
    title: "میزبانی اختصاصی",
    text: "تیم پشتیبانی شبانه‌روزی، هماهنگی ترانسفر، آشپز و خدمات ویژه در محل اقامت.",
  },
  {
    title: "تجربهٔ اصیل",
    text: "اقامتگاه‌هایی با ریشه در معماری و طبیعت ایران؛ جایی که هر جزئیات معنا دارد.",
  },
];

export default function Promise() {
  return (
    <Section id="about">
      <div className={styles.promise}>
        <Parallax
          src={PROMISE_IMAGE}
          strength={0.14}
          sizes="(max-width: 1180px) 100vw, 1180px"
        />
        <Reveal variant="side" className={styles.promisePanel}>
          <h2 className={styles.promiseTitle}>ما فراتر از اجارهٔ ویلا هستیم</h2>
          <div className={styles.promiseList}>
            {promises.map((item) => (
              <div key={item.title} className={styles.promiseItem}>
                <span className={styles.promiseMark} aria-hidden="true">
                  ◆
                </span>
                <div>
                  <h3 className={styles.promiseItemTitle}>{item.title}</h3>
                  <p className={styles.promiseItemText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
