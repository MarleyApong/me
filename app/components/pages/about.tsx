"use client";

import Image from "next/image";
import { Briefcase, MapPin, Target, Sparkles } from "lucide-react";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface AboutProps { lang: Lang }

const ICONS: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={20} />,
  MapPin:    <MapPin size={20} />,
  Target:    <Target size={20} />,
  Sparkles:  <Sparkles size={20} />,
};

export function AboutPage({ lang }: AboutProps) {
  const t = CONTENT.about[lang];

  return (
    <div className="about-grid">
      <div className="about-left anim-scale" style={{ "--d": "200ms" } as React.CSSProperties}>
        <div className="about-portrait">
          <Image src="/images/portrait-lineart.png" alt="Portrait" width={300} height={300} />
          <span className="about-portrait-tag">{t.portraitTag}</span>
          <span className="about-portrait-num">02</span>
        </div>
      </div>

      <div className="about-right">
        <div className="kicker anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>{t.kicker}</div>
        <h2 className="headline headline-lg anim-in" style={{ "--d": "200ms", whiteSpace: "pre-line" } as React.CSSProperties}>{t.headline}</h2>
        <p className="para anim-in" style={{ "--d": "400ms" } as React.CSSProperties}>{t.p1}</p>
        <p className="para anim-in" style={{ "--d": "500ms" } as React.CSSProperties}>{t.p2}</p>

        <div className="about-meta-grid">
          {t.m.map((it, i) => (
            <div key={i} className="about-meta-item anim-in" style={{ "--d": `${650 + i * 80}ms` } as React.CSSProperties}>
              <div className="about-meta-icon">{ICONS[it.icon]}</div>
              <div className="about-meta-body">
                <div className="key">{it.k}</div>
                <div className="val">{it.v}<small>{it.s}</small></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
