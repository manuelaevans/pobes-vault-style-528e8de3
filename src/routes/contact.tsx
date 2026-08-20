import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page";
import { waLink } from "@/lib/cart";
import { WHATSAPP_DISPLAY } from "@/lib/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Pobe's Vault — WhatsApp & Call" },
      {
        name: "description",
        content: `Reach Pobe's Vault on WhatsApp or call ${WHATSAPP_DISPLAY} to order, check stock or ask about sizing and delivery.`,
      },
      { property: "og:title", content: "Contact Pobe's Vault" },
      { property: "og:description", content: "Order or ask us anything on WhatsApp." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact"
        subtitle="Ordering is direct. Message us on WhatsApp or call and we'll confirm availability, price and delivery."
      />
      <div className="mx-auto grid max-w-4xl gap-4 px-4 py-12 sm:grid-cols-2">
        <a
          href={waLink("Hi Pobe's Vault, I'd like to ask about an item.")}
          target="_blank"
          rel="noreferrer"
          className="rounded-sm border border-border bg-card p-6 hover:border-gold"
        >
          <p className="label-xs text-gold">WhatsApp</p>
          <p className="mt-2 font-display text-3xl">{WHATSAPP_DISPLAY}</p>
          <p className="mt-2 text-sm text-muted-foreground">Fastest way to reach us. Send the item name and your size.</p>
        </a>
        <a
          href={`tel:${WHATSAPP_DISPLAY}`}
          className="rounded-sm border border-border bg-card p-6 hover:border-gold"
        >
          <p className="label-xs text-gold">Call To Order</p>
          <p className="mt-2 font-display text-3xl">{WHATSAPP_DISPLAY}</p>
          <p className="mt-2 text-sm text-muted-foreground">Available for calls during business hours.</p>
        </a>
        <div className="rounded-sm border border-border bg-card p-6 sm:col-span-2">
          <p className="label-xs text-gold">Hours & Location</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Monday – Saturday, 9:00am – 8:00pm. Based in Accra, delivering nationwide. Pickup can
            be arranged in Accra after your order is confirmed.
          </p>
        </div>
      </div>
    </>
  );
}
