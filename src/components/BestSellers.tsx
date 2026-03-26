import { Link } from "react-router-dom";
import { products } from "@/data/products";

const BestSellers = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-3">Best Sellers</h2>
          <p className="font-body text-muted-foreground text-sm tracking-wide">Our most loved designs</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <div className="relative bg-secondary aspect-square mb-4 overflow-hidden">
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground font-body text-xs tracking-wider uppercase px-3 py-1 z-10">
                    {product.tag}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-heading text-lg lg:text-xl text-foreground">{product.name}</h3>
              <p className="font-body text-xs text-muted-foreground tracking-wide mb-1">{product.subtitle}</p>
              <p className="font-body text-sm font-medium text-foreground">{product.currency}{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
