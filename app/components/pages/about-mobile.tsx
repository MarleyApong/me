"use client";

import Image from "next/image";
import { Briefcase, MapPin, Target, Brain } from "lucide-react";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

const ICONS: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={40} />,
  MapPin:    <MapPin size={40} />,
  Target:    <Target size={40} />,
  Sparkles:  <Brain size={40} />,
};

interface AboutIntroMobileProps { lang: Lang }
interface AboutMetaMobileProps  { lang: Lang; idx: number; total: number }

export function AboutIntroMobile({ lang }: AboutIntroMobileProps) {
  const t = CONTENT.about[lang];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%", justifyContent: "center" }}>

      {/* Portrait — même style que desktop */}
      <div className="about-portrait anim-scale" style={{ "--d": "100ms" } as React.CSSProperties}>
        <Image src="/images/portrait-lineart.png" alt="Portrait" width={300} height={300} />
        <span className="about-portrait-tag">{t.portraitTag}</span>
        <span className="about-portrait-num">02</span>
      </div>

      {/* Texte */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="kicker anim-in" style={{ "--d": "150ms" } as React.CSSProperties}>{t.kicker}</div>
        <h2 className="headline headline-lg anim-in" style={{ "--d": "250ms", whiteSpace: "pre-line" } as React.CSSProperties}>{t.headline}</h2>
        <p className="para anim-in" style={{ "--d": "400ms" } as React.CSSProperties}>{t.p1}</p>
        <p className="para anim-in" style={{ "--d": "500ms" } as React.CSSProperties}>{t.p2}</p>
      </div>
    </div>
  );
}

export function AboutMetaMobile({ lang, idx, total }: AboutMetaMobileProps) {
  const t = CONTENT.about[lang];
  const item = t.m[idx];
  if (!item) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", gap: 32 }}>
      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="kicker">{CONTENT.about[lang].kicker}</div>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)" }}>
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="anim-scale" style={{ "--d": "100ms", color: "var(--ink)" } as React.CSSProperties}>
        {ICONS[item.icon]}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>
          {item.k}
        </div>
        <div className="headline headline-lg anim-in" style={{ "--d": "150ms" } as React.CSSProperties}>
          {item.v}
        </div>
        <p className="para anim-in" style={{ "--d": "300ms" } as React.CSSProperties}>
          {item.s}
        </p>
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ height: 2, flex: 1, background: i === idx ? "var(--ink)" : "var(--line-strong)", transition: "background 0.3s" }} />
        ))}
      </div>
    </div>
  );
}
