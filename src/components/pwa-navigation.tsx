"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function PWANavigation() {
  const router = useRouter();

  useEffect(() => {
    // Check if running as standalone PWA on iOS
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
      || (window.navigator as any).standalone === true;

    if (!isStandalone) return;

    // Intercept all link clicks to keep navigation inside the app
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      // Only handle internal links
      if (href && href.startsWith("/") && !href.startsWith("//")) {
        e.preventDefault();
        router.push(href);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  return null;
}
