"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface ExpProps { lang: Lang }

export function ExpPage({ lang }: ExpProps) {
  const t = CONTENT.exp[lang];

  return (
    <div className="exp-page">
      <div className="exp-left">
        <div className="kicker anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>{t.kicker}</div>
        <h2 className="headline headline-lg anim-in" style={{ "--d": "200ms" } as React.CSSProperties}>{t.headline}</h2>
        <p className="para anim-in" style={{ "--d": "400ms" } as React.CSSProperties}>{t.lede}</p>
      </div>

      <div className="exp-right">
        {t.items.map((it, i) => (
          <div key={i} className="exp-item anim-in" style={{ "--d": `${300 + i * 110}ms` } as React.CSSProperties}>
            <div className="exp-year">{it.year}<small>{it.sub}</small></div>
            <div className="exp-body">
              <h4>{it.h}</h4>
              <div className="org">{it.org}</div>
              <div className="blurb">{it.b}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
