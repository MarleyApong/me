"use client";

import { useState } from "react";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";
import { useMobileReveal } from "@/app/hooks/use-mobile-reveal";

interface StackProps { lang: Lang; active?: boolean }

export function StackPage({ lang, active = true }: StackProps) {
  const t = CONTENT.stack[lang];
  const [activeTab, setActiveTab] = useState(0);
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

      {/* Mobile tabs */}
      <div className="stack-tabs reveal">
        {t.cols.map((col, i) => (
          <button
            key={i}
            className={`stack-tab${activeTab === i ? " active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {col.label}
          </button>
        ))}
      </div>

      {/* Desktop grid — all columns */}
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

      {/* Mobile single column view */}
      <div className="stack-mobile-col reveal">
        <div className="stack-col-label">{t.cols[activeTab].label}</div>
        <div className="stack-col-num">{t.cols[activeTab].num}</div>
        <div>
          {t.cols[activeTab].items.map((it, j) => (
            <div key={j} className="stack-item">
              <span>{it.n}</span>
              <small>{it.t}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
