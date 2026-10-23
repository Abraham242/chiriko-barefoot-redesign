/**
 * Compatibility view for the manual gallery commands merged in PR #57.
 * The reviewed, exact-variant metadata in groundies-galleries.mjs is the single
 * source of truth. Never overwrite it with automatically discovered photos.
 */
import { groundiesGalleries } from "./groundies-galleries.mjs";

export const approvedGroundiesGallery = Object.freeze(Object.fromEntries(
  Object.entries(groundiesGalleries).map(([slug, gallery]) => [
    slug, Object.freeze(gallery.secondaryImages.map(({ url }) => url)),
  ]),
));
