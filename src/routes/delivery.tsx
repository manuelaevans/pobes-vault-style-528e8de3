import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/page";
import { WHATSAPP_DISPLAY } from "@/lib/products";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery Information — Pobe's Vault" },
      {
        name: "description",
        content: "Where Pobe's Vault delivers, delivery fees, estimated delivery times, pickup options and order updates.",
      },
      { property: "og:title", content: "Delivery Information — Pobe's Vault" },
      { property: "og:description", content: "Nationwide delivery across Ghana with WhatsApp updates." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Shipping" title="Delivery" />
      <Prose>
        <h2>Areas We Deliver To</h2>
        <ul>
          <li>Accra and Greater Accra — same or next day</li>
          <li>Kumasi, Takoradi, Cape Coast, Tamale and other major towns</li>
          <li>Other regions nationwide via bus or courier</li>
        </ul>
        <h2>Delivery Fees</h2>
        <p>
          Delivery fees are not added to your order total because they vary depending on your
          location. We confirm the exact fee with you on WhatsApp before dispatch.
        </p>
        <h2>Estimated Delivery Times</h2>
        <ul>
          <li>Accra: 1–2 working days</li>
          <li>Other regions: 2–4 working days</li>
        </ul>
        <h2>Pickup</h2>
        <p>
          Pickup can be arranged in Accra. Message us after ordering and we'll share the pickup
          point and time.
        </p>
        <h2>Order Updates</h2>
        <p>
          You'll receive updates on WhatsApp at {WHATSAPP_DISPLAY} — order confirmation, dispatch
          and rider or courier details.
        </p>
      </Prose>
    </>
  ),
});
