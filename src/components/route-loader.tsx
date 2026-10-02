import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";

export function RouteLoader() {
  const locationKey = useRouterState({ select: (state) => state.location.href });
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 1500);
    return () => window.clearTimeout(timer);
  }, [locationKey]);

  if (!mounted || !visible) return null;

  return (
    <div className="route-loader" role="status" aria-live="polite" aria-label="Loading page">
      <BrandMark className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
      <span className="label-xs text-gold">Opening the vault</span>
    </div>
  );
}