"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface QuoteProps { lang: Lang }

export function QuotePage({ lang }: QuoteProps) {
  const t = CONTENT.quote[lang];

  return (
    <div className="quote-page">
      <div className="quote-main">
        <div>
          <div className="kicker anim-in" style={{ "--d": "100ms", marginBottom: 28 } as React.CSSProperties}>{t.kicker}</div>
          <div className="quote-body anim-in" style={{ "--d": "300ms", whiteSpace: "pre-line" } as React.CSSProperties}>{t.quote}</div>
          <div className="quote-attr anim-in" style={{ "--d": "700ms" } as React.CSSProperties}>{t.attr}</div>
        </div>
      </div>

      <div className="quote-foot anim-in" style={{ "--d": "900ms" } as React.CSSProperties}>
        <p className="quote-foot-fact">{t.fact}</p>
        <span className="quote-foot-tag">{t.tag}</span>
      </div>
    </div>
  );
}
