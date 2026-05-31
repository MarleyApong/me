"use client";

import { useState, useCallback, useEffect, useRef, type RefObject } from "react";

export const TOTAL_PAGES = 9;
export const MAIN_PAGES  = 7;

export function usePageNav(
  stageRef: RefObject<HTMLElement | null>,
  total = TOTAL_PAGES,
  mainPages = MAIN_PAGES,
) {
  const [page, setPage] = useState(0);
  const wheelLockRef  = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((idx: number) => {
    setPage(Math.max(0, Math.min(total - 1, idx)));
  }, [total]);

  const next = useCallback(() => {
    setPage(p => Math.min(mainPages - 1, p + 1));
  }, [mainPages]);

  const prev = useCallback(() => {
    setPage(p => Math.max(0, p - 1));
  }, []);

  // Wheel → page navigation (desktop)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY, dx = e.deltaX;
      const primary = Math.abs(dy) > Math.abs(dx) ? dy : dx;
      if (Math.abs(primary) < 6) return;

      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        if (el.classList?.contains("intercept-scroll")) {
          el.scrollLeft += dy; e.preventDefault(); return;
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

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End")  go(mainPages - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go, mainPages]);

  // Touch swipe horizontal
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      touchStartRef.current = null;
      if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 50) {
        dx < 0 ? next() : prev();
      }
    };
    const stage = stageRef.current;
    if (!stage) return;
    stage.addEventListener("touchstart", onStart, { passive: true });
    stage.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      stage.removeEventListener("touchstart", onStart);
      stage.removeEventListener("touchend",   onEnd);
    };
  }, [next, prev, stageRef]);

  // CTA events
  useEffect(() => {
    const h = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === "number") go(detail);
    };
    window.addEventListener("mlya:go", h);
    return () => window.removeEventListener("mlya:go", h);
  }, [go]);

  return { page, go, next, prev, isDetail: page >= mainPages };
}
