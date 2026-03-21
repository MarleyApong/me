"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Mode = "dark" | "light" | "system";

interface AccentColor {
  name: string;
  value: string;
}

const accentColors: AccentColor[] = [
  { name: "Gold", value: "#f5a623" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Orange", value: "#f97316" },
];

interface ThemeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  accent: string;
  setAccent: (color: string) => void;
  resolvedMode: "dark" | "light";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemMode(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function darken(hex: string): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 30);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 30);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 30);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("dark");
  const [accent, setAccentState] = useState("#f5a623");
  const [resolvedMode, setResolvedMode] = useState<"dark" | "light">("dark");

  const applyMode = useCallback((m: Mode) => {
    const resolved = m === "system" ? getSystemMode() : m;
    setResolvedMode(resolved);
    document.documentElement.setAttribute("data-mode", resolved);
  }, []);

  const applyAccent = useCallback((color: string) => {
    document.documentElement.style.setProperty("--accent", color);
    document.documentElement.style.setProperty("--accent-dark", darken(color));
  }, []);

  // Init from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as Mode | null;
    const savedAccent = localStorage.getItem("theme-accent");

    if (savedMode) {
      setModeState(savedMode);
      applyMode(savedMode);
    } else {
      applyMode("dark");
    }

    if (savedAccent) {
      setAccentState(savedAccent);
      applyAccent(savedAccent);
    }
  }, [applyMode, applyAccent]);

  // Listen for system theme changes when mode is "system"
  useEffect(() => {
    if (mode !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyMode("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode, applyMode]);

  const setMode = (m: Mode) => {
    setModeState(m);
    localStorage.setItem("theme-mode", m);
    applyMode(m);
  };

  const setAccent = (color: string) => {
    setAccentState(color);
    localStorage.setItem("theme-accent", color);
    applyAccent(color);
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, accent, setAccent, resolvedMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export { accentColors };
