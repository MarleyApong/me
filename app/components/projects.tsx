"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, GitFork, Search, Filter } from "lucide-react";
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
};

const PER_PAGE = 9;
const EXCLUDED_REPOS = ["Microsoft-Activation-Scripts", "excalidraw"];

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

        const filtered = allRepos.filter(
          (r) => !EXCLUDED_REPOS.includes(r.name)
        );
        setRepos(filtered);
        setFiltered(filtered);

        const langs = [
          ...new Set(allRepos.map((r) => r.language).filter(Boolean)),
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
          className="mb-8 flex flex-col gap-4 sm:flex-row"
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
              <option value="All">Tous les langages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
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

        {/* Projects grid */}
        {!loading && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.slice(0, visibleCount).map((repo, i) => (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ y: -5 }}
                    className="group relative overflow-hidden rounded-2xl bg-card-bg p-6 shadow-md transition-all hover:shadow-xl"
                  >
                    {/* Accent top line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                      className="absolute left-0 top-0 h-1 w-full origin-left bg-accent"
                    />

                    <div className="mb-3 flex items-center justify-between">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                LANGUAGES_COLORS[repo.language] || "#888",
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
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
                      </div>
                    </div>

                    <h3 className="mb-2 font-display text-xl tracking-wider">
                      {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm text-muted">
                      {repo.description || "No description provided."}
                    </p>

                    <div className="flex items-center gap-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-foreground/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-black"
                      >
                        <Github className="h-3 w-3" />
                        Code
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-black"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load more */}
            {visibleCount < filtered.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10 flex justify-center"
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
