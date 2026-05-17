"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";
import { useMobileReveal } from "@/app/hooks/use-mobile-reveal";

interface ExpProps { lang: Lang; active?: boolean }

export function ExpPage({ lang, active = true }: ExpProps) {
  const t = CONTENT.exp[lang];
  const containerRef = useMobileReveal<HTMLDivElement>(active);

  return (
    <div className="exp-page" ref={containerRef}>
      <div className="exp-left">
        <div className="kicker reveal anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>{t.kicker}</div>
        <h2 className="headline headline-lg reveal anim-in" style={{ "--d": "200ms" } as React.CSSProperties}>{t.headline}</h2>
        <p className="para reveal anim-in" style={{ "--d": "400ms" } as React.CSSProperties}>{t.lede}</p>
      </div>

      <div className="exp-right">
        {t.items.map((it, i) => (
          <div key={i} className="exp-item reveal anim-in" style={{ "--d": `${300 + i * 110}ms` } as React.CSSProperties}>
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
