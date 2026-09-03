import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cedis, searchProducts } from "@/lib/products";
import { useProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function SearchBar({
  className,
  placeholder = "Search products, brands or categories…",
  initial = "",
}: {
  className?: string;
  placeholder?: string;
  initial?: string;
}) {
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const products = useProducts();
  const suggestions = q.trim() ? searchProducts(q, products).slice(0, 5) : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate({ to: "/shop", search: (prev) => ({ ...prev, q: q.trim(), page: 1 }) });
  };

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <form onSubmit={submit}>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-label="Search products"
          className="h-11 w-full rounded-sm border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
        />
      </form>
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-sm border border-border bg-popover shadow-xl">
          {suggestions.map((p) => (
            <Link
              key={p.slug}
              to="/product/$slug"
              params={{ slug: p.slug }}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-accent"
            >
              <img
                src={p.images[0]}
                alt={p.name}
                loading="lazy"
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-sm object-cover"
              />
              <span className="min-w-0 flex-1 truncate text-sm">{p.name}</span>
              <span className="shrink-0 text-xs text-gold">{cedis(p.price)}</span>
            </Link>
          ))}
          <button
            onClick={submit}
            className="label-xs w-full border-t border-border px-3 py-2 text-left text-muted-foreground hover:text-gold"
          >
            See all results
          </button>
        </div>
      )}
    </div>
  );
}
