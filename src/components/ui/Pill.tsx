import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Pill.module.css";

type Variant = "gold" | "jade" | "ghost" | "block";

type PillProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Arrow glyph. The design uses ↖ for navigation and ← for form submission. */
  icon?: string;
  className?: string;
};

/** The rounded call-to-action used across the site. */
export function PillLink({
  href,
  children,
  variant = "gold",
  icon = "↖",
  className,
}: PillProps) {
  return (
    <Link
      href={href}
      className={[styles.pill, styles[variant], className].filter(Boolean).join(" ")}
    >
      <span className={styles.label}>{children}</span>
      {variant !== "block" && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
    </Link>
  );
}

/** Same shape as PillLink, for buttons that submit rather than navigate. */
export function PillButton({
  children,
  variant = "gold",
  icon = "←",
  type = "submit",
  disabled,
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  icon?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[styles.pill, styles[variant], className].filter(Boolean).join(" ")}
      style={disabled ? { opacity: 0.6, cursor: "wait" } : undefined}
    >
      <span className={styles.label}>{children}</span>
      {variant !== "block" && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
}

/** The small gold-underlined link beneath cards. */
export function TextLink({
  href,
  children,
  light = false,
  className,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={[styles.textLink, light ? styles.textLinkLight : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Link>
  );
}
