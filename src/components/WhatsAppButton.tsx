import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/584121234567?text=Hola%2C%20me%20interesan%20los%20zapatos%20barefoot%20de%20Chiriko%20Studio"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} strokeWidth={1.5} />
    </a>
  );
};

export default WhatsAppButton;
