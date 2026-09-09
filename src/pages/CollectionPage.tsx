import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ResponsiveImage from "@/components/ResponsiveImage";
import { products } from "@/data/products";
import type { Product, ProductStatus } from "@/data/productTypes";

type CatalogGroup = {
  key: string;
  variants: Product[];
  cover: Product;
  displayName: string;
  isFeatured: boolean;
  isNew: boolean;
  status: ProductStatus;
};

const statusLabels: Record<ProductStatus, string> = {
  preorder: "Preventa",
  in_stock: "Stock confirmado",
};

const whatsappUrl = `https://wa.me/584221798072?text=${encodeURIComponent(
  "Hola, estoy viendo la colección de Chiriko Studio y quisiera recibir asesoría sobre talla, color y disponibilidad.",
)}`;

const sizesForProduct = (product: Product) => {
  if (product.status === "preorder") return product.consultableSizes;
  return product.sizes;
};

const groupStatus = (variants: Product[]): ProductStatus => {
  if (variants.some((variant) => variant.status === "in_stock")) return "in_stock";
  return "preorder";
};

const groupedCatalog = products.reduce<CatalogGroup[]>((groups, product) => {
  const key = (product.groupSlug || `${product.brand}-${product.model}`).toLocaleLowerCase();
  const existingGroup = groups.find((group) => group.key === key);

  if (existingGroup) {
    existingGroup.variants.push(product);
    existingGroup.isFeatured ||= product.isFeatured;
    existingGroup.isNew ||= product.isNew;
    if (product.groupName) existingGroup.displayName = product.groupName;
    existingGroup.status = groupStatus(existingGroup.variants);
    return groups;
  }

  groups.push({
    key,
    variants: [product],
    cover: product,
    displayName: product.groupName || `${product.brand} ${product.model}`,
    isFeatured: product.isFeatured,
    isNew: product.isNew,
    status: product.status,
  });
  return groups;
}, []);

