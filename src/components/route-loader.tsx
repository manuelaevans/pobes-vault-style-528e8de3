import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";

export function RouteLoader() {
  const isLoading = useRouterState({ select: (state) => state.status === "pending" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !isLoading) return null;

  return (
    <div className="route-loader" role="status" aria-live="polite" aria-label="Loading page">
      <BrandMark className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
      <span className="label-xs text-gold">Opening the vault</span>
    </div>
  );
}