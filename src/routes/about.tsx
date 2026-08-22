import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/page";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Pobe's Vault — Fashion Retail in Ghana" },
      {
        name: "description",
        content:
          "Pobe's Vault is a fashion retail business offering a carefully selected range of clothing, footwear and accessories with convenient ordering and delivery.",
      },
      { property: "og:title", content: "About Pobe's Vault" },
      {
        property: "og:description",
        content: "A fashion retail business built on carefully selected pieces and easy ordering.",
      },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Who We Are" title="About Pobe's Vault" />
      <Prose>
        <p>
          Pobe's Vault is a fashion retail business focused on bringing customers a carefully
          selected range of clothing, footwear and accessories. We source and resell pieces from
          different brands and suppliers, and we make it easy for customers to discover stylish
          pieces, order conveniently and receive their purchases reliably.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li>Clothing</li>
          <li>Footwear</li>
          <li>Sneakers, slides and clogs</li>
          <li>New and trending pieces</li>
          <li>Special deals</li>
        </ul>
        <h2>Why Shop With Us?</h2>
        <ul>
          <li>Carefully selected products</li>
          <li>Competitive prices</li>
          <li>Variety of styles</li>
          <li>Convenient ordering by cart or WhatsApp</li>
          <li>Reliable customer service</li>
          <li>Delivery options across Ghana</li>
        </ul>
        <p>
          <strong>Note:</strong> we are a retailer, not a manufacturer. Every piece is hand-picked
          from trusted suppliers, checked, and listed only when it's in the vault.
        </p>
      </Prose>
    </>
  ),
});
