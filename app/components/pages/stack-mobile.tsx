"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface StackMobileProps { lang: Lang; idx: number }

export function StackMobilePage({ lang, idx }: StackMobileProps) {
  const t = CONTENT.stack[lang];
  const col = t.cols[idx];
  if (!col) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 20 }}>
      {/* Header — seulement sur la première colonne */}
      {idx === 0 && (
        <div style={{ marginBottom: 4 }}>
          <div className="kicker anim-in" style={{ "--d": "50ms" } as React.CSSProperties}>{t.kicker}</div>
          <h2 className="headline headline-md anim-in" style={{ "--d": "150ms", marginTop: 8 } as React.CSSProperties}>{t.headline}</h2>
        </div>
      )}

      {/* Colonne */}
      <div className="anim-in" style={{ "--d": "200ms", flex: 1, borderTop: "1px solid var(--line-strong)", paddingTop: 20 } as React.CSSProperties}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
          <span style={{ fontFamily: "var(--f-sans)", fontWeight: 700, fontSize: 36, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--ink)" }}>
            {col.num}
          </span>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--muted)" }}>
            {col.label}
          </span>
        </div>

        <div>
          {col.items.map((it, j) => (
            <div key={j} className="stack-item anim-in" style={{ "--d": `${250 + j * 60}ms` } as React.CSSProperties}>
              <span>{it.n}</span>
              <small>{it.t}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
