import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * With CONTACT_WEBHOOK_URL set, the enquiry is forwarded there (CRM, Slack,
 * Telegram relay, Google Apps Script — anything that accepts JSON). Without it
 * the submission is validated and logged, so a fresh Vercel deploy works with
 * no configuration and nothing silently fails.
 *
 * Swap this body for a database write when the backend arrives; the client
 * contract (POST JSON, receive `{ ok: true }`) stays the same.
 */

export const runtime = "nodejs";

type Payload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "درخواست نامعتبر است." },
      { status: 400 },
    );
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!firstName || !lastName || !message) {
    return NextResponse.json(
      { ok: false, error: "نام، نام خانوادگی و متن پیام الزامی است." },
      { status: 422 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "ایمیل واردشده معتبر نیست." },
      { status: 422 },
    );
  }

  if (message.length > 4000) {
    return NextResponse.json(
      { ok: false, error: "متن پیام بیش از حد طولانی است." },
      { status: 422 },
    );
  }

  const enquiry = {
    firstName,
    lastName,
    email,
    phone,
    message,
    receivedAt: new Date().toISOString(),
    source: "shishem-website",
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const forwarded = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });

      if (!forwarded.ok) {
        console.error("Contact webhook rejected the enquiry:", forwarded.status);
        return NextResponse.json(
          { ok: false, error: "ثبت پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید." },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error("Contact webhook unreachable:", error);
      return NextResponse.json(
        { ok: false, error: "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید." },
        { status: 502 },
      );
    }
  } else {
    console.info("Contact enquiry received (no webhook configured):", enquiry);
  }

  return NextResponse.json({ ok: true });
}
