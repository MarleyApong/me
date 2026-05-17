"use client";

import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";
import { useMobileReveal } from "@/app/hooks/use-mobile-reveal";

interface ContactProps { lang: Lang; active?: boolean }

const ExtLink = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LINK_ICONS: Record<string, React.ReactNode> = {
  EMAIL:    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  LINKEDIN: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
  GITHUB:   <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 6.77 5.07 5.07 0 0 0 19.91 3S18.73 2.65 16 4.55a13.38 13.38 0 0 0-7 0C6.27 2.65 5.09 3 5.09 3A5.07 5.07 0 0 0 5 6.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 20.13V24" /></svg>,
  YOUTUBE:  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29.7 29.7 0 0 0 1 12a29.7 29.7 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2C5.2 20 12 20 12 20s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29.7 29.7 0 0 0 23 12a29.7 29.7 0 0 0-.5-5.6z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>,
};

export function ContactPage({ lang, active = true }: ContactProps) {
  const t = CONTENT.contact[lang];
  const containerRef = useMobileReveal<HTMLDivElement>(active);

  return (
    <div className="contact-page" ref={containerRef}>
      <div className="contact-left">
        <div className="kicker reveal anim-in" style={{ "--d": "100ms" } as React.CSSProperties}>{t.kicker}</div>
        <h2 className="contact-headline reveal anim-in" style={{ "--d": "200ms" } as React.CSSProperties}>
          {t.headline1}<br />
          <span className="emph">{t.headline2}</span>
        </h2>
        <a className="contact-mailto reveal anim-in" style={{ "--d": "600ms" } as React.CSSProperties} href={`mailto:${t.mailto}`}>
          <span>{t.cta} →</span>
        </a>
        <div className="contact-sig reveal anim-in" style={{ "--d": "900ms" } as React.CSSProperties}>· {t.sig}</div>
      </div>

      <div className="contact-right">
        {t.links.map((l, i) => (
          <a
            key={i}
            className="contact-link reveal anim-in"
            style={{ "--d": `${400 + i * 100}ms` } as React.CSSProperties}
            href={l.href}
            target={l.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
          >
            <span>{LINK_ICONS[l.k]}</span>
            <span className="contact-link-key">{l.k}</span>
            <span className="contact-link-val">{l.v}</span>
            <ExtLink />
          </a>
        ))}
      </div>
    </div>
  );
}
