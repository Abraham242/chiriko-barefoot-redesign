import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";

const phoneNumber = "584221798072";
const message =
  "Hola, vengo de chirikostudio.com y quiero ayuda para elegir mi talla.";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

const navLinks = [
  { label: "Colección", href: "/#shop" },
  { label: "Barefoot", href: "/#learn" },
  { label: "Guía de Tallas", href: "/size-guide" },
  { label: "Contacto", href: "/#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/92 backdrop-blur-md border-b border-border/60"
          : "bg-background/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            to="/"
            className="inline-flex items-center opacity-90 hover:opacity-100 transition-opacity duration-300"
            aria-label="Inicio de Chiriko Studio"
          >
            <img
              src="/logo-black.svg"
              alt="Chiriko Studio"
              className="h-9 md:h-11 w-auto"
              loading="eager"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/#") && isHome ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-[12px] tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="font-body text-[12px] tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 border border-border px-4 text-[12px] tracking-[0.16em] uppercase text-foreground transition-colors hover:border-foreground"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

            <a
              href={isHome ? "/#shop" : "/"}
              className="inline-flex h-11 items-center justify-center gap-2 bg-foreground px-5 text-[12px] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-foreground/90"
            >
              <ShoppingBag size={16} />
              Ver colección
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex lg:hidden items-center justify-center text-foreground"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) =>
              link.href.startsWith("/#") && isHome ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm tracking-[0.16em] uppercase text-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm tracking-[0.16em] uppercase text-foreground"
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="pt-2 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 border border-border text-sm tracking-[0.16em] uppercase text-foreground"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>

              <a
                href={isHome ? "/#shop" : "/"}
                className="inline-flex h-12 items-center justify-center gap-2 bg-foreground text-sm tracking-[0.16em] uppercase text-primary-foreground"
              >
                <ShoppingBag size={16} />
                Ver colección
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
