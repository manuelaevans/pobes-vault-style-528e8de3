/**
 * Lightweight Paystack Inline (v1) loader.
 * Avoids the react-paystack wrapper (which has React <19 peer deps and stale hooks)
 * by talking to the official Paystack Inline script directly.
 */

const SRC = "https://js.paystack.co/v1/inline.js";

type PaystackHandler = { openIframe: () => void };

type PaystackSetupOptions = {
  key: string;
  email: string;
  amount: number;
  currency?: string;
  ref?: string;
  metadata?: Record<string, unknown>;
  channels?: string[];
  callback: (response: { reference: string; status?: string }) => void;
  onClose: () => void;
};

declare global {
  interface Window {
    PaystackPop?: { setup: (options: PaystackSetupOptions) => PaystackHandler };
  }
}

let loader: Promise<void> | null = null;

export function loadPaystack(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("Paystack is browser-only"));
  if (window.PaystackPop) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    const script = existing ?? document.createElement("script");
    const done = () => (window.PaystackPop ? resolve() : reject(new Error("Paystack failed to initialise")));

    script.addEventListener("load", done, { once: true });
    script.addEventListener(
      "error",
      () => {
        loader = null;
        reject(new Error("Could not load Paystack. Check your connection and try again."));
      },
      { once: true },
    );

    if (!existing) {
      script.src = SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return loader;
}

export type PaystackResult =
  | { status: "success"; reference: string }
  | { status: "cancelled" };

/** Opens the Paystack modal and resolves once the user pays or closes it. */
export async function payWithPaystack(opts: {
  email: string;
  amountMinor: number;
  reference: string;
  currency?: string;
  metadata?: Record<string, unknown>;
}): Promise<PaystackResult> {
  const key = import.meta.env['VITE_PAYSTACK_PUBLIC_KEY'] as string | undefined;
  if (!key) throw new Error("Paystack public key is not configured.");

  await loadPaystack();

  return new Promise<PaystackResult>((resolve) => {
    let settled = false;
    const finish = (result: PaystackResult) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    const handler = window.PaystackPop!.setup({
      key,
      email: opts.email,
      amount: opts.amountMinor,
      currency: opts.currency ?? "GHS",
      ref: opts.reference,
      ...(opts.metadata ? { metadata: opts.metadata } : {}),
      callback: (response) => {
        // Paystack calls this synchronously from its iframe; defer to escape its stack.
        setTimeout(() => finish({ status: "success", reference: response.reference }), 0);
      },
      onClose: () => finish({ status: "cancelled" }),
    });

    handler.openIframe();
  });
}
