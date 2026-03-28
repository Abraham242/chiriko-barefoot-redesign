import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";

const phoneNumber = "584221798072";
const message = "Hola, vengo de chirikostudio.com y quiero ayuda para elegir mi talla.";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

const navLinks = [
  { label: "Shop", href: "/#shop" },
  { label: "Learn", href: "/#learn" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Detectar el scroll para el fondo
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20); // Subí un poco el umbral a 20px
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true }); // Mejora el rendimiento
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isHome = location.pathname === "/";

  // Componente reutilizable para los enlaces
  const NavItem = ({ link, mobile = false }) => {
    const isAnchor = link.href.startsWith("/#");
    const baseClasses = mobile
      ? "font-body text-sm tracking-[0.16em] uppercase text-foreground py-2"
      : "font-body text-[12px] tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-foreground";

    if (isAnchor && isHome) {
      return (
        <a href={link.href} onClick={() => setIsOpen(false)} className={baseClasses}>
          {link.label}
        </a>
      );
    }
    return (
      <Link to={link.href} onClick={() => setIsOpen(false)} className={baseClasses}>
        {link.label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border/60"
          : "bg-background/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            to="/"
            className="font-heading text-xl md:text-2xl tracking-[0.12em] text-foreground"
            aria-label="Chiriko Studio home"
          >
            CHIRIKO STUDIO
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.label} link={link} />
            ))}
          </nav>

          {/* Desktop Actions */}
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

            <Link
              to="/#shop"
              className="inline-flex h-11 items-center justify-center gap-2 bg-foreground px-5 text-[12px] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-foreground/90"
            >
              <ShoppingBag size={16} />
              Shop now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex lg:hidden items-center justify-center text-foreground transition-transform active:scale-95"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu con animación CSS */}
      <div
        className={`lg:hidden grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 border-t border-border/60" : "grid-rows-[0fr] opacity-0"
        } bg-background`}
      >
        <div className="overflow-hidden">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavItem key={link.label} link={link} mobile={true} />
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 border border-border text-sm tracking-[0.16em] uppercase text-foreground transition-colors active:bg-muted"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>

              <Link
                to="/#shop"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-12 items-center justify-center gap-2 bg-foreground text-sm tracking-[0.16em] uppercase text-primary-foreground transition-colors active:bg-foreground/80"
              >
                <ShoppingBag size={16} />
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
