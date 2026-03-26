import { MessageCircle } from "lucide-react";

const phoneNumber = "584221798072";
const message =
  "Hola, vengo de chirikostudio.com y quiero ayuda para elegir mi talla.";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3">
      <div className="hidden rounded-full border border-border bg-background/95 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur md:block">
        Te ayudamos con tu talla
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5A6B4D] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
