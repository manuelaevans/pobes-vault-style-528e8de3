import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { productWaLink, useCart, waLink } from "@/lib/cart";
import { bySlug, cedis, relatedTo } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = bySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Pobe's Vault" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Pobe's Vault`;
    const description = product.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "One Size");
  const [colour, setColour] = useState(product.colours[0] ?? "—");
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);

  const chip = (active: boolean) =>
    "label-xs rounded-sm border px-3 py-2 " +
    (active ? "border-gold bg-gold text-gold-foreground" : "border-border text-muted-foreground");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="label-xs mb-5 text-muted-foreground">
        <Link to="/shop" className="hover:text-gold">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{product.category}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-sm border border-border bg-secondary">
            <img
              src={product.images[img]}
              alt={product.name}
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImg(i)}
                  className={
                    "h-20 w-20 overflow-hidden rounded-sm border " +
                    (i === img ? "border-gold" : "border-border")
                  }
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="label-xs text-gold">{product.brand}</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <p className="font-display text-3xl text-gold">{cedis(product.price)}</p>
            {product.oldPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {cedis(product.oldPrice)}
              </p>
            )}
          </div>
          <p className="mt-1 text-xs">
            <span className={product.inStock ? "text-gold" : "text-destructive"}>
              {product.inStock ? "In stock — ready to ship" : "Out of stock"}
            </span>
          </p>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="label-xs text-muted-foreground">Select size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={chip(s === size)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="label-xs text-muted-foreground">Select colour</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colours.map((c) => (
                <button key={c} onClick={() => setColour(c)} className={chip(c === colour)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="label-xs text-muted-foreground">Quantity</p>
            <div className="mt-2 inline-flex items-center rounded-sm border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-lg"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                className="px-4 py-2 text-lg"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              disabled={!product.inStock}
              onClick={() => {
                add({ slug: product.slug, size, colour, qty });
                toast.success("Added to cart");
              }}
              className="label-xs rounded-sm bg-primary py-3 text-primary-foreground disabled:opacity-40"
            >
              Add to Cart
            </button>
            <a
              href={productWaLink(product, { size, colour, qty })}
              target="_blank"
              rel="noreferrer"
              className="label-xs rounded-sm bg-gold py-3 text-center text-gold-foreground"
            >
              Order via WhatsApp
            </a>
          </div>

          <div className="mt-8 divide-y divide-border border-y border-border text-sm">
            <details className="py-3">
              <summary className="label-xs cursor-pointer">Size Guide</summary>
              <p className="mt-2 text-muted-foreground">
                Sizes run true to standard fit. See the full{" "}
                <Link to="/size-guide" className="text-gold">
                  size guide
                </Link>{" "}
                or{" "}
                <a href={waLink("Hi Pobe's Vault, please help me pick a size.")} className="text-gold" target="_blank" rel="noreferrer">
                  ask us on WhatsApp
                </a>
                .
              </p>
            </details>
            <details className="py-3">
              <summary className="label-xs cursor-pointer">Delivery Information</summary>
              <p className="mt-2 text-muted-foreground">
                Accra delivery in 1–2 days, other regions 2–4 days. Pickup available in Accra.{" "}
                <Link to="/delivery" className="text-gold">
                  Delivery details
                </Link>
                .
              </p>
            </details>
            <details className="py-3">
              <summary className="label-xs cursor-pointer">Returns & Exchanges</summary>
              <p className="mt-2 text-muted-foreground">
                Size exchanges within 3 days of delivery, item unworn and in original
                condition.{" "}
                <Link to="/returns" className="text-gold">
                  Full policy
                </Link>
                .
              </p>
            </details>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl">You May Also Like</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {relatedTo(product).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
