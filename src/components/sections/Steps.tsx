import Reveal from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import styles from "./home.module.css";

const steps = [
  {
    number: "۱",
    title: "جست‌وجو و انتخاب",
    text: "بر اساس مقصد، امکانات یا تاریخ فیلتر کنید و ویلای متناسب با سلیقه و بودجه‌تان را بیابید.",
  },
  {
    number: "۲",
    title: "تأیید تاریخ",
    text: "تقویم لحظه‌ای موجودی را ببینید، جزئیات قیمت و تخفیف‌های فصلی را بررسی کنید.",
  },
  {
    number: "۳",
    title: "رزرو امن",
    text: "پرداخت از طریق درگاه امن و دریافت آنی تأییدیهٔ رزرو و اطلاعات میزبان.",
  },
];

export default function Steps() {
  return (
    <Section compact warm>
      <div className={styles.stepsInner}>
        <SectionHeading
          title="رزرو، به سادگی سه گام"
          lead="در چند دقیقه اقامت ایده‌آل خود را قطعی کنید؛ بدون واسطه، بدون دغدغه."
          center
        />
        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <Reveal key={step.number} as="li" variant="up" delay={i * 130}>
              <div className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {step.number}
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
