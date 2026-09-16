import type { RegionKey } from "./villas";
import { propertyImage } from "./images";

const img = (id: string, _w = 900) => propertyImage(id);

export type Destination = {
  name: string;
  image: string;
};

/** The four portrait cards on the destinations page. */
export const destinations: Destination[] = [
  { name: "کیش", image: img("1439066615861-d1af74d74000") },
  { name: "دیزین", image: img("1449158743715-0a90ebb6d2d8") },
  { name: "رامسر", image: img("1476514525535-07fb3b4ae5f1") },
  { name: "قشم", image: img("1518684079-3c830dcef090") },
];

export type RegionItem = { name: string; type: string };

export const regions: Record<
  RegionKey,
  { label: string; items: RegionItem[] }
> = {
  north: {
    label: "شمال",
    items: [
      { name: "عمارت شالیزار", type: "ویلای جنگلی" },
      { name: "خانهٔ مه", type: "اقامتگاه بومی" },
      { name: "باغ نارنجستان", type: "باغ‌ویلا" },
      { name: "دریاکنار", type: "ویلای ساحلی" },
      { name: "سپیدار", type: "کلبهٔ چوبی" },
      { name: "تالار سبز", type: "ویلای خانوادگی" },
    ],
  },
  south: {
    label: "جنوب",
    items: [
      { name: "ویلا مرجان", type: "ویلای ساحلی" },
      { name: "ویلا صدف", type: "خانهٔ جزیره" },
      { name: "نخل‌زار", type: "اقامتگاه بوم‌گردی" },
      { name: "هرمز رِد", type: "ویلای طراحی‌شده" },
      { name: "بندر آفتاب", type: "سوئیت ساحلی" },
    ],
  },
  west: {
    label: "غرب",
    items: [
      { name: "کلبهٔ برفراز", type: "ویلای کوهستانی" },
      { name: "اورامان", type: "خانهٔ پلکانی" },
      { name: "زاگرس لاج", type: "اقامتگاه لوکس" },
      { name: "چشمهٔ سنگی", type: "ویلای ییلاقی" },
    ],
  },
  central: {
    label: "مرکزی",
    items: [
      { name: "خانهٔ بادگیر", type: "عمارت تاریخی" },
      { name: "کویرانه", type: "اقامتگاه کویری" },
      { name: "باغ فین", type: "باغ‌ویلای سنتی" },
      { name: "نارنج‌سرا", type: "خانهٔ حیاط‌دار" },
    ],
  },
};

export const regionOrder: RegionKey[] = ["north", "south", "west", "central"];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "چگونه یک ویلا رزرو کنم؟",
    a: "ویلای دلخواه را انتخاب کنید، تاریخ اقامت را وارد کنید و فرم رزرو امن را تکمیل کنید؛ تأییدیه بلافاصله ارسال می‌شود.",
  },
  {
    q: "آیا امکان اقامت با حیوان خانگی وجود دارد؟",
    a: "در برخی ویلاها بله. فیلتر «حیوان خانگی مجاز» را در جست‌وجو فعال کنید یا پیش از رزرو با پشتیبانی هماهنگ کنید.",
  },
  {
    q: "شرایط کنسلی چگونه است؟",
    a: "تا ۷ روز پیش از ورود، بازگشت کامل مبلغ. پس از آن بر اساس سیاست هر ویلا بین ۵۰ تا ۷۰ درصد بازگردانده می‌شود.",
  },
  {
    q: "خدمات جانبی مثل آشپز یا نظافت روزانه ارائه می‌شود؟",
    a: "بله، در بیشتر اقامتگاه‌ها با هماهنگی قبلی و هزینهٔ جداگانه قابل ارائه است.",
  },
  {
    q: "آیا ویلاها برای گروه‌های بزرگ مناسب‌اند؟",
    a: "ظرفیت هر ویلا در صفحهٔ آن درج شده است؛ چند اقامتگاه تا ۲۰ مهمان را پشتیبانی می‌کنند.",
  },
  {
    q: "پارکینگ اختصاصی وجود دارد؟",
    a: "تمام ویلاهای شیشِم حداقل دو جای پارک داخل محوطه دارند و برخی پارکینگ سرپوشیده دارند.",
  },
];
