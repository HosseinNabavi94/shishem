import type { ReactNode } from "react";
import Reveal from "./Reveal";
import styles from "./Section.module.css";

type SectionProps = {
  children: ReactNode;
  /** Removes the top padding when this band follows another. */
  tight?: boolean;
  /** Slightly shorter vertical rhythm. */
  compact?: boolean;
  /** Warm sand background. */
  warm?: boolean;
  id?: string;
  className?: string;
};

export function Section({
  children,
  tight,
  compact,
  warm,
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        styles.section,
        tight ? styles.tight : "",
        compact ? styles.compact : "",
        warm ? styles.warm : "",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}

type HeadingProps = {
  title: string;
  lead?: string;
  /** Centred heading block, used on the overview bands. */
  center?: boolean;
  /** Heading and lead side by side on one baseline. */
  split?: boolean;
  large?: boolean;
};

export function SectionHeading({
  title,
  lead,
  center,
  split,
  large,
}: HeadingProps) {
  const inner = (
    <>
      <h2
        className={[styles.title, large ? styles.titleLarge : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={[styles.lead, center ? styles.leadCenter : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {lead}
        </p>
      ) : null}
    </>
  );

  return (
    <Reveal variant="up">
      <div
        className={[
          center ? styles.headingWrapCenter : styles.headingWrap,
          split ? styles.split : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {inner}
      </div>
    </Reveal>
  );
}
