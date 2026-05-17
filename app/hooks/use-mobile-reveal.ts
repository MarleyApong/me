"use client";

import { useEffect, useRef } from "react";

export function useMobileReveal<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const isMobile = window.innerWidth <= 760;
    if (!isMobile) return;

    const items = container.querySelectorAll<HTMLElement>(".reveal");
    if (!items.length) return;

    items.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, i * 60);
            io.unobserve(el);
          }
        });
      },
      { root: container, threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [active]);

  return ref;
}
