"use client";

import Image from "next/image";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";

interface YourCapProps { lang: Lang; go: (idx: number) => void }

const ArrowLeft = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
  </svg>
);

const SCREENS = [
  "/images/yourcap/screen-welcome.jpg",
  "/images/yourcap/screen-register.jpg",
  "/images/yourcap/screen-pin.jpg",
  "/images/yourcap/screen-dashboard.jpg",
  "/images/yourcap/screen-add-debt.jpg",
];

export function YourCapCasePage({ lang, go }: YourCapProps) {
  const t = CONTENT.yourcap[lang];

  return (
    <div className="case-page">
      <div className="case-left">
        <div className="case-title">
          <button className="back-link anim-in" style={{ "--d": "50ms" } as React.CSSProperties} onClick={() => go(3)}>
            <ArrowLeft /> <span>{lang === "fr" ? "Projets" : "Projects"}</span>
          </button>
          <div className="kicker anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>{t.kicker}</div>
          <h2 className="headline headline-md anim-in" style={{ "--d": "200ms", whiteSpace: "pre-line" } as React.CSSProperties}>{t.headline}</h2>
          <p className="lede anim-in" style={{ "--d": "400ms" } as React.CSSProperties}>{t.lede}</p>
        </div>

        <div>
          <div className="kicker anim-in" style={{ "--d": "650ms", marginBottom: 16 } as React.CSSProperties}>{t.featLabel}</div>
          <div className="case-features">
            {t.features.map((f, i) => (
              <div key={i} className="case-feature anim-in" style={{ "--d": `${700 + i * 70}ms` } as React.CSSProperties}>
                <span className="marker">{f.m}</span>
                <span className="text">{f.t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="case-meta-grid">
          {t.meta.map((m, i) => (
            <div key={i} className="anim-in" style={{ "--d": `${950 + i * 60}ms` } as React.CSSProperties}>
              <div className="key">{m.k}</div>
              <div className="val">{m.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="case-right anim-in" style={{ "--d": "500ms" } as React.CSSProperties}>
        <div className="case-screens intercept-scroll no-scrollbar">
          {SCREENS.map((src, i) => (
            <div key={i} className="case-screen">
              <span className="case-screen-label">{String(i + 1).padStart(2, "0")} · {t.screens[i]}</span>
              <div className="case-screen-notch" />
              <div className="case-screen-inner">
                <Image src={src} alt={t.screens[i]} fill style={{ objectFit: "cover", objectPosition: "top" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
