import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site, siteUrl } from "@/data/site";
import "@/styles/globals.css";

/**
 * Morabba is a variable Persian face and is self-hosted — Google Fonts is not
 * a dependency anywhere in this project. next/font inlines the @font-face and
 * preloads the file, so there is no layout shift on first paint.
 */
const morabba = localFont({
  src: [
    {
      path: "../../public/fonts/MorabbaVF.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-morabba",
  display: "swap",
  preload: true,
  fallback: ["Vazirmatn", "Tahoma", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "اجاره ویلا",
    "ویلای لوکس",
    "ویلا شمال",
    "ویلا کیش",
    "اجاره ویلا رامسر",
    "شیشِم",
  ],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/brand/shishem-logo.png",
    apple: "/brand/shishem-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e4034",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: site.name,
  alternateName: site.nameLatin,
  description: site.description,
  url: siteUrl,
  image: `${siteUrl}/brand/shishem-logo.png`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "IR",
    addressLocality: "تهران",
    streetAddress: "خیابان ولیعصر، برج نگین، طبقهٔ ۱۲",
  },
  email: "stay@shishem.com",
  telephone: "+982191002233",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={morabba.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('shishem-theme');var theme=saved==='dark'||saved==='light'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme}catch(e){document.documentElement.dataset.theme='light'}})();`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="sh-visually-hidden">
          رفتن به محتوای اصلی
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
