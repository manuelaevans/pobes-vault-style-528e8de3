import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { PageHeader } from "@/components/page";
import { SearchBar } from "@/components/search-bar";
import {
  CATEGORIES,
  PRODUCTS,
  allColours,
  allSizes,
  searchProducts,
} from "@/lib/products";

export type ShopSearch = {
  q?: string | undefined;
  category?: string | undefined;
  sort?: string | undefined;
  size?: string | undefined;
  colour?: string | undefined;
  availability?: string | undefined;
  maxPrice?: number | undefined;
  page?: number | undefined;
};

const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: str(search["q"]),
    category: str(search["category"]),
    sort: str(search["sort"]),
    size: str(search["size"]),
    colour: str(search["colour"]),
    availability: str(search["availability"]),
    maxPrice: Number(search["maxPrice"]) > 0 ? Number(search["maxPrice"]) : undefined,
    page: Number(search["page"]) > 0 ? Number(search["page"]) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Products — Pobe's Vault" },
      {
        name: "description",
        content:
          "Browse shoes, shirts, jeans, pants, shorts, slides and accessories at Pobe's Vault. Filter by size, colour and price, then order via cart or WhatsApp.",
      },
      { property: "og:title", content: "Shop All Products — Pobe's Vault" },
      {
        property: "og:description",
        content: "Carefully selected clothing, footwear and accessories, delivered in Ghana.",
      },
    ],
  }),
  component: ShopPage,
});

const SORTS = [
  ["featured", "Featured"],
  ["newest", "Newest"],
  ["best", "Best Selling"],
  ["price-asc", "Price: Low to High"],
  ["price-desc", "Price: High to Low"],
] as const;

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const set = (patch: ShopSearch) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  let list = searchProducts(search.q ?? "", PRODUCTS);
  if (search.category) list = list.filter((p) => p.category === search.category);
  if (search.size) list = list.filter((p) => p.sizes.includes(search.size!));
  if (search.colour) list = list.filter((p) => p.colours.includes(search.colour!));
  if (search.availability === "in") list = list.filter((p) => p.inStock);
  if (search.maxPrice) list = list.filter((p) => p.price <= search.maxPrice!);

  const sort = search.sort ?? "featured";
  list = [...list].sort((a, b) => {
    if (sort === "newest") return b.addedIndex - a.addedIndex;
    if (sort === "best") return (a.bestSellerRank ?? 99) - (b.bestSellerRank ?? 99);
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return (a.bestSellerRank ?? 50) - (b.bestSellerRank ?? 50);
  });

  const selectCls =
    "h-10 w-full rounded-sm border border-border bg-card px-2 text-sm text-foreground focus:border-gold focus:outline-none";

  return (
    <>
      <PageHeader
        eyebrow="The Vault"
        title="Shop"
        subtitle="Every piece in stock right now. Filter, sort and order in a few taps."
      />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <SearchBar initial={search.q ?? ""} />

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {["All Products", ...CATEGORIES].map((c) => {
            const active =
              c === "All Products" ? !search.category : search.category === c;
            return (
              <button
                key={c}
                onClick={() =>
                  set({ category: c === "All Products" ? undefined : c, page: 1 })
                }
                className={
                  "label-xs shrink-0 rounded-sm border px-3 py-2 " +
                  (active
                    ? "border-gold bg-gold text-gold-foreground"
                    : "border-border text-muted-foreground hover:border-gold")
                }
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <select
            className={selectCls}
            value={search.size ?? ""}
            onChange={(e) => set({ size: e.target.value || undefined })}
          >
            <option value="">All sizes</option>
            {allSizes().map((s) => (
              <option key={s} value={s}>
                Size {s}
              </option>
            ))}
          </select>
          <select
            className={selectCls}
            value={search.colour ?? ""}
            onChange={(e) => set({ colour: e.target.value || undefined })}
          >
            <option value="">All colours</option>
            {allColours().map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className={selectCls}
            value={search.maxPrice ?? ""}
            onChange={(e) => set({ maxPrice: Number(e.target.value) || undefined })}
          >
            <option value="">Any price</option>
            <option value="150">Under GH₵150</option>
            <option value="300">Under GH₵300</option>
            <option value="500">Under GH₵500</option>
          </select>
          <select
            className={selectCls}
            value={search.availability ?? ""}
            onChange={(e) => set({ availability: e.target.value || undefined })}
          >
            <option value="">All items</option>
            <option value="in">In stock only</option>
          </select>
          <select
            className={selectCls}
            value={sort}
            onChange={(e) => set({ sort: e.target.value })}
          >
            {SORTS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          {list.length} {list.length === 1 ? "piece" : "pieces"}
          {search.q ? ` matching “${search.q}”` : ""}
        </p>

        {list.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Nothing matches that yet. Try a different search or message us on WhatsApp — we
            may be able to source it.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
