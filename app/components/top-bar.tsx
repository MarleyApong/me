"use client";

import { useState, useEffect } from "react";
import type { Lang } from "@/app/lib/content";

interface TopBarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: string;
  toggleTheme: () => void;
  onOpenMenu: () => void;
}

function Flag({ cc, w = 20 }: { cc: string; w?: number }) {
  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/${cc.toUpperCase()}.svg`}
      alt={cc}
      width={w}
      style={{ borderRadius: 2, display: "inline-block", verticalAlign: "middle", boxShadow: "0 0 0 1px rgba(0,0,0,0.06)" }}
    />
  );
}

export function TopBar({ lang, setLang, theme, toggleTheme, onOpenMenu }: TopBarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".lang-dd")) setOpen(false);
    };
    window.addEventListener("mousedown", h);
    return () => window.removeEventListener("mousedown", h);
  }, [open]);

  return (
    <div className="topbar">
      {/* Hamburger — mobile only */}
      <button
        className="hamburger-btn"
        onClick={onOpenMenu}
        aria-label="Menu"
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className={`lang-dd${open ? " open" : ""}`}>
        <button className="lang-dd-trigger" onClick={() => setOpen((o) => !o)} aria-label="Language">
          <span className="lang-dd-flag"><Flag cc={lang === "fr" ? "CM" : "GB"} /></span>
          <span className="lang-dd-code">{lang.toUpperCase()}</span>
          <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lang-dd-chev">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {open && (
          <div className="lang-dd-menu">
            <button className={`lang-dd-opt${lang === "fr" ? " active" : ""}`} onClick={() => { setLang("fr"); setOpen(false); }}>
              <span className="lang-dd-flag"><Flag cc="CM" /></span>
              <span className="lang-dd-name">{lang === "fr" ? "Français" : "French"}</span>
              <span className="lang-dd-code">FR</span>
            </button>
            <button className={`lang-dd-opt${lang === "en" ? " active" : ""}`} onClick={() => { setLang("en"); setOpen(false); }}>
              <span className="lang-dd-flag"><Flag cc="GB" /></span>
              <span className="lang-dd-name">{lang === "fr" ? "Anglais" : "English"}</span>
              <span className="lang-dd-code">EN</span>
            </button>
          </div>
        )}
      </div>
      <button className="theme-btn" aria-label="Toggle theme" onClick={toggleTheme}>
        {theme === "dark" ? (
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="3" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="21" />
            <line x1="3" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="21" y2="12" />
            <line x1="5.5" y1="5.5" x2="6.9" y2="6.9" /><line x1="17.1" y1="17.1" x2="18.5" y2="18.5" />
            <line x1="5.5" y1="18.5" x2="6.9" y2="17.1" /><line x1="17.1" y1="6.9" x2="18.5" y2="5.5" />
          </svg>
        ) : (
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
