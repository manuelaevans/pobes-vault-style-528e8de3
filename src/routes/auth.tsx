import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Owner Sign In — Pobe's Vault" },
      {
        name: "description",
        content: "Sign in to manage the Pobe's Vault product catalogue and customer orders.",
      },
      { property: "og:title", content: "Owner Sign In — Pobe's Vault" },
      { property: "og:description", content: "Private area for managing products and orders." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/admin" });
  }, [user, navigate]);

  const input =
    "h-11 w-full rounded-sm border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You can sign in now.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Private"
        title={mode === "signin" ? "Owner Sign In" : "Create Owner Account"}
        subtitle="This area is for managing products and customer orders."
      />
      <form onSubmit={submit} className="mx-auto max-w-md space-y-4 px-4 py-10">
        <div>
          <label className="label-xs text-muted-foreground" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input + " mt-1"}
          />
        </div>
        <div>
          <label className="label-xs text-muted-foreground" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={input + " mt-1"}
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="label-xs w-full rounded-sm bg-gold py-3 text-gold-foreground disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-center text-xs text-muted-foreground underline"
        >
          {mode === "signin" ? "Create the owner account" : "I already have an account"}
        </button>
      </form>
    </>
  );
}
