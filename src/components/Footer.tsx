import { Instagram, Mail, MessageCircle } from "lucide-react";

const phoneNumber = "584221798072";

const whatsappMessage = `Hola, vengo de chirikostudio.com 👋  
Quiero ayuda para elegir mi talla y modelo barefoot.`;

const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-12 pt-16 pb-8 lg:pt-20 lg:pb-10">
        
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Marca */}
          <div>
           <img
              src="/logo-black.svg"
              alt="Chiriko Studio"
              className="h-14 w-auto mb-4"
              loading="lazy"
            />
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Calzado barefoot premium en Venezuela. Movimiento natural,
              diseño minimalista y asesoría personalizada.
            </p>
          </div>

          
          {/* Navegación */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Navegación
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li><a href="/#shop" className="hover:text-foreground transition-colors">Colección</a></li>
              <li><a href="/#learn" className="hover:text-foreground transition-colors">Filosofía</a></li>
              <li><a href="/size-guide" className="hover:text-foreground transition-colors">Guía de Tallas</a></li>
              {/* ── NUEVO: Link al artículo ── */}
              <li>
                <a href="/aprende/que-es-calzado-barefoot" className="hover:text-foreground transition-colors">
                  ¿Qué es el barefoot?
                </a>
              </li>
              <li><a href="/#contact" className="hover:text-foreground transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Contacto
            </h4>

            <div className="space-y-4 text-sm font-body">
              <a
                href="mailto:hello@chirikostudio.com"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail size={16} />
                hello@chirikostudio.com
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>

              <a
                href="https://www.instagram.com/chiriko.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Instagram size={16} />
                @chiriko.studio
              </a>
            </div>
          </div>

        </div>
        
        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Chiriko Studio. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
