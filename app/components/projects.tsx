"use client";

import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Star, GitFork, ArrowUpRight } from "lucide-react";
import { useTranslation } from "../i18n";

const SITE_ORIGIN = "https://mlya.me";
const GITHUB_PROFILE = "https://github.com/MarleyApong";
const FEATURED_COUNT = 5;
const EXCLUDED_REPOS = ["Microsoft-Activation-Scripts", "excalidraw"];

gsap.registerPlugin(ScrollTrigger);

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

const LANGUAGES_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Java: "#b07219",
  Dart: "#00B4AB",
  PHP:  "#4F5D95",
  Shell: "#89e051",
  "C#": "#178600",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Kotlin: "#A97BFF",
  Vue: "#41b883",
  Rust: "#dea584",
};

function parseHomepage(homepage: string | null): { href: string; external: boolean } | null {
  if (!homepage) return null;
  try {
    const url = new URL(homepage);
    if (url.origin === SITE_ORIGIN) return { href: url.pathname, external: false };
    return { href: homepage, external: true };
  } catch {
    return null;
  }
}

function score(r: Repo): number {
  let s = r.stargazers_count * 3 + r.forks_count * 2;
  if (r.homepage) s += 5;
  if (r.description) s += 2;
  if (r.topics?.length > 0) s += 1;
  return s;
}

async function fetchAllRepos(): Promise<Repo[]> {
  const allRepos: Repo[] = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `https://api.github.com/users/MarleyApong/repos?per_page=100&page=${page}&sort=updated`
    );
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    allRepos.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return allRepos.filter((r) => !EXCLUDED_REPOS.includes(r.name));
}

function LangDot({ lang }: { lang: string | null }) {
  if (!lang) return null;
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-muted">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: LANGUAGES_COLORS[lang] || "#888" }}
      />
      {lang}
    </span>
  );
}

