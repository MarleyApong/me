"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Quote() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const quote = "Do it once, do it right, do it with TypeScript.";
  const words = quote.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      wordsRef.current.forEach((word, i) => {
        gsap.fromTo(
          word,
          { opacity: 0.1, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            scrollTrigger: {
              trigger: word,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
            delay: i * 0.02,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-6 py-28 md:px-12"
    >
      {/* Decorative quotes */}
      <span className="pointer-events-none absolute left-6 top-20 font-display text-[12rem] leading-none text-accent/5 select-none md:left-16 md:text-[20rem]">
        &ldquo;
      </span>

      <blockquote className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-display text-4xl leading-relaxed tracking-wider sm:text-5xl md:text-7xl">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) wordsRef.current[i] = el;
              }}
              className={`inline-block ${
                word === "TypeScript."
                  ? "text-accent"
                  : "text-foreground"
              }`}
            >
              {word}
            </span>
          ))}
        </p>
        <footer className="mt-8 text-sm text-muted">
          <div className="mx-auto mb-3 h-[1px] w-12 bg-accent/30" />
          APONG MARLEY
        </footer>
      </blockquote>
    </section>
  );
}