const ProductCard = ({ group }: { group: CatalogGroup }) => {
  const [selectedVariant, setSelectedVariant] = useState(group.cover);
  const href = `/product/${selectedVariant.slug}`;
  const priceLabel = selectedVariant.price > 0
    ? `${selectedVariant.currency}${selectedVariant.price}`
    : "Consultar disponibilidad";

  return (
    <article className="group min-w-0">
      <Link to={href} className="block" aria-label={`Ver ${group.displayName} en ${selectedVariant.colorName}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f1ec] sm:aspect-square">
          <div className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5">
            <span className="bg-background/90 px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.14em] text-foreground backdrop-blur-sm">{statusLabels[selectedVariant.status]}</span>
            {selectedVariant.isNew && <span className="bg-foreground px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.14em] text-background">Nuevo</span>}
            {selectedVariant.isFeatured && <span className="bg-background/90 px-2.5 py-1 font-body text-[9px] uppercase tracking-[0.14em] text-foreground backdrop-blur-sm">Destacado</span>}
          </div>
          <ResponsiveImage src={selectedVariant.images[0]} alt={`${group.displayName} en ${selectedVariant.colorName}`} widths={[420, 640, 900]} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" width={900} height={900} loading="lazy" className="h-full w-full object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:p-6" />
        </div>
      </Link>
      <div className="mt-5">
        <p className="font-body text-[10px] uppercase tracking-[0.19em] text-muted-foreground">{selectedVariant.brand}</p>
        <div className="mt-1.5 flex items-start justify-between gap-4">
          <h2 className="min-w-0 font-body text-base font-medium text-foreground sm:text-[17px]"><Link to={href} className="transition-opacity hover:opacity-65">{group.displayName}</Link></h2>
          <p className="shrink-0 font-body text-sm font-medium text-foreground">{priceLabel}</p>
        </div>
        {group.variants.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2" aria-label={`Seleccionar color de ${group.displayName}`}>
            {group.variants.map((variant) => {
              const selected = variant.id === selectedVariant.id;
              return (
                <button key={variant.id} type="button" onClick={() => setSelectedVariant(variant)} aria-pressed={selected} aria-label={`${variant.colorName}${selected ? ", seleccionado" : ""}`} title={variant.colorName} className="flex min-h-9 items-center gap-2 rounded-full px-2 font-body text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground">
                  <span className={`h-4 w-4 rounded-full border border-foreground/20 ${selected ? "ring-2 ring-foreground ring-offset-2" : ""}`} style={{ backgroundColor: variant.colorHex }} aria-hidden="true" />
                  <span className={selected ? "text-foreground" : "sr-only sm:not-sr-only"}>{variant.colorName}</span>
                </button>
              );
            })}
          </div>
        )}
        <Link to={href} className="mt-5 inline-flex border-b border-foreground pb-1 font-body text-xs font-medium text-foreground">Ver modelo</Link>
      </div>
    </article>
  );
};

const CollectionPage = () => {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<ProductStatus | null>(null);

  const brands = useMemo(() => [...new Set(products.map((product) => product.brand))].sort(), []);
  const categories = useMemo(() => [...new Set(products.map((product) => product.category))].sort(), []);
  const availableSizes = useMemo(() => [...new Set(products.flatMap(sizesForProduct))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })), []);
  const activeFilters = [activeBrand, activeCategory, activeSize && `Talla ${activeSize}`, activeStatus && statusLabels[activeStatus]].filter(Boolean) as string[];

  const filteredGroups = useMemo(() => groupedCatalog.filter((group) => group.variants.some((variant) =>
    (!activeBrand || variant.brand === activeBrand) &&
    (!activeCategory || variant.category === activeCategory) &&
    (!activeSize || sizesForProduct(variant).includes(activeSize)) &&
    (!activeStatus || variant.status === activeStatus)
  )).sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured)), [activeBrand, activeCategory, activeSize, activeStatus]);

  const clearFilters = () => { setActiveBrand(null); setActiveCategory(null); setActiveSize(null); setActiveStatus(null); };

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

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-foreground/10 py-5 lg:mt-16">
              <Sheet>
                <SheetTrigger asChild>
                  <button type="button" className="inline-flex items-center gap-2 rounded-sm border border-foreground px-4 py-2.5 font-body text-xs font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground hover:text-background">
                    <SlidersHorizontal size={16} /> Filtrar{activeFilters.length > 0 && ` (${activeFilters.length})`}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[min(90vw,400px)] overflow-y-auto px-5 pb-8 pt-12 sm:max-w-md sm:px-7">
                  <SheetHeader className="text-left">
                    <SheetTitle className="font-heading text-3xl font-light">Filtros</SheetTitle>
                    <SheetDescription>Afina la colección por modelo, talla consultable y disponibilidad.</SheetDescription>
                  </SheetHeader>
                  <div className="mt-8 space-y-8">
                    {[
                      { title: "Marca", values: brands, active: activeBrand, set: setActiveBrand },
                      { title: "Categoría", values: categories, active: activeCategory, set: setActiveCategory },
                    ].map(({ title, values, active, set }) => (
                      <fieldset key={title}>
                        <legend className="font-body text-xs font-medium uppercase tracking-[0.16em]">{title}</legend>
                        <div className="mt-3 flex flex-wrap gap-2">{values.map((value) => <button key={value} type="button" aria-pressed={active === value} onClick={() => set(active === value ? null : value)} className={`rounded-full px-3.5 py-2 font-body text-xs ${active === value ? "bg-foreground text-background" : "bg-secondary text-foreground hover:bg-foreground/10"}`}>{value}</button>)}</div>
                      </fieldset>
                    ))}
                    <fieldset>
                      <legend className="font-body text-xs font-medium uppercase tracking-[0.16em]">Tallas consultables</legend>
                      <p className="mt-2 font-body text-xs leading-5 text-muted-foreground">La talla se confirma por WhatsApp antes de reservar.</p>
                      <div className="mt-3 grid grid-cols-5 gap-2">{availableSizes.map((size) => <button key={size} type="button" aria-pressed={activeSize === size} onClick={() => setActiveSize(activeSize === size ? null : size)} className={`min-h-10 rounded-sm font-body text-xs ${activeSize === size ? "bg-foreground text-background" : "bg-secondary text-foreground hover:bg-foreground/10"}`}>{size}</button>)}</div>
                    </fieldset>
                    <fieldset>
                      <legend className="font-body text-xs font-medium uppercase tracking-[0.16em]">Estado</legend>
                      <div className="mt-3 flex flex-wrap gap-2">{(["preorder", "in_stock"] as ProductStatus[]).map((status) => <button key={status} type="button" aria-pressed={activeStatus === status} onClick={() => setActiveStatus(activeStatus === status ? null : status)} className={`rounded-full px-3.5 py-2 font-body text-xs ${activeStatus === status ? "bg-foreground text-background" : "bg-secondary text-foreground hover:bg-foreground/10"}`}>{statusLabels[status]}</button>)}</div>
                    </fieldset>
                  </div>
                  <div className="mt-10 grid gap-3">
                    <SheetClose asChild><button type="button" className="min-h-12 bg-foreground px-5 font-body text-xs font-medium uppercase tracking-[0.14em] text-background">Ver {filteredGroups.length} {filteredGroups.length === 1 ? "modelo" : "modelos"}</button></SheetClose>
                    <button type="button" onClick={clearFilters} disabled={!activeFilters.length} className="min-h-11 font-body text-sm text-muted-foreground underline underline-offset-4 disabled:opacity-40">Limpiar filtros</button>
                  </div>
                </SheetContent>
              </Sheet>
              <p className="font-body text-xs text-muted-foreground">{filteredGroups.length} {filteredGroups.length === 1 ? "modelo" : "modelos"} · Ordenar: <span className="text-foreground">destacados</span></p>
            </div>

            {activeFilters.length > 0 && (
              <div className="mb-7 mt-5 flex min-w-0 flex-wrap items-center gap-2" aria-label="Filtros activos">
                {activeFilters.map((filter) => <span key={filter} className="max-w-full truncate rounded-full bg-secondary px-3 py-1.5 font-body text-xs text-foreground">{filter}</span>)}
                <button type="button" onClick={clearFilters} className="px-2 py-1.5 font-body text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">Limpiar filtros</button>
              </div>
            )}

            {filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                {filteredGroups.map((group) => <ProductCard key={group.key} group={group} />)}
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
