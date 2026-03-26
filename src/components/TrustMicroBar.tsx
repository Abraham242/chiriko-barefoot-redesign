import { Truck, MessageCircle, Shield, Ruler } from "lucide-react";

const items = [
  { icon: Truck, text: "Shipping across Venezuela" },
  { icon: MessageCircle, text: "Personalized WhatsApp assistance" },
  { icon: Shield, text: "Secure payment methods" },
  { icon: Ruler, text: "Easy size guidance" },
];

const TrustMicroBar = () => {
  return (
    <section className="border-b border-border py-5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {items.map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <item.icon size={16} strokeWidth={1.5} className="text-muted-foreground" />
              <span className="font-body text-xs text-muted-foreground tracking-wide">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustMicroBar;
