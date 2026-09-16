/**
 * Villa catalogue.
 *
 * This module is deliberately shaped like an API: pages only ever touch
 * `getAllVillas` / `getVillaBySlug` / `getFeaturedVillas`, so replacing the
 * array below with a database or REST call later is a one-file change.
 */

import { propertyImage } from "./images";

/** Resolves the former photo identifiers to project-local image assets. */
const img = (id: string, _w = 1200) => propertyImage(id);

export type Review = {
  name: string;
  stars: string;
  date: string;
  text: string;
};

export type Villa = {
  slug: string;
  name: string;
  place: string;
  region: RegionKey;
  rate: string;
  /** Short line used on cards */
  desc: string;
  /** Full description on the detail page */
  about: string;
  image: string;
  gallery: string[];
  specs: string[];
  meta: string;
  pricePerNight: string;
  minStay: string;
  address: string;
  mapEmbed: string;
  amenities: string[];
  reviews: Review[];
  featured?: boolean;
};

export type RegionKey = "north" | "south" | "west" | "central";

const sharedAmenities = [
  "استخر اختصاصی سرپوشیده",
  "جکوزی و سونای خشک",
  "اینترنت پرسرعت فیبر",
  "آشپزخانهٔ کامل و مجهز",
  "شومینهٔ هیزمی",
  "پارکینگ سرپوشیدهٔ دو خودرو",
  "سیستم سرمایش و گرمایش",
  "آلاچیق و باربیکیو",
  "خدمات نظافت روزانه",
  "دوربین مداربسته و نگهبانی",
  "لباسشویی و خشک‌کن",
  "تراس رو به جنگل",
];

const sharedReviews: Review[] = [
  {
    name: "نیلوفر رحیمی",
    stars: "★★★★★",
    date: "خرداد ۱۴۰۴",
    text: "همه‌چیز دقیقاً مطابق تصاویر بود؛ خانه تمیز، حیاط بزرگ و میزبان بسیار محترم. بچه‌ها استخر را عاشق شدند.",
  },
  {
    name: "مانی دهقان",
    stars: "★★★★★",
    date: "اردیبهشت ۱۴۰۴",
    text: "سکوت شالیزار صبح‌ها بی‌نظیر بود. آشپزخانه کامل بود و برای اقامت پنج‌روزه چیزی کم نداشتیم.",
  },
  {
    name: "سحر موسوی",
    stars: "★★★★☆",
    date: "فروردین ۱۴۰۴",
    text: "دسترسی جاده در روز بارانی کمی سخت است اما اقامتگاه واقعاً ارزشش را دارد. پشتیبانی هم سریع پاسخ داد.",
  },
];

