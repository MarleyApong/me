"use client";

import Image from "next/image";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface HeroProps { lang: Lang }

function Split({ text, base = 0 }: { text: string; base?: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="split-char" style={{ "--i": base + i } as React.CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

const ArrowRight = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);

export function HeroPage({ lang }: HeroProps) {
  const t = CONTENT.hero[lang];

  const goTo = (idx: number) => {
    window.dispatchEvent(new CustomEvent("mlya:go", { detail: idx }));
  };

  return (
    <div className="hero">
      {/* Watermark */}
      <h1 className="headline hero-name hero-name-watermark" aria-hidden="true">
        <span className="hero-name-line headline-xl"><Split text={t.name1} base={0} /></span>
        <span className="hero-name-line indent headline-xl"><Split text={t.name2} base={t.name1.length + 1} /></span>
      </h1>

      <div className="hero-text">
        <div className="hero-logo-mark anim-scale" style={{ "--d": "150ms" } as React.CSSProperties}>
          <Image src="/images/logo-dark.png" alt="MLYA" width={240} height={60} priority />
        </div>

        <p className="hero-tagline anim-in" style={{ "--d": "300ms" } as React.CSSProperties}>{t.tagline}</p>

        <p className="lede anim-in" style={{ "--d": "500ms" } as React.CSSProperties}>{t.lede}</p>

        <div className="hero-meta anim-in" style={{ "--d": "700ms" } as React.CSSProperties}>
          <div className="hero-meta-item"><div className="key">{t.m1k}</div><div className="val">{t.m1v}</div></div>
          <div className="hero-meta-item"><div className="key">{t.m2k}</div><div className="val">{t.m2v}</div></div>
          <div className="hero-meta-item"><div className="key">{t.m3k}</div><div className="val">{t.m3v}</div></div>
        </div>

        <div className="hero-cta-row anim-in" style={{ "--d": "900ms" } as React.CSSProperties}>
          <button className="btn-primary" onClick={() => goTo(3)}>
            <span>{t.ctaWork}</span>
            <span><ArrowRight /></span>
          </button>
          <button className="btn-ghost" onClick={() => goTo(7)}>
            {t.ctaContact}
          </button>
        </div>
      </div>
    </div>
  );
}
