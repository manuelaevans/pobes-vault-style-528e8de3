import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Pobe's Vault" },
      { name: "description", content: "Choose a new password for your Pobe's Vault account." },
      { property: "og:title", content: "Reset Password — Pobe's Vault" },
      { property: "og:description", content: "Choose a new password for your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Recovery links arrive with type=recovery in the URL hash.
    if (window.location.hash.includes("type=recovery")) {
      setReady(true);
    }
  }, []);

  const input =
    "h-11 w-full rounded-sm border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated. You are signed in.");
      navigate({ to: "/account" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update password");
    } finally {
      setBusy(false);
    }
  };

  if (!ready) {
    return (
      <>
        <PageHeader eyebrow="My Account" title="Reset Password" />
        <div className="mx-auto max-w-md px-4 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            This page only works from the reset link we email you. Request a new link from the
            sign-in page.
          </p>
          <Link to="/login" className="label-xs mt-5 inline-block rounded-sm bg-gold px-5 py-3 text-gold-foreground">
            Go to Sign In
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="My Account"
        title="Choose a New Password"
        subtitle="Enter a new password for your account."
      />
      <form onSubmit={submit} className="mx-auto max-w-md space-y-4 px-4 py-10">
        <div>
          <label className="label-xs text-muted-foreground" htmlFor="password">
            New Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={input + " mt-1"}
          />
        </div>
        <div>
          <label className="label-xs text-muted-foreground" htmlFor="confirm">
            Confirm New Password
          </label>
          <input
            id="confirm"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={input + " mt-1"}
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="label-xs w-full rounded-sm bg-gold py-3 text-gold-foreground disabled:opacity-60"
        >
          {busy ? "Updating…" : "Update Password"}
        </button>
      </form>
    </>
  );
}
