"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  Mail, Linkedin, Youtube, Github,
  GraduationCap, Globe, Code2, Layers, Zap, ArrowUpRight,
} from "lucide-react";
import { useTranslation } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React", "Next.js", "React Native", "TypeScript", "JavaScript",
  "Node.js", "NestJS", "Python", "FastAPI",
  "Tailwind CSS", "PostgreSQL", "MySQL", "Docker",
  "Jenkins", "AWS", "Prisma",
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => { el.textContent = Math.floor(obj.val) + suffix; },
    });
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return;
      cardsRef.current.querySelectorAll(".bento-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
            delay: i * 0.07,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden px-6 py-28 md:px-12">
      <div className="pointer-events-none absolute right-6 top-20 select-none font-display text-[15rem] leading-none text-foreground/[0.02] md:text-[25rem]">
        02
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end gap-4">
          <span className="font-display text-sm tracking-[0.3em] text-accent">02</span>
          <div className="h-px w-12 bg-accent/30" />
          <h2 className="font-display section-title">
            {t("about.title")}<span className="text-accent">.</span>
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12"
        >
          {/* ── Photo ── col 3 / row 2 */}
          <div className="bento-card relative overflow-hidden rounded-3xl border border-card-border bg-card-bg sm:col-span-1 lg:col-span-3 lg:row-span-2" style={{ minHeight: 380 }}>
            <Image
              src="/images/portrait-hero.png"
              alt="APONG MARLEY"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-2xl tracking-wider text-white">APONG MARLEY</p>
              <p className="text-sm text-white/60">Fullstack Developer</p>
            </div>
          </div>

          {/* ── Bio ── col 6 */}
          <div className="bento-card flex flex-col justify-between rounded-3xl border border-card-border bg-card-bg p-8 sm:col-span-1 lg:col-span-6">
            <div className="mb-2 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.25em] text-accent">BIO</span>
            </div>
            <p className="text-base leading-relaxed text-muted">
              {t("about.bio")}
              <strong className="text-foreground"> {t("about.bioHighlight")}</strong>
              {t("about.bioEnd")}
            </p>
            <p className="mt-4 font-hand text-xl text-accent/80">
              &ldquo;{t("about.bioQuote")}&rdquo;
            </p>
          </div>

          {/* ── Stats ── col 3 */}
          <div className="bento-card flex flex-col justify-between rounded-3xl border border-card-border bg-surface p-8 lg:col-span-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.25em] text-accent">{t("about.stats")}</span>
            </div>
            <div className="mt-6 flex flex-col gap-5">
              <div>
                <p className="font-display text-6xl leading-none text-foreground">
                  <AnimatedCounter target={4} suffix="+" />
                </p>
                <p className="mt-1 text-xs text-muted">{t("about.yearsExp")}</p>
              </div>
              <div>
                <p className="font-display text-6xl leading-none text-foreground">
                  <AnimatedCounter target={50} suffix="+" />
                </p>
                <p className="mt-1 text-xs text-muted">{t("about.githubProjects")}</p>
              </div>
            </div>
          </div>

          {/* ── Education ── col 4 */}
          <div className="bento-card rounded-3xl border border-card-border bg-card-bg p-8 lg:col-span-4">
            <div className="mb-5 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.25em] text-accent">{t("about.education")}</span>
            </div>
            <div className="space-y-5">
              {[
                { title: t("about.softwareEng"), sub: t("about.degree") },
                { title: t("about.selfTaught"),  sub: t("about.realWorld") },
              ].map(({ title, sub }) => (
                <div key={title} className="group flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-xs text-muted">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Languages ── col 3 */}
          <div className="bento-card rounded-3xl border border-card-border bg-card-bg p-8 lg:col-span-3">
            <div className="mb-5 flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.25em] text-accent">{t("about.languages")}</span>
            </div>
            <div className="space-y-4">
              {[
                { label: t("about.french"),  level: t("about.native"),       pct: "100%" },
                { label: t("about.english"), level: t("about.professional"), pct: "85%" },
              ].map(({ label, level, pct }) => (
                <div key={label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm text-foreground">{label}</span>
                    <span className="text-[11px] text-muted">{level}</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-card-border">
                    <div className="h-1 rounded-full bg-accent transition-all" style={{ width: pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Contact links ── col 2 */}
          <div className="bento-card rounded-3xl border border-card-border bg-surface p-8 lg:col-span-2">
            <div className="mb-5 flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.25em] text-accent">{t("about.contactLabel")}</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { Icon: Mail,     label: "Email",    href: "mailto:marlexapong90@gmail.com" },
                { Icon: Github,   label: "GitHub",   href: "https://github.com/MarleyApong" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/marley-apong" },
                { Icon: Youtube,  label: "YouTube",  href: "https://youtube.com/@amatutoriel" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between text-sm text-muted transition-colors hover:text-accent"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Skills ── col span full */}
          <div className="bento-card rounded-3xl border border-card-border bg-card-bg p-8 sm:col-span-2 lg:col-span-12">
            <div className="mb-5 flex items-center gap-2">
              <Layers className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.25em] text-accent">{t("about.techStack")}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-card-border bg-surface px-4 py-2 text-xs font-medium text-muted transition-all duration-300 hover:border-accent/50 hover:text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
