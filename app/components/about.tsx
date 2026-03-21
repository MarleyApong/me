"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  Mail,
  Linkedin,
  Youtube,
  Github,
  GraduationCap,
  Globe,
  Code2,
  Layers,
  Zap,
} from "lucide-react";
import { useTranslation } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React", "Next.js", "React Native", "TypeScript", "JavaScript",
  "Node.js", "Express", "NestJS", "Python", "FastAPI",
  "Tailwind CSS", "SCSS", "PostgreSQL", "MySQL", "Docker",
  "Jenkins", "AWS", "Git", "Prisma", "Sequelize",
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        el.textContent = Math.floor(obj.val) + suffix;
      },
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
      const cards = cardsRef.current.querySelectorAll(".bento-card");

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
            delay: i * 0.06,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 py-28 md:px-12"
    >
      <div className="pointer-events-none absolute right-6 top-20 font-display text-[15rem] leading-none text-foreground/[0.02] select-none md:text-[25rem]">
        02
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-end gap-4">
          <span className="font-display text-sm tracking-[0.3em] text-accent">
            02
          </span>
          <div className="h-[1px] w-12 bg-accent/30" />
          <h2 className="font-display text-6xl tracking-tight md:text-8xl">
            {t("about.title")}<span className="text-accent">.</span>
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Photo card */}
          <div className="bento-card row-span-2 overflow-hidden rounded-3xl border border-card-border bg-card-bg">
            <div className="relative h-full min-h-[300px] bg-card-bg">
              <Image
                src="/images/portrait-hero.png"
                alt="APONG MARLEY"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-display text-xl tracking-wider text-foreground">
                  APONG MARLEY
                </p>
                <p className="text-sm text-muted">Fullstack Developer</p>
              </div>
            </div>
          </div>

          {/* Bio card */}
          <div className="bento-card col-span-1 rounded-3xl border border-card-border bg-card-bg p-7 sm:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.2em] text-accent">
                BIO
              </span>
            </div>
            <p className="text-base leading-relaxed text-muted">
              {t("about.bio")}
              <strong className="text-foreground"> {t("about.bioHighlight")}</strong>
              {t("about.bioEnd")}
            </p>
            <p className="mt-3 font-hand text-lg text-accent">
              &ldquo;{t("about.bioQuote")}&rdquo;
            </p>
          </div>

          {/* Stats card */}
          <div className="bento-card rounded-3xl border border-card-border bg-card-bg p-7">
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.2em] text-accent">
                {t("about.stats")}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-display text-4xl text-foreground">
                  <AnimatedCounter target={4} suffix="+" />
                </p>
                <p className="text-xs text-muted">{t("about.yearsExp")}</p>
              </div>
              <div>
                <p className="font-display text-4xl text-foreground">
                  <AnimatedCounter target={50} suffix="+" />
                </p>
                <p className="text-xs text-muted">{t("about.githubProjects")}</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bento-card rounded-3xl border border-card-border bg-card-bg p-7">
            <div className="mb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.2em] text-accent">
                {t("about.education")}
              </span>
            </div>
            <div className="space-y-3">
              <div className="border-l-2 border-accent/30 pl-3">
                <p className="text-sm font-semibold text-foreground">
                  {t("about.softwareEng")}
                </p>
                <p className="text-xs text-muted">{t("about.degree")}</p>
              </div>
              <div className="border-l-2 border-accent/30 pl-3">
                <p className="text-sm font-semibold text-foreground">
                  {t("about.selfTaught")}
                </p>
                <p className="text-xs text-muted">{t("about.realWorld")}</p>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="bento-card rounded-3xl border border-card-border bg-card-bg p-7">
            <div className="mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.2em] text-accent">
                {t("about.languages")}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t("about.french")}</span>
                <span className="text-xs text-muted">{t("about.native")}</span>
              </div>
              <div className="h-1 rounded-full bg-card-border">
                <div className="h-1 w-full rounded-full bg-accent" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{t("about.english")}</span>
                <span className="text-xs text-muted">{t("about.professional")}</span>
              </div>
              <div className="h-1 rounded-full bg-card-border">
                <div className="h-1 w-[85%] rounded-full bg-accent" />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bento-card col-span-1 rounded-3xl border border-card-border bg-card-bg p-7 sm:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Layers className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.2em] text-accent">
                {t("about.techStack")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-card-border bg-background px-3 py-1.5 text-xs font-medium text-muted transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contact links */}
          <div className="bento-card rounded-3xl border border-card-border bg-card-bg p-7">
            <div className="mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.2em] text-accent">
                {t("about.contactLabel")}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: Mail, label: "Email", href: "mailto:marlexapong90@gmail.com" },
                { icon: Github, label: "GitHub", href: "https://github.com/MarleyApong" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/marley-apong" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com/@amatutoriel" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
