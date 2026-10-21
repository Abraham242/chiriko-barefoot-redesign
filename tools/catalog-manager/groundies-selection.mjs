/** Public editorial allowlist. Never add supplier identifiers or pricing here. */
export const groundiesSelection = [
  { title: "Nova GS1 Women", color: "Stone/Zebra", model: "Nova GS1", gender: "women", colorHex: "#b9b3a7" },
  { title: "Nova GS1", color: "Navy/Wax Paper", model: "Nova GS1", gender: "unisex", colorHex: "#24354b" },
  { title: "Nova GO1 Women", color: "Chocolate", model: "Nova GO1", gender: "women", colorHex: "#593b2e" },
  { title: "Nova GO1", color: "Black", model: "Nova GO1", gender: "unisex", colorHex: "#222222" },
  { title: "GROUNDIES® Starlite 2.0", color: "White/Silver/Black", model: "Starlite 2.0", gender: "unisex", colorHex: "#f4f4f2", featured: true },
  { title: "GROUNDIES® Starlite 2.0", color: "Beige/Caramel", model: "Starlite 2.0", gender: "unisex", colorHex: "#d7c7ac" },
  { title: "Panama", color: "Khaki", model: "Panama", gender: "unisex", colorHex: "#8a8767" },
  { title: "Panama", color: "Bordeaux", model: "Panama", gender: "unisex", colorHex: "#722f42" },
  { title: "Panama Soft Women", color: "Caramel", model: "Panama Soft", gender: "women", colorHex: "#af7947" },
  { title: "Active Knit Women", color: "Weiß", colorName: "White", model: "Active Knit", gender: "women", colorHex: "#f4f4f2" },
  { title: "Active Knit Women", color: "Stone/Lime", model: "Active Knit", gender: "women", colorHex: "#b9b3a7" },
  // Explicit public slugs distinguish fits even when the model/color is shared.
  { title: "G-Flex Women", color: "Black", model: "G-Flex", gender: "women", colorHex: "#222222", slug: "groundies-g-flex-women-black" },
  { title: "G-Flex Women", color: "Off-White", model: "G-Flex", gender: "women", colorHex: "#f0ede4", slug: "groundies-g-flex-women-off-white" },
  { title: "G-Flex Men", color: "Off-White", model: "G-Flex", gender: "men", colorHex: "#f0ede4", slug: "groundies-g-flex-men-off-white" },
].map((entry) => Object.freeze({ category: "Zapatillas", ...entry }));

Object.freeze(groundiesSelection);
