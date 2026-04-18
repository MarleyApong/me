"use client";

import { useEffect, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "../i18n";

const SITE_ORIGIN = "https://mlya.me";
const GITHUB_PROFILE = "https://github.com/MarleyApong";
const FEATURED_COUNT = 6;
const EXCLUDED_REPOS = ["Microsoft-Activation-Scripts", "excalidraw"];

function parseHomepage(homepage: string | null): { href: string; internal: boolean } | null {
  if (!homepage) return null;
  try {
    const url = new URL(homepage);
    if (url.origin === SITE_ORIGIN) return { href: url.pathname, internal: true };
    return { href: homepage, internal: false };
  } catch {
    return null;
  }
}

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
  PHP: "#4F5D95",
  Shell: "#89e051",
  "C#": "#178600",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Kotlin: "#A97BFF",
  Vue: "#41b883",
  Rust: "#dea584",
};

async function fetchAllRepos(): Promise<Repo[]> {
  const allRepos: Repo[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://api.github.com/users/MarleyApong/repos?per_page=100&page=${page}&sort=updated`
    );
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      allRepos.push(...data);
      page++;
      if (data.length < 100) hasMore = false;
    } else {
      hasMore = false;
    }
  }

  return allRepos.filter((r) => !EXCLUDED_REPOS.includes(r.name));
}

function score(r: Repo): number {
  let s = r.stargazers_count * 3 + r.forks_count * 2;
  if (r.homepage) s += 5;
  if (r.description) s += 2;
  if (r.topics?.length > 0) s += 1;
  return s;
}

export default function Projects() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { data: repos = [], isLoading: loading } = useQuery<Repo[]>({
    queryKey: ["github-repos"],
    queryFn: fetchAllRepos,
  });

  const featured = useMemo(
    () => [...repos].sort((a, b) => score(b) - score(a)).slice(0, FEATURED_COUNT),
    [repos]
  );

  useEffect(() => {
    if (loading || !trackRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (!trackRef.current || !sectionRef.current) return;

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
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, featured]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden"
    >
      <div className="px-6 pt-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end gap-4">
            <span className="font-display text-sm tracking-[0.3em] text-accent">04</span>
            <div className="h-px w-12 bg-accent/30" />
            <h2 className="font-display text-6xl tracking-tight md:text-8xl">
              {t("projects.title")}<span className="text-accent">.</span>
            </h2>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      )}

      {!loading && (
        <div
          ref={trackRef}
          className="flex items-center gap-8 px-6 py-16 md:px-12"
          style={{ width: "max-content" }}
        >
          {/* Intro card */}
          <div className="flex h-[420px] w-[350px] shrink-0 flex-col justify-center rounded-3xl border border-accent/20 bg-accent/[0.05] p-10 md:w-[400px]">
            <Github className="mb-4 h-8 w-8 text-accent" />
            <h3 className="mb-3 font-display text-4xl tracking-wider">
              {t("projects.title")}
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {repos.length} {t("projects.repos")}
            </p>
            <div className="mt-6 flex items-center gap-2 text-accent">
              <span className="font-display text-xs tracking-widest">SCROLL</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Project cards */}
          {featured.map((repo, i) => {
            const langColor = repo.language
              ? LANGUAGES_COLORS[repo.language] || "#888"
              : "var(--accent)";
            const parsed = parseHomepage(repo.homepage);
            const demoUrl = parsed && !parsed.internal ? parsed.href : null;

            return (
              <div
                key={repo.id}
                className="group flex h-[420px] w-[350px] shrink-0 flex-col justify-between rounded-3xl border border-card-border bg-card-bg p-10 transition-all duration-500 hover:border-accent/30 md:w-[400px]"
              >
                <div>
                  {/* Index + lang */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-xs text-muted">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: langColor }}
                          />
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Star className="h-3 w-3" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <GitFork className="h-3 w-3" />
                          {repo.forks_count}
                        </span>
                      )}
                      <span className="font-display text-4xl text-foreground/10">
                        0{i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="mb-3 font-display text-2xl tracking-wider transition-colors group-hover:text-accent">
                    {repo.name.replace(/[-_]/g, " ")}
                  </h3>

                  {/* Description */}
                  {repo.description ? (
                    <p className="text-sm leading-relaxed text-muted line-clamp-3">
                      {repo.description}
                    </p>
                  ) : (
                    <p className="text-sm italic text-muted/40">
                      {t("projects.noDesc")}
                    </p>
                  )}
                </div>

                <div>
                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-md border border-card-border px-2.5 py-0.5 text-[10px] font-medium text-muted"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl border border-card-border px-4 py-2 text-xs font-medium text-muted transition-all hover:border-accent hover:text-accent"
                    >
                      <Github className="h-3.5 w-3.5" />
                      {t("projects.code")}
                    </a>
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-medium text-black transition-all hover:bg-accent-dark"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t("projects.demo")}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* GitHub CTA card */}
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-[420px] w-[280px] shrink-0 flex-col items-center justify-center gap-5 rounded-3xl border border-accent/20 bg-accent/[0.03] transition-all duration-500 hover:bg-accent/[0.08] md:w-[320px]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10">
              <Github className="h-7 w-7 text-accent" />
            </div>
            <div className="text-center">
              <p className="font-display text-sm tracking-[0.2em] text-accent">
                {t("projects.viewAll")}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-accent/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
          </a>
        </div>
      )}
    </section>
  );
}