function StatBadge({ icon, count }: { icon: React.ReactNode; count: number }) {
  if (!count) return null;
  return (
    <span className="flex items-center gap-1 text-[11px] text-muted">
      {icon}
      {count}
    </span>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { data: repos = [], isLoading } = useQuery<Repo[]>({
    queryKey: ["github-repos"],
    queryFn: fetchAllRepos,
  });

  const featured = useMemo(
    () => [...repos].sort((a, b) => score(b) - score(a)).slice(0, FEATURED_COUNT),
    [repos]
  );

  // Spotlight mouse tracking
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".spotlight");
    if (!cards) return;

    const handlers: Array<(e: MouseEvent) => void> = [];

    cards.forEach((card) => {
      const handler = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      };
      card.addEventListener("mousemove", handler);
      handlers.push(handler);
    });

    return () => {
      cards.forEach((card, i) => card.removeEventListener("mousemove", handlers[i]));
    };
  }, [featured]);

  // Entrance animation
  useEffect(() => {
    if (isLoading || !gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".bento-item");
    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          once: true,
        },
      }
    );
  }, [isLoading, featured]);

  const [hero, ...rest] = featured;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden px-6 py-28 md:px-12"
    >
      {/* Background number */}
      <div className="pointer-events-none absolute left-6 top-20 select-none font-display text-[15rem] leading-none text-foreground/[0.02] md:text-[25rem]">
        04
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex items-end gap-4">
          <span className="font-display text-sm tracking-[0.3em] text-accent">04</span>
          <div className="h-px w-12 bg-accent/30" />
          <h2 className="font-display section-title">
            {t("projects.title")}<span className="text-accent">.</span>
          </h2>
        </div>
        <p className="mb-14 text-sm text-muted">
          {!isLoading && <>{repos.length} {t("projects.repos")}</>}
        </p>

        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        )}

        {!isLoading && hero && (
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {/* Hero card — spans 2 cols on md */}
            <HeroCard repo={hero} t={t} />

            {/* Side cards */}
            <div className="flex flex-col gap-4">
              {rest.slice(0, 2).map((repo) => (
                <SmallCard key={repo.id} repo={repo} t={t} />
              ))}
            </div>

            {/* Bottom row */}
            {rest.slice(2).map((repo) => (
              <SmallCard key={repo.id} repo={repo} t={t} />
            ))}

            {/* GitHub CTA */}
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-item spotlight group flex flex-col items-center justify-center gap-4 rounded-2xl border border-card-border bg-card-bg p-8 opacity-0 transition-all duration-500 hover:border-accent/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-card-border transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/5">
                <Github className="h-5 w-5 text-accent" />
              </div>
              <p className="text-center font-display text-xs tracking-[0.2em] text-accent">
                {t("projects.viewAll")}
              </p>
              <ArrowUpRight className="h-4 w-4 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function HeroCard({ repo, t }: { repo: Repo; t: (k: string) => string }) {
  const langColor = repo.language ? LANGUAGES_COLORS[repo.language] || "#888" : "var(--accent)";
  const parsed = parseHomepage(repo.homepage);

  return (
    <div className="bento-item spotlight group relative col-span-1 overflow-hidden rounded-2xl border border-card-border bg-card-bg opacity-0 transition-all duration-500 hover:border-accent/20 md:col-span-2">
      {/* Subtle gradient tint */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${langColor}08 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <LangDot lang={repo.language} />
            <div className="flex items-center gap-3">
              <StatBadge icon={<Star className="h-3 w-3" />} count={repo.stargazers_count} />
              <StatBadge icon={<GitFork className="h-3 w-3" />} count={repo.forks_count} />
            </div>
          </div>

          <h3 className="mb-4 font-display text-4xl tracking-wider transition-colors duration-300 group-hover:text-accent md:text-5xl">
            {repo.name.replace(/[-_]/g, " ")}
          </h3>

          {repo.description ? (
            <p className="mb-6 max-w-xl text-base leading-relaxed text-muted">
              {repo.description}
            </p>
          ) : (
            <p className="mb-6 text-base italic text-muted/40">{t("projects.noDesc")}</p>
          )}

          {repo.topics?.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {repo.topics.slice(0, 6).map((topic) => (
                <span
                  key={topic}
                  className="rounded-md border border-card-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-card-border px-4 py-2.5 text-xs font-medium text-muted transition-all hover:border-accent hover:text-accent"
          >
            <Github className="h-3.5 w-3.5" />
            {t("projects.code")}
          </a>
          {parsed && (
            <a
              href={parsed.href}
              {...(parsed.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-medium text-black transition-all hover:bg-accent-dark"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {t("projects.demo")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SmallCard({ repo, t }: { repo: Repo; t: (k: string) => string }) {
  const langColor = repo.language ? LANGUAGES_COLORS[repo.language] || "#888" : "var(--accent)";
  const parsed = parseHomepage(repo.homepage);

  return (
    <div className="bento-item spotlight group relative flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card-bg p-6 opacity-0 transition-all duration-500 hover:border-accent/20">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 100% 0%, ${langColor}07 0%, transparent 55%)`,
        }}
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <LangDot lang={repo.language} />
          <div className="flex items-center gap-2">
            <StatBadge icon={<Star className="h-3 w-3" />} count={repo.stargazers_count} />
            <StatBadge icon={<GitFork className="h-3 w-3" />} count={repo.forks_count} />
          </div>
        </div>

        <h3 className="mb-2 font-display text-xl tracking-wider transition-colors duration-300 group-hover:text-accent">
          {repo.name.replace(/[-_]/g, " ")}
        </h3>

        {repo.description ? (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted">
            {repo.description}
          </p>
        ) : (
          <p className="mb-4 text-sm italic text-muted/40">{t("projects.noDesc")}</p>
        )}

        {repo.topics?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="rounded-md border border-card-border bg-surface px-2 py-0.5 text-[10px] font-medium text-muted"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 mt-5 flex items-center gap-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-xl border border-card-border px-3 py-2 text-xs font-medium text-muted transition-all hover:border-accent hover:text-accent"
        >
          <Github className="h-3.5 w-3.5" />
          {t("projects.code")}
        </a>
        {parsed && (
          <a
            href={parsed.href}
            {...(parsed.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex items-center gap-1.5 rounded-xl bg-accent px-3 py-2 text-xs font-medium text-black transition-all hover:bg-accent-dark"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t("projects.demo")}
          </a>
        )}
      </div>
    </div>
  );
}
