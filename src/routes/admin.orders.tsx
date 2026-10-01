import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cedis } from "@/lib/products";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Orders — Pobe's Vault" },
      { name: "description", content: "Review and manage Pobe's Vault customer orders." },
      { property: "og:title", content: "Orders — Pobe's Vault" },
      { property: "og:description", content: "Review and manage customer orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrdersAdmin,
});

type OrderItem = { name: string; size: string; colour: string; qty: number; price: number };

type Order = {
  id: string;
  order_code: string;
  customer_name: string;
  phone: string;
  location: string;
  note: string;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
};

const STATUSES = ["pending", "confirmed", "paid", "delivered", "cancelled"];

function customerEmail(note: string) {
  return note.match(/(?:^|\|\s*)Email:\s*([^|]+)/i)?.[1]?.trim() ?? "";
}

function receiptDraft(order: Order) {
  const email = customerEmail(order.note);
  const subject = `Order received — ${order.order_code} | Pobe's Vault`;
  const body = [
    `Hello ${order.customer_name},`,
    "",
    `We have received payment for your Pobe's Vault order ${order.order_code}.`,
    `Your order total is ${cedis(order.total)} and it is now being prepared.`,
    "",
    "We will contact you with delivery details.",
    "",
    "Thank you for shopping with Pobe's Vault.",
  ].join("\n");
  return email
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : null;
}

async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((o) => ({
    ...(o as unknown as Order),
    items: (o.items as unknown as OrderItem[]) ?? [],
    total: Number(o.total),
  }));
}

function OrdersAdmin() {
  const qc = useQueryClient();
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: fetchOrders,
  });

  const setStatus = async (id: string, status: string) => {
    const { error: err } = await supabase.from("orders").update({ status }).eq("id", id);
    if (err) {
      toast.error(err.message);
      return;
    }
    toast.success(`Order marked ${status}`);
    qc.invalidateQueries({ queryKey: ["admin", "orders"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this order?")) return;
    const { error: err } = await supabase.from("orders").delete().eq("id", id);
    if (err) {
      toast.error(err.message);
      return;
    }
    toast.success("Order deleted");
    qc.invalidateQueries({ queryKey: ["admin", "orders"] });
  };

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading orders…</p>;
  if (error) return <p className="text-sm text-destructive">{(error as Error).message}</p>;
  if (orders.length === 0)
    return (
      <p className="text-sm text-muted-foreground">
        No orders yet. Every checkout on the site is recorded here automatically.
      </p>
    );

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">{orders.length} order(s)</p>
      {orders.map((o) => (
        <article key={o.id} className="rounded-sm border border-border bg-card p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-lg">
                #{o.order_code} · <span className="text-gold">{cedis(o.total ?? 0)}</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                {o.customer_name} · {o.phone}
                {o.location ? ` · ${o.location}` : ""}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(o.created_at).toLocaleString("en-GH")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={o.status}
                onChange={(e) => setStatus(o.id, e.target.value)}
                className="h-9 rounded-sm border border-border bg-background px-2 text-sm capitalize"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <a
                href={`https://wa.me/${o.phone.replace(/\D/g, "").replace(/^0/, "233")}`}
                target="_blank"
                rel="noreferrer"
                className="label-xs rounded-sm border border-border px-3 py-2 hover:border-gold"
              >
                WhatsApp
              </a>
              {receiptDraft(o) ? (
                <Button asChild variant="outline" size="sm" title="Draft order receipt in Gmail">
                  <a href={receiptDraft(o) ?? "#"} target="_blank" rel="noreferrer">
                    <Mail /> Email receipt
                  </a>
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled title="This older order has no email address">
                  <Mail /> No email
                </Button>
              )}
              <button
                onClick={() => remove(o.id)}
                className="label-xs rounded-sm border border-border px-3 py-2 text-destructive"
              >
                Delete
              </button>
            </div>
          </div>
          <ul className="hairline mt-3 space-y-1 pt-3 text-sm">
            {o.items.map((it, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {it.name} · {it.size} · {it.colour} × {it.qty}
                </span>
                <span>{cedis(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          {o.note && <p className="mt-3 whitespace-pre-line text-xs text-muted-foreground">{o.note}</p>}
        </article>
      ))}
    </div>
  );
}
