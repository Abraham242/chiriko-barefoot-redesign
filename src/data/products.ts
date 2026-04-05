import zingWhiteBlack1 from "@/assets/zing-white-black-1.jpg";
import zingWhiteBlack2 from "@/assets/zing-white-black-2.jpg";
import zingWhiteBlack3 from "@/assets/zing-white-black-3.jpg";

import zingAllWhite1 from "@/assets/zing-all-white-1.jpg";
import zingAllWhite2 from "@/assets/zing-all-white-2.jpg";
import zingAllWhite3 from "@/assets/zing-all-white-3.jpg";

import enigmaIvory1 from "@/assets/enigma-ivory-1.jpg";
import enigmaIvory2 from "@/assets/enigma-ivory-2.jpg";
import enigmaIvory3 from "@/assets/enigma-ivory-3.jpg";

import waveWhiteDarkGreen1 from "@/assets/wave-white-dark-green-1.jpg";
import waveWhiteDarkGreen2 from "@/assets/wave-white-dark-green-2.jpg";
import waveWhiteDarkGreen3 from "@/assets/wave-white-dark-green-3.jpg";

import reboundAllWhite1 from "@/assets/rebound-all-white-1.jpg";
import reboundAllWhite2 from "@/assets/rebound-all-white-2.jpg";
import reboundAllWhite3 from "@/assets/rebound-all-white-3.jpg";

import graceBeige1 from "@/assets/grace-beige-1.png";
import graceBeige2 from "@/assets/grace-beige-2.png";
import graceBeige3 from "@/assets/grace-beige-3.png";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  images: string[];
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
    images: [zingWhiteBlack1, zingWhiteBlack2, zingWhiteBlack3],
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
    images: [zingAllWhite1, zingAllWhite2, zingAllWhite3],
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
    images: [enigmaIvory1, enigmaIvory2, enigmaIvory3],
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
    images: [waveWhiteDarkGreen1, waveWhiteDarkGreen2, waveWhiteDarkGreen3],
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
    images: [reboundAllWhite1, reboundAllWhite2, reboundAllWhite3],
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
    images: [graceBeige1, graceBeige2, graceBeige3],
    tag: "Clima cálido",
    features: [
      "Perfecta para clima venezolano",
      "Ligera y cómoda",
      "Movimiento natural",
      "Diseño femenino y elegante",
    ],
  },
];
