import { useState } from "react";
import SEO from "@/components/SEO";
import { Navigate, useParams, Link } from "react-router-dom";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  MessageCircle,
  Ruler,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductImageGallery from "@/components/ProductImageGallery";
import { products } from "@/data/products";
import { getProductVariants } from "@/data/catalogHelpers";

const phoneNumber = "584221798072";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const variants = getProductVariants(product);
  const displaySizes =
    product.status === "preorder"
      ? product.consultableSizes
      : product.sizes;
  const isPreorder = product.status === "preorder";
  const statusBadge = isPreorder ? "Preventa asistida" : "Stock confirmado";
  const statusCopy = isPreorder
    ? "Entrega estimada 3–4 semanas"
    : "Disponibilidad sujeta a confirmación por WhatsApp";
  const whatsappIntent = isPreorder
    ? "Quiero reservar este modelo en preventa."
    : "Quiero consultar este modelo.";

  const color = product.colorName;
  const whatsappMessage = `Hola, estoy viendo ${product.name} en la web de Chiriko 👋

${whatsappIntent}
Modelo: ${product.name}
Color disponible: ${color || "[confirmar]"}${
    selectedSize ? `\nTalla habitual: ${selectedSize}` : "\nTalla habitual: [por indicar]"
  }
Medida de mi pie en centímetros: [cm]
Preferencia de ajuste: [más preciso / más espacio]

¿Me ayudan a confirmar modelo, color y talla por WhatsApp?${
    isPreorder
      ? " Entiendo que la entrega estimada es de 3–4 semanas desde la confirmación de la reserva."
      : ""
  }`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const seoTitle = `${product.name} en Venezuela | Chiriko Studio`;
  const seoDescription = `${product.name} de ${product.brand} en Venezuela. Calzado barefoot y respetuoso con talla y disponibilidad confirmadas por WhatsApp.`;
  const productUrl = `https://chirikostudio.com/product/${product.slug}`;
  const imageUrl = product.images[0].startsWith("http")
    ? product.images[0]
    : `https://chirikostudio.com${product.images[0]}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    category: "Calzado barefoot y respetuoso",
    description: seoDescription,
    image: product.images.map((image) =>
      image.startsWith("http") ? image : `https://chirikostudio.com${image}`
    ),
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      ...(product.price > 0 && { price: String(product.price) }),
      availability: isPreorder ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: productUrl,
      seller: {
        "@type": "Organization",
        name: "Chiriko Studio",
        url: "https://chirikostudio.com",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://chirikostudio.com/" },
      { "@type": "ListItem", position: 2, name: "Colección", item: "https://chirikostudio.com/collection" },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
    ],
  };

  const benefits = isPreorder
    ? [
        "Confirmamos talla por WhatsApp",
        "Reserva con 50%",
        "Entrega estimada 3–4 semanas",
        "Acompañamiento antes de reservar",
      ]
    : [
        "Confirmamos talla por WhatsApp",
        "Disponibilidad sujeta a confirmación",
        "Atención personalizada",
        "Acompañamiento antes de elegir",
      ];

  const information = [
    {
      title: "Descripción",
      content: `${product.subtitle}. Diseñado para ofrecer una sensación más natural, con espacio para los dedos y una estructura flexible.`,
    },
    {
      title: "Características barefoot",
      content: product.features.join(" · "),
    },
    {
      title: isPreorder ? "Tallas y preventa" : "Tallas y disponibilidad",
      content: isPreorder
        ? "Antes de reservar, confirmamos contigo la talla y la medida del pie por WhatsApp. La reserva se realiza con el 50% una vez revisados el modelo, color y disponibilidad."
        : "Antes de confirmar, revisamos contigo por WhatsApp la talla, la medida del pie, el color y la disponibilidad.",
    },
    {
      title: "Envíos, cambios y devoluciones",
      content: "La entrega es estimada y puede variar según logística, proveedor y aduana. Consulta nuestras políticas para conocer las condiciones de reserva, cambios y devoluciones.",
    },
  ];
  const processSteps = isPreorder
    ? ["Preventa asistida", "Talla confirmada contigo", "Entrega estimada 3–4 semanas", "Atención por WhatsApp"]
    : ["Stock confirmado", "Talla confirmada contigo", "Disponibilidad por confirmar", "Atención por WhatsApp"];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/product/${product.id}`}
        image={imageUrl}
        ogType="product"
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />

      <div className="min-h-screen overflow-x-hidden bg-background pb-24 md:pb-0">
        <Navbar />
        <main className="pt-20 lg:pt-24">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-12 lg:py-12">
            <Link
              to="/collection"
              className="mb-7 inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground lg:mb-10"
            >
              <ChevronLeft size={16} />
              Volver a la colección
            </Link>

            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)] lg:gap-16 xl:gap-24">
              <ProductImageGallery images={product.images} productName={product.name} />

              <section className="min-w-0 lg:sticky lg:top-28" aria-labelledby="product-title">
                <p className="mb-3 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {product.brand} · Calzado barefoot
                </p>
                <h1 id="product-title" className="font-heading text-4xl font-light leading-tight text-foreground sm:text-5xl">
                  {product.name}
                </h1>
                <p className="mt-3 font-body text-base leading-relaxed text-muted-foreground">
                  {product.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-secondary px-3 py-1.5 font-body text-xs font-medium uppercase tracking-[0.12em] text-foreground">
                    {statusBadge}
                  </span>
                  <span className="font-body text-sm text-muted-foreground">{statusCopy}</span>
                </div>

                <p className="mt-6 font-heading text-3xl text-foreground">
                  {product.price > 0 ? `${product.currency}${product.price}` : "Consultar disponibilidad"}
                </p>

                {variants.length > 1 ? (
                  <div className="mt-7 border-t border-border/70 pt-6">
                    <p className="font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Color <span className="normal-case tracking-normal text-foreground">· {color}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3" aria-label="Colores disponibles">
                      {variants.map((variant) => {
                        const isCurrent = variant.id === product.id;
                        return (
                          <Link
                            key={variant.id}
                            to={`/product/${variant.slug}`}
                            aria-current={isCurrent ? "page" : undefined}
                            aria-label={`${variant.colorName}${isCurrent ? ", color seleccionado" : ""}`}
                            className={`flex min-h-11 items-center gap-2 rounded-sm border px-3 py-2 font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 ${
                              isCurrent ? "border-foreground bg-secondary/60 text-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                            }`}
                          >
                            <span className={`h-5 w-5 rounded-full border ${isCurrent ? "ring-2 ring-foreground ring-offset-2" : "border-foreground/20"}`} style={{ backgroundColor: variant.colorHex }} aria-hidden="true" />
                            {variant.colorName}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : color ? (
                  <div className="mt-7 border-t border-border/70 pt-6">
                    <p className="font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">Color</p>
                    <p className="mt-2 font-body text-sm text-foreground">{color}</p>
                  </div>
                ) : null}

                <div className="mt-7">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">Talla habitual</p>
                    <Link
                      to="/size-guide"
                      className="inline-flex items-center gap-2 font-body text-sm text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
                    >
                      <Ruler size={15} /> Ver guía de tallas
                    </Link>
                  </div>
                  <div className="grid grid-cols-5 gap-2 sm:gap-3">
                    {displaySizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        aria-pressed={selectedSize === size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-11 rounded-sm border font-body text-sm transition-colors sm:h-12 ${
                          selectedSize === size
                            ? "border-foreground bg-foreground text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                    Usamos tu talla habitual como referencia y la confirmamos contigo por WhatsApp antes de reservar.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-sm bg-foreground px-5 font-body text-sm uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <MessageCircle size={18} /> {isPreorder ? "Reservar" : "Consultar"} por WhatsApp
                </a>
                <p className="mt-3 font-body text-xs leading-relaxed text-muted-foreground">
                  No compres a ciegas: revisamos tu talla, medida del pie y disponibilidad antes de confirmar.
                </p>

                <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-3 rounded-sm bg-secondary/40 p-5 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2.5">
                      <Check size={15} className="mt-0.5 shrink-0 text-foreground" />
                      <span className="font-body text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/politicas"
                  className="mt-5 inline-flex font-body text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Ver políticas de reserva, cambios y devoluciones
                </Link>
              </section>
            </div>

            <section className="mt-16 border-t border-border/70 lg:mt-24" aria-label="Información del producto">
              {information.map((item, index) => (
                <details key={item.title} className="group border-b border-border/70" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-heading text-xl font-light text-foreground marker:content-none">
                    {item.title}
                    <ChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="max-w-3xl pb-7 font-body text-sm leading-7 text-muted-foreground sm:text-base">
                    {item.content}
                  </p>
                </details>
              ))}
            </section>

            <section className="my-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-border/70 sm:grid-cols-4 lg:my-16" aria-label={isPreorder ? "Cómo funciona la preventa" : "Cómo confirmamos la disponibilidad"}>
              {processSteps.map((item) => (
                <div key={item} className="flex min-h-24 items-center justify-center bg-secondary/40 px-4 py-6 text-center font-body text-xs uppercase leading-relaxed tracking-[0.12em] text-foreground sm:text-sm">
                  {item}
                </div>
              ))}
            </section>
          </div>
        </main>
        <Footer />
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-sm bg-foreground px-5 font-body text-sm uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle size={18} /> {isPreorder ? "Reservar" : "Consultar"} por WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
