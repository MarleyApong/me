"use client";

import { Briefcase, MapPin, Target, Brain } from "lucide-react";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

const ICONS: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={32} />,
  MapPin:    <MapPin size={32} />,
  Target:    <Target size={32} />,
  Sparkles:  <Brain size={32} />,
};

interface AboutIntroMobileProps { lang: Lang }
interface AboutMetaMobileProps { lang: Lang; idx: number; total: number }

export function AboutIntroMobile({ lang }: AboutIntroMobileProps) {
  const t = CONTENT.about[lang];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
      <div className="kicker anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>{t.kicker}</div>
      <h2 className="headline headline-lg anim-in" style={{ "--d": "200ms", whiteSpace: "pre-line" } as React.CSSProperties}>{t.headline}</h2>
      <p className="para anim-in" style={{ "--d": "350ms" } as React.CSSProperties}>{t.p1}</p>
      <p className="para anim-in" style={{ "--d": "450ms" } as React.CSSProperties}>{t.p2}</p>
    </div>
  );
}

export function AboutMetaMobile({ lang, idx, total }: AboutMetaMobileProps) {
  const t = CONTENT.about[lang];
  const item = t.m[idx];
  if (!item) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", gap: 32 }}>
      {/* Counter */}
      <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div className="anim-scale" style={{ "--d": "100ms", color: "var(--ink)" } as React.CSSProperties}>
        {ICONS[item.icon]}
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>
          {item.k}
        </div>
        <div className="headline headline-lg anim-in" style={{ "--d": "150ms" } as React.CSSProperties}>
          {item.v}
        </div>
        <p className="para anim-in" style={{ "--d": "280ms" } as React.CSSProperties}>
          {item.s}
        </p>
      </div>
    </div>
  );
}
