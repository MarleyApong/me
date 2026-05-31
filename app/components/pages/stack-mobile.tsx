"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface StackMobileProps { lang: Lang; idx: number }

export function StackMobilePage({ lang, idx }: StackMobileProps) {
  const t = CONTENT.stack[lang];
  const col = t.cols[idx];
  const total = t.cols.length;
  if (!col) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", gap: 28 }}>

      {/* Section label + counter */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="kicker">{t.kicker}</div>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)" }}>
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Colonne */}
      <div className="anim-in" style={{ "--d": "150ms", borderTop: "1px solid var(--line-strong)", paddingTop: 24 } as React.CSSProperties}>
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
    </div>
  );
}
