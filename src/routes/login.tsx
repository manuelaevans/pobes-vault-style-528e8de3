import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

const MODES = ["signin", "signup", "forgot"] as const;
type Mode = (typeof MODES)[number];

const toMode = (v: unknown): Mode | undefined =>
  (MODES as readonly string[]).includes(v as string) ? (v as Mode) : undefined;

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In or Create Account — Pobe's Vault" },
      {
        name: "description",
        content: "Sign in to your Pobe's Vault customer account to track orders, save delivery details and get new drop alerts.",
      },
      { property: "og:title", content: "Sign In or Create Account — Pobe's Vault" },
      { property: "og:description", content: "Access your Pobe's Vault customer account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { mode?: Mode } => ({
    mode: toMode(search.mode),
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { mode: initialMode } = Route.useSearch();
  const [mode, setMode] = useState<Mode>(initialMode ?? "signin");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/account" });
  }, [user, loading, navigate]);

  const input =
    "h-11 w-full rounded-sm border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset link sent. Check your email.");
        setMode("signin");
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
              notify_new_drops: notify,
            },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        toast.success("Welcome back");
        navigate({ to: "/account" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const title =
    mode === "signin" ? "Welcome Back" : mode === "signup" ? "Create Your Account" : "Reset Password";

  return (
    <>
      <PageHeader
        eyebrow="My Account"
        title={title}
        subtitle="Track your orders, save your delivery details and hear about new drops first."
      />
      <form onSubmit={submit} className="mx-auto max-w-md space-y-4 px-4 py-10">
        {mode === "signup" && (
          <>
            <div>
              <label className="label-xs text-muted-foreground" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={input + " mt-1"}
              />
            </div>
            <div>
              <label className="label-xs text-muted-foreground" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                maxLength={20}
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={input + " mt-1"}
              />
            </div>
          </>
        )}
        <div>
          <label className="label-xs text-muted-foreground" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            maxLength={255}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input + " mt-1"}
          />
        </div>
        {mode !== "forgot" && (
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
        )}
        {mode === "signup" && (
          <label className="flex items-start gap-3 rounded-sm border border-border bg-card p-3 text-sm">
            <input
              type="checkbox"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              className="mt-1"
            />
            <span>
              <span className="font-semibold">Get notified about new drops</span>
              <span className="block text-xs text-muted-foreground">
                Be the first to know when new pieces land in the Vault. You can turn this off anytime.
              </span>
            </span>
          </label>
        )}
        <button
          type="submit"
          disabled={busy}
          className="label-xs w-full rounded-sm bg-gold py-3 text-gold-foreground disabled:opacity-60"
        >
          {busy
            ? "Please wait…"
            : mode === "signin"
              ? "Log In"
              : mode === "signup"
                ? "Create Account"
                : "Send Reset Link"}
        </button>
        <div className="flex flex-col gap-2 text-center text-xs text-muted-foreground">
          {mode === "signin" && (
            <>
              <button type="button" onClick={() => setMode("forgot")} className="underline">
                Forgot your password?
              </button>
              <button type="button" onClick={() => setMode("signup")} className="underline">
                New here? Create an account
              </button>
            </>
          )}
          {mode !== "signin" && (
            <button type="button" onClick={() => setMode("signin")} className="underline">
              I already have an account
            </button>
          )}
          <p className="pt-2">
            You can also shop and check out without an account —{" "}
            <Link to="/shop" className="text-gold underline">
              continue browsing
            </Link>
            .
          </p>
        </div>
      </form>
    </>
  );
}
