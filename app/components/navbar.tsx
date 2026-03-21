"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Menu, X, ArrowUpRight, Languages } from "lucide-react";
import Image from "next/image";
import {
  useTranslation,
  supportedLanguages,
  type SupportedLanguage,
} from "../i18n";
import { useTheme } from "./theme-provider";

export default function Navbar() {
  const { t, lang, changeLang } = useTranslation();
  const { mode } = useTheme();
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);

  const links = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < 100 || currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        menuItemsRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed left-0 right-0 top-0 z-50 px-6 py-5 transition-all duration-500 md:px-12"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          backdropFilter: "blur(12px)",
          background: "var(--background)",
          opacity: 0.95,
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#home" className="relative h-10 w-32">
            <Image
              src={mode === "light" ? "/images/logo-dark.png" : "/images/logo-light.png"}
              alt="MLYA"
              fill
              className="object-contain object-left"
            />
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative font-display text-xs tracking-[0.2em] text-muted transition-colors hover:text-foreground"
              >
                {link.label.toUpperCase()}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded-full border border-card-border px-3 py-1.5 font-display text-xs tracking-widest text-muted transition-all hover:border-accent/50 hover:text-accent"
              >
                <Languages className="h-3 w-3" />
                {lang.toUpperCase()}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-10 overflow-hidden rounded-xl border border-card-border bg-card-bg shadow-xl">
                  {(
                    Object.keys(supportedLanguages) as SupportedLanguage[]
                  ).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        changeLang(key);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs transition-colors hover:bg-foreground/5 ${
                        lang === key ? "text-accent" : "text-muted"
                      }`}
                    >
                      {supportedLanguages[key].name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="flex items-center gap-1 rounded-full border border-accent/30 px-5 py-2 font-display text-xs tracking-widest text-accent transition-all hover:bg-accent hover:text-black"
            >
              {t("nav.contact").toUpperCase()}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="flex overflow-hidden rounded-full border border-card-border">
              {(Object.keys(supportedLanguages) as SupportedLanguage[]).map((key) => (
                <button
                  key={key}
                  onClick={() => changeLang(key)}
                  className={`px-3 py-1.5 font-display text-xs tracking-widest transition-all ${
                    lang === key ? "bg-accent text-black" : "text-muted"
                  }`}
                >
                  {supportedLanguages[key].label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-[60]"
            >
              {mobileOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-2 bg-background">
          {links.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => {
                if (el) menuItemsRef.current[i] = el;
              }}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="group flex items-center gap-3 py-3 opacity-0"
            >
              <span className="font-display text-sm text-accent">
                0{i + 1}
              </span>
              <span className="font-display text-5xl tracking-wider text-foreground transition-colors group-hover:text-accent">
                {link.label.toUpperCase()}
              </span>
            </a>
          ))}
          {/* Mobile lang switcher */}
          <div className="mt-6 flex gap-3">
            {(Object.keys(supportedLanguages) as SupportedLanguage[]).map(
              (key) => (
                <button
                  key={key}
                  onClick={() => {
                    changeLang(key);
                    setMobileOpen(false);
                  }}
                  className={`rounded-full border px-4 py-2 font-display text-sm tracking-widest transition-all ${
                    lang === key
                      ? "border-accent bg-accent text-black"
                      : "border-card-border text-muted"
                  }`}
                >
                  {supportedLanguages[key].label}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
