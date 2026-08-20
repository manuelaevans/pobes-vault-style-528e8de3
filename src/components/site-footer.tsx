import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Phone } from "lucide-react";
import { waLink } from "@/lib/cart";
import { CATEGORIES, WHATSAPP_DISPLAY } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-xl">
            Pobe's <span className="text-gold">Vault</span>
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            A fashion retail business bringing you a carefully selected range of clothing,
            footwear and accessories.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={waLink("Hi Pobe's Vault!")}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="rounded-sm border border-border p-2 hover:border-gold"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-sm border border-border p-2 hover:border-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={`tel:${WHATSAPP_DISPLAY}`}
              aria-label="Call"
              className="rounded-sm border border-border p-2 hover:border-gold"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="label-xs text-muted-foreground">Shop</p>
          <ul className="mt-3 space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  to="/shop"
                  search={{ q: "", category: c, sort: "featured", page: 1 }}
                  className="text-muted-foreground hover:text-gold"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-xs text-muted-foreground">Help</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/size-guide" className="text-muted-foreground hover:text-gold">Size Guide</Link></li>
            <li><Link to="/delivery" className="text-muted-foreground hover:text-gold">Delivery</Link></li>
            <li><Link to="/returns" className="text-muted-foreground hover:text-gold">Returns & Exchanges</Link></li>
            <li><Link to="/faq" className="text-muted-foreground hover:text-gold">FAQ</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="label-xs text-muted-foreground">Order</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Ordering is direct. Message or call us and we'll confirm availability and delivery.
          </p>
          <p className="mt-3 font-display text-2xl text-gold">{WHATSAPP_DISPLAY}</p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pobe's Vault. All rights reserved.
      </div>
    </footer>
  );
}
