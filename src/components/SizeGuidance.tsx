import { Ruler } from "lucide-react";

const SizeGuidance = () => {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-xl mx-auto text-center bg-secondary/50 p-10 lg:p-14">
          <Ruler
            size={28}
            strokeWidth={1.5}
            className="mx-auto mb-4 text-muted-foreground"
          />

          <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-3">
            ¿No sabes tu talla?
          </h3>

          <p className="font-body text-sm text-muted-foreground mb-8">
            Te ayudamos a encontrarla en menos de un minuto o por WhatsApp, para
            que el ajuste se sienta natural desde el primer paso.
          </p>

          <a
            href="/size-guide"
            className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-primary-foreground font-body text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors"
          >
            Medir mi pie
          </a>
        </div>
      </div>
    </section>
  );
};

export default SizeGuidance;
