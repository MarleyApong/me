"use client";

import { useRouter } from "next/navigation";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface ProjectsProps { lang: Lang; go: (idx: number) => void }

const ArrowRight = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);

export function ProjectsPage({ lang, go }: ProjectsProps) {
  const t = CONTENT.projects[lang];
  const router = useRouter();

  return (
    <div className="projects-page">
      <div className="stack-head anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>
        <div className="stack-head-text">
          <div className="kicker">{t.kicker}</div>
          <h2 className="headline headline-md" style={{ marginTop: 10 }}>{t.headline}</h2>
        </div>
        <p className="para" style={{ maxWidth: "34ch" }}>{t.lede}</p>
      </div>

      <div className="projects-grid">
        {t.items.map((p, i) => {
          const onClick = () => {
            if (p.link) {
              p.link.startsWith("/") ? router.push(p.link) : window.open(p.link, "_blank", "noreferrer");
            } else if (p.actionIdx != null) { go(p.actionIdx); }
          };
          return (
            <div
              key={i}
              className="project-card anim-in"
              style={{ "--d": `${300 + i * 130}ms` } as React.CSSProperties}
              onClick={onClick}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span className="project-num">{p.num}</span>
                {p.status && <span className="project-status">{p.status}</span>}
              </div>
              <div>
                <div className="project-name">{p.name}</div>
                <div className="project-role">{p.role}</div>
              </div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tags">
                {p.tags.map((tag, j) => <span key={j} className="project-tag">{tag}</span>)}
              </div>
              <div className="project-card-foot">
                <span className="project-action">{p.action} <ArrowRight /></span>
                <span className="project-year">{p.year2 ?? p.year}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="anim-in" style={{ "--d": "700ms", paddingTop: 16, borderTop: "1px solid var(--line-strong)", display: "flex", justifyContent: "flex-end" } as React.CSSProperties}>
        <a
          href="https://github.com/MarleyApong"
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: "var(--ink)", fontFamily: "var(--f-mono)", transition: "all 0.3s", textDecoration: "none" }}
          onMouseEnter={e => { e.currentTarget.style.textDecoration = "underline"; e.currentTarget.style.textUnderlineOffset = "4px"; }}
          onMouseLeave={e => { e.currentTarget.style.textDecoration = "none"; }}
        >
          {lang === "fr" ? "Voir tous les projets sur GitHub" : "View all projects on GitHub"}
          <ArrowRight />
        </a>
      </div>
    </div>
  );
}
