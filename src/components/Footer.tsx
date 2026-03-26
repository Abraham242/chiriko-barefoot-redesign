import { Link } from "react-router-dom";
import { MapPin, Truck, CreditCard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Trust bar */}
        <div className="grid grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto">
          <div className="text-center">
            <Truck size={20} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
            <p className="font-body text-xs text-muted-foreground tracking-wide">Envíos a toda Venezuela</p>
          </div>
          <div className="text-center">
            <CreditCard size={20} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
            <p className="font-body text-xs text-muted-foreground tracking-wide">Pago seguro</p>
          </div>
          <div className="text-center">
            <MapPin size={20} strokeWidth={1.5} className="mx-auto mb-2 text-muted-foreground" />
            <p className="font-body text-xs text-muted-foreground tracking-wide">Diseñado en Caracas</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" className="font-heading text-xl font-semibold text-foreground">Chiriko Studio</Link>
          <div className="flex gap-8">
            <Link to="/" className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
            <Link to="/" className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/" className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">Learn</Link>
            <Link to="/" className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
          <p className="font-body text-xs text-muted-foreground">© 2026 Chiriko Studio</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
