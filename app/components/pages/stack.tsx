"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";
import { useMobileReveal } from "@/app/hooks/use-mobile-reveal";

interface StackProps { lang: Lang; active?: boolean }

export function StackPage({ lang, active = true }: StackProps) {
  const t = CONTENT.stack[lang];
  const containerRef = useMobileReveal<HTMLDivElement>(active);

  return (
    <div className="stack-page" ref={containerRef}>
      <div className="stack-head reveal anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>
        <div className="stack-head-text">
          <div className="kicker">{t.kicker}</div>
          <h2 className="headline headline-md" style={{ marginTop: 10 }}>{t.headline}</h2>
        </div>
        <p className="para" style={{ maxWidth: "36ch" }}>{t.lede}</p>
      </div>

      {/* Desktop: 4 colonnes côte à côte */}
      <div className="stack-grid">
        {t.cols.map((col, i) => (
          <div key={i} className="stack-col anim-in" style={{ "--d": `${250 + i * 120}ms` } as React.CSSProperties}>
            <div className="stack-col-label">{col.label}</div>
            <div className="stack-col-num">{col.num}</div>
            <div>
              {col.items.map((it, j) => (
                <div key={j} className="stack-item">
                  <span>{it.n}</span>
                  <small>{it.t}</small>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: colonnes empilées, une par une au scroll */}
      <div className="stack-mobile-list">
        {t.cols.map((col, i) => (
          <div key={i} className="stack-mobile-section reveal">
            <div className="stack-mobile-header">
              <span className="stack-col-num">{col.num}</span>
              <span className="stack-col-label">{col.label}</span>
            </div>
            <div>
              {col.items.map((it, j) => (
                <div key={j} className="stack-item">
                  <span>{it.n}</span>
                  <small>{it.t}</small>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
