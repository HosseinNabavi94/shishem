"use client";

import { useState } from "react";
import { TabBar, TabPanel, type TabItem } from "@/components/ui/Tabs";
import type { Villa } from "@/data/villas";
import styles from "@/app/villas/[slug]/detail.module.css";

const tabs: readonly TabItem[] = [
  { key: "overview", label: "معرفی" },
  { key: "amenities", label: "امکانات" },
  { key: "reviews", label: "نظرات" },
];

/** The معرفی / امکانات / نظرات switch on a villa page. */
export default function VillaTabs({ villa }: { villa: Villa }) {
  const [active, setActive] = useState("overview");

  return (
    <>
      <TabBar tabs={tabs} active={active} onChange={setActive} label="بخش‌های ویلا" />

      <h2 className={styles.title}>{villa.name}</h2>
      <div className={styles.specs}>
        {villa.specs.map((spec) => (
          <span key={spec}>◈ {spec}</span>
        ))}
      </div>

      {active === "overview" && (
        <TabPanel tabKey="overview">
          <p className={styles.about}>{villa.about}</p>
          <h3 className={styles.subhead}>موقعیت</h3>
          <p className={styles.address}>◈ {villa.address}</p>
          <div className={styles.map}>
            <iframe
              src={villa.mapEmbed}
              title={`موقعیت ${villa.name} روی نقشه`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </TabPanel>
      )}

      {active === "amenities" && (
        <TabPanel tabKey="amenities">
          <div className={styles.amenities}>
            {villa.amenities.map((amenity) => (
              <div key={amenity} className={styles.amenity}>
                <span className={styles.amenityIcon} aria-hidden="true">
                  ◈
                </span>
                <span className={styles.amenityLabel}>{amenity}</span>
              </div>
            ))}
          </div>
        </TabPanel>
      )}

      {active === "reviews" && (
        <TabPanel tabKey="reviews">
          <div className={styles.reviews}>
            {villa.reviews.map((review) => (
              <article key={review.name} className={styles.review}>
                <div className={styles.reviewHead}>
                  <span className={styles.reviewName}>{review.name}</span>
                  <span className={styles.reviewStars}>{review.stars}</span>
                </div>
                <p className={styles.reviewText}>{review.text}</p>
                <span className={styles.reviewDate}>{review.date}</span>
              </article>
            ))}
          </div>
        </TabPanel>
      )}
    </>
  );
}
