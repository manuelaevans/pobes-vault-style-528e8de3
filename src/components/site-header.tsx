import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, Menu, MessageCircle, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "./search-bar";
import { useCart, waLink } from "@/lib/cart";
import { useTheme } from "@/lib/theme";
import { WHATSAPP_DISPLAY } from "@/lib/products";
import { BrandMark } from "./brand-mark";
import { Button } from "./ui/button";

function BackButton() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  if (pathname === "/") return null;
  return (
    <button
      onClick={() => navigate({ to: "/" })}
      aria-label="Back to home"
      className="grid h-9 w-9 shrink-0 place-items-center border border-border transition-colors hover:border-gold hover:text-gold"
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} appearance`}
      title={`Switch to ${next} appearance`}
      className="grid h-9 w-9 shrink-0 place-items-center border border-border transition-colors hover:border-gold hover:text-gold"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto grid max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-8 lg:px-12 lg:py-4">
        <div className="flex min-w-0 items-center gap-2">
          <BackButton />
          <ThemeToggle />
          <Link to="/" className="ml-1 flex min-w-0 items-center gap-2.5">
            <BrandMark className="h-10 w-10 shrink-0 object-contain lg:h-12 lg:w-12" />
            <span className="hidden whitespace-nowrap font-display text-2xl leading-none sm:block lg:text-3xl">
              Pobe's <span className="text-gold">Vault</span>
            </span>
          </Link>
        </div>

        <nav className="hidden min-w-0 items-center justify-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-gold" }}
              className="label-xs whitespace-nowrap text-muted-foreground transition-colors hover:text-gold"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden w-56 xl:block">
            <SearchBar placeholder="Search products…" />
          </div>
          <Button asChild variant="gold" size="icon" className="hidden sm:inline-flex" title="WhatsApp">
            <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle />
            </a>
          </Button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-9 w-9 shrink-0 place-items-center border border-border hover:border-gold hover:text-gold"
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
            className="grid h-9 w-9 shrink-0 place-items-center border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pb-3 sm:px-6 xl:hidden">
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
