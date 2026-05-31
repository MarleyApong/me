"use client";

import { useEffect, useRef } from "react";

export function useMobileReveal<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth > 760) return;

    const container = ref.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (!items.length) return;

    // 1. CSS cache déjà les items via .scroll-reveal (opacity: 0)
    //    On s'assure que is-visible n'est pas déjà présent
    items.forEach(el => el.classList.remove("is-visible"));

    // 2. On attend un frame pour que le navigateur applique le CSS caché
    //    avant de démarrer l'observation
    const raf = requestAnimationFrame(() => {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        {
          root: null,        // viewport du navigateur
          threshold: 0.12,
          rootMargin: "0px 0px -10px 0px",
        }
      );

      items.forEach(el => io.observe(el));

      // Cleanup stocké pour le return
      (container as any).__io_cleanup = () => io.disconnect();
    });

    return () => {
      cancelAnimationFrame(raf);
      const cleanup = (container as any).__io_cleanup;
      if (cleanup) cleanup();
    };
  }, [active]);

  return ref;
}
