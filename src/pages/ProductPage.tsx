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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 lg:pt-24">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ChevronLeft size={16} /> Back to shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="bg-secondary aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              {product.tag && (
                <span className="inline-block bg-accent text-accent-foreground font-body text-xs tracking-wider uppercase px-3 py-1 mb-4 self-start">
                  {product.tag}
                </span>
              )}
              <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-2">{product.name}</h1>
              <p className="font-body text-muted-foreground text-sm tracking-wide mb-4">{product.subtitle}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-terracotta text-terracotta" />
                  ))}
                </div>
                <span className="font-body text-xs text-muted-foreground">(24 reviews)</span>
              </div>

              <p className="font-heading text-3xl text-foreground mb-8">{product.currency}{product.price}</p>

              {/* Size selector */}
              <div className="mb-8">
                <p className="font-body text-sm text-foreground tracking-wide uppercase mb-3">Size (EU)</p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className="w-12 h-12 border border-border font-body text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors mb-6">
                Add to cart
              </button>

              {/* Features */}
              <div className="border-t border-border pt-6 mb-6">
                <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-4">Features</p>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check size={14} className="text-accent flex-shrink-0" />
                      <span className="font-body text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education snippet */}
              <div className="bg-cream p-6">
                <p className="font-heading text-lg text-foreground mb-2">Why barefoot?</p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  Zero-drop design keeps your foot flat and aligned. The wide toe box lets toes spread naturally, improving balance and posture with every step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductPage;
