import { Truck, Shield, RefreshCw, MessageCircle } from "lucide-react";

const items = [
  { icon: Truck, title: "Shipping across Venezuela", desc: "We deliver to your door nationwide" },
  { icon: Shield, title: "Secure payments", desc: "Zelle, PayPal & local options" },
  { icon: RefreshCw, title: "Exchange support", desc: "If the size doesn't fit, we help" },
  { icon: MessageCircle, title: "WhatsApp support", desc: "Real people, fast responses" },
];

const PreFooterTrust = () => {
  return (
    <section className="py-20 lg:py-24 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <item.icon size={24} strokeWidth={1.5} className="mx-auto mb-3 text-muted-foreground" />
              <h4 className="font-heading text-base font-medium text-foreground mb-1">{item.title}</h4>
              <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreFooterTrust;
