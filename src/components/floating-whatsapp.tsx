import { waLink } from "@/lib/cart";
import { WhatsAppIcon } from "./whatsapp-icon";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hi Pobe's Vault, I'd like to ask about an item.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Pobe's Vault on WhatsApp"
      className="fixed bottom-5 right-4 z-50 grid h-13 w-13 place-items-center rounded-full bg-gold text-gold-foreground shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 h-12 w-12"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
