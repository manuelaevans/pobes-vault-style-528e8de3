import { Link, Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Store Manager — Pobe's Vault" },
      {
        name: "description",
        content: "Private dashboard for managing Pobe's Vault products and customer orders.",
      },
      { property: "og:title", content: "Store Manager — Pobe's Vault" },
      { property: "og:description", content: "Manage products and orders." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return <div className="px-4 py-20 text-center text-sm text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-2xl">No access</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This account is not an admin for Pobe's Vault. Sign in with the owner account.
        </p>
        <button
          onClick={() => signOut()}
          className="label-xs mt-6 rounded-sm border border-border px-5 py-3"
        >
          Sign out
        </button>
      </div>
    );
  }

  const tab = "label-xs rounded-sm border border-border px-4 py-2 hover:border-gold";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl">
          Store <span className="text-gold">Manager</span>
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/admin" className={tab} activeProps={{ className: tab + " border-gold text-gold" }}>
            Products
          </Link>
          <Link
            to="/admin/orders"
            className={tab}
            activeProps={{ className: tab + " border-gold text-gold" }}
          >
            Orders
          </Link>
          <button onClick={() => signOut()} className={tab}>
            Sign out
          </button>
        </div>
      </div>
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
