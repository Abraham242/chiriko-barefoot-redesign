import zingWhiteBlack1 from "@/assets/zing-white-black-1.jpg";
import zingWhiteBlack2 from "@/assets/zing-white-black-2.jpg";
import zingWhiteBlack3 from "@/assets/zing-white-black-3.jpg";
import zingWhiteBlack4 from "@/assets/zing-white-black-4.jpg";
import zingWhiteBlack5 from "@/assets/zing-white-black-5.jpg";
import zingWhiteBlack6 from "@/assets/zing-white-black-6.jpg";
import zingWhiteBlack7 from "@/assets/zing-white-black-7.jpg";

import zingAllWhite1 from "@/assets/zing-all-white-1.jpg";
import zingAllWhite2 from "@/assets/zing-all-white-2.jpg";
import zingAllWhite3 from "@/assets/zing-all-white-3.jpg";
import zingAllWhite4 from "@/assets/zing-all-white-4.jpg";
import zingAllWhite5 from "@/assets/zing-all-white-5.jpg";
import zingAllWhite6 from "@/assets/zing-all-white-6.jpg";
import zingAllWhite7 from "@/assets/zing-all-white-7.jpg";

import enigmaIvory1 from "@/assets/enigma-ivory-1.png";
import enigmaIvory2 from "@/assets/enigma-ivory-2.jpg";
import enigmaIvory3 from "@/assets/enigma-ivory-3.jpg";
import enigmaIvory4 from "@/assets/enigma-ivory-4.jpg";
import enigmaIvory5 from "@/assets/enigma-ivory-5.jpg";
import enigmaIvory6 from "@/assets/enigma-ivory-6.png";
import enigmaIvory7 from "@/assets/enigma-ivory-7.jpg";

import waveWhiteDarkGreen1 from "@/assets/wave-white-dark-green-1.jpg";
import waveWhiteDarkGreen2 from "@/assets/wave-white-dark-green-2.jpg";
import waveWhiteDarkGreen3 from "@/assets/wave-white-dark-green-3.jpg";

import reboundAllWhite1 from "@/assets/rebound-all-white-1.jpg";
import reboundAllWhite2 from "@/assets/rebound-all-white-2.jpg";
import reboundAllWhite3 from "@/assets/rebound-all-white-3.jpg";
import reboundAllWhite4 from "@/assets/rebound-all-white-4.jpg";
import reboundAllWhite5 from "@/assets/rebound-all-white-5.jpg";
import reboundAllWhite6 from "@/assets/rebound-all-white-6.jpg";
import reboundAllWhite7 from "@/assets/rebound-all-white-7.jpg";

import graceBeige1 from "@/assets/grace-beige-1.png";
import graceBeige2 from "@/assets/grace-beige-2.png";
import graceBeige3 from "@/assets/grace-beige-3.png";
import graceBeige4 from "@/assets/grace-beige-4.png";
import graceBeige5 from "@/assets/grace-beige-5.png";
import graceBeige6 from "@/assets/grace-beige-6.png";
import graceBeige7 from "@/assets/grace-beige-7.png";

export interface Product {
  id: string;
  name: string;
  brand: "Barebarics" | "Be Lenka";
  model: "Zing" | "Wave" | "Rebound" | "Grace 2.0" | "Enigma";
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
    brand: "Barebarics",
    model: "Zing",
    subtitle: "Blanco y negro · zapatilla barefoot para uso diario",
    price: 160,
    currency: "$",
    images: [zingWhiteBlack1, zingWhiteBlack2, zingWhiteBlack3, zingWhiteBlack4, zingWhiteBlack5, zingWhiteBlack6, zingWhiteBlack7],
    tag: "Más vendido",
    features: ["Diseño urbano fácil de combinar", "Drop cero", "Horma anatómica", "Ideal para empezar en barefoot"],
  },
  {
    id: "barebarics-zing-all-white-leather",
    name: "Barebarics Zing Leather",
    brand: "Barebarics",
    model: "Zing",
    subtitle: "Todo blanco · minimalismo limpio",
    price: 160,
    currency: "$",
    images: [zingAllWhite1, zingAllWhite2, zingAllWhite3, zingAllWhite4, zingAllWhite5, zingAllWhite6, zingAllWhite7],
    features: ["Estética limpia", "Drop cero", "Horma anatómica", "Uso diario"],
  },
  {
    id: "barebarics-enigma-ivory",
    name: "Barebarics Enigma",
    brand: "Barebarics",
    model: "Enigma",
    subtitle: "Marfil · diseño barefoot premium",
    price: 160,
    currency: "$",
    images: [enigmaIvory1, enigmaIvory2, enigmaIvory3, enigmaIvory4, enigmaIvory5, enigmaIvory6, enigmaIvory7],
    features: ["Diseño distintivo", "Movimiento natural", "Drop cero"],
  },
  {
    id: "barebarics-wave-white-dark-green",
    name: "Barebarics Wave",
    brand: "Be Lenka",
    model: "Wave",
    subtitle: "Blanco y verde oscuro · consultar disponibilidad",
    price: 0,
    currency: "$",
    images: [waveWhiteDarkGreen1, waveWhiteDarkGreen2, waveWhiteDarkGreen3],
    tag: "Consultar",
    features: ["Disponible bajo pedido", "Diseño dinámico", "Flexible y ligero"],
  },
  {
    id: "be-lenka-rebound-all-white",
    name: "Be Lenka Rebound",
    brand: "Be Lenka",
    model: "Rebound",
    subtitle: "Todo blanco · minimalista",
    price: 104,
    currency: "$",
    images: [reboundAllWhite1, reboundAllWhite2, reboundAllWhite3, reboundAllWhite4, reboundAllWhite5, reboundAllWhite6, reboundAllWhite7],
    tag: "Recomendado",
    features: ["Minimalista", "Cómodo", "Flexible"],
  },
  {
    id: "be-lenka-grace-2-beige",
    name: "Be Lenka Grace 2.0",
    brand: "Be Lenka",
    model: "Grace 2.0",
    subtitle: "Beige · sandalia barefoot",
    price: 92,
    currency: "$",
    images: [graceBeige1, graceBeige2, graceBeige3, graceBeige4, graceBeige5, graceBeige6, graceBeige7],
    tag: "Clima cálido",
    features: ["Ligera", "Elegante", "Perfecta para calor"],
  },
];
