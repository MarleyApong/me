"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface StackMobileProps { lang: Lang; idx: number }

const ArrowRight = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);

export function StackMobilePage({ lang, idx }: StackMobileProps) {
  const t = CONTENT.stack[lang];
  const col = t.cols[idx];
  const total = t.cols.length;
  if (!col) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>

      {/* Header sur la première colonne seulement */}
      {idx === 0 && (
        <div style={{ marginBottom: 16 }}>
          <div className="kicker anim-in" style={{ "--d": "50ms" } as React.CSSProperties}>{t.kicker}</div>
          <h2 className="headline headline-md anim-in" style={{ "--d": "150ms", marginTop: 8 } as React.CSSProperties}>{t.headline}</h2>
        </div>
      )}

      {/* Contenu colonne */}
      <div className="anim-in" style={{ "--d": "200ms", flex: 1, borderTop: "1px solid var(--line-strong)", paddingTop: 20 } as React.CSSProperties}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
          <span style={{ fontFamily: "var(--f-sans)", fontWeight: 700, fontSize: 40, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--ink)" }}>
            {col.num}
          </span>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--muted)" }}>
            {col.label}
          </span>
        </div>

        <div>
          {col.items.map((it, j) => (
            <div key={j} className="stack-item anim-in" style={{ "--d": `${280 + j * 60}ms` } as React.CSSProperties}>
              <span>{it.n}</span>
              <small>{it.t}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateur bas */}
      <div className="mobile-page-indicator anim-in" style={{ "--d": "500ms" } as React.CSSProperties}>
        <span className="mobile-page-indicator-label">
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        {idx < total - 1 && (
          <span className="mobile-page-indicator-arrow">
            swipe <ArrowRight />
          </span>
        )}
      </div>
    </div>
  );
}
