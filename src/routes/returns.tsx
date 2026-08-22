import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/page";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Exchanges — Pobe's Vault" },
      {
        name: "description",
        content: "Pobe's Vault returns and exchange policy: time limits, conditions, costs and items that cannot be returned.",
      },
      { property: "og:title", content: "Returns & Exchanges — Pobe's Vault" },
      { property: "og:description", content: "How exchanges and returns work at Pobe's Vault." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Policy" title="Returns & Exchanges" />
      <Prose>
        <h2>Exchanges</h2>
        <p>
          Size exchanges are accepted within <strong>3 days</strong> of delivery, subject to
          availability of the replacement size.
        </p>
        <h2>Returns</h2>
        <p>
          Returns are accepted within <strong>3 days</strong> where an item is faulty or clearly
          different from what was ordered.
        </p>
        <h2>Conditions</h2>
        <ul>
          <li>Item must be unworn, unwashed and in its original condition</li>
          <li>Tags, box and packaging must be intact</li>
          <li>Proof of order (WhatsApp chat or receipt) is required</li>
        </ul>
        <h2>Costs</h2>
        <ul>
          <li>Return delivery cost is covered by the customer for size exchanges</li>
          <li>We cover the cost where the item is faulty or we sent the wrong item</li>
        </ul>
        <h2>Items That Cannot Be Returned</h2>
        <ul>
          <li>Clearance and final-sale items</li>
          <li>Worn or damaged items</li>
          <li>Worn slides or sandals</li>
        </ul>
        <p>Final terms are confirmed by Pobe's Vault when your order is placed.</p>
      </Prose>
    </>
  ),
});
