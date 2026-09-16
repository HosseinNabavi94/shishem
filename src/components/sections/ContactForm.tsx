"use client";

import { useState, type FormEvent } from "react";
import { PillButton } from "@/components/ui/Pill";
import styles from "@/app/contact/contact.module.css";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Enquiry form. Posts to /api/contact, which forwards to CONTACT_WEBHOOK_URL
 * when that variable is set and otherwise just accepts and logs the message —
 * so the form works on a fresh deploy with no configuration.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setMessage(result.error || "ارسال پیام انجام نشد. لطفاً دوباره تلاش کنید.");
        return;
      }

      setStatus("sent");
      setMessage("پیام شما ثبت شد. همکاران ما تا کمتر از ۲۴ ساعت پاسخ می‌دهند.");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
    }
  }

  return (
    <form className={styles.formPanel} onSubmit={handleSubmit} noValidate={false}>
      <h2 className={styles.formTitle}>پیام خود را بفرستید</h2>

      <div className={styles.fieldGrid}>
        <div>
          <label className={styles.label} htmlFor="firstName">
            نام
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            placeholder="مثلاً سارا"
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="lastName">
            نام خانوادگی
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            placeholder="مثلاً کریمی"
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="email">
            ایمیل
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@mail.com"
            dir="ltr"
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="phone">
            شمارهٔ تماس
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰"
            className={styles.input}
          />
        </div>
      </div>

      <label className={styles.label} htmlFor="message">
        درخواست شما
      </label>
      <textarea
        id="message"
        name="message"
        rows={4}
        required
        placeholder="مقصد، تاریخ سفر و تعداد مهمانان را بنویسید..."
        className={styles.textarea}
      />

      <PillButton disabled={status === "sending"}>
        {status === "sending" ? "در حال ارسال…" : "ارسال پیام"}
      </PillButton>

      {status === "sent" || status === "error" ? (
        <p
          className={[
            styles.status,
            status === "sent" ? styles.statusOk : styles.statusError,
          ].join(" ")}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
