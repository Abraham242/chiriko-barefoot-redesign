import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ResponsiveImage from "@/components/ResponsiveImage";

const featuredProductIds = [
  "barebarics-zing-all-white-leather",
  "barebarics-wave-white-dark-green",
  "barebarics-enigma-ivory",
];

const BestSellers = () => {
  const featuredProducts = featuredProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-3">
            Colección natural
          </h2>

          <p className="font-body text-muted-foreground text-sm tracking-wide max-w-2xl mx-auto">
            Una selección de modelos barefoot y de transición para moverte con
            libertad, mejorar tu postura y caminar con mayor comodidad natural.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProducts.map((product) => {
            return (
              <Link to={`/product/${product.id}`} key={product.id} className="group block">
                <div className="relative bg-white aspect-[4/5] md:aspect-square flex items-center justify-center overflow-hidden">
                  <span className="absolute right-4 top-4 font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Preventa
                  </span>

                  <ResponsiveImage
                    src={product.images[0]}
                    alt={product.name}
                    widths={[220, 340, 520, 680]}
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    width={680}
                    height={680}
                    loading="lazy"
                    className="h-full w-full object-contain p-4 md:p-6 scale-[1.1] md:scale-[1.14] transition-transform duration-500 group-hover:scale-[1.17]"
                  />
                </div>

                <div className="mt-5">
                  <p className="font-body text-xs tracking-[0.14em] uppercase text-muted-foreground">{product.brand}</p>
                  <h3 className="mt-1 font-body text-[17px] font-medium text-foreground">{product.model}</h3>
                  <p className="mt-1 font-body text-sm font-medium text-foreground">
                    {product.price > 0 ? `${product.currency}${product.price}` : "Consultar"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/collection"
            className="inline-flex h-11 items-center justify-center border border-border px-6 text-[12px] tracking-[0.16em] uppercase text-foreground transition-colors hover:border-foreground"
          >
            Ver colección completa
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
