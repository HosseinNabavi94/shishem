"use client";

import { useState } from "react";
import { TabBar, TabPanel, type TabItem } from "@/components/ui/Tabs";
import { RegionCard } from "@/components/ui/Cards";
import { regionOrder, regions } from "@/data/destinations";
import type { RegionKey } from "@/data/villas";
import styles from "./regions.module.css";

const tabs: readonly TabItem[] = regionOrder.map((key) => ({
  key,
  label: regions[key].label,
}));

/** “ویلاها بر اساس منطقه” — tabbed region list. */
export default function RegionTabs() {
  const [active, setActive] = useState<RegionKey>("north");
  const region = regions[active];

  return (
    <div>
      <TabBar
        tabs={tabs}
        active={active}
        onChange={(key) => setActive(key as RegionKey)}
        wide
        label="مناطق"
      />

      <TabPanel tabKey={active}>
        <p className={styles.note}>
          منطقهٔ انتخابی: <span className={styles.noteRegion}>{region.label}</span> —
          اقامتگاه‌های تأییدشده با استخر خصوصی، منظرهٔ باز و امکانات کامل.
        </p>
        <div className={styles.list}>
          {region.items.map((item) => (
            <RegionCard key={item.name} name={item.name} type={item.type} />
          ))}
        </div>
      </TabPanel>
    </div>
  );
}
