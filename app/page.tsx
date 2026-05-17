"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ThemeProvider, useTheme } from "./components/theme-provider";
import { BootScreen } from "./components/boot-screen";
import { Cursor } from "./components/cursor";
import { Rail } from "./components/rail";
import { TopBar } from "./components/top-bar";
import { BottomNav } from "./components/bottom-nav";
import { usePageNav, TOTAL_PAGES } from "./hooks/use-page-nav";
import { HeroPage } from "./components/pages/hero";
import { AboutPage } from "./components/pages/about";
import { StackPage } from "./components/pages/stack";
import { ProjectsPage } from "./components/pages/projects";
import { ExpPage } from "./components/pages/exp";
import { DualPage } from "./components/pages/dual";
import { QuotePage } from "./components/pages/quote";
import { ContactPage } from "./components/pages/contact";
import { YourCapCasePage } from "./components/pages/yourcap-case";
import { WebCasePage } from "./components/pages/web-case";
import type { Lang } from "./lib/content";
import { CONTENT } from "./lib/content";

function PortfolioApp() {
  const { theme, toggleTheme } = useTheme();
  const stageRef = useRef<HTMLElement>(null);
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("mlya.lang") as Lang) ?? "fr";
    }
    return "fr";
  });
  const [egg, setEgg] = useState(false);
  const navClickRef = useRef(0);

  const { page, go, next, prev, isDetail } = usePageNav(stageRef);

  useEffect(() => { localStorage.setItem("mlya.lang", lang); }, [lang]);

  const onBrandClick = useCallback(() => {
    navClickRef.current += 1;
    if (navClickRef.current >= 5) {
      navClickRef.current = 0;
      setEgg(true);
    }
  }, []);

  // Konami code easter egg
  useEffect(() => {
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let idx = 0;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setEgg(false); return; }
      if (e.key.toLowerCase() === seq[idx].toLowerCase()) {
        idx++;
        if (idx === seq.length) { setEgg(true); idx = 0; }
      } else { idx = 0; }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const trackStyle = {
    transform: `translateX(calc(${-page} * (100vw - var(--rail-w))))`,
  };

  const labels = ["01 Home","02 About","03 Stack","04 Projects","05 Path","06 Studies","07 Quote","08 Contact","Detail YourCap","Detail Web"];

  return (
    <>
      <BootScreen />
      <Cursor />

      <div className="app">
        <Rail page={page} go={go} lang={lang} theme={theme} onBrandClick={onBrandClick} />

        <main className="stage" ref={stageRef}>
          <TopBar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />

          <div className="stage-track" style={trackStyle}>
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <section
                key={i}
                className="page"
                data-active={String(i === page)}
                data-screen-label={labels[i]}
              >
                <PageRouter idx={i} lang={lang} go={go} active={i === page} />
              </section>
            ))}
          </div>

          {page === 0 && (
            <div className="scroll-hint">
              {CONTENT.ui[lang].hint}
              <span className="scroll-hint-line" />
            </div>
          )}

          <BottomNav page={page} go={go} next={next} prev={prev} isDetail={isDetail} />
        </main>
      </div>

      <div className={`egg-overlay${egg ? " show" : ""}`}>
        <div className="egg-content">
          <h2>Hello, dev.</h2>
          <p>
            {lang === "fr"
              ? "Tu as trouvé un easter egg 🎉 Je suis Apong Marley, et si tu lis ceci, on a probablement quelque chose à construire ensemble."
              : "You found an easter egg 🎉 I'm Apong Marley, and if you're reading this, we probably have something to build together."}
          </p>
          <button onClick={() => setEgg(false)}>{lang === "fr" ? "Fermer" : "Close"}</button>
        </div>
      </div>
    </>
  );
}

function PageRouter({ idx, lang, go, active }: { idx: number; lang: Lang; go: (i: number) => void; active: boolean }) {
  switch (idx) {
    case 0: return <HeroPage lang={lang} />;
    case 1: return <AboutPage lang={lang} />;
    case 2: return <StackPage lang={lang} />;
    case 3: return <ProjectsPage lang={lang} go={go} />;
    case 4: return <ExpPage lang={lang} />;
    case 5: return <DualPage lang={lang} active={active} />;
    case 6: return <QuotePage lang={lang} />;
    case 7: return <ContactPage lang={lang} />;
    case 8: return <YourCapCasePage lang={lang} go={go} />;
    case 9: return <WebCasePage lang={lang} go={go} />;
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
