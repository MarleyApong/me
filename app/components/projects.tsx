"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Search,
  Filter,
  Calendar,
} from "lucide-react";
import { useTranslation } from "../i18n";

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

const PER_PAGE = 12;
const EXCLUDED_REPOS = ["Microsoft-Activation-Scripts", "excalidraw"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    month: "short",
    year: "numeric",
  });
}

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

export default function Projects() {
  const [search, setSearchRaw] = useState("");
  const [langFilter, setLangFilterRaw] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);

  const setSearch = (v: string) => {
    setSearchRaw(v);
    setVisibleCount(PER_PAGE);
  };

  const setLangFilter = (v: string) => {
    setLangFilterRaw(v);
    setVisibleCount(PER_PAGE);
  };
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { data: repos = [], isLoading: loading } = useQuery<Repo[]>({
    queryKey: ["github-repos"],
    queryFn: fetchAllRepos,
  });

  const languages = useMemo(
    () => [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[],
    [repos]
  );

  const filtered = useMemo(() => {
    let result = repos;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q))
      );
    }

    if (langFilter !== "All") {
      result = result.filter((r) => r.language === langFilter);
    }

    return result;
  }, [repos, search, langFilter]);

  // Animate cards
  useEffect(() => {
    if (loading || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [loading, filtered, visibleCount]);

  const langCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
    });
    return counts;
  }, [repos]);

  // Determine card size for masonry
  function getCardClass(repo: Repo, i: number): string {
    const hasLongDesc = repo.description && repo.description.length > 80;
    const hasStars = repo.stargazers_count > 0;
    const hasTopics = repo.topics && repo.topics.length > 2;

    if ((hasStars && hasLongDesc) || i % 7 === 0) return "tall";
    if (hasTopics || hasLongDesc) return "medium";
    return "small";
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden px-6 py-28 md:px-12"
      style={{
        backgroundColor: hoveredLang
          ? `${LANGUAGES_COLORS[hoveredLang] || "#f5a623"}08`
          : "transparent",
        transition: "background-color 0.6s ease",
      }}
    >
      {/* Background number */}
      <div className="pointer-events-none absolute left-6 top-20 font-display text-[15rem] leading-none text-foreground/2 select-none md:text-[25rem]">
        04
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="mb-12 flex items-end gap-4">
          <span className="font-display text-sm tracking-[0.3em] text-accent">
            04
          </span>
          <div className="h-px w-12 bg-accent/30" />
          <h2 className="font-display text-6xl tracking-tight md:text-8xl">
            {t("projects.title")}<span className="text-accent">.</span>
          </h2>
        </div>

        <p className="mb-8 text-muted">{repos.length} {t("projects.repos")}</p>

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("projects.search")}
              className="w-full rounded-2xl border border-card-border bg-card-bg py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value)}
              className="appearance-none rounded-2xl border border-card-border bg-card-bg py-3 pl-11 pr-10 text-sm text-foreground outline-none transition-colors focus:border-accent"
            >
              <option value="All">{t("projects.allLangs")} ({repos.length})</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang} ({langCounts[lang] || 0})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Language pills */}
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setLangFilter("All")}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
              langFilter === "All"
                ? "bg-accent text-black"
                : "border border-card-border text-muted hover:border-accent/50 hover:text-accent"
            }`}
          >
            {t("projects.allLangs")}
          </button>
          {languages.slice(0, 8).map((lang) => (
            <button
              key={lang}
              onClick={() => setLangFilter(lang === langFilter ? "All" : lang)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                langFilter === lang
                  ? "bg-accent text-black"
                  : "border border-card-border text-muted hover:border-accent/50 hover:text-accent"
              }`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: LANGUAGES_COLORS[lang] || "#888",
                }}
              />
              {lang}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        )}

        {/* Masonry Grid */}
        {!loading && (
          <>
            <div
              ref={gridRef}
              className="columns-1 gap-4 sm:columns-2 lg:columns-3"
            >
              {filtered.slice(0, visibleCount).map((repo, i) => {
                const size = getCardClass(repo, i);
                const langColor = repo.language
                  ? LANGUAGES_COLORS[repo.language] || "#888"
                  : "var(--accent)";

                return (
                  <div
                    key={repo.id}
                    className="project-card mb-4 break-inside-avoid opacity-0"
                    onMouseEnter={() =>
                      repo.language && setHoveredLang(repo.language)
                    }
                    onMouseLeave={() => setHoveredLang(null)}
                  >
                    <div
                      className="group relative overflow-hidden rounded-2xl border border-card-border bg-card-bg transition-all duration-500 hover:border-transparent hover:shadow-[0_0_30px_rgba(245,166,35,0.08)]"
                      style={
                        {
                          "--card-accent": langColor,
                        } as React.CSSProperties
                      }
                    >
                      {/* Top accent line */}
                      <div
                        className="h-0.5 w-full"
                        style={{ backgroundColor: langColor }}
                      />

                      <div className={`${size === "tall" ? "p-8" : "p-6"}`}>
                        {/* Header */}
                        <div className="mb-3 flex items-center justify-between">
                          {repo.language ? (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: langColor }}
                              />
                              {repo.language}
                            </span>
                          ) : (
                            <span />
                          )}
                          <div className="flex items-center gap-2.5">
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
                          </div>
                        </div>

                        {/* Name */}
                        <h3
                          className={`mb-2 font-display tracking-wider transition-colors group-hover:text-accent ${
                            size === "tall" ? "text-2xl" : "text-lg"
                          }`}
                        >
                          {repo.name.replace(/[-_]/g, " ")}
                        </h3>

                        {/* Description */}
                        {repo.description ? (
                          <p
                            className={`mb-4 text-sm leading-relaxed text-muted ${
                              size === "tall" ? "" : "line-clamp-3"
                            }`}
                          >
                            {repo.description}
                          </p>
                        ) : (
                          <p className="mb-4 text-sm italic text-muted/40">
                            {t("projects.noDesc")}
                          </p>
                        )}

                        {/* Topics */}
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-1.5">
                            {repo.topics
                              .slice(0, size === "tall" ? 6 : 3)
                              .map((topic) => (
                                <span
                                  key={topic}
                                  className="rounded-md bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-muted"
                                >
                                  {topic}
                                </span>
                              ))}
                          </div>
                        )}

                        {/* Date */}
                        <div className="mb-4 flex items-center gap-1 text-[10px] text-muted/50">
                          <Calendar className="h-2.5 w-2.5" />
                          {formatDate(repo.updated_at)}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-xl border border-card-border px-3 py-1.5 text-xs font-medium text-muted transition-all hover:border-accent hover:text-accent"
                          >
                            <Github className="h-3.5 w-3.5" />
                            {t("projects.code")}
                          </a>
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 rounded-xl bg-accent px-3 py-1.5 text-xs font-medium text-black transition-all hover:bg-accent-dark"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              {t("projects.demo")}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load more */}
            {visibleCount < filtered.length && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount((v) => v + PER_PAGE)}
                  className="rounded-full border border-accent/30 px-8 py-3 font-display text-sm tracking-widest text-accent transition-all hover:bg-accent hover:text-black"
                >
                  {t("projects.seeMore")} ({filtered.length - visibleCount} {t("projects.remaining")})
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <p className="py-20 text-center text-muted">
                {t("projects.noResults")}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
