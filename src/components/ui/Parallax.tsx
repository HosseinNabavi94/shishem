"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Parallax.module.css";

type ParallaxProps = {
  src: string;
  alt?: string;
  /** How far the layer drifts relative to the scroll, 0–0.4 is tasteful. */
  strength?: number;
  priority?: boolean;
  sizes?: string;
  /** Overlay gradient painted on top of the image. */
  overlay?: string;
};

/**
 * A full-bleed image that drifts as the section passes the viewport.
 *
 * The transform is written inside a single requestAnimationFrame tick shared
 * by every instance on the page, and only while the section is on screen, so
 * scrolling stays at 60fps regardless of how many parallax bands exist.
 */
export default function Parallax({
  src,
  alt = "",
  strength = 0.18,
  priority = false,
  sizes = "100vw",
  overlay,
}: ParallaxProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    if (reduced || small) return;

    let active = false;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = frame.getBoundingClientRect();
      const viewport = window.innerHeight;
      // -1 when the section is just below the fold, +1 when just above it.
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const shift = -progress * strength * 100;
      layer.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!active || ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    // Only listen while the band is actually visible.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) update();
      },
      { rootMargin: "10% 0px" },
    );

    visibility.observe(frame);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      visibility.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div className={styles.frame} ref={frameRef} aria-hidden={alt ? undefined : true}>
      <div className={styles.layer} ref={layerRef}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={72}
          sizes={sizes}
          style={{ objectFit: "cover" }}
        />
      </div>
      {overlay ? (
        <div style={{ position: "absolute", inset: 0, background: overlay }} />
      ) : null}
    </div>
  );
}
