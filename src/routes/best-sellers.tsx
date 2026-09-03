import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page";
import { ProductCard } from "@/components/product-card";
import { bestSellers } from "@/lib/products";
import { useProducts } from "@/lib/catalog";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "Best Sellers — Pobe's Vault" },
      {
        name: "description",
        content: "The pieces our customers order most. Proven picks if you're not sure where to start.",
      },
      { property: "og:title", content: "Best Sellers — Pobe's Vault" },
      { property: "og:description", content: "Our most ordered footwear and clothing." },
    ],
  }),
  component: BestSellersPage,
});

function BestSellersPage() {
  const products = useProducts();
  return (
    <>
      <PageHeader
        eyebrow="Customer Favourites"
        title="Best Sellers"
        subtitle="Not sure what to pick? These are the pieces customers keep coming back for."
      />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 lg:grid-cols-4">
        {bestSellers(products).map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
