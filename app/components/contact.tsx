"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Linkedin,
  Youtube,
  Github,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { useTranslation } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "marlexapong90@gmail.com",
    href: "mailto:marlexapong90@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "MarleyApong",
    href: "https://github.com/MarleyApong",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Marley Apong",
    href: "https://linkedin.com/in/marley-apong",
  },
  {
    icon: Youtube,
    label: "YouTube",
    value: "@amatutoriel",
    href: "https://youtube.com/@amatutoriel",
  },
];

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll(".reveal-up");
      if (!elements) return;

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
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
      id="contact"
      className="relative overflow-hidden bg-[#050505] px-6 py-28 md:px-12"
    >
      <div className="pointer-events-none absolute right-6 top-20 font-display text-[15rem] leading-none text-foreground/[0.02] select-none md:text-[25rem]">
        05
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="reveal-up mb-6 flex items-end gap-4">
          <span className="font-display text-sm tracking-[0.3em] text-accent">
            05
          </span>
          <div className="h-[1px] w-12 bg-accent/30" />
          <h2 className="font-display text-6xl tracking-tight md:text-8xl">
            {t("contact.title")}<span className="text-accent">.</span>
          </h2>
        </div>

        <p className="reveal-up mb-16 max-w-md text-lg text-muted">
          {t("contact.subtitle")}
        </p>

        <div className="grid gap-16 lg:grid-cols-2">
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="reveal-up grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-display text-[10px] tracking-[0.3em] text-muted">
                  {t("contact.nameLabel")}
                </label>
                <input
                  type="text"
                  className="w-full border-b border-card-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  placeholder={t("contact.namePlaceholder")}
                />
              </div>
              <div>
                <label className="mb-2 block font-display text-[10px] tracking-[0.3em] text-muted">
                  {t("contact.emailLabel")}
                </label>
                <input
                  type="email"
                  className="w-full border-b border-card-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  placeholder={t("contact.emailPlaceholder")}
                />
              </div>
            </div>
            <div className="reveal-up">
              <label className="mb-2 block font-display text-[10px] tracking-[0.3em] text-muted">
                {t("contact.subjectLabel")}
              </label>
              <input
                type="text"
                className="w-full border-b border-card-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                placeholder={t("contact.subjectPlaceholder")}
              />
            </div>
            <div className="reveal-up">
              <label className="mb-2 block font-display text-[10px] tracking-[0.3em] text-muted">
                {t("contact.messageLabel")}
              </label>
              <textarea
                rows={4}
                className="w-full resize-none border-b border-card-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                placeholder={t("contact.messagePlaceholder")}
              />
            </div>
            <div className="reveal-up pt-4">
              <button
                type="submit"
                className="group flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 font-display text-sm tracking-widest text-black transition-transform hover:scale-105"
              >
                {t("contact.send")}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          <div className="flex flex-col justify-center gap-4">
            {socials.map(({ icon: Icon, label, value, href }, i) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="reveal-up group flex items-center justify-between rounded-2xl border border-card-border p-5 transition-all duration-500 hover:border-accent/30 hover:bg-card-bg"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card-bg text-muted transition-colors group-hover:bg-accent group-hover:text-black">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-[10px] tracking-[0.2em] text-muted">
                      {label.toUpperCase()}
                    </p>
                    <p className="text-sm text-foreground">{value}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:text-accent" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
