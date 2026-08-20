import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page";
import { WHATSAPP_DISPLAY } from "@/lib/products";

const FAQS = [
  ["How do I place an order?", "Browse the shop, open a product, choose your size and colour, then add it to cart and checkout — or order straight from the product page via WhatsApp."],
  ["How can I order through WhatsApp?", `Tap any "Order via WhatsApp" button. Your product, size, colour, quantity and price are added to the message automatically. You can also message ${WHATSAPP_DISPLAY} directly.`],
  ["Where do you deliver?", "Across Ghana — Accra and Greater Accra, major towns like Kumasi, Takoradi, Cape Coast and Tamale, and other regions by bus or courier."],
  ["How much is delivery?", "From GH₵30 within Accra and from GH₵50 to other regions. The exact fee is confirmed before dispatch."],
  ["What payment methods do you accept?", "Mobile Money, bank transfer, and cash on delivery in selected areas."],
  ["How long does delivery take?", "1–2 working days in Accra and 2–4 working days for other regions."],
  ["How do I choose my size?", "Check the Size Guide page for measurements. If you're between sizes, message us and we'll advise."],
  ["Can I exchange an item?", "Yes — size exchanges are accepted within 3 days of delivery if the item is unworn and in original condition, subject to availability."],
  ["Can I cancel my order?", "Yes, as long as the order has not yet been dispatched. Message us as soon as possible."],
] as const;

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Ordering, Delivery & Sizing | Pobe's Vault" },
      {
        name: "description",
        content: "Answers to common questions about ordering, WhatsApp orders, delivery, payment, sizing, exchanges and cancellations.",
      },
      { property: "og:title", content: "Frequently Asked Questions — Pobe's Vault" },
      { property: "og:description", content: "Everything you need to know before ordering." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Help" title="FAQ" />
      <div className="mx-auto max-w-3xl divide-y divide-border px-4 py-12">
        {FAQS.map(([q, a]) => (
          <details key={q} className="py-4">
            <summary className="cursor-pointer font-display text-sm">{q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </>
  ),
});
