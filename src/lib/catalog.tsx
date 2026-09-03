import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PRODUCTS, type Badge, type Category, type Product } from "./products";

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  old_price: number | null;
  images: string[];
  sizes: string[];
  colours: string[];
  in_stock: boolean;
  badges: string[];
  best_seller_rank: number | null;
  added_index: number;
  description: string;
};

export type ManagedProduct = Product & { id: string };

export function rowToProduct(row: ProductRow): ManagedProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category as Category,
    price: Number(row.price),
    ...(row.old_price != null ? { oldPrice: Number(row.old_price) } : {}),
    images: row.images ?? [],
    sizes: row.sizes ?? [],
    colours: row.colours ?? [],
    inStock: row.in_stock,
    badges: (row.badges ?? []) as Badge[],
    ...(row.best_seller_rank != null ? { bestSellerRank: row.best_seller_rank } : {}),
    addedIndex: row.added_index,
    description: row.description,
  };
}

export const productsQueryKey = ["catalog", "products"];

export async function fetchProducts(): Promise<ManagedProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("added_index", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => rowToProduct(row as unknown as ProductRow));
}

type CatalogCtx = {
  products: Product[];
  managed: ManagedProduct[];
  isLoading: boolean;
  usingFallback: boolean;
};

const Ctx = createContext<CatalogCtx | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
    staleTime: 30_000,
  });

  const value = useMemo<CatalogCtx>(() => {
    const managed = data ?? [];
    const usingFallback = managed.length === 0;
    return {
      managed,
      products: usingFallback ? PRODUCTS : managed,
      isLoading,
      usingFallback,
    };
  }, [data, isLoading]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCatalog() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCatalog must be used inside CatalogProvider");
  return ctx;
}

export function useProducts() {
  return useCatalog().products;
}

export function useRefreshCatalog() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: productsQueryKey });
}
