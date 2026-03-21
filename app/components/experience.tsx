"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "2024 - Present",
    role: "Frontend Developer",
    company: "GB_PAY",
    org: "BETTER-PLANNING-DIGITAL-PROJECT",
    description:
      "Plateforme d'aggregation de paiement. Collaboration avec deux developpeurs backend pour construire une solution de paiement complete.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    period: "2022 - 2024",
    role: "Fullstack Developer",
    company: "Freelance & Projets",
    org: "",
    description:
      "Developpement d'applications web et mobile pour divers clients. Architecture propre, APIs REST, deploiement Docker sur VPS.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
  },
  {
    period: "2021 - 2022",
    role: "Developpeur Junior",
    company: "Projets Personnels",
    org: "",
    description:
      "Apprentissage intensif et construction de projets personnels. Maitrise du stack JavaScript/TypeScript fullstack.",
    tech: ["React", "Express", "MySQL", "JavaScript"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !sectionRef.current) return;

      const cards = trackRef.current.querySelectorAll(".exp-card");

      // Horizontal scroll
      const totalScroll = trackRef.current.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Each card animation
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById("horizontal") || undefined,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 pt-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end gap-4">
            <span className="font-display text-sm tracking-[0.3em] text-accent">
              03
            </span>
            <div className="h-[1px] w-12 bg-accent/30" />
            <h2 className="font-display text-6xl tracking-tight md:text-8xl">
              EXPERIENCE<span className="text-accent">.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 px-6 py-16 md:px-12"
        style={{ width: "max-content" }}
      >
        {/* Intro card */}
        <div className="flex h-[420px] w-[350px] shrink-0 flex-col justify-center rounded-3xl border border-accent/20 bg-accent/5 p-10 md:w-[400px]">
          <Briefcase className="mb-4 h-8 w-8 text-accent" />
          <h3 className="mb-3 font-display text-4xl tracking-wider">
            MON PARCOURS
          </h3>
          <p className="text-sm leading-relaxed text-muted">
            Plusieurs annees d&apos;experience dans des environnements reels.
            Architecture propre, fiabilite et scalabilite.
          </p>
          <div className="mt-6 flex items-center gap-2 text-accent">
            <span className="font-display text-xs tracking-widest">
              SCROLL
            </span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {/* Experience cards */}
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="exp-card flex h-[420px] w-[350px] shrink-0 flex-col justify-between rounded-3xl border border-card-border bg-card-bg p-10 md:w-[400px]"
          >
            <div>
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full bg-accent/10 px-3 py-1 font-display text-xs tracking-wider text-accent">
                  {exp.period}
                </span>
                <span className="font-display text-4xl text-foreground/10">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mb-1 font-display text-2xl tracking-wider text-foreground">
                {exp.role}
              </h3>
              <p className="mb-1 text-sm font-semibold text-accent">
                {exp.company}
              </p>
              {exp.org && (
                <p className="mb-4 text-xs text-muted">{exp.org}</p>
              )}
              {!exp.org && <div className="mb-4" />}

              <p className="text-sm leading-relaxed text-muted">
                {exp.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-card-border px-2.5 py-1 text-[10px] font-medium text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
