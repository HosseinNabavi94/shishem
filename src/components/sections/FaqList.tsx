"use client";

import { useState } from "react";
import { faqs } from "@/data/destinations";
import styles from "@/app/contact/contact.module.css";

/** FAQ accordion. One panel open at a time, matching the approved design. */
export default function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.faqList}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q} className={styles.faqItem}>
            <button
              type="button"
              className={styles.faqButton}
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
            >
              <span className={styles.faqQuestion}>
                {i + 1}. {faq.q}
              </span>
              <span
                className={[styles.faqSign, isOpen ? styles.faqSignOpen : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden="true"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              className={[styles.faqAnswer, isOpen ? styles.faqAnswerOpen : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.faqAnswerInner}>
                <p className={styles.faqAnswerText}>{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
