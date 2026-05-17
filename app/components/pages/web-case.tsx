"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface WebCaseProps { lang: Lang; go: (idx: number) => void }

const ArrowLeft = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);

const ExtLink = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export function WebCasePage({ lang, go }: WebCaseProps) {
  const t = CONTENT.web[lang];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2.5vh, 24px)", flex: 1, minHeight: 0 }}>
      <div className="stack-head anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>
        <div className="stack-head-text">
          <button className="back-link" style={{ marginBottom: 8 }} onClick={() => go(3)}>
            <ArrowLeft /> <span>{lang === "fr" ? "Projets" : "Projects"}</span>
          </button>
          <div className="kicker">{t.kicker}</div>
          <h2 className="headline headline-md" style={{ marginTop: 10 }}>{t.headline}</h2>
        </div>
        <p className="para" style={{ maxWidth: "34ch" }}>{t.lede}</p>
      </div>

      <div className="webcase-page" style={{ flex: 1 }}>
        {t.blocks.map((b, i) => (
          <div key={i} className="webcase-block anim-in" style={{ "--d": `${300 + i * 150}ms` } as React.CSSProperties}>
            <span className="webcase-num">0{i + 1}</span>
            <span className="webcase-role">{b.role}</span>
            <h3>{b.name}</h3>
            <a className="webcase-url" href={`https://${b.url}`} target="_blank" rel="noreferrer">
              {b.url} <ExtLink />
            </a>
            <p className="webcase-desc">{b.desc}</p>
            <div className="webcase-mock">
              <div className="webcase-mock-bar">
                <i /><i /><i />
                <span className="webcase-mock-url">https://{b.url}</span>
              </div>
              <div className="webcase-mock-body">{b.mockTag}</div>
            </div>
            <div className="webcase-tags">
              {b.tags.map((tag, j) => <span key={j} className="project-tag">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
