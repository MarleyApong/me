"use client";

import Image from "next/image";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";
import { MAIN_PAGES } from "@/app/hooks/use-page-nav";

interface RailProps {
  page: number;
  go: (idx: number) => void;
  lang: Lang;
  theme: string;
  onBrandClick: () => void;
}

const NAV_ICONS = [
  // Home
  <svg key="home" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z" /></svg>,
  // User
  <svg key="user" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  // Layers
  <svg key="layers" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
  // Folder
  <svg key="folder" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /></svg>,
  // Route
  <svg key="route" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></svg>,
  // Cap
  <svg key="cap" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5a6 6 0 0 0 12 0v-5" /></svg>,
  // Quote
  <svg key="quote" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></svg>,
  // Mail
  <svg key="mail" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
];

export function Rail({ page, go, lang, onBrandClick }: RailProps) {
  const T = CONTENT;
  const isDetail = page >= MAIN_PAGES;

  return (
    <aside className="rail">
      <div className="rail-brand" onClick={onBrandClick}>
        <div className="rail-brand-avatar">
          <Image src="/icons/icon-192.png" alt="MLYA" width={52} height={52} />
        </div>
        <div className="rail-brand-text">
          <span className="rail-brand-name">MLYA</span>
          <span className="rail-brand-sub">{T.ui[lang].role}</span>
        </div>
      </div>

      <nav className="rail-nav">
        {T.nav[lang].map((label, i) => {
          const isActive = i === page || (isDetail && i === 3);
          return (
            <button
              key={i}
              className={`rail-nav-item${isActive ? " active" : ""}`}
              onClick={() => go(i)}
            >
              <span className="rail-nav-icon">{NAV_ICONS[i]}</span>
              <span className="rail-nav-label">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="rail-foot">
        <div className="rail-foot-socials">
          <a href="https://github.com/MarleyApong" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 6.77 5.07 5.07 0 0 0 19.91 3S18.73 2.65 16 4.55a13.38 13.38 0 0 0-7 0C6.27 2.65 5.09 3 5.09 3A5.07 5.07 0 0 0 5 6.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 20.13V24" /></svg>
          </a>
          <a href="https://cm.linkedin.com/in/marley-apong-228550257" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <a href="https://www.youtube.com/@amatutoriel" target="_blank" rel="noreferrer" aria-label="YouTube">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29.7 29.7 0 0 0 1 12a29.7 29.7 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2C5.2 20 12 20 12 20s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29.7 29.7 0 0 0 23 12a29.7 29.7 0 0 0-.5-5.6z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
          </a>
          <a href="mailto:marlexapong90@gmail.com" aria-label="Email">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          </a>
        </div>
        <div className="rail-foot-meta">
          {T.ui[lang].year}<br />
          {T.ui[lang].sub}
        </div>
      </div>
    </aside>
  );
}
