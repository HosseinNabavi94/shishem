"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/data/site";
import { PillLink } from "@/components/ui/Pill";
import styles from "./Header.module.css";

type Theme = "light" | "dark";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  // Deepen the glass bar once the hero starts leaving the viewport.
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleTheme = () => {
    // Read the source of truth from the DOM. The pre-hydration script may have
    // already applied the system theme before React synchronises local state.
    const current: Theme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      window.localStorage.setItem("shishem-theme", next);
    } catch {
      // Theme switching must still work in restricted/private storage modes.
    }
    setTheme(next);
  };

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ""].join(" ")}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand}>
          <Image
            src="/brand/shishem-logo.png"
            alt=""
            width={120}
            height={34}
            priority
            className={styles.brandMark}
          />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{site.name}</span>
            <span className={styles.brandTagline}>{site.tagline}</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="ناوبری اصلی">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[styles.navLink, isActive(item.href) ? styles.navLinkActive : ""]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "فعال‌کردن تم روشن" : "فعال‌کردن تم تاریک"}
            title={theme === "dark" ? "تم روشن" : "تم تاریک"}
          >
            <span className={styles.themeIcon} aria-hidden="true">
              {theme === "dark" ? "☀" : "☾"}
            </span>
          </button>

          <PillLink href="/contact" variant="gold" className={styles.cta}>
            رزرو اقامت
          </PillLink>

          <button
            type="button"
            className={[styles.toggle, open ? styles.toggleOpen : ""].filter(Boolean).join(" ")}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="sh-mobile-nav"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
          >
            <span className={styles.toggleBar} />
            <span className={styles.toggleBar} />
            <span className={styles.toggleBar} />
          </button>
        </div>
      </div>

      <div
        id="sh-mobile-nav"
        className={[styles.drawer, open ? styles.drawerOpen : ""].filter(Boolean).join(" ")}
        aria-hidden={!open}
      >
        <div className={styles.drawerInner}>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              className={[
                styles.drawerLink,
                isActive(item.href) ? styles.drawerLinkActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.label}
            </Link>
          ))}
          <PillLink href="/contact" variant="gold" className={styles.drawerCta}>
            رزرو اقامت
          </PillLink>
        </div>
      </div>
    </header>
  );
}
