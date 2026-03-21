"use client";

import { useState } from "react";
import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./components/theme-provider";
import QueryProvider from "./components/query-provider";
import SmoothScroll from "./components/smooth-scroll";
import Preloader from "./components/preloader";
import CustomCursor from "./components/custom-cursor";
import ThemePanel from "./components/theme-panel";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Marquee from "./components/marquee";
import About from "./components/about";
import Experience from "./components/experience";
import Projects from "./components/projects";
import Quote from "./components/quote";
import Contact from "./components/contact";
import Footer from "./components/footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <QueryProvider>
      <ThemeProvider>
        <I18nProvider>
          {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            <main
              style={{
                opacity: loaded ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <Hero />
              <Marquee />
              <About />
              <Experience />
              <Marquee />
              <Projects />
              <Quote />
              <Contact />
              <Footer />
            </main>
          </SmoothScroll>
          <ThemePanel />
        </I18nProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
