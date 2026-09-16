/**
 * Single source of truth for brand-level copy, navigation and contact details.
 * Swap these values when the real business data arrives — nothing else changes.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://shishem.com";

export const site = {
  name: "شیشِم",
  nameLatin: "SHISHEM",
  tagline: "اجاره ویلای لوکس",
  description:
    "شیشِم؛ اجارهٔ ویلاهای لوکس و دست‌چین‌شده در زیباترین نقاط ایران — از سواحل جنوب تا جنگل‌های شمال. حریم خصوصی کامل، میزبانی اختصاصی و رزرو امن.",
  intro: "میزبان لحظه‌های ماندگار شما در زیباترین نقاط ایران.",
  copyright: "© ۱۴۰۴ شیشِم — تمامی حقوق محفوظ است.",
} as const;

export const mainNav = [
  { href: "/", label: "خانه" },
  { href: "/villas", label: "ویلاها" },
  { href: "/destinations", label: "مقاصد" },
  { href: "/magazine", label: "مجله" },
  { href: "/contact", label: "تماس با ما" },
] as const;

export const contactChannels = [
  {
    title: "دفتر مرکزی",
    lines: ["تهران، خیابان ولیعصر، برج نگین، طبقهٔ ۱۲"],
  },
  {
    title: "پشتیبانی مهمانان",
    lines: ["stay@shishem.com", "۰۲۱ ۹۱۰۰ ۲۲۳۳"],
  },
  {
    title: "همکاری و میزبانی",
    lines: ["partners@shishem.com", "۰۲۱ ۹۱۰۰ ۴۴۵۵"],
  },
] as const;

export const footerColumns = [
  {
    title: "دسترسی سریع",
    links: [
      { label: "خانه", href: "/" },
      { label: "ویلاها", href: "/villas" },
      { label: "مقاصد", href: "/destinations" },
      { label: "مجله", href: "/magazine" },
    ],
  },
  {
    title: "رزرو و پشتیبانی",
    links: [
      { label: "درخواست رزرو", href: "/contact#contact-form" },
      { label: "ارتباط با پشتیبانی", href: "/contact#contact-info" },
      { label: "میزبانی ویلا", href: "/contact#contact-form" },
      { label: "سؤالات متداول", href: "/contact#faq" },
    ],
  },
  {
    title: "شیشِم",
    links: [
      { label: "دربارهٔ ما", href: "/#about" },
      { label: "فرصت‌های همکاری", href: "/contact#contact-form" },
      { label: "تماس با ما", href: "/contact#contact-info" },
      { label: "سؤالات متداول", href: "/contact#faq" },
    ],
  },
  {
    title: "پیشنهادها",
    links: [
      { label: "ویلاهای شمال", href: "/destinations#regions" },
      { label: "ویلاهای جنوب", href: "/destinations#regions" },
      { label: "انتخاب‌های ویژه", href: "/villas" },
      { label: "راهنمای سفر", href: "/magazine" },
    ],
  },
] as const;
