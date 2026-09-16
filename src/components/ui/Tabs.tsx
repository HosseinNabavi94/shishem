"use client";

import type { ReactNode } from "react";
import styles from "./Tabs.module.css";

export type TabItem = { key: string; label: string };

/**
 * Tab bar shared by the villa detail page and the destinations region list.
 * Keeps the underline animation and ARIA wiring in one place.
 */
export function TabBar({
  tabs,
  active,
  onChange,
  wide = false,
  label,
}: {
  tabs: readonly TabItem[];
  active: string;
  onChange: (key: string) => void;
  /** Wider spacing variant used on the destinations page. */
  wide?: boolean;
  label: string;
}) {
  return (
    <div
      className={[styles.bar, wide ? styles.wide : ""].filter(Boolean).join(" ")}
      role="tablist"
      aria-label={label}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            id={`tab-${tab.key}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.key}`}
            className={[styles.tab, isActive ? styles.active : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  tabKey,
  children,
}: {
  tabKey: string;
  children: ReactNode;
}) {
  return (
    <div
      role="tabpanel"
      id={`panel-${tabKey}`}
      aria-labelledby={`tab-${tabKey}`}
      /* key forces a remount so the cross-fade replays on every switch */
      key={tabKey}
      className={styles.panel}
    >
      {children}
    </div>
  );
}
