"use client";

import { useRouter } from "next/navigation";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface ProjectMobileProps { lang: Lang; idx: number; go: (i: number) => void }

const ArrowRight = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);

export function ProjectMobilePage({ lang, idx, go }: ProjectMobileProps) {
  const t = CONTENT.projects[lang];
  const project = t.items[idx];
  const total = t.items.length;
  const router = useRouter();

  if (!project) return null;

  const onClick = () => {
    if (project.link) {
      project.link.startsWith("/") ? router.push(project.link) : window.open(project.link, "_blank", "noreferrer");
    } else if (project.actionIdx != null) {
      go(project.actionIdx);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", gap: 28 }}>

      {/* Section label + counter */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="kicker">{t.kicker}</div>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)" }}>
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Contenu projet */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, borderTop: "1px solid var(--line-strong)", paddingTop: 24 }}>

        {project.status && (
          <span className="project-status" style={{ alignSelf: "flex-start" }}>{project.status}</span>
        )}

        <div>
          <div className="headline headline-lg anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>
            {project.name}
          </div>
          <div className="project-role" style={{ marginTop: 6 }}>{project.role}</div>
        </div>

        <p className="para anim-in" style={{ "--d": "200ms", maxWidth: "100%" } as React.CSSProperties}>
          {project.desc}
        </p>

        <div className="project-tags anim-in" style={{ "--d": "300ms" } as React.CSSProperties}>
          {project.tags.map((tag, j) => <span key={j} className="project-tag">{tag}</span>)}
        </div>

        <button
          className="btn-primary anim-in"
          style={{ "--d": "400ms", alignSelf: "flex-start" } as React.CSSProperties}
          onClick={onClick}
        >
          <span>{project.action}</span>
          <span><ArrowRight /></span>
        </button>
      </div>
    </div>
  );
}
