"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  GitFork,
  Search,
  Filter,
  Calendar,
} from "lucide-react";
import SectionNumber from "./section-number";

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
  C: "#555555",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Ruby: "#701516",
  Rust: "#dea584",
  Vue: "#41b883",
};

const PER_PAGE = 12;
const EXCLUDED_REPOS = ["Microsoft-Activation-Scripts", "excalidraw"];

// Tailles de cartes pour l'effet mosaique Pinterest
const CARD_SIZES = ["small", "medium", "tall", "wide"] as const;
type CardSize = (typeof CARD_SIZES)[number];

function getCardSize(repo: Repo, index: number): CardSize {
  // Les projets avec description longue ou beaucoup de stars sont plus grands
  const hasLongDesc = repo.description && repo.description.length > 80;
  const hasStars = repo.stargazers_count > 0;
  const hasHomepage = !!repo.homepage;

  if (hasStars && hasLongDesc) return "tall";
  if (hasHomepage && index % 5 === 0) return "wide";
  if (hasLongDesc || index % 7 === 0) return "medium";
  if (index % 4 === 0) return "tall";
  return "small";
}

const sizeClasses: Record<CardSize, string> = {
  small: "row-span-1",
  medium: "row-span-1",
  tall: "row-span-2",
  wide: "col-span-1 md:col-span-2 row-span-1",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    month: "short",
    year: "numeric",
  });
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [filtered, setFiltered] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchRepos() {
      try {
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

        const cleaned = allRepos.filter(
          (r) => !EXCLUDED_REPOS.includes(r.name)
        );
        setRepos(cleaned);
        setFiltered(cleaned);

        const langs = [
          ...new Set(cleaned.map((r) => r.language).filter(Boolean)),
        ] as string[];
        setLanguages(langs);
      } catch {
        console.error("Failed to fetch repos");
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  useEffect(() => {
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

    setFiltered(result);
    setVisibleCount(PER_PAGE);
  }, [search, langFilter, repos]);

  // Compteurs de langages pour les filtres
  const langCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
    });
    return counts;
  }, [repos]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-24 md:px-16"
    >
      <SectionNumber number="04" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-hand text-2xl text-accent">&ldquo;</span>
          <h2 className="font-display text-6xl md:text-8xl">PROJECTS.</h2>
          <p className="mt-2 text-muted">
            {repos.length} repositories on GitHub
          </p>
        </motion.div>

        {/* Search & Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 flex flex-col gap-4 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un projet..."
              className="w-full rounded-xl border border-foreground/10 bg-card-bg py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-accent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <select
              value={langFilter}
              onChange={(e) => setLangFilter(e.target.value)}
              className="appearance-none rounded-xl border border-foreground/10 bg-card-bg py-3 pl-11 pr-10 text-sm outline-none transition-colors focus:border-accent"
            >
              <option value="All">Tous les langages ({repos.length})</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang} ({langCounts[lang] || 0})
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Language pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setLangFilter("All")}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              langFilter === "All"
                ? "bg-accent text-black"
                : "bg-card-bg text-muted hover:bg-foreground/5"
            }`}
          >
            All
          </button>
          {languages.slice(0, 8).map((lang) => (
            <button
              key={lang}
              onClick={() => setLangFilter(lang === langFilter ? "All" : lang)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                langFilter === lang
                  ? "bg-accent text-black"
                  : "bg-card-bg text-muted hover:bg-foreground/5"
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
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent"
            />
          </div>
        )}

        {/* Masonry grid */}
        {!loading && (
          <>
            <div
              className="columns-1 gap-5 sm:columns-2 lg:columns-3"
              style={{ columnFill: "balance" }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.slice(0, visibleCount).map((repo, i) => {
                  const size = getCardSize(repo, i);
                  const isTall = size === "tall";
                  const isWide = size === "wide";

                  return (
                    <motion.div
                      key={repo.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.03, duration: 0.4 }}
                      className={`mb-5 break-inside-avoid ${sizeClasses[size]}`}
                    >
                      <motion.div
                        whileHover={{ y: -6, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`group relative overflow-hidden rounded-2xl bg-card-bg shadow-md transition-shadow hover:shadow-2xl ${
                          isTall ? "p-8" : isWide ? "p-6" : "p-5"
                        }`}
                      >
                        {/* Accent gradient top */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.03 + 0.2, duration: 0.6 }}
                          className="absolute left-0 top-0 h-1 w-full origin-left"
                          style={{
                            backgroundColor:
                              repo.language
                                ? LANGUAGES_COLORS[repo.language] || "#888"
                                : "var(--accent)",
                          }}
                        />

                        {/* Header : language + stats */}
                        <div className="mb-3 flex items-center justify-between">
                          {repo.language ? (
                            <span className="flex items-center gap-1.5 rounded-full bg-foreground/5 px-2.5 py-1 text-xs font-medium">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor:
                                    LANGUAGES_COLORS[repo.language] || "#888",
                                }}
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

                        {/* Title */}
                        <h3
                          className={`mb-2 font-display tracking-wider ${
                            isTall ? "text-2xl" : "text-lg"
                          }`}
                        >
                          {repo.name.replace(/[-_]/g, " ")}
                        </h3>

                        {/* Description */}
                        {repo.description && (
                          <p
                            className={`mb-4 text-sm leading-relaxed text-muted ${
                              isTall ? "" : "line-clamp-3"
                            }`}
                          >
                            {repo.description}
                          </p>
                        )}
                        {!repo.description && (
                          <p className="mb-4 text-sm italic text-muted/50">
                            No description provided.
                          </p>
                        )}

                        {/* Topics */}
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-1.5">
                            {repo.topics.slice(0, isTall ? 6 : 3).map((topic) => (
                              <span
                                key={topic}
                                className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Date */}
                        <div className="mb-4 flex items-center gap-1 text-[10px] text-muted/60">
                          <Calendar className="h-2.5 w-2.5" />
                          Mis a jour {formatDate(repo.updated_at)}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-lg bg-foreground/5 px-3 py-1.5 text-xs font-medium transition-all hover:bg-accent hover:text-black"
                          >
                            <Github className="h-3.5 w-3.5" />
                            Code
                          </a>
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-black transition-all hover:bg-accent-dark"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Demo
                            </a>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Load more */}
            {visibleCount < filtered.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVisibleCount((v) => v + PER_PAGE)}
                  className="rounded-full border-2 border-accent px-8 py-3 font-display tracking-wider text-accent transition-colors hover:bg-accent hover:text-black"
                >
                  VOIR PLUS ({filtered.length - visibleCount} restants)
                </motion.button>
              </motion.div>
            )}

            {!loading && filtered.length === 0 && (
              <p className="py-20 text-center text-muted">
                Aucun projet trouve.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
