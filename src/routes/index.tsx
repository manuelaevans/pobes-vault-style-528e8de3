import { Link, createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, HeartHandshake, MessageCircle, Repeat, Ruler, Sparkles, Truck } from "lucide-react";
import heroAsset from "@/assets/pobes-vault-hero-oldskool-denim.png.asset.json";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/cart";
import { useProducts } from "@/lib/catalog";
import { WHATSAPP_DISPLAY, allCategories, bestSellers, newArrivals } from "@/lib/products";

const HERO_ASSET_ORIGIN = "https://project--14a28129-2d22-4409-9035-75f377d838a4-dev.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pobe's Vault - Premium Fashion in Ghana" },
      {
        name: "description",
        content: "Shop curated sneakers, clothing and accessories at Pobe's Vault.",
      },
      { property: "og:title", content: "Pobe's Vault - Premium Fashion in Ghana" },
      { property: "og:description", content: "Curated sneakers, clothing and accessories." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.pobesvault.com" },
      
      
      { property: "og:image", content: "https://www.pobesvault.com/logo.png" },
      { name: "twitter:image", content: "https://www.pobesvault.com/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.pobesvault.com" }],
  }),
  component: Index,
});

const WHY = [
  [Sparkles, "Curated pieces", "Every item is hand-picked for style, quality and everyday wear."],
  [BadgeCheck, "Fair value", "Premium fashion at clear, competitive prices."],
  [Truck, "Nationwide delivery", "30–50 GHS in Accra, 60–80 GHS outside Accra. Pay on delivery."],
  [HeartHandshake, "Personal service", "Real support before, during and after your order."],
] as const;

const TRUST_ITEMS = [
  [Truck, "Nationwide Delivery"],
  [MessageCircle, "Easy WhatsApp Ordering"],
  [Ruler, "Size Assistance"],
  [Repeat, "3-Day Exchanges"],
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
      <section className="border-b border-border bg-bone">
        <div className="relative mx-auto aspect-[1084/1920] w-full max-w-[768px] overflow-hidden">
          <img src={`${HERO_ASSET_ORIGIN}${heroAsset.url}`} alt="Black Vans Old Skool sneaker styled over folded blue denim" width={1084} height={1920} className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-background/95 via-background/60 to-transparent px-6 pt-10 sm:px-10 sm:pt-14">
            <p className="label-xs text-gold">Accra · Ghana · Est. 2026</p>
            <h1 className="mt-4 max-w-sm font-display text-6xl leading-[0.86] text-foreground sm:text-7xl">Pobe's<br /><span className="text-gold">Vault</span></h1>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground">Curated sneakers, easy streetwear and everyday pieces selected to make an impression.</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent px-6 pb-8 pt-24 sm:px-10">
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gold" className="label-xs h-11 rounded-none px-5"><Link to="/shop">Enter the vault</Link></Button>
              <Button asChild variant="outline" className="label-xs h-11 rounded-none border-foreground bg-background/70 px-5 text-foreground"><Link to="/new-arrivals">Latest drops</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Explore collections" className="border-b border-border bg-bone">
        <div className="mx-auto flex max-w-[1440px] items-center gap-8 overflow-x-auto px-4 py-6 sm:px-6 lg:justify-center lg:px-12">
          <p className="label-xs shrink-0 text-muted-foreground">Explore Collections</p>
          {allCategories(products).map((category) => (
            <Link
              key={category}
              to="/shop"
              search={{ category }}
              className="label-xs shrink-0 whitespace-nowrap text-foreground transition-colors hover:text-gold"
            >
              {category}
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-b border-border bg-background">
        <ul className="mx-auto flex max-w-[1440px] items-center justify-start gap-x-4 gap-y-2 overflow-x-auto px-4 py-4 sm:justify-center sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-12">
          {TRUST_ITEMS.map(([Icon, label], i) => (
            <li key={label} className="flex shrink-0 items-center gap-2">
              {i > 0 && <span aria-hidden className="mr-2 hidden text-border sm:inline">·</span>}
              <Icon className="h-4 w-4 shrink-0 text-gold" />
              <span className="label-xs whitespace-nowrap text-foreground">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-12 lg:py-28">
        <CollectionHeading eyebrow="Just landed" title="Latest Acquisitions" href="/new-arrivals" />
         <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 lg:gap-x-8">
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