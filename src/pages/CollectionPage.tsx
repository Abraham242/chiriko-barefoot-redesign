import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ResponsiveImage from "@/components/ResponsiveImage";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

const isZingProduct = (product: Product) => {
  const haystack = `${product.id} ${product.name}`.toLowerCase();
  return haystack.includes("zing");
};

const CollectionPage = () => {
  const zingProducts = useMemo(() => products.filter(isZingProduct), []);
  const [activeZingId, setActiveZingId] = useState(zingProducts[0]?.id ?? "");

  const activeZingProduct =
    zingProducts.find((product) => product.id === activeZingId) ?? zingProducts[0];

  const nonZingProducts = useMemo(
    () => products.filter((product) => !isZingProduct(product)),
    []
  );

  return (
    <>
      <SEO
        title="Colección"
        description="Descubre todos los modelos barefoot y de transición de Chiriko Studio en una colección premium con asesoría personalizada por preventa."
        path="/collection"
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-28 lg:pt-36">
          <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="mb-12 lg:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-4">
                  Colección
                </h1>
                <p className="font-body text-sm tracking-wide text-muted-foreground max-w-2xl">
                  Modelos barefoot y de transición disponibles bajo preventa asistida.
                </p>
              </div>

              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:pb-2">
                PREVENTA ASISTIDA
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12">
              {activeZingProduct && (
                <article className="group">
                  <Link to={`/product/${activeZingProduct.id}`} className="block">
                    <div className="relative bg-white aspect-[4/5] md:aspect-square flex items-center justify-center overflow-hidden">
                      <span className="absolute right-4 top-4 font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Preventa
                      </span>
                      <ResponsiveImage
                        src={activeZingProduct.images[0]}
                        alt={activeZingProduct.name}
                        widths={[420, 640, 900]}
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        width={900}
                        height={900}
                        loading="lazy"
                        className="h-full w-full object-contain p-8 md:p-10 transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </Link>

                  <div className="mt-5">
                    <Link to={`/product/${activeZingProduct.id}`} className="block">
                      <h2 className="font-body text-[17px] font-medium text-foreground">
                        Barebarics Zing
                      </h2>
                      <p className="mt-1 font-body text-xs tracking-wide text-muted-foreground">
                        Colores disponibles
                      </p>
                      <p className="mt-1 font-body text-xs tracking-wide text-muted-foreground">
                        {activeZingProduct.subtitle}
                      </p>
                      <p className="mt-1 font-body text-sm font-medium text-foreground">
                        {activeZingProduct.price > 0
                          ? `${activeZingProduct.currency}${activeZingProduct.price}`
                          : "Consultar"}
                      </p>
                    </Link>

                    <div className="mt-4 flex items-center gap-3">
                      {zingProducts.map((variant) => {
                        const isActive = variant.id === activeZingProduct.id;
                        return (
                          <button
                            key={variant.id}
                            type="button"
                            onClick={() => setActiveZingId(variant.id)}
                            className={`h-14 w-14 bg-white p-1 transition-opacity ${
                              isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                            }`}
                            aria-label={`Seleccionar variante ${variant.name}`}
                          >
                            <ResponsiveImage
                              src={variant.images[0]}
                              alt={variant.name}
                              widths={[120, 200]}
                              sizes="56px"
                              width={200}
                              height={200}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </article>
              )}

              {nonZingProducts.map((product) => (
                <article key={product.id} className="group">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative bg-white aspect-[4/5] md:aspect-square flex items-center justify-center overflow-hidden">
                      <span className="absolute right-4 top-4 font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Preventa
                      </span>
                      <ResponsiveImage
                        src={product.images[0]}
                        alt={product.name}
                        widths={[420, 640, 900]}
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        width={900}
                        height={900}
                        loading="lazy"
                        className="h-full w-full object-contain p-8 md:p-10 transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-5">
                      <h2 className="font-body text-[17px] font-medium text-foreground">
                        {product.name}
                      </h2>
                      <p className="mt-1 font-body text-xs tracking-wide text-muted-foreground">
                        {product.subtitle}
                      </p>
                      <p className="mt-1 font-body text-sm font-medium text-foreground">
                        {product.price > 0 ? `${product.currency}${product.price}` : "Consultar"}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default CollectionPage;
