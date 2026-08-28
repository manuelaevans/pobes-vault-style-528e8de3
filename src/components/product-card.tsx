import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { productWaLink, useCart } from "@/lib/cart";
import { cedis, type Product } from "@/lib/products";

export function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { add } = useCart();
  const badges = product.inStock ? product.badges : (["OUT OF STOCK"] as const);
  const size = product.sizes[0] ?? "One Size";
  const colour = product.colours[0] ?? "—";

  if (compact) {
    return (
      <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="flex flex-1 flex-col"
        >
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              width={1000}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              {badges.map((b) => (
                <span
                  key={b}
                  className={
                    "label-xs rounded-sm px-2 py-1 " +
                    (b === "SALE" || b === "OUT OF STOCK"
                      ? "bg-destructive text-destructive-foreground"
                      : b === "NEW"
                        ? "bg-gold text-gold-foreground"
                        : "bg-background/85 text-foreground")
                  }
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="absolute inset-0 grid place-items-center bg-background/60 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="label-xs rounded-sm bg-gold px-4 py-2 text-gold-foreground">
                View Product
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1 p-3">
            <p className="min-w-0 font-display text-sm leading-tight group-hover:text-gold">
              {product.name}
            </p>
            <div className="mt-auto">
              <p className="text-sm font-bold text-gold">GH¢{product.price.toLocaleString()}</p>
              {product.oldPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {cedis(product.oldPrice)}
                </p>
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-secondary"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width={1000}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {badges.map((b) => (
            <span
              key={b}
              className={
                "label-xs rounded-sm px-2 py-1 " +
                (b === "SALE" || b === "OUT OF STOCK"
                  ? "bg-destructive text-destructive-foreground"
                  : b === "NEW"
                    ? "bg-gold text-gold-foreground"
                    : "bg-background/85 text-foreground")
              }
            >
              {b}
            </span>
          ))}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="min-w-0 font-display text-sm leading-tight hover:text-gold"
          >
            {product.name}
          </Link>
          <div className="shrink-0 text-right">
            <p className="text-sm font-bold text-gold">{cedis(product.price)}</p>
            {product.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {cedis(product.oldPrice)}
              </p>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          {product.brand} · Sizes {product.sizes.join(", ")}
        </p>
        <p className="text-xs text-muted-foreground">
          Colours: {product.colours.join(", ")} ·{" "}
          <span className={product.inStock ? "text-gold" : "text-destructive"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </span>
        </p>

        <div className="mt-auto grid gap-2 pt-2">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="label-xs rounded-sm border border-border py-2 text-center hover:border-gold"
          >
            View Product
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <button
              disabled={!product.inStock}
              onClick={() => {
                add({ slug: product.slug, size, colour, qty: 1 });
                toast.success(`${product.name} added to cart`);
              }}
              className="label-xs rounded-sm bg-primary py-2 text-primary-foreground disabled:opacity-40"
            >
              Add to Cart
            </button>
            <a
              href={productWaLink(product, { size, colour, qty: 1 })}
              target="_blank"
              rel="noreferrer"
              aria-label="Order via WhatsApp"
              className="grid place-items-center rounded-sm bg-gold py-2 text-gold-foreground"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
