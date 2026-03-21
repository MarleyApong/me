"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";

const themes = [
  { name: "Default", accent: "#f5a623", bg: "#f5f5f0", fg: "#111111", card: "#ffffff" },
  { name: "Ocean", accent: "#0ea5e9", bg: "#f0f7ff", fg: "#0c1929", card: "#ffffff" },
  { name: "Emerald", accent: "#10b981", bg: "#f0fdf4", fg: "#0a1f13", card: "#ffffff" },
  { name: "Rose", accent: "#f43f5e", bg: "#fff1f2", fg: "#1a0a0e", card: "#ffffff" },
  { name: "Purple", accent: "#8b5cf6", bg: "#f5f3ff", fg: "#1a0f2e", card: "#ffffff" },
  { name: "Dark", accent: "#f5a623", bg: "#0a0a0a", fg: "#ededed", card: "#1a1a1a" },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Default");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) {
      const theme = themes.find((t) => t.name === saved);
      if (theme) applyTheme(theme);
    }
  }, []);

  function applyTheme(theme: (typeof themes)[number]) {
    const root = document.documentElement;
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-dark", darken(theme.accent));
    root.style.setProperty("--background", theme.bg);
    root.style.setProperty("--foreground", theme.fg);
    root.style.setProperty("--card-bg", theme.card);
    setActive(theme.name);
    localStorage.setItem("portfolio-theme", theme.name);
    setOpen(false);
  }

  function darken(hex: string): string {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 30);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 30);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 30);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-black shadow-lg"
      >
        <Palette className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-48 overflow-hidden rounded-2xl bg-card-bg p-3 shadow-xl"
          >
            <p className="mb-2 px-2 font-display text-xs tracking-wider text-muted">
              THEME
            </p>
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => applyTheme(theme)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-foreground/5 ${
                  active === theme.name ? "font-semibold" : ""
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-foreground/10"
                  style={{ backgroundColor: theme.accent }}
                />
                {theme.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
