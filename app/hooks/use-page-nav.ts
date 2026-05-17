"use client";

import { useState, useCallback, useEffect, useRef, type RefObject } from "react";

export const TOTAL_PAGES = 10;
export const MAIN_PAGES = 8;

export function usePageNav(stageRef: RefObject<HTMLElement | null>) {
  const [page, setPage] = useState(0);
  const wheelLockRef = useRef(false);
  const touchStartRef = useRef<number | null>(null);

  const go = useCallback((idx: number) => {
    setPage(Math.max(0, Math.min(TOTAL_PAGES - 1, idx)));
  }, []);

  const next = useCallback(() => {
    setPage((p) => {
      if (p >= MAIN_PAGES) return 3;
      return Math.min(MAIN_PAGES - 1, p + 1);
    });
  }, []);

  const prev = useCallback(() => {
    setPage((p) => {
      if (p >= MAIN_PAGES) return 3;
      return Math.max(0, p - 1);
    });
  }, []);

  // Wheel navigation
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY;
      const dx = e.deltaX;
      const primary = Math.abs(dy) > Math.abs(dx) ? dy : dx;
      if (Math.abs(primary) < 6) return;

      // Let intercept-scroll elements handle their own scroll
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        if (el.classList?.contains("intercept-scroll")) {
          el.scrollLeft += dy;
          e.preventDefault();
          return;
        }
        el = el.parentElement;
      }

      if (wheelLockRef.current) { e.preventDefault(); return; }
      e.preventDefault();
      wheelLockRef.current = true;
      if (primary > 0) next(); else prev();
      setTimeout(() => { wheelLockRef.current = false; }, 720);
    };

    const stage = stageRef.current;
    if (!stage) return;
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [next, prev, stageRef]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(MAIN_PAGES - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go]);

  // Touch swipe
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStartRef.current = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      if (touchStartRef.current == null) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current;
      if (Math.abs(dx) > 60) { dx < 0 ? next() : prev(); }
      touchStartRef.current = null;
    };
    const stage = stageRef.current;
    if (!stage) return;
    stage.addEventListener("touchstart", onStart, { passive: true });
    stage.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      stage.removeEventListener("touchstart", onStart);
      stage.removeEventListener("touchend", onEnd);
    };
  }, [next, prev, stageRef]);

  // Custom event from CTAs (mlya:go)
  useEffect(() => {
    const h = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === "number") go(detail);
    };
    window.addEventListener("mlya:go", h);
    return () => window.removeEventListener("mlya:go", h);
  }, [go]);

  return { page, go, next, prev, isDetail: page >= MAIN_PAGES };
}
