import zingWhiteBlack from "@/assets/zing-white-black.jpg";
import zingAllWhite from "@/assets/zing-all-white.jpg";
import enigmaIvory from "@/assets/enigma-ivory.jpg";
import waveWhiteDarkGreen from "@/assets/wave-white-dark-green.jpg";
import reboundAllWhite from "@/assets/rebound-all-white.jpg";
import graceBeige from "@/assets/grace-beige.jpg";

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
    id: "barebarics-zing-white-black",
    name: "Barebarics Zing",
    subtitle: "White & Black · sneaker barefoot para uso diario",
    price: 99.9,
    currency: "€",
    image: zingWhiteBlack,
    tag: "Más vendido",
    features: [
      "Diseño urbano fácil de combinar",
      "Drop cero para una pisada natural",
      "Horma anatómica con espacio real para los dedos",
      "Ideal para empezar en barefoot",
    ],
  },
  {
    id: "barebarics-zing-all-white-leather",
    name: "Barebarics Zing Leather",
    subtitle: "All White · minimalismo limpio y premium",
    price: 99.9,
    currency: "€",
    image: zingAllWhite,
    features: [
      "Estética totalmente blanca",
      "Diseño barefoot para uso diario",
      "Horma anatómica",
      "Perfecto para transición a barefoot",
    ],
  },
  {
    id: "barebarics-enigma-ivory",
    name: "Barebarics Enigma",
    subtitle: "Ivory · diseño barefoot con carácter",
    price: 139.9,
    currency: "€",
    image: enigmaIvory,
    features: [
      "Look más distintivo",
      "Drop cero",
      "Movimiento natural",
      "Muy buena opción para quien ya conoce barefoot",
    ],
  },
  {
    id: "barebarics-wave-white-dark-green",
    name: "Barebarics Wave",
    subtitle: "White & Dark Green · deportivo, fresco y urbano",
    price: 139.9,
    currency: "€",
    image: waveWhiteDarkGreen,
    features: [
      "Diseño dinámico",
      "Horma anatómica",
      "Flexible y ligero",
      "Barefoot con look moderno",
    ],
  },
  {
    id: "be-lenka-rebound-all-white",
    name: "Be Lenka Rebound",
    subtitle: "All White · sneaker barefoot limpio y versátil",
    price: 119.9,
    currency: "€",
    image: reboundAllWhite,
    features: [
      "Estilo minimalista",
      "Muy combinable",
      "Flexibilidad barefoot",
      "Ideal para uso diario",
    ],
  },
  {
    id: "be-lenka-grace-2-beige",
    name: "Be Lenka Grace 2.0",
    subtitle: "Beige · sandalia barefoot elegante",
    price: 119.9,
    currency: "€",
    image: graceBeige,
    tag: "Clima cálido",
    features: [
      "Perfecta para clima venezolano",
      "Ligera y cómoda",
      "Movimiento natural",
      "Diseño femenino y elegante",
    ],
  },
];
