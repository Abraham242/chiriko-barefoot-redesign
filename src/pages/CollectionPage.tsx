import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ResponsiveImage from "@/components/ResponsiveImage";
import { products } from "@/data/products";
import type { Product, ProductStatus } from "@/data/productTypes";

type CatalogFilter = "Todos" | "Barebarics" | "Be Lenka" | "Groundies" | "Zapatillas" | "Sandalias";

const catalogFilters: CatalogFilter[] = [
  "Todos",
  "Barebarics",
  "Be Lenka",
  "Groundies",
  "Zapatillas",
  "Sandalias",
];

const statusLabels: Record<ProductStatus, string> = {
  preorder: "Preventa",
  coming_soon: "Próximamente",
  in_stock: "Stock confirmado",
};

const whatsappUrl = `https://wa.me/584221798072?text=${encodeURIComponent(
  "Hola, estoy viendo la colección de Chiriko Studio y quisiera recibir asesoría sobre talla, color y disponibilidad.",
)}`;

const sizesForProduct = (product: Product) => {
  if (product.status === "preorder") return product.consultableSizes;
  if (product.status === "in_stock") return product.sizes;
  return [];
};

const matchesCatalogFilter = (product: Product, filter: CatalogFilter) => {
  if (filter === "Todos") return true;
  if (filter === "Zapatillas" || filter === "Sandalias") return product.category === filter;
  return product.brand === filter;
};

