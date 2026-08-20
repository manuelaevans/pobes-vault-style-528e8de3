import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page";
import { ProductCard } from "@/components/product-card";
import { newArrivals } from "@/lib/products";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Pobe's Vault" },
      {
        name: "description",
        content: "The latest pieces added to the vault: fresh footwear, shirts, denim and accessories.",
      },
      { property: "og:title", content: "New Arrivals — Pobe's Vault" },
      { property: "og:description", content: "Fresh drops, limited stock, rotating weekly." },
    ],
  }),
  component: () => (
    <>
      <PageHeader
        eyebrow="Just Landed"
        title="New Arrivals"
        subtitle="The newest pieces in the vault. Stock is limited and rotates whenever something new lands."
      />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 lg:grid-cols-4">
        {newArrivals().map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  ),
});
