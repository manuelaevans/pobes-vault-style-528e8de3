import { Link, createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Truck, Sparkles, HeartHandshake } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { ProductCard } from "@/components/product-card";
import { SearchBar } from "@/components/search-bar";
import { waLink } from "@/lib/cart";
import { CATEGORIES, WHATSAPP_DISPLAY, bestSellers, deals, newArrivals } from "@/lib/products";
import { useProducts } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pobe's Vault — Carefully Selected Fashion in Ghana" },
      {
        name: "description",
        content:
          "Shop hand-picked clothing, footwear and accessories at Pobe's Vault. Browse new arrivals and best sellers, then order by cart or WhatsApp with nationwide delivery.",
      },
      { property: "og:title", content: "Pobe's Vault — Carefully Selected Fashion" },
      {
        property: "og:description",
        content: "Your destination for carefully selected fashion pieces. Order online or on WhatsApp.",
      },
    ],
  }),
  component: Index,
});

const REVIEWS = [
  ["Ama K.", "Ordered a pair on Monday, got them in Accra the next day. Exactly as shown."],
  ["Kofi B.", "They helped me pick my size on WhatsApp. Fit perfectly."],
  ["Nana A.", "Prices are fair and the pieces are genuinely nice. Second order already."],
] as const;

const WHY = [
  [Sparkles, "Carefully selected", "Every piece is hand-picked and checked before it's listed."],
  [BadgeCheck, "Competitive prices", "Fair pricing on quality pieces, with regular deals."],
  [Truck, "Reliable delivery", "Accra in 1–2 days, nationwide in 2–4 days."],
  [HeartHandshake, "Real support", "Message us any time and a person replies."],
] as const;

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <h2 className="truncate font-display text-2xl sm:text-3xl">{title}</h2>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt="Hand-picked sneakers, denim and shirts from Pobe's Vault"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
          <p className="label-xs text-gold">Vendor · Accra · Ghana</p>
          <h1 className="mt-3 max-w-xl font-display text-5xl leading-[0.95] sm:text-7xl">
            Pobe's
            <br />
            Vault
          </h1>
          <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
            Your destination for carefully selected fashion pieces — clothing, footwear and
            accessories, ready to order.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="label-xs rounded-sm bg-gold px-6 py-3 text-gold-foreground"
            >
              Shop Now
            </Link>
            <a
              href={waLink("Hi Pobe's Vault, I'd like to order.")}
              target="_blank"
              rel="noreferrer"
              className="label-xs rounded-sm border border-border bg-background/70 px-6 py-3"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto hidden max-w-3xl px-4 pt-8 xl:block">
        <SearchBar />
      </div>

      {/* Categories */}
      <Section title="Shop by Category">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/shop"
              search={{ category: c }}
              className="label-xs rounded-sm border border-border bg-card px-3 py-6 text-center transition-colors hover:border-gold hover:text-gold"
            >
              {c}
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="New Arrivals"
        action={
          <Link to="/new-arrivals" className="label-xs shrink-0 text-gold">
            View All
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {newArrivals(products)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.slug} product={p} compact />
            ))}
        </div>
      </Section>

      <Section
        title="Best Sellers"
        action={
          <Link to="/best-sellers" className="label-xs shrink-0 text-gold">
            View All
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {bestSellers(products)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.slug} product={p} compact />
            ))}
        </div>
      </Section>

      <Section title="Featured Deals">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {deals(products)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.slug} product={p} compact />
            ))}
        </div>
      </Section>

      <Section title="Why Shop With Us">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(([Icon, title, copy]) => (
            <div key={title} className="rounded-sm border border-border bg-card p-5">
              <Icon className="h-5 w-5 text-gold" />
              <p className="mt-3 font-display text-sm">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="How to Order">
        <ol className="grid gap-4 sm:grid-cols-4">
          {[
            "Browse or search the vault",
            "Pick your size and colour",
            "Add to cart or tap WhatsApp",
            "We confirm and deliver",
          ].map((step, i) => (
            <li key={step} className="rounded-sm border border-border bg-card p-5">
              <p className="font-display text-2xl text-gold">0{i + 1}</p>
              <p className="mt-2 text-sm text-muted-foreground">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Customer Reviews">
        <div className="grid gap-4 sm:grid-cols-3">
          {REVIEWS.map(([name, quote]) => (
            <figure key={name} className="rounded-sm border border-border bg-card p-5">
              <blockquote className="text-sm text-muted-foreground">“{quote}”</blockquote>
              <figcaption className="label-xs mt-3 text-gold">{name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Call to order */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <p className="label-xs text-muted-foreground">Contact</p>
          <h2 className="mt-2 font-display text-3xl">Call to Order</h2>
          <a href={`tel:${WHATSAPP_DISPLAY}`} className="mt-2 block font-display text-4xl text-gold">
            {WHATSAPP_DISPLAY}
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            Available for calls and WhatsApp. Send the item name and your size, and we'll confirm
            availability and delivery.
          </p>
        </div>
      </section>
    </>
  );
}
