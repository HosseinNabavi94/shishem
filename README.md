# شیشِم — SHISHEM

اجاره ویلای لوکس. A production Next.js implementation of the approved SHISHEM
design: fully Persian, RTL throughout, jade green and gold, set in the custom
Morabba variable face.

## Product overview

شیشِم یک تجربهٔ فارسی و پریمیوم برای معرفی و درخواست رزرو ویلاهای لوکس و
دست‌چین‌شده در ایران است. طراحی محصول بر تصویرپردازی بزرگ، فضای آرام، تایپوگرافی
فارسی، رنگ سبز یشمی و جزئیات طلایی استوار است و حس یک سرویس میزبانی اختصاصی را
منتقل می‌کند.

مسیر اصلی کاربر در نسخهٔ فعلی چنین است:

1. آشنایی با برند، ویلاهای منتخب و مزیت‌های شیشِم در صفحهٔ خانه.
2. مشاهدهٔ مجموعهٔ کامل ویلاها یا ورود از مسیر مقصدها.
3. بررسی گالری، مشخصات، امکانات، نظرات، موقعیت و قیمت هر ویلا.
4. انتقال به صفحهٔ تماس و ثبت درخواست رزرو یا مشاوره.

مجله نیز به‌عنوان مسیر محتوایی و سئویی محصول، راهنماها و روایت‌های سفر را به
صفحات مستقل مقاله متصل می‌کند.

## Current feature status

### Implemented

- صفحهٔ خانه با Hero، ویلاهای منتخب، انتخاب‌های داغ، مراحل رزرو، وعده‌های برند،
  فراخوان تماس، پیشنهادهای فصلی، مطالب مجله و نظرات مهمانان
- فهرست کامل ویلاها و صفحات جزئیات استاتیک برای هر ویلا
- گالری، قیمت هر شب، حداقل اقامت، مشخصات، امکانات، نظرات و نقشهٔ OpenStreetMap
- صفحهٔ مقاصد با کارت مقصدها و تب‌های منطقه‌ای
- فهرست مجله و صفحات مستقل مقاله
- صفحهٔ تماس، راه‌های ارتباطی و FAQ آکاردئونی
- فرم تماس با اعتبارسنجی سمت کاربر و سرور و امکان ارسال به webhook
- هدر شیشه‌ای واکنش‌گرا، منوی موبایل، فوتر محتوایی و صفحهٔ 404 اختصاصی
- کنترل تم روشن/تاریک در هدر چسبان با ذخیرهٔ انتخاب کاربر و تشخیص تم سیستم
- فوتر گلس شفاف روی تصویر با لینک‌های پرکنتراست، محدودهٔ کلیک مناسب و مقصدهای
  مستقیم برای رزرو، پشتیبانی، معرفی برند، مقصدها و مجله
- متادیتا، Open Graph، JSON-LD، sitemap و robots
- بهینه‌سازی تصاویر با `next/image` و پشتیبانی از AVIF/WebP
- انیمیشن ورود عناصر، پارالاکس و ترنزیشن صفحات با پشتیبانی از reduced motion

### Not implemented yet

- جست‌وجو و فیلتر واقعی ویلاها
- انتخاب تاریخ با تقویم و بررسی موجودی لحظه‌ای
- محاسبهٔ قیمت بر اساس تاریخ، تعداد مهمان یا تخفیف فصلی
- حساب کاربری مهمان یا میزبان
- فرایند رزرو، پرداخت آنلاین و صدور تأییدیه
- پنل مدیریت، CMS یا اتصال داده‌های ویلا و مجله به پایگاه داده
- ثبت دیدگاه واقعی و امتیازدهی کاربران

در نسخهٔ فعلی، کنترل‌های تاریخ در صفحهٔ ویلا نمایشی هستند و همهٔ فراخوان‌های
رزرو به `/contact` می‌روند. بدون `CONTACT_WEBHOOK_URL`، فرم تماس پس از اعتبارسنجی
فقط در لاگ سرور ثبت می‌شود و ذخیره‌سازی دائمی ندارد.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional, sensible defaults apply without it
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

Node 18.18 or newer.

---

## Stack

| Concern    | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 15 (App Router) + React 19            |
| Language   | TypeScript, strict                            |
| Styling    | CSS Modules + CSS custom properties           |
| Animation  | Native CSS + IntersectionObserver — no library |
| Images     | `next/image` (AVIF/WebP, responsive srcset)   |
| Font       | Self-hosted Morabba variable via `next/font`  |

