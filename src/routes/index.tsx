import { Link, createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, HeartHandshake, Sparkles, Truck } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { BrandMark } from "@/components/brand-mark";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/cart";
import { useProducts } from "@/lib/catalog";
import { CATEGORIES, WHATSAPP_DISPLAY, bestSellers, newArrivals } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pobe's Vault — Premium Fashion in Ghana" },
      {
        name: "description",
        content: "Shop curated sneakers, clothing and accessories at Pobe's Vault, with secure checkout and nationwide delivery in Ghana.",
      },
      { property: "og:title", content: "Pobe's Vault — Premium Fashion in Ghana" },
      { property: "og:description", content: "Curated sneakers, clothing and accessories from Ghana's fashion vault." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.pobesvault.com" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.pobesvault.com" }],
  }),
  component: Index,
});

const WHY = [
  [Sparkles, "Curated pieces", "Every item is hand-picked for style, quality and everyday wear."],
  [BadgeCheck, "Fair value", "Premium fashion at clear, competitive prices."],
  [Truck, "Nationwide delivery", "Delivery is arranged based on your location in Ghana."],
  [HeartHandshake, "Personal service", "Real support before, during and after your order."],
] as const;

function CollectionHeading({ eyebrow, title, href }: { eyebrow: string; title: string; href: "/new-arrivals" | "/best-sellers" }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-5 border-b border-border pb-5">
      <div>
        <p className="label-xs text-gold">{eyebrow}</p>
        <h2 className="mt-2 font-display text-4xl leading-none sm:text-5xl">{title}</h2>
      </div>
      <Link to={href} className="label-xs shrink-0 border-b border-gold pb-1 text-gold">View all</Link>
    </div>
  );
}

function Index() {
  const products = useProducts();
  const arrivals = newArrivals(products).slice(0, 4);
  const sellers = bestSellers(products).slice(0, 4);

  return (
    <>
      <section className="relative min-h-[calc(100svh-7rem)] overflow-hidden border-b border-border lg:min-h-[720px]">
        <img src={heroImg} alt="Pobe's Vault curated sneakers and fashion" width={1600} height={1200} className="absolute inset-0 h-full w-full object-cover object-center" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20" />
        <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-[1440px] items-center px-4 py-16 sm:px-6 lg:min-h-[720px] lg:px-12">
          <div className="max-w-3xl animate-fade-in">
            <div className="mb-5 flex items-center gap-3">
              <BrandMark className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
              <p className="label-xs text-gold">Accra · Ghana · Est. 2026</p>
            </div>
            <h1 className="max-w-2xl font-display text-6xl leading-[0.88] sm:text-8xl lg:text-9xl">Pobe's<br /><span className="text-gold">Vault</span></h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">Step into a private edit of standout sneakers, easy streetwear and everyday pieces selected to make an impression.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg" className="label-xs h-12 rounded-none px-8"><Link to="/shop">Enter the vault</Link></Button>
              <Button asChild variant="outline" size="lg" className="label-xs h-12 rounded-none bg-background/45 px-8 backdrop-blur"><Link to="/new-arrivals">Latest drops</Link></Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 overflow-x-auto px-4 py-4 sm:px-6 lg:px-12">
            <span className="label-xs shrink-0 text-muted-foreground">Explore collections</span>
            <div className="flex gap-6">
              {CATEGORIES.map((category) => <Link key={category} to="/shop" search={{ category }} className="label-xs shrink-0 transition-colors hover:text-gold">{category}</Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <CollectionHeading eyebrow="Just landed" title="Latest Acquisitions" href="/new-arrivals" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-8">
          {arrivals.map((product) => <ProductCard key={product.slug} product={product} compact />)}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
            <p className="label-xs text-gold">The Pobe's edit</p>
            <h2 className="mt-3 max-w-md font-display text-5xl leading-[0.95] sm:text-6xl">Built for your next look.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">From low-key staples to statement footwear, every drop is chosen to work hard in your wardrobe.</p>
            <Button asChild variant="outline" className="label-xs mt-8 h-12 w-fit rounded-none px-7"><Link to="/about">Our story</Link></Button>
          </div>
          <div className="grid grid-cols-2 border-t border-border lg:border-l lg:border-t-0">
            {WHY.map(([Icon, title, copy]) => (
              <div key={title} className="min-h-52 border-b border-r border-border p-6 sm:p-8">
                <Icon className="h-6 w-6 text-gold" />
                <h3 className="mt-8 font-display text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <CollectionHeading eyebrow="Vault favourites" title="Best Sellers" href="/best-sellers" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-8">
          {sellers.map((product) => <ProductCard key={product.slug} product={product} compact />)}
        </div>
      </section>

      <section className="border-y border-border bg-gold text-gold-foreground">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-7 px-4 py-12 sm:px-6 md:flex-row md:items-center lg:px-12">
          <div><p className="label-xs opacity-70">Direct ordering</p><h2 className="mt-2 font-display text-4xl sm:text-5xl">Found your pair?</h2><p className="mt-2 max-w-xl text-sm opacity-80">Message us for sizing, availability and delivery details.</p></div>
          <Button asChild size="lg" className="label-xs h-12 shrink-0 rounded-none bg-background px-8 text-foreground hover:bg-background/90"><a href={waLink("Hi Pobe's Vault, I'd like to order.")} target="_blank" rel="noreferrer">WhatsApp {WHATSAPP_DISPLAY}</a></Button>
        </div>
      </section>
    </>
  );
}