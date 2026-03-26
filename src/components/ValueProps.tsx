import { Footprints, Activity, Maximize2, Feather } from "lucide-react";

const props = [
  { icon: Footprints, title: "Natural Movement", desc: "Zero-drop sole lets your feet move as nature intended" },
  { icon: Activity, title: "Better Posture", desc: "Align your body from the ground up, step by step" },
  { icon: Maximize2, title: "Wide Toe Box", desc: "Room for your toes to spread and grip naturally" },
  { icon: Feather, title: "Lightweight & Flexible", desc: "Barely-there feel that moves with you, not against you" },
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
              <h3 className="font-heading text-xl lg:text-2xl font-medium text-foreground mb-2">{p.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
