import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-lifestyle.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Chiriko Studio barefoot shoes lifestyle"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/78 via-[#1A1A18]/34 to-[#1A1A18]/10" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 lg:px-12 pb-14 pt-32 md:pb-20 lg:pb-24">
          <div className="max-w-3xl">
            <p className="mb-5 font-body text-[11px] md:text-xs uppercase tracking-[0.22em] text-primary-foreground/80">
              Barefoot shoes in Venezuela
            </p>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light leading-[0.95] text-primary-foreground max-w-2xl">
              Camina como naciste
            </h1>

            <p className="mt-6 max-w-xl font-body text-base md:text-lg leading-relaxed text-primary-foreground/88">
              Diseñados para que tu pie se mueva libre, natural y sin
              restricciones. Barefoot premium con asesoría personalizada en
              Venezuela.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#shop"
                className="inline-flex h-14 items-center justify-center bg-[#F7F5F0] px-8 font-body text-[12px] uppercase tracking-[0.18em] text-[#1A1A18] transition-all duration-300 hover:bg-white"
              >
                Comprar ahora
              </a>

              <a
                href="#learn"
                className="inline-flex h-14 items-center justify-center border border-primary-foreground/45 px-8 font-body text-[12px] uppercase tracking-[0.18em] text-primary-foreground transition-all duration-300 hover:border-primary-foreground hover:bg-primary-foreground/10"
              >
                ¿Qué es barefoot?
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              <div className="border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm">
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-primary-foreground/72">
                  Envíos
                </p>
                <p className="mt-1 font-body text-sm text-primary-foreground">
                  A toda Venezuela
                </p>
              </div>

              <div className="border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm">
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-primary-foreground/72">
                  Asesoría
                </p>
                <p className="mt-1 font-body text-sm text-primary-foreground">
                  Talla por WhatsApp
                </p>
              </div>

              <div className="border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm">
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-primary-foreground/72">
                  Curaduría
                </p>
                <p className="mt-1 font-body text-sm text-primary-foreground">
                  Barefoot premium
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
