import { Footprints, Activity, Maximize2, Feather } from "lucide-react";

const props = [
  {
    icon: Footprints,
    title: "Movimiento natural",
    desc: "El drop cero permite que tu pie se mueva de la forma en que fue diseñado.",
  },
  {
    icon: Activity,
    title: "Mejor postura",
    desc: "Alinea tu cuerpo desde la base y recupera una pisada más natural.",
  },
  {
    icon: Maximize2,
    title: "Horma anatómica",
    desc: "Espacio real para que tus dedos se expandan y estabilicen tu cuerpo.",
  },
  {
    icon: Feather,
    title: "Flexibilidad absoluta",
    desc: "Ligero, flexible y creado para moverse contigo, no contra ti.",
  },
];

const ValueProps = () => {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {props.map((p) => (
            <div key={p.title} className="text-center">
              <div className="flex justify-center mb-5">
                <p.icon size={32} strokeWidth={1} className="text-accent" />
              </div>

              <h3 className="font-heading text-xl lg:text-2xl font-medium text-foreground mb-2">
                {p.title}
              </h3>

              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
