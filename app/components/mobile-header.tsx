"use client";

import { useState, useEffect } from "react";
import type { Lang } from "@/app/lib/content";

interface MobileHeaderProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: string;
  toggleTheme: () => void;
  onOpenMenu: () => void;
}

export function MobileHeader({ lang, setLang, theme, toggleTheme, onOpenMenu }: MobileHeaderProps) {
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (!langOpen) return;
    const h = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".mh-lang")) setLangOpen(false);
    };
    window.addEventListener("mousedown", h);
    return () => window.removeEventListener("mousedown", h);
  }, [langOpen]);

  return (
    <header className="mobile-header">
      {/* Hamburger */}
      <button
        onClick={onOpenMenu}
        aria-label="Menu"
        style={{ background: "none", border: "1px solid var(--line-strong)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", cursor: "pointer" }}
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <span className="mobile-header-logo">MLYA</span>

      <div className="mobile-header-actions">
        {/* Lang */}
        <div className="mh-lang" style={{ position: "relative" }}>
          <button
            onClick={() => setLangOpen(o => !o)}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid var(--line-strong)", borderRadius: 999, padding: "5px 10px", fontSize: 10, letterSpacing: "0.18em", fontWeight: 600, color: "var(--ink)", cursor: "pointer", fontFamily: "var(--f-mono)" }}
          >
            <img src={`https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/${lang === "fr" ? "CM" : "GB"}.svg`} width={16} alt={lang} style={{ borderRadius: 2 }} />
            {lang.toUpperCase()}
          </button>
          {langOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "var(--surface)", border: "1px solid var(--line-strong)", borderRadius: 8, overflow: "hidden", zIndex: 200, minWidth: 120 }}>
              {(["fr", "en"] as Lang[]).map(l => (
                <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", background: lang === l ? "var(--ink)" : "none", color: lang === l ? "var(--bg)" : "var(--ink)", fontSize: 12, cursor: "pointer", border: "none", fontFamily: "var(--f-sans)" }}>
                  <img src={`https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/${l === "fr" ? "CM" : "GB"}.svg`} width={16} alt={l} style={{ borderRadius: 2 }} />
                  {l === "fr" ? "Français" : "English"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          aria-label="Thème"
          style={{ background: "none", border: "1px solid var(--line-strong)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)", cursor: "pointer" }}
        >
          {theme === "dark" ? (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" /><line x1="12" y1="3" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="21" />
              <line x1="3" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="21" y2="12" />
            </svg>
          ) : (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