const CollectionPage = () => {
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>("Todos");
  const [activeSize, setActiveSize] = useState<string | null>(null);

  const availableSizes = useMemo(
    () =>
      [...new Set(products.filter((product) => matchesCatalogFilter(product, activeFilter)).flatMap(sizesForProduct))]
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
    [activeFilter],
  );

  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => matchesCatalogFilter(product, activeFilter))
        .filter((product) => !activeSize || sizesForProduct(product).includes(activeSize))
        .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured)),
    [activeFilter, activeSize],
  );

  const selectFilter = (filter: CatalogFilter) => {
    setActiveFilter(filter);
    setActiveSize(null);
  };

  return (
    <>
      <SEO
        title="Zapatos Barefoot Venezuela | Colección Chiriko Studio"
        description="Explora calzado barefoot y respetuoso en Venezuela. Preventa asistida, asesoría de talla por WhatsApp y una curaduría inspirada en marcas referentes del movimiento natural."
        path="/collection"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Colección de calzado barefoot y respetuoso en Venezuela",
            url: "https://chirikostudio.com/collection",
            inLanguage: "es-VE",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Inicio", item: "https://chirikostudio.com/" },
              { "@type": "ListItem", position: 2, name: "Colección", item: "https://chirikostudio.com/collection" },
            ],
          },
        ]}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 lg:pt-32">
          <section className="container mx-auto px-5 py-12 sm:px-6 lg:px-12 lg:py-20">
            <nav aria-label="Migas de pan" className="mb-9 flex items-center gap-2 font-body text-xs text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-foreground">Inicio</Link>
              <span aria-hidden="true">/</span>
              <span className="text-foreground">Colección</span>
            </nav>

            <header className="max-w-3xl">
              <p className="mb-4 font-body text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Colección Chiriko</p>
              <h1 className="font-heading text-4xl font-light leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
                Calzado barefoot y respetuoso
              </h1>
              <p className="mt-6 max-w-2xl font-body text-sm leading-7 text-muted-foreground sm:text-base">
                Modelos seleccionados en preventa asistida para Venezuela. Te ayudamos a confirmar talla, color y disponibilidad por WhatsApp.
              </p>
            </header>

            <div className="mt-12 border-y border-foreground/10 py-5 lg:mt-16">
              <div className="flex flex-wrap gap-2" aria-label="Filtrar por marca o categoría">
                {catalogFilters.map((filter) => {
                  const isGroundies = filter === "Groundies";
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => selectFilter(filter)}
                      disabled={isGroundies}
                      aria-pressed={isActive}
                      className={`rounded-full px-4 py-2.5 font-body text-xs transition-colors sm:px-5 ${
                        isActive
                          ? "bg-foreground text-background"
                          : isGroundies
                            ? "cursor-not-allowed bg-foreground/[0.03] text-muted-foreground/70"
                            : "bg-foreground/[0.05] text-foreground hover:bg-foreground/10"
                      }`}
                    >
                      {filter}{isGroundies && <span className="ml-1.5 text-[9px] uppercase tracking-wider">Próximamente</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="py-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="font-body text-sm font-medium text-foreground">Tallas consultables</h2>
                <p className="font-body text-xs leading-5 text-muted-foreground">Las tallas se confirman por WhatsApp antes de reservar.</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setActiveSize(activeSize === size ? null : size)}
                    aria-pressed={activeSize === size}
                    className={`min-w-11 rounded-sm px-3 py-2 font-body text-xs transition-colors ${
                      activeSize === size
                        ? "bg-foreground text-background"
                        : "bg-white text-foreground hover:bg-foreground/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-5 font-body text-xs text-muted-foreground">
              <p>
                {filteredProducts.length} {filteredProducts.length === 1 ? "modelo" : "modelos"}
                {(activeFilter !== "Todos" || activeSize) && (
                  <span className="ml-2 text-foreground">· {activeFilter !== "Todos" ? activeFilter : "Todos"}{activeSize ? ` · Talla ${activeSize}` : ""}</span>
                )}
              </p>
              <p>Ordenar: <span className="text-foreground">destacados</span></p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="group min-w-0">
                    <Link to={`/product/${product.slug}`} className="block">
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f1ec] sm:aspect-square">
                        <div className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5">
                          <span className="bg-background/90 px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.14em] text-foreground backdrop-blur-sm">
                            {statusLabels[product.status]}
                          </span>
                          {product.isNew && <span className="bg-foreground px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.14em] text-background">Nuevo</span>}
                          {product.isFeatured && <span className="bg-background/90 px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.14em] text-foreground backdrop-blur-sm">Destacado</span>}
                        </div>
                        <ResponsiveImage
                          src={product.images[0]}
                          alt={`${product.name} en ${product.colorName}`}
                          widths={[420, 640, 900]}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          width={900}
                          height={900}
                          loading="lazy"
                          className="h-full w-full object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:p-6"
                        />
                      </div>

                      <div className="mt-5">
                        <p className="font-body text-[10px] uppercase tracking-[0.19em] text-muted-foreground">{product.brand}</p>
                        <div className="mt-1.5 flex items-start justify-between gap-4">
                          <h2 className="font-body text-base font-medium text-foreground sm:text-[17px]">{product.name}</h2>
                          <p className="shrink-0 font-body text-sm font-medium text-foreground">
                            {product.price > 0 ? `${product.currency}${product.price}` : "Consultar disponibilidad"}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center gap-2 font-body text-xs text-muted-foreground">
                          <span className="h-3.5 w-3.5 rounded-full border border-foreground/10" style={{ backgroundColor: product.colorHex }} aria-hidden="true" />
                          <span>{product.colorName}</span>
                        </div>
                        <span className="mt-5 inline-flex border-b border-foreground pb-1 font-body text-xs font-medium text-foreground">Ver modelo</span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center bg-white px-6 text-center">
                <h2 className="font-heading text-2xl font-light text-foreground">No encontramos modelos con esos filtros.</h2>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 border-b border-foreground pb-1 font-body text-sm font-medium text-foreground">
                  Hablar por WhatsApp
                </a>
              </div>
            )}

            <aside className="mt-20 bg-[#ded9ce] px-6 py-12 sm:px-10 lg:mt-28 lg:flex lg:items-end lg:justify-between lg:px-14 lg:py-14">
              <div className="max-w-2xl">
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Asesoría personal</p>
                <h2 className="mt-4 font-heading text-3xl font-light text-foreground sm:text-4xl">No compres a ciegas</h2>
                <p className="mt-4 font-body text-sm leading-7 text-muted-foreground sm:text-base">
                  Confirmamos contigo la talla, medida del pie, color y disponibilidad antes de reservar.
                </p>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex bg-foreground px-6 py-3.5 font-body text-xs font-medium text-background transition-opacity hover:opacity-85 lg:mt-0">
                Recibir asesoría por WhatsApp
              </a>
            </aside>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default CollectionPage;
