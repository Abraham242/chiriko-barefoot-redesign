import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const EducationSection = () => {
  return (
    <section id="education" className="bg-cream py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Guía barefoot
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-4">
            Movimiento natural, explicado simple
          </h2>
          <p className="mx-auto max-w-xl font-body text-muted-foreground leading-relaxed">
            Aprende qué hace diferente al calzado barefoot y cómo hacer una transición responsable.
          </p>
          <Link
            to="/que-es-calzado-barefoot"
            className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 font-body text-xs uppercase tracking-[0.16em] text-foreground"
          >
            Conocer el barefoot
            <ArrowUpRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
