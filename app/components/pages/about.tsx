"use client";

import Image from "next/image";
import { Briefcase, MapPin, Target, Brain } from "lucide-react";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";
import { useMobileReveal } from "@/app/hooks/use-mobile-reveal";

interface AboutProps { lang: Lang; active?: boolean }

const ICONS: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={20} />,
  MapPin:    <MapPin size={20} />,
  Target:    <Target size={20} />,
  Sparkles:  <Brain size={20} />,
};

const DELAYS = ["delay-1", "delay-2", "delay-3", "delay-4"];

export function AboutPage({ lang, active = true }: AboutProps) {
  const t = CONTENT.about[lang];
  const containerRef = useMobileReveal<HTMLDivElement>(active);

  return (
    <div className="about-grid" ref={containerRef}>

      {/* Desktop — portrait gauche */}
      <div className="about-left anim-scale" style={{ "--d": "200ms" } as React.CSSProperties}>
        <div className="about-portrait">
          <Image src="/images/portrait-lineart.png" alt="Portrait" width={300} height={300} />
          <span className="about-portrait-tag">{t.portraitTag}</span>
          <span className="about-portrait-num">02</span>
        </div>
      </div>

      <div className="about-right">

        {/* Zone 1 — visible immédiatement, remplit le viewport */}
        <div className="about-mobile-intro">
          <div className="kicker anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>{t.kicker}</div>
          <h2 className="headline headline-lg anim-in" style={{ "--d": "200ms", whiteSpace: "pre-line" } as React.CSSProperties}>{t.headline}</h2>
          <p className="para anim-in" style={{ "--d": "400ms" } as React.CSSProperties}>{t.p1}</p>
          <p className="para anim-in" style={{ "--d": "500ms" } as React.CSSProperties}>{t.p2}</p>
        </div>

        {/* Zone 2 — items cachés par CSS, révélés un par un au scroll */}
        <div className="about-meta-grid">
          {t.m.map((it, i) => (
            <div key={i} className={`about-meta-item scroll-reveal ${DELAYS[i]}`}>
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
