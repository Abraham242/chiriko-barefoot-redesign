import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/584121234567?text=Hola%2C%20me%20interesan%20los%20zapatos%20barefoot%20de%20Chiriko%20Studio"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-accent text-accent-foreground pl-5 pr-4 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <span className="hidden sm:inline font-body text-xs tracking-wide">We help you choose your size</span>
      <MessageCircle size={22} strokeWidth={1.5} />
    </a>
  );
};

export default WhatsAppButton;
