import type { Metadata } from "next";
import { PillLink } from "@/components/ui/Pill";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "صفحه یافت نشد",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <span className={styles.rule} aria-hidden="true" />
        <h1 className={styles.title}>این مسیر به جایی نمی‌رسد</h1>
        <p className={styles.text}>
          صفحه‌ای که دنبالش بودید پیدا نشد. شاید نشانی تغییر کرده باشد — از اینجا به
          مجموعهٔ ویلاها برگردید.
        </p>
        <div className={styles.actions}>
          <PillLink href="/villas" variant="gold">
            مشاهدهٔ ویلاها
          </PillLink>
          <PillLink href="/" variant="jade">
            بازگشت به خانه
          </PillLink>
        </div>
      </div>
    </div>
  );
}
