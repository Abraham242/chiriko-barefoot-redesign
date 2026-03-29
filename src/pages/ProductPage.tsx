import SEO from "@/components/SEO";
import { useParams, Link } from "react-router-dom";
import { Star, Check, ChevronLeft, MessageCircle, ShieldCheck, Truck, Ruler } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { products } from "@/data/products";

const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

const phoneNumber = "584221798072";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || products[0];

  const whatsappMessage = `Hola, vengo de chirikostudio.com y quiero ayuda con la talla del modelo ${product.name}.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const seoTitle = `${product.name} | Barefoot Shoes en Venezuela`;
  const seoDescription = `${product.name}: ${product.subtitle}. Calzado barefoot premium en Venezuela con horma anatómica, drop cero y flexibilidad natural. Asesoría personalizada por WhatsApp.`;

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
              to="/#shop"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ChevronLeft size={16} />
              Volver a la colección
            </Link>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Imagen principal */}
              <div className="space-y-4">
                <div className="overflow-hidden bg-secondary/40">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[500px] lg:h-[680px] object-cover"
                  />
                </div>
              </div>

              {/* Contenido */}
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
                    24 testimonios
                  </span>
                </div>

                <div className="font-heading text-3xl md:text-4xl text-foreground mb-8">
                  {product.currency}
                  {product.price}
                </div>

                {/* Beneficio corto */}
                <div className="mb-8 border-l border-foreground/20 pl-4">
                  <p className="font-body text-sm md:text-base text-foreground leading-relaxed">
                    Diseñado para devolverle a tu pie su forma y movimiento natural.
                  </p>
                </div>

                {/* Tallas */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4 gap-4">
                    <p className="font-body text-sm tracking-[0.16em] uppercase text-muted-foreground">
                      Talla (EU)
                    </p>

                    <Link
                      to="/size-guide"
                      className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                      <Ruler size={14} />
                      Guía de Tallas
                    </Link>
                  </div>

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

                  <p className="mt-4 font-body text-sm text-muted-foreground">
                    ¿No sabes cuál elegir? Te ayudamos por WhatsApp en menos de un minuto.
                  </p>
                </div>

                {/* CTAs */}
                <div className="space-y-4 mb-10">
                  <button
                    type="button"
                    className="w-full h-14 bg-foreground text-primary-foreground font-body text-sm tracking-[0.18em] uppercase hover:bg-foreground/90 transition-colors"
                  >
                    Añadir a la bolsa
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-14 border border-border flex items-center justify-center gap-2 font-body text-sm tracking-[0.18em] uppercase text-foreground hover:border-foreground transition-colors"
                  >
                    <MessageCircle size={16} />
                    Recibir asesoría por WhatsApp
                  </a>
                </div>

                {/* Trust mini bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
                  <div className="border border-border p-4">
                    <Truck size={18} className="mb-3 text-muted-foreground" />
                    <p className="font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Envíos
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground">
                      Venezuela
                    </p>
                  </div>

                  <div className="border border-border p-4">
                    <ShieldCheck size={18} className="mb-3 text-muted-foreground" />
                    <p className="font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Pago
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground">
                      Seguro
                    </p>
                  </div>

                  <div className="border border-border p-4">
                    <MessageCircle size={18} className="mb-3 text-muted-foreground" />
                    <p className="font-body text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      Asesoría
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground">
                      Personalizada
                    </p>
                  </div>
                </div>

                {/* Detalles */}
                <div className="border-t border-border pt-8 mb-8">
                  <h2 className="font-heading text-2xl font-light text-foreground mb-5">
                    Detalles
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

                {/* Bloque educativo */}
                <div className="bg-secondary/40 p-6 lg:p-8 mb-8">
                  <h3 className="font-heading text-2xl font-light text-foreground mb-3">
                    ¿Por qué barefoot?
                  </h3>
                  <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                    El diseño drop cero mantiene tu pie plano y alineado. La
                    horma anatómica permite que los dedos se expandan de forma
                    natural, mejorando estabilidad, postura y libertad de movimiento.
                  </p>
                </div>

                {/* Bloque final de ayuda */}
                <div className="border border-border p-6">
                  <h3 className="font-heading text-xl font-light text-foreground mb-2">
                    ¿Necesitas ayuda para elegir?
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                    Si no estás seguro de la talla o quieres una recomendación
                    más precisa, escríbenos por WhatsApp y te ayudamos personalmente.
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 border border-foreground px-5 font-body text-sm tracking-[0.16em] uppercase text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
                  >
                    <MessageCircle size={16} />
                    Hablar con Chiriko
                  </a>
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
