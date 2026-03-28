import { Instagram, Mail, MessageCircle } from "lucide-react";

const phoneNumber = "584221798072";
const whatsappMessage =
  "Hola, vengo de chirikostudio.com y quiero ayuda con barefoot shoes.";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border bg-background">
      <div className="container mx-auto px-6 lg:px-12 pt-16 pb-8 lg:pt-20 lg:pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-heading text-2xl tracking-[0.12em] text-foreground">
              CHIRIKO STUDIO
            </p>

            <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground">
              Barefoot shoes seleccionados para devolverte movimiento natural,
              libertad y una forma más consciente de caminar.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 border border-border px-4 text-[12px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-foreground"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>

              <a
                href="mailto:hello@chirikostudio.com"
                className="inline-flex h-11 items-center justify-center gap-2 border border-border px-4 text-[12px] uppercase tracking-[0.16em] text-foreground transition-colors hover:border-foreground"
              >
                <Mail size={16} />
                Email
              </a>
            </div>
          </div>

          <div>
            <p className="font-body text-[12px] uppercase tracking-[0.18em] text-foreground">
              Shop
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="/#shop"
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Shop all
                </a>
              </li>
              <li>
                <a
                  href="/size-guide"
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Size guide
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Get size help
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-body text-[12px] uppercase tracking-[0.18em] text-foreground">
              Learn
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="/#learn"
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  What is barefoot?
                </a>
              </li>
              <li>
                <a
                  href="/#why"
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Why Chiriko
                </a>
              </li>
              <li>
                <a
                  href="/#reviews"
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-body text-[12px] uppercase tracking-[0.18em] text-foreground">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:hello@chirikostudio.com"
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  hello@chirikostudio.com
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  +58 422 179 8072
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/chiriko.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Instagram size={16} />
                  @chiriko.studio
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@chiriko.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  TikTok @chiriko.studio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <div className="grid gap-4 md:grid-cols-2 md:items-center">
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <span>Envíos en Venezuela</span>
              <span>•</span>
              <span>Pago seguro</span>
              <span>•</span>
              <span>Asesoría personalizada</span>
            </div>

            <p className="font-body text-xs text-muted-foreground md:text-right">
              © {new Date().getFullYear()} Chiriko Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
