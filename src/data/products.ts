import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  image: string;
  tag?: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: "terra-slip",
    name: "Terra Slip",
    subtitle: "Everyday barefoot slip-on",
    price: 89,
    currency: "$",
    image: product1,
    tag: "Best Seller",
    features: ["Flexible sole", "Zero drop", "Wide toe box", "Breathable mesh"],
  },
  {
    id: "urban-knit",
    name: "Urban Knit",
    subtitle: "City-ready knit sneaker",
    price: 99,
    currency: "$",
    image: product2,
    features: ["Ultra-light knit", "Zero drop", "Wide toe box", "Anti-slip grip"],
  },
  {
    id: "bosque-trail",
    name: "Bosque Trail",
    subtitle: "Outdoor trail runner",
    price: 109,
    currency: "$",
    image: product3,
    tag: "New",
    features: ["Trail-ready sole", "Zero drop", "Wide toe box", "Water-resistant"],
  },
  {
    id: "sol-sandal",
    name: "Sol Sandal",
    subtitle: "Minimalist barefoot sandal",
    price: 69,
    currency: "$",
    image: product4,
    features: ["Ultra-thin sole", "Zero drop", "Open toe design", "Quick-dry straps"],
  },
];
