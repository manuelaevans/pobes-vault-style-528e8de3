import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHeader } from "@/components/page";
import { cartWaLink, useCart } from "@/lib/cart";
import { cedis } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Pobe's Vault" },
      {
        name: "description",
        content: "Enter your delivery details and confirm your Pobe's Vault order on WhatsApp.",
      },
      { property: "og:title", content: "Checkout — Pobe's Vault" },
      { property: "og:description", content: "Simple checkout, confirmed on WhatsApp." },
    ],
  }),
  component: CheckoutPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z.string().trim().min(9, "Enter a valid phone number").max(20),
  whatsapp: z.string().trim().min(9, "Enter a valid WhatsApp number").max(20),
  email: z.string().trim().email("Enter a valid email").max(255).or(z.literal("")),
  region: z.string().trim().min(2, "Enter your region").max(60),
  city: z.string().trim().min(2, "Enter your city or town").max(60),
  address: z.string().trim().min(4, "Enter your delivery address").max(200),
  directions: z.string().trim().max(300),
  payment: z.string(),
});

type Form = z.infer<typeof schema>;

const EMPTY: Form = {
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
  region: "",
  city: "",
  address: "",
  directions: "",
  payment: "Mobile Money",
};

const FIELDS: { key: keyof Form; label: string; type?: string }[] = [
  { key: "name", label: "Full Name" },
  { key: "phone", label: "Phone Number", type: "tel" },
  { key: "whatsapp", label: "WhatsApp Number", type: "tel" },
  { key: "email", label: "Email (optional)", type: "email" },
  { key: "region", label: "Region" },
  { key: "city", label: "City / Town" },
  { key: "address", label: "Delivery Address" },
  { key: "directions", label: "Additional Directions (optional)" },
];

function CheckoutPage() {
  const { detailed, subtotal, total } = useCart();
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputCls =
    "h-11 w-full rounded-sm border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    const customer = [
      "Customer details:",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `WhatsApp: ${form.whatsapp}`,
      form.email ? `Email: ${form.email}` : "",
      `Region: ${form.region}`,
      `City/Town: ${form.city}`,
      `Address: ${form.address}`,
      form.directions ? `Directions: ${form.directions}` : "",
      `Preferred payment: ${form.payment}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(cartWaLink(detailed, { subtotal, total }, customer), "_blank");
  };

  if (detailed.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Order" title="Checkout" />
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          <Link to="/shop" className="label-xs mt-5 inline-block rounded-sm bg-gold px-5 py-3 text-gold-foreground">
            Start Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Order"
        title="Checkout"
        subtitle="Fill in your details and we'll confirm your order and delivery on WhatsApp."
      />
      <form onSubmit={submit} className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="label-xs text-muted-foreground" htmlFor={f.key}>
                {f.label}
              </label>
              <input
                id={f.key}
                type={f.type ?? "text"}
                value={form[f.key]}
                maxLength={300}
                onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                className={inputCls + " mt-1"}
              />
              {errors[f.key] && <p className="mt-1 text-xs text-destructive">{errors[f.key]}</p>}
            </div>
          ))}
          <div>
            <label className="label-xs text-muted-foreground" htmlFor="payment">
              Payment Method
            </label>
            <select
              id="payment"
              value={form.payment}
              onChange={(e) => setForm((p) => ({ ...p, payment: e.target.value }))}
              className={inputCls + " mt-1"}
            >
              <option>Mobile Money</option>
              <option>Bank Transfer</option>
              <option>Cash on Delivery</option>
            </select>
          </div>
        </div>

        <aside className="h-fit rounded-sm border border-border bg-card p-5">
          <h2 className="font-display text-lg">Order Summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {detailed.map(({ line, product }) => (
              <li key={`${line.slug}-${line.size}-${line.colour}`} className="flex justify-between gap-3">
                <span className="min-w-0 text-muted-foreground">
                  {product.name} · {line.size} · {line.colour} × {line.qty}
                </span>
                <span className="shrink-0">{cedis(product.price * line.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="hairline mt-4 space-y-2 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{cedis(subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="text-right text-xs text-muted-foreground">
                Varies by location — confirmed on WhatsApp
              </dd>
            </div>
            <div className="hairline flex justify-between pt-3 font-bold">
              <dt>Total</dt>
              <dd className="text-gold">{cedis(total)}</dd>
            </div>
          </dl>
          <button type="submit" className="label-xs mt-5 w-full rounded-sm bg-gold py-3 text-gold-foreground">
            Place Order via WhatsApp
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            We confirm stock, delivery fee and payment details on WhatsApp before dispatch.
          </p>
        </aside>
      </form>
    </>
  );
}
