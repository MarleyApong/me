"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface StackProps { lang: Lang }

export function StackPage({ lang }: StackProps) {
  const t = CONTENT.stack[lang];

  return (
    <div className="stack-page">
      <div className="stack-head anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>
        <div className="stack-head-text">
          <div className="kicker">{t.kicker}</div>
          <h2 className="headline headline-md" style={{ marginTop: 10 }}>{t.headline}</h2>
        </div>
        <p className="para" style={{ maxWidth: "36ch" }}>{t.lede}</p>
      </div>

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
    </div>
  );
}
