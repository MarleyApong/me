"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".nf-number",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          ".nf-text",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".nf-cta",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center bg-background px-6"
    >
      <div className="relative text-center">
        {/* Big 404 */}
        <div className="flex items-center justify-center gap-2">
          <span className="nf-number font-display text-[10rem] leading-none text-foreground/10 sm:text-[14rem]">
            4
          </span>
          <span className="nf-number font-display text-[10rem] leading-none text-accent sm:text-[14rem]">
            0
          </span>
          <span className="nf-number font-display text-[10rem] leading-none text-foreground/10 sm:text-[14rem]">
            4
          </span>
        </div>

        <div className="nf-text mt-4">
          <p className="font-display text-2xl tracking-widest text-foreground sm:text-3xl">
            PAGE NOT FOUND<span className="text-accent">.</span>
          </p>
          <p className="mt-3 text-sm text-muted">
            La page que vous cherchez n&apos;existe pas ou a ete deplacee.
          </p>
        </div>

        <div className="nf-cta mt-10">
          <a
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm tracking-widest text-black transition-transform hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            RETOUR
          </a>
        </div>
      </div>
    </div>
  );
}
