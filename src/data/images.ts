/**
 * Project-local photography. Keeping these assets in /public makes the site
 * independent from third-party image CDNs, including during local previews.
 */
export const images = {
  north: "/images/villa-north.jpg",
  coast: "/images/villa-coast.jpg",
  mountain: "/images/villa-mountain.jpg",
} as const;

const coastalPhotoIds = new Set([
  "1439066615861-d1af74d74000",
  "1499793983690-e29da59ef1c2",
  "1507525428034-b723cf961d3e",
  "1518684079-3c830dcef090",
  "1600596542815-ffad4c1539a9",
]);

const mountainPhotoIds = new Set([
  "1449158743715-0a90ebb6d2d8",
  "1506905925346-21bda4d32df4",
]);

export function propertyImage(photoId: string): string {
  if (coastalPhotoIds.has(photoId)) return images.coast;
  if (mountainPhotoIds.has(photoId)) return images.mountain;
  return images.north;
}
