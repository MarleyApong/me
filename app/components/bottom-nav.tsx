"use client";

import { MAIN_PAGES } from "@/app/hooks/use-page-nav";

interface BottomNavProps {
  page: number;
  go: (idx: number) => void;
  next: () => void;
  prev: () => void;
  isDetail: boolean;
}

const ArrowLeft = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);
const ArrowRight = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);

export function BottomNav({ page, go, next, prev, isDetail }: BottomNavProps) {
  return (
    <div className="botnav">
      <div className="dots">
        {Array.from({ length: MAIN_PAGES }).map((_, i) => (
          <button
            key={i}
            className={`dot${i === page || (isDetail && i === 3) ? " active" : ""}`}
            onClick={() => go(i)}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
      <div className="botnav-arrows">
        <button className="arrow-btn" onClick={prev} disabled={page === 0 && !isDetail} aria-label="Previous">
          <ArrowLeft />
        </button>
        <button className="arrow-btn" onClick={next} disabled={page === MAIN_PAGES - 1} aria-label="Next">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
