"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface DualProps { lang: Lang; active: boolean }

export function DualPage({ lang, active }: DualProps) {
  const t = CONTENT.dual[lang];

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <div className="kicker anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>{t.kicker}</div>
      <div className="dual-page" style={{ marginTop: 24 }}>
        {/* Education */}
        <div className="dual-col">
          <h3 className="anim-in" style={{ "--d": "200ms" } as React.CSSProperties}>{t.eduTitle}</h3>
          <div>
            {t.edus.map((e, i) => (
              <div key={i} className="edu-item anim-in" style={{ "--d": `${300 + i * 100}ms` } as React.CSSProperties}>
                <div className="year">{e.y}</div>
                <h4>{e.h}</h4>
                <div className="blurb">{e.b}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="dual-col">
          <h3 className="anim-in" style={{ "--d": "300ms" } as React.CSSProperties}>{t.langTitle}</h3>
          <div>
            {t.langs.map((l, i) => (
              <div key={i} className="lang-row anim-in" style={{ "--d": `${500 + i * 120}ms` } as React.CSSProperties}>
                <div className="lang-flag">
                  <img
                    src={`https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/${l.cc}.svg`}
                    alt={l.cc}
                    width={32}
                    style={{ borderRadius: 3, boxShadow: "0 0 0 1px rgba(0,0,0,0.06)" }}
                  />
                </div>
                <div className="lang-info">
                  <div className="name">{l.name}</div>
                  <div className="level">{l.level}</div>
                </div>
                <div className="lang-bar">
                  <div className="lang-bar-fill" style={{ width: active ? `${l.pct}%` : "0%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
