import { Link } from "react-router-dom";
import heroTriptychDesktop from "@/assets/hero/hero-triptych-desktop.webp";
import heroTriptychMobile from "@/assets/hero/hero-triptych-mobile.webp";
import ResponsiveImage from "@/components/ResponsiveImage";

const phoneNumber = "584221798072";
const whatsappMessage = `Hola, vengo de chirikostudio.com 👋
Quiero reservar en preventa un par de Chiriko.

Me gustaría revisar modelo, color, talla habitual y medida de mi pie en centímetros antes de confirmar.
¿Me pueden mostrar las opciones disponibles en preventa?`;
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-background">
      <div className="absolute inset-0">
        <ResponsiveImage
          src={heroTriptychDesktop}
          alt="Calzado barefoot premium Chiriko Studio"
          widths={[960, 1280, 1600, 1920, 2560]}
          sizes="100vw"
          width={2560}
          height={1440}
          loading="eager"
          fetchPriority="high"
          className="hidden h-full w-full object-cover object-center md:block"
        />
        <ResponsiveImage
          src={heroTriptychMobile}
          alt="Calzado barefoot premium Chiriko Studio"
          widths={[480, 640, 768, 1080]}
          sizes="100vw"
          width={1080}
          height={1350}
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-center md:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/78 via-[#1A1A18]/34 to-[#1A1A18]/10" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 lg:px-12 pb-14 pt-32 md:pb-20 lg:pb-24">
          <div className="max-w-3xl">
            <p className="mb-5 font-body text-[11px] md:text-xs uppercase tracking-[0.22em] text-primary-foreground/80">
              Preventa asistida · entrega estimada 3–4 semanas
            </p>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light leading-[0.95] text-primary-foreground max-w-2xl">
              Calzado que deja espacio para moverte.
            </h1>

            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Barefoot y transición para tu día a día, con ayuda para confirmar tu talla antes de reservar.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/collection"
                className="inline-flex h-14 items-center justify-center bg-[#F7F5F0] px-8 font-body text-[12px] uppercase tracking-[0.18em] text-[#1A1A18] transition-all duration-300 hover:bg-white"
              >
                Ver colección
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center border border-primary-foreground/45 px-8 font-body text-[12px] uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300 hover:border-primary-foreground hover:bg-primary-foreground/10"
              >
                Reservar por WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
