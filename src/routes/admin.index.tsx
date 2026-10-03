import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useCatalog, useRefreshCatalog, type ManagedProduct } from "@/lib/catalog";
import { CATEGORIES, PRODUCTS, cedis } from "@/lib/products";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Products — Pobe's Vault" },
      { name: "description", content: "Manage the Pobe's Vault product catalogue." },
      { property: "og:title", content: "Products — Pobe's Vault" },
      { property: "og:description", content: "Manage the Pobe's Vault product catalogue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProductsAdmin,
});

type Draft = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  old_price: string;
  images: string;
  sizes: string;
  colours: string;
  in_stock: boolean;
  badges: string;
  best_seller_rank: string;
  description: string;
};

const EMPTY: Draft = {
  slug: "",
  name: "",
  brand: "",
  category: "Shoes",
  price: "",
  old_price: "",
  images: "",
  sizes: "",
  colours: "",
  in_stock: true,
  badges: "",
  best_seller_rank: "",
  description: "",
};

const list = (s: string) =>
  s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function toDraft(p: ManagedProduct): Draft {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: String(p.price),
    old_price: p.oldPrice ? String(p.oldPrice) : "",
    images: p.images.join(", "),
    sizes: p.sizes.join(", "),
    colours: p.colours.join(", "),
    in_stock: p.inStock,
    badges: p.badges.join(", "),
    best_seller_rank: p.bestSellerRank ? String(p.bestSellerRank) : "",
    description: p.description,
  };
}

