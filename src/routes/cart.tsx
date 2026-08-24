import { Link, createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { PageHeader } from "@/components/page";
import { cartWaLink, useCart } from "@/lib/cart";
import { cedis } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Pobe's Vault" },
      {
        name: "description",
        content: "Review your selected pieces, adjust size, colour and quantity, then checkout or order via WhatsApp.",
      },
      { property: "og:title", content: "Your Cart — Pobe's Vault" },
      { property: "og:description", content: "Review your order before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, update, remove, subtotal, total } = useCart();

  const selectCls =
    "h-9 rounded-sm border border-border bg-background px-2 text-xs text-foreground focus:border-gold focus:outline-none";

  return (
    <>
      <PageHeader eyebrow="Checkout" title="Your Cart" />
      <div className="mx-auto max-w-7xl px-4 py-8">
        {detailed.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/shop"
              className="label-xs mt-5 inline-block rounded-sm bg-gold px-5 py-3 text-gold-foreground"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-4">
              {detailed.map(({ line, product }, i) => (
                <div
                  key={`${line.slug}-${line.size}-${line.colour}`}
                  className="grid grid-cols-[80px_minmax(0,1fr)] gap-4 rounded-sm border border-border bg-card p-3"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-sm object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        to="/product/$slug"
                        params={{ slug: product.slug }}
                        className="min-w-0 font-display text-sm hover:text-gold"
                      >
                        {product.name}
                      </Link>
                      <button
                        onClick={() => remove(i)}
                        aria-label="Remove item"
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gold">{cedis(product.price * line.qty)}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <select
                        className={selectCls}
                        value={line.size}
                        onChange={(e) => update(i, { size: e.target.value })}
                      >
                        {product.sizes.map((s) => (
                          <option key={s} value={s}>
                            Size {s}
                          </option>
                        ))}
                      </select>
                      <select
                        className={selectCls}
                        value={line.colour}
                        onChange={(e) => update(i, { colour: e.target.value })}
                      >
                        {product.colours.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <select
                        className={selectCls}
                        value={line.qty}
                        onChange={(e) => update(i, { qty: Number(e.target.value) })}
                      >
                        {Array.from({ length: 10 }, (_, n) => n + 1).map((n) => (
                          <option key={n} value={n}>
                            Qty {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-sm border border-border bg-card p-5">
              <h2 className="font-display text-lg">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{cedis(subtotal)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Delivery</dt>
                  <dd className="text-right text-xs text-muted-foreground">
                    Varies by location — confirmed on WhatsApp
                  </dd>
                </div>
                <div className="hairline flex justify-between pt-3 font-bold">
                  <dt>Total</dt>
                  <dd className="text-gold">{cedis(total)}</dd>
                </div>
              </dl>
              <div className="mt-5 grid gap-3">
                <Link
                  to="/checkout"
                  className="label-xs rounded-sm bg-primary py-3 text-center text-primary-foreground"
                >
                  Checkout
                </Link>
                <a
                  href={cartWaLink(detailed, { subtotal, total })}
                  target="_blank"
                  rel="noreferrer"
                  className="label-xs rounded-sm bg-gold py-3 text-center text-gold-foreground"
                >
                  Order via WhatsApp
                </a>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
