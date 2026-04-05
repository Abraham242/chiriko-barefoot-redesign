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
    price: 160,
    currency: "$",
    images: [zingWhiteBlack1, zingWhiteBlack2, zingWhiteBlack3],
    tag: "Más vendido",
    features: [
      "Diseño urbano fácil de combinar",
      "Drop cero",
      "Horma anatómica",
      "Ideal para empezar en barefoot",
    ],
  },
  {
    id: "barebarics-zing-all-white-leather",
    name: "Barebarics Zing Leather",
    subtitle: "All White · minimalismo limpio",
    price: 160,
    currency: "$",
    images: [zingAllWhite1, zingAllWhite2, zingAllWhite3],
    features: [
      "Estética limpia",
      "Drop cero",
      "Horma anatómica",
      "Uso diario",
    ],
  },
  {
    id: "barebarics-enigma-ivory",
    name: "Barebarics Enigma",
    subtitle: "Ivory · diseño barefoot premium",
    price: 160,
    currency: "$",
    images: [enigmaIvory1, enigmaIvory2, enigmaIvory3],
    features: [
      "Diseño distintivo",
      "Movimiento natural",
      "Drop cero",
    ],
  },
  {
    id: "barebarics-wave-white-dark-green",
    name: "Barebarics Wave",
    subtitle: "White & Dark Green · consultar disponibilidad",
    price: 0,
    currency: "$",
    images: [
      waveWhiteDarkGreen1,
      waveWhiteDarkGreen2,
      waveWhiteDarkGreen3,
    ],
    tag: "Consultar",
    features: [
      "Disponible bajo pedido",
      "Diseño dinámico",
      "Flexible y ligero",
    ],
  },
  {
    id: "be-lenka-rebound-all-white",
    name: "Be Lenka Rebound",
    subtitle: "All White · minimalista",
    price: 104,
    currency: "$",
    images: [
      reboundAllWhite1,
      reboundAllWhite2,
      reboundAllWhite3,
    ],
    tag: "Recomendado",
    features: [
      "Minimalista",
      "Cómodo",
      "Flexible",
    ],
  },
  {
    id: "be-lenka-grace-2-beige",
    name: "Be Lenka Grace 2.0",
    subtitle: "Beige · sandalia barefoot",
    price: 92,
    currency: "$",
    images: [graceBeige1, graceBeige2, graceBeige3],
    tag: "Clima cálido",
    features: [
      "Ligera",
      "Elegante",
      "Perfecta para calor",
    ],
  },
];