function ProductsAdmin() {
  const { managed, usingFallback } = useCatalog();
  const refresh = useRefreshCatalog();
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const input =
    "h-11 w-full rounded-sm border border-border bg-card px-3 text-sm text-foreground focus:border-gold focus:outline-none";

  const importStarter = async () => {
    setBusy(true);
    const rows = PRODUCTS.map((p) => ({
      slug: p.slug,
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      old_price: p.oldPrice ?? null,
      images: p.images,
      sizes: p.sizes,
      colours: p.colours,
      in_stock: p.inStock,
      badges: p.badges,
      best_seller_rank: p.bestSellerRank ?? null,
      added_index: p.addedIndex,
      description: p.description,
    }));
    const { error } = await supabase.from("products").upsert(rows, { onConflict: "slug" });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Imported ${rows.length} products`);
    refresh();
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    const slug = draft.slug.trim() || slugify(draft.name);
    if (!draft.name.trim() || !slug) {
      toast.error("Name is required");
      return;
    }
    const payload = {
      slug,
      name: draft.name.trim(),
      brand: draft.brand.trim(),
      category: draft.category,
      price: Number(draft.price) || 0,
      old_price: draft.old_price ? Number(draft.old_price) : null,
      images: list(draft.images),
      sizes: list(draft.sizes),
      colours: list(draft.colours),
      in_stock: draft.in_stock,
      badges: list(draft.badges),
      best_seller_rank: draft.best_seller_rank ? Number(draft.best_seller_rank) : null,
      description: draft.description,
    };
    setBusy(true);
    const res = editing
      ? await supabase.from("products").update(payload).eq("id", editing)
      : await supabase
          .from("products")
          .insert({ ...payload, added_index: managed.length + 100 });
    setBusy(false);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success(editing ? "Product updated" : "Product added");
    setDraft(null);
    setEditing(null);
    refresh();
  };

  const uploadPhotos = async (files: FileList | null) => {
    if (!draft || !files?.length) return;
    const selected = Array.from(files);
    const invalid = selected.find((file) => !file.type.startsWith("image/") || file.size > 10 * 1024 * 1024);
    if (invalid) {
      toast.error("Choose image files smaller than 10 MB each");
      return;
    }

    setUploading(true);
    const uploaded: string[] = [];
    try {
      for (const file of selected) {
        const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        const path = `${crypto.randomUUID()}.${extension}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, {
          cacheControl: "31536000",
          contentType: file.type,
        });
        if (error) throw error;
        const { data, error: signError } = await supabase.storage
          .from("product-images")
          .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
        if (signError) throw signError;
        uploaded.push(data.signedUrl);
      }
      setDraft((current) => current ? { ...current, images: [...list(current.images), ...uploaded].join(", ") } : current);
      toast.success(`${uploaded.length} photo${uploaded.length === 1 ? "" : "s"} uploaded`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Photos could not be uploaded");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const remove = async (p: ManagedProduct) => {
    if (!confirm(`Delete ${p.name}?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Product deleted");
    refresh();
  };

  const toggleStock = async (p: ManagedProduct) => {
    const { error } = await supabase
      .from("products")
      .update({ in_stock: !p.inStock })
      .eq("id", p.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    refresh();
  };

  return (
    <div className="space-y-6">
      {usingFallback && (
        <div className="rounded-sm border border-gold/50 bg-card p-4">
          <h2 className="font-display text-lg">Import your current catalogue</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your database has no products yet, so the site is showing the built-in catalogue. Import
            it once and you can edit everything from here.
          </p>
          <button
            onClick={importStarter}
            disabled={busy}
            className="label-xs mt-4 rounded-sm bg-gold px-5 py-3 text-gold-foreground disabled:opacity-60"
          >
            {busy ? "Importing…" : `Import ${PRODUCTS.length} products`}
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">{managed.length} product(s) in the database</p>
        <button
          onClick={() => {
            setEditing(null);
            setDraft(EMPTY);
          }}
          className="label-xs rounded-sm bg-gold px-4 py-2 text-gold-foreground"
        >
          Add product
        </button>
      </div>

      {draft && (
        <form onSubmit={save} className="grid gap-3 rounded-sm border border-border bg-card p-4 sm:grid-cols-2">
          <h2 className="font-display text-lg sm:col-span-2">
            {editing ? "Edit product" : "New product"}
          </h2>
          <div className="rounded-sm border border-border p-3 sm:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="label-xs text-muted-foreground">Product photos</p>
                <p className="mt-1 text-xs text-muted-foreground">Choose one or more photos from your gallery.</p>
              </div>
              <Button type="button" variant="gold" disabled={uploading} onClick={() => fileInput.current?.click()} className="label-xs inline-flex items-center gap-2 rounded-sm px-4 py-2">
                <ImagePlus className="h-4 w-4" /> {uploading ? "Uploading…" : "Choose photos"}
              </Button>
              <input ref={fileInput} type="file" accept="image/*" multiple className="hidden" onChange={(event) => uploadPhotos(event.target.files)} />
            </div>
            {list(draft.images).length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {list(draft.images).map((src, index) => (
                  <div key={`${src}-${index}`} className="relative aspect-square overflow-hidden rounded-sm bg-secondary">
                    <img src={src} alt={`Product preview ${index + 1}`} className="h-full w-full object-cover" />
                    <button type="button" aria-label={`Remove photo ${index + 1}`} onClick={() => setDraft({ ...draft, images: list(draft.images).filter((_, photoIndex) => photoIndex !== index).join(", ") })} className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-background/90 text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {(
            [
              ["name", "Name"],
              ["brand", "Brand"],
              ["price", "Price (GH₵)"],
              ["old_price", "Old price (optional)"],
              ["images", "Image links (optional when using gallery upload)"],
              ["sizes", "Sizes (comma separated)"],
              ["colours", "Colours (comma separated)"],
              ["badges", "Badges (NEW, BEST SELLER, SALE, LIMITED)"],
              ["best_seller_rank", "Best seller rank (optional)"],
              ["slug", "URL slug (auto from name if blank)"],
            ] as [keyof Draft, string][]
          ).map(([key, label]) => (
            <div key={key}>
              <label className="label-xs text-muted-foreground" htmlFor={key}>
                {label}
              </label>
              <input
                id={key}
                value={String(draft[key] ?? "")}
                onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                className={input + " mt-1"}
              />
            </div>
          ))}
          <div>
            <label className="label-xs text-muted-foreground" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              className={input + " mt-1"}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <label className="mt-6 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.in_stock}
              onChange={(e) => setDraft({ ...draft, in_stock: e.target.checked })}
            />
            In stock
          </label>
          <div className="sm:col-span-2">
            <label className="label-xs text-muted-foreground" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              className="mt-1 w-full rounded-sm border border-border bg-card p-3 text-sm focus:border-gold focus:outline-none"
            />
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              disabled={busy}
              className="label-xs rounded-sm bg-gold px-5 py-3 text-gold-foreground disabled:opacity-60"
            >
              {busy ? "Saving…" : "Save product"}
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft(null);
                setEditing(null);
              }}
              className="label-xs rounded-sm border border-border px-5 py-3"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mb-4">
  <input
    type="text"
    placeholder="Search products to edit..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className={input}
  />
</div>

<ul className="space-y-2">
  {managed
    .filter((p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center gap-3 rounded-sm border border-border bg-card p-3"
          >
            <img
              src={p.images[0]}
              alt={p.name}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-sm object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{p.name}</p>
              <p className="text-xs text-muted-foreground">
                {p.category} · {cedis(p.price)} · {p.inStock ? "In stock" : "Sold out"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleStock(p)}
                className="label-xs rounded-sm border border-border px-3 py-2"
              >
                {p.inStock ? "Mark sold out" : "Mark in stock"}
              </button>
              <button
                onClick={() => {
                  setEditing(p.id);
                  setDraft(toDraft(p));
                }}
                className="label-xs rounded-sm border border-border px-3 py-2 hover:border-gold"
              >
                Edit
              </button>
              <button
                onClick={() => remove(p)}
                className="label-xs rounded-sm border border-border px-3 py-2 text-destructive"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
