"use client";

import { useEffect } from "react";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";
import { MAIN_PAGES } from "@/app/hooks/use-page-nav";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  page: number;
  go: (idx: number) => void;
  lang: Lang;
}

export function MobileMenu({ open, onClose, page, go, lang }: MobileMenuProps) {
  const isDetail = page >= MAIN_PAGES;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleGo = (idx: number) => { go(idx); onClose(); };

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "var(--rail)",
        color: "var(--rail-ink)",
        zIndex: 500,
        display: "flex",
        flexDirection: "column",
        padding: "28px 32px 48px",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 56 }}>
        <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: "0.04em" }}>MLYA</span>
        <button
          onClick={onClose}
          style={{ background: "none", border: "1px solid var(--rail-line)", borderRadius: "50%", width: 40, height: 40, display: "grid", placeItems: "center", color: "var(--rail-ink)", cursor: "pointer" }}
          aria-label="Fermer"
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Nav items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
        {CONTENT.nav[lang].map((label, i) => {
          const isActive = i === page || (isDetail && i === 3);
          return (
            <button
              key={i}
              onClick={() => handleGo(i)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0",
                borderBottom: "1px solid var(--rail-line)",
                background: "none",
                border: "none",
                borderBottom: "1px solid var(--rail-line)",
                color: isActive ? "var(--rail-ink)" : "var(--rail-muted)",
                fontSize: "clamp(22px, 5vw, 32px)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--f-sans)",
                transition: "color 0.3s",
              }}
            >
              <span>{label}</span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.2em", opacity: 0.4 }}>
                0{i + 1}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Socials */}
      <div style={{ display: "flex", gap: 16, marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--rail-line)" }}>
        {[
          { href: "https://github.com/MarleyApong", label: "GH" },
          { href: "https://cm.linkedin.com/in/marley-apong-228550257", label: "LI" },
          { href: "https://www.youtube.com/@amatutoriel", label: "YT" },
          { href: "mailto:marlexapong90@gmail.com", label: "ML" },
        ].map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--rail-muted)", border: "1px solid var(--rail-line)", padding: "8px 12px" }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
