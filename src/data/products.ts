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
    subtitle: "Slip-on barefoot para uso diario",
    price: 89,
    currency: "$",
    image: product1,
    tag: "Más vendido",
    features: [
      "Suela flexible que se adapta a tu movimiento",
      "Drop cero para una pisada natural",
      "Horma anatómica que respeta tu pie",
      "Material transpirable para uso diario",
    ],
  },
  {
    id: "urban-knit",
    name: "Urban Knit",
    subtitle: "Sneaker barefoot ligero para ciudad",
    price: 99,
    currency: "$",
    image: product2,
    features: [
      "Tejido ultra ligero y adaptable",
      "Drop cero para alineación natural",
      "Horma anatómica con espacio real para los dedos",
      "Suela con agarre antideslizante",
    ],
  },
  {
    id: "bosque-trail",
    name: "Bosque Trail",
    subtitle: "Barefoot para caminos y naturaleza",
    price: 109,
    currency: "$",
    image: product3,
    tag: "Nuevo",
    features: [
      "Suela diseñada para terrenos irregulares",
      "Drop cero para estabilidad natural",
      "Horma anatómica para mayor control",
      "Material resistente al agua",
    ],
  },
  {
    id: "sol-sandal",
    name: "Sol Sandal",
    subtitle: "Sandalia barefoot minimalista",
    price: 69,
    currency: "$",
    image: product4,
    features: [
      "Suela ultra delgada para máxima conexión",
      "Drop cero para movimiento natural",
      "Diseño abierto y ligero",
      "Correas de secado rápido",
    ],
  },
];
