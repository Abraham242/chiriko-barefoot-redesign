import SEO from "@/components/SEO";
import { useParams, Link } from "react-router-dom";
import { Star, Check, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { products } from "@/data/products";

const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || products[0];

  const seoTitle = `${product.name} Barefoot Shoes en Venezuela`;
  const seoDescription = `${product.name}: ${product.subtitle}. Calzado barefoot con ${product.features
    .slice(0, 3)
    .join(", ")
    .toLowerCase()}. Envíos en Venezuela y asesoría por WhatsApp.`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/product/${product.id}`}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-20 lg:pt-24">
          <div className="container mx-auto px-6 lg:px-12 py-8 lg:py-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ChevronLeft size={16} />
              Back to shop
            </Link>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Gallery */}
              <div className="space-y-4">
                <div className="overflow-hidden bg-secondary/40">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[500px] lg:h-[680px] object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="lg:sticky lg:top-28">
                {product.tag && (
                  <div className="inline-flex items-center px-3 py-1 mb-5 bg-secondary text-foreground text-xs tracking-[0.16em] uppercase">
                    {product.tag}
                  </div>
                )}

                <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-3">
                  {product.name}
                </h1>

                <p className="font-body text-base md:text-lg text-muted-foreground mb-5 leading-relaxed">
                  {product.subtitle}
                </p>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-foreground text-foreground"
                      />
                    ))}
                  </div>
                  <span className="font-body text-sm text-muted-foreground">
                    24 reviews
                  </span>
                </div>

                <div className="font-heading text-3xl md:text-4xl text-foreground mb-8">
                  {product.currency}
                  {product.price}
                </div>

                {/* Size selector */}
                <div className="mb-8">
                  <p className="font-body text-sm tracking-[0.16em] uppercase text-muted-foreground mb-4">
                    Size (EU)
                  </p>

                  <div className="grid grid-cols-5 gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className="h-12 border border-border bg-background text-sm text-foreground hover:border-foreground transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <Link
                    to="/size-guide"
                    className="inline-block mt-4 font-body text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    Need help with sizing?
                  </Link>
                </div>

                {/* CTA */}
                <div className="space-y-4 mb-10">
                  <button
                    type="button"
                    className="w-full h-14 bg-foreground text-primary-foreground font-body text-sm tracking-[0.18em] uppercase hover:bg-foreground/90 transition-colors"
                  >
                    Add to cart
                  </button>

                  <a
                    href={`https://wa.me/584221798072?text=${encodeURIComponent(
                      `Hola, vengo de chirikostudio.com y quiero ayuda con la talla del modelo ${product.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 border border-border flex items-center justify-center font-body text-sm tracking-[0.18em] uppercase text-foreground hover:border-foreground transition-colors"
                  >
                    Get size help on WhatsApp
                  </a>
                </div>

                {/* Features */}
                <div className="border-t border-border pt-8 mb-8">
                  <h2 className="font-heading text-2xl font-light text-foreground mb-5">
                    Features
                  </h2>

                  <div className="space-y-4">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check
                          size={16}
                          className="mt-1 text-muted-foreground flex-shrink-0"
                        />
                        <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education snippet */}
                <div className="bg-secondary/40 p-6 lg:p-8">
                  <h3 className="font-heading text-2xl font-light text-foreground mb-3">
                    Why barefoot?
                  </h3>
                  <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                    Zero-drop design keeps your foot flat and aligned. The wide
                    toe box lets toes spread naturally, improving balance and
                    posture with every step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default ProductPage;