There is no CSS framework and no animation dependency. The design's values are
specific enough that reproducing them literally through tokens is more faithful
than translating them into utility classes, and hand-written CSS transitions
outperform a runtime animation library on this kind of page.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx              RTL shell, font, metadata, JSON-LD
│   ├── template.tsx            page-transition wrapper (remounts per route)
│   ├── page.tsx                home
│   ├── villas/                 listing + [slug] detail
│   ├── destinations/
│   ├── magazine/               index + [slug] article
│   ├── contact/
│   ├── api/contact/route.ts    enquiry endpoint
│   ├── sitemap.ts, robots.ts, not-found.tsx
├── components/
│   ├── layout/                 Header, Footer, PageHero
│   ├── ui/                     Reveal, Parallax, Pill, Section, Cards, Tabs
│   └── sections/               page-specific bands
├── data/                       villas, posts, destinations, site config
└── styles/globals.css          design tokens
```

## Routes

| Route | Purpose |
| ----- | ------- |
| `/` | صفحهٔ اصلی و معرفی تجربهٔ شیشِم |
| `/villas` | فهرست تمام ویلاها |
| `/villas/[slug]` | جزئیات، گالری، امکانات، نظرات و درخواست رزرو |
| `/destinations` | مقصدها و دسته‌بندی منطقه‌ای اقامتگاه‌ها |
| `/magazine` | فهرست مطالب مجله |
| `/magazine/[slug]` | صفحهٔ مستقل مقاله |
| `/contact` | اطلاعات تماس، فرم درخواست و سؤالات متداول |
| `/api/contact` | endpoint ثبت و ارسال درخواست تماس |

## Content inventory

نسخهٔ فعلی با دادهٔ نمونهٔ محلی شامل ۷ ویلا، ۶ مقاله، ۴ مقصد اصلی و ۴ منطقه
ارائه می‌شود. داده‌های برند و اطلاعات تماس در `src/data/site.ts`، ویلاها در
`src/data/villas.ts`، مقاله‌ها در `src/data/posts.ts` و مقصدها و FAQ در
`src/data/destinations.ts` قرار دارند.

### Design tokens

Every colour, radius, easing curve and layout width from the approved design
lives in `src/styles/globals.css` as a CSS variable (`--sh-jade`, `--sh-gold`,
`--sh-ease`, …). Nothing hard-codes a brand colour. Changing a token changes the
whole site.

### Visual language

- سطوح روشن کرم و سفید برای بخش‌های محتوایی
- سبز یشمی تیره برای هویت اصلی، پنل‌ها و بخش‌های تمام‌عرض
- طلایی گرادیانی برای CTAها، خطوط تزئینی و نقاط تأکید
- عکس‌های معماری و طبیعت به‌صورت تمام‌عرض، کارت عمودی و گالری
- شیشهٔ مات در هدر، Hero، فرم تماس، کارت‌های روی تصویر و فوتر
- گوشه‌های نرم، دکمه‌های pill و فاصله‌گذاری سخاوتمندانه
- فونت متغیر Morabba برای تمام رابط فارسی

رابط دو تم کامل دارد. تم روشن از زمینه‌های کرم و سفید در کنار سبز یشمی استفاده
می‌کند؛ تم تاریک همان هویت را با زمینه‌های یشمی عمیق، سطوح سبز تیره، متن‌های روشن
و تأکیدهای طلایی ادامه می‌دهد. رنگ‌های هر دو تم از طریق design tokenهای سراسری
کنترل می‌شوند تا اجزای صفحات، کارت‌ها، فرم‌ها، جزئیات ویلا و مجله هماهنگ بمانند.

دکمهٔ تغییر تم در هدر ثابت و در هر دو نمای دسکتاپ و موبایل در دسترس است. انتخاب
کاربر در `localStorage` با کلید `shishem-theme` ذخیره می‌شود؛ در اولین بازدید، اگر
انتخاب قبلی وجود نداشته باشد، `prefers-color-scheme` سیستم مبنا قرار می‌گیرد. یک
اسکریپت سبک پیش از hydration تم را روی `<html>` اعمال می‌کند تا هنگام بارگذاری
فلش رنگ نامتناسب دیده نشود. منطق کلیک نیز تم واقعی DOM را می‌خواند تا حتی پیش از
همگام‌شدن state اولیه React و در حالت‌های محدودیت storage پایدار بماند.

طرح به‌صورت mobile-first واکنش‌گراست. شبکه‌های چندستونه در عرض‌های کوچک به یک
یا دو ستون تبدیل می‌شوند، منوی دسکتاپ جای خود را به drawer موبایل می‌دهد و
پارالاکس در نمایشگرهای کوچک غیرفعال می‌شود.

### Footer behavior

فوتر روی یک تصویر محلی تمام‌عرض قرار دارد و از یک scrim ملایم به‌همراه پنل سبز
نیمه‌شفاف، blur و saturation برای ایجاد حالت glass استفاده می‌کند؛ تصویر پس‌زمینه
در عین حفظ خوانایی متن قابل مشاهده است. محتوای فوتر به انیمیشن ورود وابسته نیست
و همیشه قابل مشاهده و قابل تعامل باقی می‌ماند.

لینک‌ها حداقل ارتفاع مناسب لمس، کنتراست بالا و بازخورد hover دارند. گزینه‌های
رزرو، پشتیبانی و همکاری مستقیماً به بخش‌های مرتبط صفحهٔ تماس می‌روند و لینک‌های
معرفی برند، مقاصد، ویلاها و مجله نیز به صفحه یا anchor واقعی متصل هستند. چیدمان
در موبایل ابتدا دو ستونه و در نمایشگرهای بسیار باریک تک‌ستونه می‌شود.

### Data layer

`src/data/*.ts` is shaped like an API — pages only ever call accessors such as
`getAllVillas()`, `getVillaBySlug()`, `getPostBySlug()`. Replacing the arrays
with a database or REST call is a one-file change per entity; no page or
component needs to be touched.

صفحات اصلی Server Component هستند و فقط اجزایی که به وضعیت یا API مرورگر نیاز
دارند Client Component شده‌اند: هدر موبایل، تب‌ها، FAQ، فرم تماس، Reveal و
Parallax. صفحات ویلا و مقاله با `generateStaticParams` هنگام build از پیش ساخته
می‌شوند.

---

## Motion

Animation is deliberate rather than decorative, and cheap by construction.

- **Scroll reveals** (`Reveal`) share a single `IntersectionObserver` across the
  whole page and unobserve each element the moment it fires. No scroll listeners.
- **Parallax** (`Parallax`) writes one `translate3d` inside a single
  `requestAnimationFrame` tick, and only while its band is actually on screen.
  Disabled below 768px, where the effect isn't worth the scroll cost.
- **Page transitions** ride the App Router's `template.tsx` remount as a pure CSS
  keyframe — no JavaScript, no layout thrash.
- **Hover, tabs, accordion** are CSS transitions on `opacity` and `transform`
  only, so they stay on the compositor and never trigger layout or paint.

`prefers-reduced-motion: reduce` is honoured in one place in `globals.css` and
checked again in JavaScript before any observer is created, so the whole system
switches off together.

---

## Accessibility

- `<html lang="fa" dir="rtl">`, logical properties throughout.
- Skip link to `#main`; visible gold focus ring on every interactive element.
- Tabs use `role="tablist"` / `aria-selected` / `aria-controls`; the FAQ uses
  `aria-expanded`; the mobile drawer is `aria-hidden` and untabbable when closed.
- Form fields have real `<label>` elements and the status message is a live region.

---

## Environment variables

| Variable               | Required | Purpose                                                                                              |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | no       | Canonical URLs, sitemap, Open Graph. Defaults to `https://shishem.com`. Set this to the real domain.  |
| `CONTACT_WEBHOOK_URL`  | no       | If set, enquiries POST here as JSON. If unset, they are validated and logged, and the form still works. |

No `localhost` URL appears anywhere in the codebase.

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it on Vercel — the framework is detected automatically, no build
   configuration needed.
3. Add `NEXT_PUBLIC_SITE_URL` (your production domain) under Environment
   Variables, and `CONTACT_WEBHOOK_URL` if you have an endpoint ready.
4. Deploy.

Everything except `/api/contact` is prerendered as static HTML at build time,
including all villa and article pages.

---

## Extending

**Real villa data** — replace the array in `src/data/villas.ts` with a fetch.
Keep the `Villa` type and the accessor signatures and every page keeps working.
For a CMS, make the accessors `async` and `await` them in the pages, which are
already server components.

**Booking** — the booking panel on the detail page currently links to the contact
form. Wire a date picker and availability check into
`src/app/villas/[slug]/page.tsx`, and add a booking route beside
`app/api/contact`. Zarinpal or another gateway slots in as a server action or
route handler.

**Authentication** — add `middleware.ts` plus an `app/(account)/` route group.
The header already receives the pathname and can render account state.

**Images** — photography is stored in `/public/images` and resolved centrally
through `src/data/images.ts`, so local previews and production rendering do not
depend on a third-party image host. `next/image` generates responsive AVIF/WebP
variants from these local originals.
