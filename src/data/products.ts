import zingWhiteBlack1 from "@/assets/products/barebarics/zing/white-black/zing-white-black-1.jpg";
import zingWhiteBlack2 from "@/assets/products/barebarics/zing/white-black/zing-white-black-2.jpg";
import zingWhiteBlack3 from "@/assets/products/barebarics/zing/white-black/zing-white-black-3.jpg";
import zingWhiteBlack4 from "@/assets/products/barebarics/zing/white-black/zing-white-black-4.jpg";
import zingWhiteBlack5 from "@/assets/products/barebarics/zing/white-black/zing-white-black-5.jpg";
import zingWhiteBlack6 from "@/assets/products/barebarics/zing/white-black/zing-white-black-6.jpg";
import zingWhiteBlack7 from "@/assets/products/barebarics/zing/white-black/zing-white-black-7.jpg";

import zingAllWhite1 from "@/assets/products/barebarics/zing/all-white/zing-all-white-1.jpg";
import zingAllWhite2 from "@/assets/products/barebarics/zing/all-white/zing-all-white-2.jpg";
import zingAllWhite3 from "@/assets/products/barebarics/zing/all-white/zing-all-white-3.jpg";
import zingAllWhite4 from "@/assets/products/barebarics/zing/all-white/zing-all-white-4.jpg";
import zingAllWhite5 from "@/assets/products/barebarics/zing/all-white/zing-all-white-5.jpg";
import zingAllWhite6 from "@/assets/products/barebarics/zing/all-white/zing-all-white-6.jpg";
import zingAllWhite7 from "@/assets/products/barebarics/zing/all-white/zing-all-white-7.jpg";

import enigmaIvory1 from "@/assets/products/barebarics/enigma/ivory/enigma-ivory-1.png";
import enigmaIvory2 from "@/assets/products/barebarics/enigma/ivory/enigma-ivory-2.jpg";
import enigmaIvory3 from "@/assets/products/barebarics/enigma/ivory/enigma-ivory-3.jpg";
import enigmaIvory4 from "@/assets/products/barebarics/enigma/ivory/enigma-ivory-4.jpg";
import enigmaIvory5 from "@/assets/products/barebarics/enigma/ivory/enigma-ivory-5.jpg";
import enigmaIvory6 from "@/assets/products/barebarics/enigma/ivory/enigma-ivory-6.png";
import enigmaIvory7 from "@/assets/products/barebarics/enigma/ivory/enigma-ivory-7.jpg";

import waveWhiteDarkGreen1 from "@/assets/products/be-lenka/wave/white-dark-green/wave-white-dark-green-1.jpg";
import waveWhiteDarkGreen2 from "@/assets/products/be-lenka/wave/white-dark-green/wave-white-dark-green-2.jpg";
import waveWhiteDarkGreen3 from "@/assets/products/be-lenka/wave/white-dark-green/wave-white-dark-green-3.jpg";

import reboundAllWhite1 from "@/assets/products/barebarics/rebound/all-white/rebound-all-white-1.jpg";
import reboundAllWhite2 from "@/assets/products/barebarics/rebound/all-white/rebound-all-white-2.jpg";
import reboundAllWhite3 from "@/assets/products/barebarics/rebound/all-white/rebound-all-white-3.jpg";
import reboundAllWhite4 from "@/assets/products/barebarics/rebound/all-white/rebound-all-white-4.jpg";
import reboundAllWhite5 from "@/assets/products/barebarics/rebound/all-white/rebound-all-white-5.jpg";
import reboundAllWhite6 from "@/assets/products/barebarics/rebound/all-white/rebound-all-white-6.jpg";
import reboundAllWhite7 from "@/assets/products/barebarics/rebound/all-white/rebound-all-white-7.jpg";

import graceBeige1 from "@/assets/products/be-lenka/grace-2/beige/grace-beige-1.png";
import graceBeige2 from "@/assets/products/be-lenka/grace-2/beige/grace-beige-2.png";
import graceBeige3 from "@/assets/products/be-lenka/grace-2/beige/grace-beige-3.png";
import graceBeige4 from "@/assets/products/be-lenka/grace-2/beige/grace-beige-4.png";
import graceBeige5 from "@/assets/products/be-lenka/grace-2/beige/grace-beige-5.png";
import graceBeige6 from "@/assets/products/be-lenka/grace-2/beige/grace-beige-6.png";
import graceBeige7 from "@/assets/products/be-lenka/grace-2/beige/grace-beige-7.png";

import type { Product } from "./productTypes";

export type { Product } from "./productTypes";

