import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { deleteMyAccount } from "@/lib/account.functions";
import { cedis } from "@/lib/products";
import { EMPTY_PROFILE, fetchMyProfile, saveMyProfile, type Profile } from "@/lib/profile";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — Pobe's Vault" },
      {
        name: "description",
        content: "Manage your Pobe's Vault profile, delivery details, orders and new drop notifications.",
      },
      { property: "og:title", content: "My Account — Pobe's Vault" },
      { property: "og:description", content: "Manage your Pobe's Vault customer account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

type OrderRow = {
  id: string;
  order_code: string;
  status: string;
  total: number;
  created_at: string;
  items: { name?: string; qty?: number; size?: string; colour?: string }[];
};

const input =
  "h-11 w-full rounded-sm border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none";

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="label-xs text-muted-foreground" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        disabled={disabled}
        maxLength={300}
        onChange={(e) => onChange(e.target.value)}
        className={input + " mt-1 disabled:opacity-60"}
      />
    </div>
  );
}

function AccountPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const existing = await fetchMyProfile(user.id);
        const base: Profile =
          existing ?? {
            id: user.id,
            ...EMPTY_PROFILE,
            email: user.email ?? "",
            full_name: (user.user_metadata?.full_name as string) ?? "",
            phone: (user.user_metadata?.phone as string) ?? "",
          };
        const { data: orderRows } = await supabase
          .from("orders")
          .select("id, order_code, status, total, created_at, items")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (cancelled) return;
        setProfile(base);
        setOrders((orderRows as unknown as OrderRow[]) ?? []);
      } catch (err) {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Could not load your account");
        }
      } finally {
        if (!cancelled) setPageLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  if (loading || pageLoading || !user || !profile) {
    return (
      <>
        <PageHeader eyebrow="My Account" title="My Account" />
        <p className="py-20 text-center text-sm text-muted-foreground">Loading your account…</p>
      </>
    );
  }

  const update = (patch: Partial<Profile>) => setProfile((p) => (p ? { ...p, ...patch } : p));

  const save = async () => {
    setSaving(true);
    try {
      await saveMyProfile(profile);
      toast.success("Account details saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  const deleteAccount = async () => {
    if (
      !confirm(
        "Delete your account permanently? Your sign-in, saved details and notification preferences will be removed. This cannot be undone.",
      )
    )
      return;
    setDeleting(true);
    try {
      await deleteMyAccount();
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      toast.success("Your account has been deleted");
      navigate({ to: "/", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete your account");
      setDeleting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="My Account"
        title={`Hi, ${profile.full_name || "there"}`}
        subtitle="Manage your details, delivery info, orders and notifications."
      />
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-2">
        <section className="rounded-sm border border-border bg-card p-5">
          <h2 className="font-display text-lg">Profile</h2>
          <div className="mt-4 space-y-4">
            <Field
              id="full_name"
              label="Full Name"
              value={profile.full_name}
              onChange={(v) => update({ full_name: v })}
            />
            <Field
              id="phone"
              label="Phone Number"
              type="tel"
              value={profile.phone}
              onChange={(v) => update({ phone: v })}
            />
            <Field id="email" label="Email Address" value={profile.email} onChange={() => {}} disabled />
          </div>
        </section>

        <section className="rounded-sm border border-border bg-card p-5">
          <h2 className="font-display text-lg">Delivery Information</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Saved details make checkout faster — we fill them in for you.
          </p>
          <div className="mt-4 space-y-4">
            <Field
              id="whatsapp"
              label="WhatsApp Number"
              type="tel"
              value={profile.whatsapp}
              onChange={(v) => update({ whatsapp: v })}
            />
            <Field id="region" label="Region" value={profile.region} onChange={(v) => update({ region: v })} />
            <Field id="city" label="City / Town" value={profile.city} onChange={(v) => update({ city: v })} />
            <Field
              id="address"
              label="Delivery Address"
              value={profile.address}
              onChange={(v) => update({ address: v })}
            />
            <Field
              id="directions"
              label="Additional Directions"
              value={profile.directions}
              onChange={(v) => update({ directions: v })}
            />
          </div>
        </section>

        <section className="rounded-sm border border-border bg-card p-5">
          <h2 className="font-display text-lg">Notification Settings</h2>
          <label className="mt-4 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={profile.notify_new_drops}
              onChange={(e) => update({ notify_new_drops: e.target.checked })}
              className="mt-1"
            />
            <span>
              <span className="font-semibold">Get notified about new drops</span>
              <span className="block text-xs text-muted-foreground">
                We'll let you know as soon as new pieces land in the Vault.
              </span>
            </span>
          </label>
          <button
            onClick={save}
            disabled={saving}
            className="label-xs mt-5 rounded-sm bg-gold px-5 py-3 text-gold-foreground disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </section>

        <section className="rounded-sm border border-border bg-card p-5">
          <h2 className="font-display text-lg">My Orders</h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No orders yet. Orders you place while signed in will appear here with their status.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {orders.map((order) => (
                <li key={order.id} className="rounded-sm border border-border p-3 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold">{order.order_code}</span>
                    <span className="label-xs rounded-sm bg-secondary px-2 py-1 capitalize">
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-GH", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {cedis(Number(order.total))}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {order.items
                      .map((i) => `${i.name ?? "Item"}${i.qty ? ` ×${i.qty}` : ""}`)
                      .join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 pb-12">
        <button onClick={signOut} className="label-xs rounded-sm border border-border px-5 py-3">
          Log Out
        </button>
        <button
          onClick={deleteAccount}
          disabled={deleting}
          className="label-xs rounded-sm border border-border px-5 py-3 text-destructive disabled:opacity-60"
        >
          {deleting ? "Deleting…" : "Delete My Account"}
        </button>
      </div>
    </>
  );
}
