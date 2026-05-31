"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ThemeProvider, useTheme } from "./components/theme-provider";
import { BootScreen } from "./components/boot-screen";
import { Cursor } from "./components/cursor";
import { Rail } from "./components/rail";
import { TopBar } from "./components/top-bar";
import { BottomNav } from "./components/bottom-nav";
import { MobileMenu } from "./components/mobile-menu";
import { MobileHeader } from "./components/mobile-header";
import { usePageNav, TOTAL_PAGES, MAIN_PAGES } from "./hooks/use-page-nav";
import { useIsMobile } from "./hooks/use-is-mobile";
import { HeroPage } from "./components/pages/hero";
import { AboutPage } from "./components/pages/about";
import { AboutIntroMobile, AboutMetaMobile } from "./components/pages/about-mobile";
import { StackPage } from "./components/pages/stack";
import { StackMobilePage } from "./components/pages/stack-mobile";
import { ProjectsPage } from "./components/pages/projects";
import { ProjectMobilePage } from "./components/pages/project-mobile";
import { ExpPage } from "./components/pages/exp";
import { DualPage } from "./components/pages/dual";
import { QuotePage } from "./components/pages/quote";
import { ContactPage } from "./components/pages/contact";
import { YourCapCasePage } from "./components/pages/yourcap-case";
import { WebCasePage } from "./components/pages/web-case";
import type { Lang } from "./lib/content";
import { CONTENT } from "./lib/content";

// Pages mobiles : About (intro+4) + Stack (4) + Projects (3) = +11 pages vs desktop
// 0:Hero 1:AboutIntro 2-5:AboutMeta 6-9:StackMobile 10-12:Projects 13:Exp 14:Dual 15:Quote 16:Contact
const MOBILE_TOTAL = 17;
const MOBILE_MAIN  = 17;

const MOBILE_NAV_IDX: Record<number, number> = {
  0: 0,
  1: 1, 2: 1, 3: 1, 4: 1, 5: 1,
  6: 2, 7: 2, 8: 2, 9: 2,
  10: 3, 11: 3, 12: 3,
  13: 4, 14: 5, 15: 6, 16: 7,
};

const NAV_TO_MOBILE_PAGE: Record<number, number> = {
  0: 0, 1: 1, 2: 6, 3: 10, 4: 13, 5: 14, 6: 15, 7: 16,
};

