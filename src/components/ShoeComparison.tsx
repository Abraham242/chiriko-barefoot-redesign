import { Footprints, Mountain, Move3d, MessageCircle } from "lucide-react";

const phoneNumber = "584221798072";
const whatsappMessage =
  "Hola, vengo de chirikostudio.com y quiero entender qué modelo me conviene para empezar con calzado natural.";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

const cards = [
  {
    icon: Footprints,
    title: "Dedos con espacio",
    description:
      "Tus dedos necesitan expandirse para ayudarte a equilibrarte y caminar mejor.",
    micro: "Menos presión. Más libertad.",
  },
  {
    icon: Mountain,
    title: "Pisada más estable",
    description:
      "Una base más natural ayuda a que el pie apoye de forma más equilibrada.",
    micro: "Menos elevación. Más conexión.",
  },
  {
    icon: Move3d,
    title: "Movimiento real",
    description:
      "Materiales más flexibles permiten que el pie se mueva con menos restricciones.",
    micro: "El zapato acompaña, no domina.",
  },
  {
    icon: MessageCircle,
    title: "Transición consciente",
    description:
      "No tienes que cambiarlo todo de golpe. Te ayudamos a elegir el modelo adecuado según tu pie y tu uso.",
    micro: "Barefoot o transición, paso a paso.",
  },
];

const ShoeComparison = () => {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground mb-4">
            No es solo comodidad. Es darle espacio a tu pie.
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            La mayoría del calzado tradicional aprieta, eleva y limita el
            movimiento. El calzado natural busca lo contrario: más espacio, más
            estabilidad y una pisada más libre.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {cards.map((card) => (
            <article key={card.title} className="bg-background border border-border/70 p-7 lg:p-8">
              <card.icon size={20} strokeWidth={1.6} className="text-muted-foreground mb-5" />
              <h3 className="font-heading text-2xl font-light text-foreground mb-3">{card.title}</h3>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                {card.description}
              </p>
              <p className="font-body text-sm text-foreground/90">{card.micro}</p>
            </article>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 lg:mt-14 border border-border bg-background/60 p-8 lg:p-10 text-center">
          <p className="font-body text-base md:text-lg text-foreground leading-relaxed mb-8">
            Si tus zapatos te aprietan, cansan o limitan, quizás no necesitas
            más soporte. Quizás necesitas más espacio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#shop"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center px-8 border border-border text-foreground font-body text-sm tracking-[0.16em] uppercase hover:border-foreground transition-colors"
            >
              Ver modelos
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center px-8 bg-foreground text-primary-foreground font-body text-sm tracking-[0.16em] uppercase hover:bg-foreground/90 transition-colors"
            >
              Recibir asesoría
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoeComparison;
