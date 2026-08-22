import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "./search-bar";
import { useCart, waLink } from "@/lib/cart";
import { WHATSAPP_DISPLAY } from "@/lib/products";

function BackButton() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/") return null;
  return (
    <button
      onClick={() => window.history.back()}
      aria-label="Go back"
      className="shrink-0 rounded-sm border border-border p-2 transition-colors hover:border-gold"
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/best-sellers", label: "Best Sellers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const wa = waLink("Hi Pobe's Vault, I'd like to ask about an item.");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:gap-6">
        <BackButton />
        <Link to="/" className="font-display text-lg tracking-wide lg:text-xl">
          Pobe's <span className="text-gold">Vault</span>
        </Link>

        <nav className="hidden min-w-0 items-center justify-center gap-5 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="label-xs whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden w-56 xl:block">
            <SearchBar placeholder="Search products…" />
          </div>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="label-xs hidden shrink-0 rounded-sm bg-gold px-3 py-2 text-gold-foreground transition-opacity hover:opacity-90 sm:inline-block"
          >
            WhatsApp
          </a>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative shrink-0 rounded-sm border border-border p-2 hover:border-gold"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-gold-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="shrink-0 rounded-sm border border-border p-2 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-3 xl:hidden">
        <SearchBar />
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-gold" }}
                className="label-xs border-b border-border/60 py-3 text-muted-foreground"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="label-xs py-3 text-gold"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