function PortfolioApp() {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const stageRef = useRef<HTMLElement>(null);
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("mlya.lang") as Lang) ?? "fr";
    }
    return "fr";
  });
  const [egg, setEgg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navClickRef = useRef(0);

  const total = isMobile ? MOBILE_TOTAL : TOTAL_PAGES;
  const { page, go, next, prev, isDetail } = usePageNav(stageRef, total, isMobile ? MOBILE_MAIN : MAIN_PAGES);

  useEffect(() => { localStorage.setItem("mlya.lang", lang); }, [lang]);

  // Navigation depuis le menu mobile → page mobile correcte
  const goMobile = useCallback((navIdx: number) => {
    if (isMobile) {
      go(NAV_TO_MOBILE_PAGE[navIdx] ?? 0);
    } else {
      go(navIdx);
    }
  }, [isMobile, go]);

  const onBrandClick = useCallback(() => {
    navClickRef.current += 1;
    if (navClickRef.current >= 5) { navClickRef.current = 0; setEgg(true); }
  }, []);

  useEffect(() => {
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let idx = 0;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setEgg(false); return; }
      if (e.key.toLowerCase() === seq[idx].toLowerCase()) {
        idx++; if (idx === seq.length) { setEgg(true); idx = 0; }
      } else { idx = 0; }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const trackStyle = { transform: `translateX(calc(${-page} * (100vw - var(--rail-w))))` };

  // Page active pour le rail nav
  const activeNavIdx = isMobile ? (MOBILE_NAV_IDX[page] ?? 0) : page;

  return (
    <>
      <BootScreen />
      <Cursor />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        page={activeNavIdx}
        go={goMobile}
        lang={lang}
      />
      <MobileHeader lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} onOpenMenu={() => setMenuOpen(true)} />

      <div className="app">
        <Rail page={isMobile ? activeNavIdx : page} go={isMobile ? goMobile : go} lang={lang} theme={theme} onBrandClick={onBrandClick} />

        <main className="stage" ref={stageRef}>
          <TopBar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} onOpenMenu={() => setMenuOpen(true)} />

          <div className="stage-track" style={trackStyle}>
            {Array.from({ length: total }).map((_, i) => (
              <section key={i} className="page" data-active={String(i === page)}>
                {isMobile
                  ? <MobilePageRouter idx={i} lang={lang} go={go} active={i === page} />
                  : <DesktopPageRouter idx={i} lang={lang} go={go} active={i === page} />
                }
              </section>
            ))}
          </div>

          {page === 0 && !isMobile && (
            <div className="scroll-hint">
              {CONTENT.ui[lang].hint}
              <span className="scroll-hint-line" />
            </div>
          )}

          {!isMobile && <BottomNav page={page} go={go} next={next} prev={prev} isDetail={isDetail} />}
        </main>
      </div>

      <div className={`egg-overlay${egg ? " show" : ""}`}>
        <div className="egg-content">
          <h2>Hello, dev.</h2>
          <p>{lang === "fr"
            ? "Tu as trouvé un easter egg 🎉 Je suis Apong Marley, et si tu lis ceci, on a probablement quelque chose à construire ensemble."
            : "You found an easter egg 🎉 I'm Apong Marley, and if you're reading this, we probably have something to build together."}
          </p>
          <button onClick={() => setEgg(false)}>{lang === "fr" ? "Fermer" : "Close"}</button>
        </div>
      </div>
    </>
  );
}

// ── Desktop : 10 pages ────────────────────────────────────
function DesktopPageRouter({ idx, lang, go, active }: { idx: number; lang: Lang; go: (i: number) => void; active: boolean }) {
  switch (idx) {
    case 0: return <HeroPage lang={lang} />;
    case 1: return <AboutPage lang={lang} active={active} />;
    case 2: return <StackPage lang={lang} active={active} />;
    case 3: return <ProjectsPage lang={lang} go={go} active={active} />;
    case 4: return <ExpPage lang={lang} active={active} />;
    case 5: return <DualPage lang={lang} active={active} />;
    case 6: return <QuotePage lang={lang} />;
    case 7: return <ContactPage lang={lang} active={active} />;
    case 8: return <YourCapCasePage lang={lang} go={go} />;
    case 9: return <WebCasePage lang={lang} go={go} />;
    default: return null;
  }
}

// ── Mobile : 15 pages ─────────────────────────────────────
// 0:Hero | 1:AboutIntro | 2-5:AboutMeta | 6-9:StackCol | 10:Projects | 11:Exp | 12:Dual | 13:Quote | 14:Contact
function MobilePageRouter({ idx, lang, go, active }: { idx: number; lang: Lang; go: (i: number) => void; active: boolean }) {
  const ABOUT_META_COUNT = CONTENT.about[lang].m.length; // 4
  const STACK_COL_COUNT  = CONTENT.stack[lang].cols.length; // 4

  switch (true) {
    case idx === 0:  return <HeroPage lang={lang} />;
    case idx === 1:  return <AboutIntroMobile lang={lang} />;
    case idx >= 2 && idx <= 5:
      return <AboutMetaMobile lang={lang} idx={idx - 2} total={ABOUT_META_COUNT} />;
    case idx >= 6 && idx <= 9:
      return <StackMobilePage lang={lang} idx={idx - 6} />;
    case idx >= 10 && idx <= 12:
      return <ProjectMobilePage lang={lang} idx={idx - 10} go={go} />;
    case idx === 13: return <ExpPage lang={lang} active={active} />;
    case idx === 14: return <DualPage lang={lang} active={active} />;
    case idx === 15: return <QuotePage lang={lang} />;
    case idx === 16: return <ContactPage lang={lang} active={active} />;
    default: return null;
  }
}

export default function Home() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
