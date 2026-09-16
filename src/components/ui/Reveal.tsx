"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import styles from "./Reveal.module.css";

type Variant = "up" | "side" | "rise" | "curtain" | "fade";

type RevealProps = {
  children: ReactNode;
  /** Motion flavour. Defaults to a short upward drift. */
  variant?: Variant;
  /** Stagger, in milliseconds. */
  delay?: number;
  /** Render as a different element (e.g. "li", "section"). */
  as?: ElementType;
  className?: string;
};

/**
 * Reveals its children when they scroll into view.
 *
 * Every instance shares one IntersectionObserver, and each element is
 * unobserved the moment it appears, so a page with a hundred reveals still
 * costs one observer and zero scroll listeners.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour the OS setting before any observer work happens.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = getObserver();
    callbacks.set(el, () => setVisible(true));
    observer.observe(el);

    return () => {
      callbacks.delete(el);
      observer.unobserve(el);
    };
  }, []);

  const classes = [
    styles.reveal,
    styles[variant],
    visible ? styles.visible : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/* ---- shared observer ---------------------------------------------------- */

const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        observer?.unobserve(entry.target);
        callbacks.delete(entry.target);
      }
    },
    {
      // Fire slightly before the element reaches the fold so the motion has
      // finished by the time it is comfortably in view.
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.08,
    },
  );

  return observer;
}
