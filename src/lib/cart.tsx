import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, WHATSAPP_NUMBER, cedis, type Product } from "./products";

export type CartLine = {
  slug: string;
  size: string;
  colour: string;
  qty: number;
};

type CartCtx = {
  lines: CartLine[];
  add: (line: CartLine) => void;
  remove: (index: number) => void;
  update: (index: number, patch: Partial<CartLine>) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  total: number;
  detailed: { line: CartLine; product: Product }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "pobes-vault-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const detailed = lines
      .map((line) => ({ line, product: PRODUCTS.find((p) => p.slug === line.slug)! }))
      .filter((x) => Boolean(x.product));
    const subtotal = detailed.reduce((s, x) => s + x.product.price * x.line.qty, 0);
    return {
      lines,
      detailed,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      total: subtotal,
      add: (line) =>
        setLines((prev) => {
          const i = prev.findIndex(
            (l) => l.slug === line.slug && l.size === line.size && l.colour === line.colour,
          );
          const existing = prev[i];
          if (existing) {
            const next = [...prev];
            next[i] = { ...existing, qty: existing.qty + line.qty };
            return next;
          }
          return [...prev, line];
        }),
      remove: (index) => setLines((prev) => prev.filter((_, i) => i !== index)),
      update: (index, patch) =>
        setLines((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l))),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productWaLink(
  p: Product,
  opts: { size?: string; colour?: string; qty?: number } = {},
) {
  const msg = [
    "Hi Pobe's Vault, I'd like to order:",
    "",
    `Product: ${p.name}`,
    `Size: ${opts.size ?? "—"}`,
    `Colour: ${opts.colour ?? "—"}`,
    `Quantity: ${opts.qty ?? 1}`,
    `Price: ${cedis(p.price * (opts.qty ?? 1))}`,
    "",
    "Thank you.",
  ].join("\n");
  return waLink(msg);
}

export function cartWaLink(
  detailed: { line: CartLine; product: Product }[],
  totals: { subtotal: number; deliveryFee: number; total: number },
  customer?: string,
) {
  const msg = [
    "Hi Pobe's Vault, I'd like to order:",
    "",
    ...detailed.map(
      ({ line, product }, i) =>
        `${i + 1}. ${product.name} | Size: ${line.size} | Colour: ${line.colour} | Qty: ${line.qty} | ${cedis(product.price * line.qty)}`,
    ),
    "",
    `Subtotal: ${cedis(totals.subtotal)}`,
    `Delivery: ${cedis(totals.deliveryFee)}`,
    `Total: ${cedis(totals.total)}`,
    ...(customer ? ["", customer] : []),
    "",
    "Thank you.",
  ].join("\n");
  return waLink(msg);
}
