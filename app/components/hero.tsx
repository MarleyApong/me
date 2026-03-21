"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useTranslation } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.8 });

      if (nameRef.current) {
        const chars = nameRef.current.querySelectorAll(".char");
        tl.fromTo(
          chars,
          { y: 120, opacity: 0, rotateX: 90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.04,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }

      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      tl.fromTo(
        photoRef.current,
        { scale: 0.8, opacity: 0, rotate: 8 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      tl.fromTo(
        lineRefs.current,
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );

      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );

      if (sectionRef.current) {
        gsap.to(nameRef.current, {
          yPercent: -30,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(photoRef.current, {
          yPercent: 20,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameText = "PORTFOLIO";
  const chars = nameText.split("");

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-20 md:px-12"
    >
      <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 font-display text-[20rem] leading-none text-foreground/[0.02] select-none md:left-12 md:text-[30rem]">
        01
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="z-10 flex flex-col items-center lg:items-start">
          <h1
            ref={nameRef}
            className="overflow-hidden font-display text-7xl leading-[0.85] tracking-tight sm:text-8xl md:text-[10rem]"
            style={{ perspective: "500px" }}
          >
            {chars.map((char, i) => (
              <span
                key={i}
                className={`char inline-block ${i >= 7 ? "text-accent" : ""}`}
              >
                {char}
              </span>
            ))}
            <span className="char inline-block text-accent">.</span>
          </h1>

          <div ref={subtitleRef} className="mt-6 flex flex-col gap-2 opacity-0">
            <div className="flex items-center gap-3">
              <div
                ref={(el) => {
                  if (el) lineRefs.current[0] = el;
                }}
                className="h-[1px] w-12 origin-left bg-accent"
              />
              <span className="font-hand text-2xl text-accent sm:text-3xl">
                {t("hero.subtitle")}
              </span>
            </div>
            <p className="max-w-md text-lg text-muted lg:text-left">
              ASSOH APONG MARLEY WALTER
            </p>
            <p className="text-sm text-muted/60">{t("hero.role")}</p>
          </div>

          <div className="mt-10 flex gap-4">
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm tracking-widest text-black transition-transform hover:scale-105"
            >
              {t("hero.cta")}
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="flex items-center rounded-full border border-foreground/20 px-7 py-3.5 font-display text-sm tracking-widest text-foreground transition-all hover:border-accent hover:text-accent"
            >
              {t("hero.contact")}
            </a>
          </div>
        </div>

        <div ref={photoRef} className="relative opacity-0">
          <div className="absolute -right-5 -top-5 h-full w-full rounded-3xl bg-accent/20" />
          <div className="absolute -right-2 -top-2 h-full w-full rounded-3xl bg-accent/10" />

          <div className="relative h-[350px] w-[280px] overflow-hidden rounded-3xl sm:h-[480px] sm:w-[360px]">
            <Image
              src="/images/portrait-1.jpg"
              alt="ASSOH APONG MARLEY WALTER"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          <div className="absolute -left-6 bottom-8 rounded-2xl border border-card-border bg-card-bg/90 px-5 py-3 backdrop-blur-sm">
            <p className="font-display text-3xl text-accent">4+</p>
            <p className="text-xs text-muted">{t("hero.years")}</p>
          </div>

          <div className="absolute -right-3 top-8 flex items-center gap-2 rounded-full border border-card-border bg-card-bg/90 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <span className="text-xs text-muted">{t("hero.available")}</span>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-[10px] tracking-[0.3em] text-muted">
            {t("hero.scroll")}
          </span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>

      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 -rotate-90 font-display text-[10px] tracking-[0.4em] text-muted/40 md:right-12 lg:block">
        APONG MARLEY &mdash; 2025
      </div>
    </section>
  );
}
