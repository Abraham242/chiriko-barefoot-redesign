import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="font-heading text-2xl lg:text-3xl font-semibold tracking-wide text-foreground">
            Chiriko Studio
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </Link>
            <Link to="/" className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/" className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </Link>
            <Link to="/" className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <button className="text-foreground hover:text-muted-foreground transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-6 py-8 flex flex-col gap-6">
            <Link to="/" onClick={() => setIsOpen(false)} className="font-body text-sm tracking-widest uppercase text-foreground">Shop</Link>
            <Link to="/" onClick={() => setIsOpen(false)} className="font-body text-sm tracking-widest uppercase text-foreground">About</Link>
            <Link to="/" onClick={() => setIsOpen(false)} className="font-body text-sm tracking-widest uppercase text-foreground">Learn</Link>
            <Link to="/" onClick={() => setIsOpen(false)} className="font-body text-sm tracking-widest uppercase text-foreground">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
