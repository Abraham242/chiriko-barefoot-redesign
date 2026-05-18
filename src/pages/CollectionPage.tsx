import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ResponsiveImage from "@/components/ResponsiveImage";
import { products } from "@/data/products";

const CollectionPage = () => {
  return (
    <>
      <SEO
        title="Colección"
        description="Descubre todos los modelos barefoot y de transición de Chiriko Studio en una colección premium con asesoría personalizada."
        path="/collection"
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-28 pb-20 lg:pt-36 lg:pb-24">
          <section className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-14 lg:mb-16">
              <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-4">
                Colección
              </h1>

              <p className="font-body text-sm tracking-wide text-muted-foreground max-w-2xl mx-auto">
                Modelos barefoot y de transición seleccionados para moverte con más libertad.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="group">
                  <div className="relative bg-secondary/30 aspect-square mb-4 overflow-hidden p-5 lg:p-6">
                    {product.tag && (
                      <span className="absolute top-3 left-3 bg-accent text-accent-foreground font-body text-xs tracking-wider uppercase px-3 py-1 z-10">
                        {product.tag}
                      </span>
                    )}

                    <ResponsiveImage
                      src={product.images[0]}
                      alt={product.name}
                      widths={[220, 340, 520, 680]}
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      width={680}
                      height={680}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <h2 className="font-heading text-lg lg:text-xl text-foreground">{product.name}</h2>

                  <p className="font-body text-xs text-muted-foreground tracking-wide mb-1">
                    {product.subtitle}
                  </p>

                  <p className="font-body text-sm font-medium text-foreground">
                    {product.price > 0 ? `${product.currency}${product.price}` : "Consultar"}
                  </p>

                  <p className="mt-2 font-body text-xs uppercase tracking-[0.16em] text-muted-foreground group-hover:text-foreground transition-colors">
                    Ver detalles
                  </p>
                </Link>
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