export const products: Product[] = [
  {
    id: "barebarics-zing-white-black",
    slug: "barebarics-zing-white-black",
    name: "Barebarics Zing",
    brand: "Barebarics",
    parentBrand: "Be Lenka",
    model: "Zing",
    subtitle: "Blanco y negro · zapatilla barefoot para uso diario",
    gender: "unisex", category: "Zapatillas", colorName: "Blanco / Negro", colorFamily: "Blanco", colorHex: "#F4F2ED",
    price: 160,
    currency: "$",
    status: "preorder", consultableSizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], sizes: [], tags: ["urbano", "uso diario"], isFeatured: true, isNew: false,
    seoTitle: "Barebarics Zing White Black | Chiriko Studio", seoDescription: "Barebarics Zing en blanco y negro. Preventa asistida con confirmación de talla por WhatsApp y entrega estimada de 3–4 semanas.",
    images: [zingWhiteBlack1, zingWhiteBlack2, zingWhiteBlack3, zingWhiteBlack4, zingWhiteBlack5, zingWhiteBlack6, zingWhiteBlack7],
    tag: "Más vendido",
    features: ["Diseño urbano fácil de combinar", "Drop cero", "Horma anatómica", "Ideal para empezar en barefoot"],
  },
  {
    id: "barebarics-zing-all-white-leather",
    slug: "barebarics-zing-all-white-leather",
    name: "Barebarics Zing Leather",
    brand: "Barebarics",
    parentBrand: "Be Lenka",
    model: "Zing",
    subtitle: "Todo blanco · minimalismo limpio",
    gender: "unisex", category: "Zapatillas", colorName: "Todo blanco", colorFamily: "Blanco", colorHex: "#F7F7F2",
    price: 160,
    currency: "$",
    status: "preorder", consultableSizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], sizes: [], tags: ["cuero", "minimalista"], isFeatured: true, isNew: false,
    seoTitle: "Barebarics Zing Leather All White | Chiriko Studio", seoDescription: "Barebarics Zing Leather en blanco. Preventa asistida con confirmación de talla por WhatsApp y entrega estimada de 3–4 semanas.",
    images: [zingAllWhite1, zingAllWhite2, zingAllWhite3, zingAllWhite4, zingAllWhite5, zingAllWhite6, zingAllWhite7],
    features: ["Estética limpia", "Drop cero", "Horma anatómica", "Uso diario"],
  },
  {
    id: "barebarics-enigma-ivory",
    slug: "barebarics-enigma-ivory",
    name: "Barebarics Enigma",
    brand: "Barebarics",
    parentBrand: "Be Lenka",
    model: "Enigma",
    subtitle: "Marfil · diseño barefoot premium",
    gender: "unisex", category: "Zapatillas", colorName: "Marfil", colorFamily: "Crema", colorHex: "#E8E0D0",
    price: 160,
    currency: "$",
    status: "preorder", consultableSizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], sizes: [], tags: ["premium", "urbano"], isFeatured: false, isNew: true,
    seoTitle: "Barebarics Enigma Ivory | Chiriko Studio", seoDescription: "Barebarics Enigma en marfil. Preventa asistida con confirmación de talla por WhatsApp y entrega estimada de 3–4 semanas.",
    images: [enigmaIvory1, enigmaIvory2, enigmaIvory3, enigmaIvory4, enigmaIvory5, enigmaIvory6, enigmaIvory7],
    features: ["Diseño distintivo", "Movimiento natural", "Drop cero"],
  },
  {
    id: "barebarics-wave-white-dark-green",
    slug: "barebarics-wave-white-dark-green",
    name: "Barebarics Wave",
    brand: "Barebarics",
    parentBrand: "Be Lenka",
    model: "Wave",
    subtitle: "Blanco y verde oscuro · consultar disponibilidad",
    gender: "unisex", category: "Zapatillas", colorName: "Blanco / Verde oscuro", colorFamily: "Blanco", colorHex: "#F3F1E9",
    price: 0,
    currency: "$",
    status: "coming_soon", consultableSizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], sizes: [], tags: ["ligero", "flexible"], isFeatured: false, isNew: true,
    seoTitle: "Barebarics Wave White Dark Green | Chiriko Studio", seoDescription: "Barebarics Wave en blanco y verde oscuro. Consulta disponibilidad y talla por WhatsApp.",
    images: [waveWhiteDarkGreen1, waveWhiteDarkGreen2, waveWhiteDarkGreen3],
    tag: "Consultar",
    features: ["Disponible bajo pedido", "Diseño dinámico", "Flexible y ligero"],
  },
  {
    id: "be-lenka-rebound-all-white",
    slug: "be-lenka-rebound-all-white",
    name: "Be Lenka Rebound",
    brand: "Be Lenka",
    model: "Rebound",
    subtitle: "Todo blanco · minimalista",
    gender: "unisex", category: "Zapatillas", colorName: "Todo blanco", colorFamily: "Blanco", colorHex: "#F7F7F2",
    price: 104,
    currency: "$",
    status: "preorder", consultableSizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], sizes: [], tags: ["minimalista", "uso diario"], isFeatured: true, isNew: false,
    seoTitle: "Be Lenka Rebound All White | Chiriko Studio", seoDescription: "Be Lenka Rebound en blanco. Preventa asistida con confirmación de talla por WhatsApp y entrega estimada de 3–4 semanas.",
    images: [reboundAllWhite1, reboundAllWhite2, reboundAllWhite3, reboundAllWhite4, reboundAllWhite5, reboundAllWhite6, reboundAllWhite7],
    tag: "Recomendado",
    features: ["Minimalista", "Cómodo", "Flexible"],
  },
  {
    id: "be-lenka-grace-2-beige",
    slug: "be-lenka-grace-2-beige",
    name: "Be Lenka Grace 2.0",
    brand: "Be Lenka",
    model: "Grace 2.0",
    subtitle: "Beige · sandalia barefoot",
    gender: "women", category: "Sandalias", colorName: "Beige", colorFamily: "Beige", colorHex: "#D5C2A5",
    price: 92,
    currency: "$",
    status: "preorder", consultableSizes: ["36", "37", "38", "39", "40", "41", "42", "43"], sizes: [], tags: ["clima cálido", "ligero"], isFeatured: false, isNew: false,
    seoTitle: "Be Lenka Grace 2.0 Beige | Chiriko Studio", seoDescription: "Be Lenka Grace 2.0 en beige. Preventa asistida con confirmación de talla por WhatsApp y entrega estimada de 3–4 semanas.",
    images: [graceBeige1, graceBeige2, graceBeige3, graceBeige4, graceBeige5, graceBeige6, graceBeige7],
    tag: "Clima cálido",
    features: ["Ligera", "Elegante", "Perfecta para calor"],
  },
];