const villas: Villa[] = [
  {
    slug: "shalizar-mansion",
    name: "عمارت شالیزار",
    place: "رامسر، مازندران",
    region: "north",
    rate: "۵٫۰",
    desc: "ویلایی با معماری پایدار، مشرف به شالیزارها و جنگل ابری، با آرامشی بی‌انتها.",
    about:
      "مجموعه‌ای خصوصی از سه بنای چوبی در دل شالیزارهای رامسر که با الهام از معماری بومی گیلان و آسایش مدرن طراحی شده است. هر بنا استخر اختصاصی، تراس رو به جنگل و آشپزخانهٔ کامل دارد و برای اقامت خانوادگی یا سفرهای دونفرهٔ آرام ایده‌آل است.",
    image: img("1512917774080-9991f1c4c750"),
    gallery: [
      img("1522708323590-d24dbb6b0267", 900),
      img("1600607687939-ce8a6c25118c", 900),
      img("1552321554-5fefe8c9ef14", 900),
      img("1520250497591-112f2f40a3f4", 900),
    ],
    specs: ["۳ خوابه", "۲ سرویس", "۲۰۰ متر زیربنا", "ظرفیت ۸ نفر"],
    meta: "۳ خوابه · استخر اختصاصی",
    pricePerNight: "۱۸٬۵۰۰٬۰۰۰",
    minStay: "حداقل اقامت ۲ شب · تسویه در محل امکان‌پذیر است",
    address: "رامسر، جادهٔ جواهرده، کیلومتر ۶",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=50.5900%2C36.8700%2C50.7400%2C36.9600&layer=mapnik&marker=36.9108%2C50.6583",
    amenities: sharedAmenities,
    reviews: sharedReviews,
    featured: true,
  },
  {
    slug: "marjan-villa",
    name: "ویلا مرجان",
    place: "کیش، هرمزگان",
    region: "south",
    rate: "۴٫۹",
    desc: "اقامتگاهی ساحلی با استخر بی‌نهایت، معماری مینیمال و منظرهٔ کامل خلیج فارس.",
    about:
      "خانه‌ای ساحلی در ضلع غربی کیش با استخر بی‌نهایت رو به غروب، تراس چوبی و دسترسی مستقیم به ساحل خصوصی. فضای داخلی با نور طبیعی و مصالح روشن طراحی شده و آشپزخانهٔ جزیره‌ای برای میزبانی جمع‌های کوچک مناسب است.",
    image: img("1600596542815-ffad4c1539a9"),
    gallery: [
      img("1499793983690-e29da59ef1c2", 900),
      img("1520250497591-112f2f40a3f4", 900),
      img("1522708323590-d24dbb6b0267", 900),
      img("1518684079-3c830dcef090", 900),
    ],
    specs: ["۴ خوابه", "۳ سرویس", "۲۶۰ متر زیربنا", "ظرفیت ۱۰ نفر"],
    meta: "۴ خوابه · استخر بی‌نهایت",
    pricePerNight: "۲۴٬۹۰۰٬۰۰۰",
    minStay: "حداقل اقامت ۲ شب · پذیرش مهمان از ساعت ۱۴",
    address: "کیش، بلوار ساحلی مرجان، مجتمع ویلایی صدف",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=53.9000%2C26.5000%2C54.0500%2C26.5800&layer=mapnik&marker=26.5400%2C53.9700",
    amenities: sharedAmenities,
    reviews: sharedReviews,
    featured: true,
  },
  {
    slug: "barfaraz-cabin",
    name: "کلبهٔ برفراز",
    place: "دیزین، البرز",
    region: "west",
    rate: "۴٫۸",
    desc: "چوب، شومینه و پنجره‌های سرتاسری رو به قله‌های پوشیده از برف البرز مرکزی.",
    about:
      "کلبه‌ای دو طبقه در ارتفاع ۲۶۰۰ متری با شومینهٔ هیزمی، پنجره‌های سرتاسری رو به پیست و آبگرم روباز. زمستان‌ها با دسترسی چند دقیقه‌ای به تله‌کابین و تابستان‌ها با مسیرهای کوه‌پیمایی اطراف، انتخابی برای هر فصل است.",
    image: img("1449158743715-0a90ebb6d2d8"),
    gallery: [
      img("1506905925346-21bda4d32df4", 900),
      img("1552321554-5fefe8c9ef14", 900),
      img("1600607687939-ce8a6c25118c", 900),
      img("1476514525535-07fb3b4ae5f1", 900),
    ],
    specs: ["۳ خوابه", "۲ سرویس", "۱۷۰ متر زیربنا", "ظرفیت ۶ نفر"],
    meta: "۳ خوابه · آبگرم روباز",
    pricePerNight: "۱۵٬۲۰۰٬۰۰۰",
    minStay: "حداقل اقامت ۲ شب · زنجیر چرخ در فصل برف الزامی است",
    address: "دیزین، جادهٔ پیست، مجموعهٔ برفراز",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=51.3600%2C36.2200%2C51.4600%2C36.2900&layer=mapnik&marker=36.2530%2C51.4100",
    amenities: sharedAmenities,
    reviews: sharedReviews,
    featured: true,
  },
  {
    slug: "narenjestan-garden",
    name: "باغ‌ویلای نارنجستان",
    place: "نوشهر، مازندران",
    region: "north",
    rate: "۴٫۹",
    desc: "باغ مرکبات، استخر روباز و سالن پذیرایی برای جمع‌های بزرگ.",
    about:
      "باغ‌ویلایی دوهزار متری با درختان نارنج و پرتقال، استخر روباز، سالن پذیرایی مجزا و اتاق سرایدار. برای مهمانی‌های خانوادگی، مراسم کوچک و اقامت‌های گروهی طراحی شده است.",
    image: img("1520250497591-112f2f40a3f4"),
    gallery: [
      img("1512917774080-9991f1c4c750", 900),
      img("1522708323590-d24dbb6b0267", 900),
      img("1600607687939-ce8a6c25118c", 900),
      img("1571003123894-1f0594d2b5d9", 900),
    ],
    specs: ["۵ خوابه", "۴ سرویس", "۴۲۰ متر زیربنا", "ظرفیت ۱۶ نفر"],
    meta: "۵ خوابه · استخر اختصاصی · سرایدار",
    pricePerNight: "۳۲٬۰۰۰٬۰۰۰",
    minStay: "حداقل اقامت ۲ شب · مراسم با هماهنگی قبلی",
    address: "نوشهر، جادهٔ چالوس، کیلومتر ۴، باغ نارنجستان",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=51.4400%2C36.6100%2C51.5600%2C36.6900&layer=mapnik&marker=36.6480%2C51.4960",
    amenities: sharedAmenities,
    reviews: sharedReviews,
  },
  {
    slug: "sadaf-villa",
    name: "ویلا صدف",
    place: "قشم، هرمزگان",
    region: "south",
    rate: "۴٫۹",
    desc: "خانه‌ای سپید رو به دریا با تراس غروب و آشپزخانهٔ حرفه‌ای.",
    about:
      "خانه‌ای سپید با معماری جزیره‌ای در ساحل شمالی قشم؛ تراس غروب، استخر اختصاصی و آشپزخانه‌ای حرفه‌ای که می‌توان آشپز اختصاصی را در آن میزبانی کرد. جزیرهٔ هرمز و دره ستاره‌ها در کمتر از یک ساعت.",
    image: img("1499793983690-e29da59ef1c2"),
    gallery: [
      img("1518684079-3c830dcef090", 900),
      img("1600596542815-ffad4c1539a9", 900),
      img("1552321554-5fefe8c9ef14", 900),
      img("1522708323590-d24dbb6b0267", 900),
    ],
    specs: ["۴ خوابه", "۳ سرویس", "۲۴۰ متر زیربنا", "ظرفیت ۹ نفر"],
    meta: "۴ خوابه · استخر اختصاصی",
    pricePerNight: "۲۱٬۷۰۰٬۰۰۰",
    minStay: "حداقل اقامت ۳ شب · ترانسفر فرودگاه رایگان",
    address: "قشم، ساحل سیمین، مجموعهٔ صدف",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=55.8800%2C26.9200%2C56.0200%2C27.0000&layer=mapnik&marker=26.9580%2C55.9500",
    amenities: sharedAmenities,
    reviews: sharedReviews,
  },
  {
    slug: "sabalan-lodge",
    name: "اقامتگاه سبلان",
    place: "سرعین، اردبیل",
    region: "west",
    rate: "۴٫۸",
    desc: "آبگرم خصوصی، منظرهٔ دامنهٔ سبلان و سکوتی که فقط در ییلاق پیدا می‌شود.",
    about:
      "اقامتگاهی سنگی در دامنهٔ سبلان با آبگرم معدنی خصوصی، حیاط مرکزی و اتاق نشیمن رو به کوه. چشمه‌های سرعین در ده دقیقه و مسیر صعود به قله در نیم‌ساعتی اقامتگاه است.",
    image: img("1506905925346-21bda4d32df4"),
    gallery: [
      img("1449158743715-0a90ebb6d2d8", 900),
      img("1552321554-5fefe8c9ef14", 900),
      img("1522708323590-d24dbb6b0267", 900),
      img("1600607687939-ce8a6c25118c", 900),
    ],
    specs: ["۳ خوابه", "۲ سرویس", "۱۸۰ متر زیربنا", "ظرفیت ۷ نفر"],
    meta: "۳ خوابه · آبگرم خصوصی",
    pricePerNight: "۱۴٬۸۰۰٬۰۰۰",
    minStay: "حداقل اقامت ۲ شب · صبحانه شامل قیمت است",
    address: "سرعین، جادهٔ آلوارس، مجموعهٔ سبلان",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=48.0000%2C38.1200%2C48.1400%2C38.2100&layer=mapnik&marker=38.1500%2C48.0700",
    amenities: sharedAmenities,
    reviews: sharedReviews,
  },
  {
    slug: "meh-house",
    name: "خانهٔ مه",
    place: "ماسوله، گیلان",
    region: "north",
    rate: "۴٫۸",
    desc: "اقامتگاهی پلکانی در دل مه، با معماری بومی و چشم‌انداز دره.",
    about:
      "خانه‌ای پلکانی با بام‌های به‌هم‌پیوستهٔ ماسوله، بازسازی‌شده با مصالح بومی و آسایش امروزی. تراس چوبی رو به دره، شومینهٔ سنتی و صبحانهٔ محلی میزبان، تجربه‌ای اصیل می‌سازد.",
    image: img("1476514525535-07fb3b4ae5f1"),
    gallery: [
      img("1506905925346-21bda4d32df4", 900),
      img("1519643381401-22c77e60520e", 900),
      img("1600607687939-ce8a6c25118c", 900),
      img("1502672260266-1c1ef2d93688", 900),
    ],
    specs: ["۳ خوابه", "۲ سرویس", "۱۵۰ متر زیربنا", "ظرفیت ۷ نفر"],
    meta: "۳ خوابه · تراس جنگلی",
    pricePerNight: "۱۳٬۴۰۰٬۰۰۰",
    minStay: "حداقل اقامت ۲ شب · صبحانهٔ محلی میزبان",
    address: "ماسوله، محلهٔ خانه‌بر، کوچهٔ سوم",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=48.9500%2C37.1200%2C49.0500%2C37.1800&layer=mapnik&marker=37.1540%2C48.9930",
    amenities: sharedAmenities,
    reviews: sharedReviews,
  },
];

export function getAllVillas(): Villa[] {
  return villas;
}

export function getVillaBySlug(slug: string): Villa | undefined {
  return villas.find((v) => v.slug === slug);
}

export function getFeaturedVillas(): Villa[] {
  return villas.filter((v) => v.featured);
}

/** The two large cards in the “انتخاب‌های داغ این هفته” band. */
export function getHotPicks(): Villa[] {
  return [
    getVillaBySlug("narenjestan-garden")!,
    getVillaBySlug("sabalan-lodge")!,
  ];
}

/** The two full-bleed cards in the “درخشش این فصل” band. */
export function getSpotlightVillas(): Villa[] {
  return [getVillaBySlug("sadaf-villa")!, getVillaBySlug("meh-house")!];
}
