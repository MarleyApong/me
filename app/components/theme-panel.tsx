"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Settings, Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme, accentColors } from "./theme-provider";

export default function ThemePanel() {
  const { mode, setMode, accent, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const modes = [
    { key: "light" as const, icon: Sun, label: "Light" },
    { key: "dark" as const, icon: Moon, label: "Dark" },
    { key: "system" as const, icon: Monitor, label: "System" },
  ];

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-[60]">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-card-bg shadow-lg transition-all hover:border-accent/50 hover:shadow-xl"
        style={{ cursor: "none" }}
      >
        <Settings
          className="h-4 w-4 text-muted transition-transform"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Panel */}
      {open && (
        <div
          className="absolute bottom-14 right-0 w-56 overflow-hidden rounded-xl border border-card-border bg-card-bg shadow-2xl"
          style={{
            animation: "fadeInUp 0.2s ease",
          }}
        >
          {/* Mode */}
          <div className="border-b border-card-border p-3">
            <p className="mb-2 font-display text-[10px] tracking-[0.2em] text-muted">
              MODE
            </p>
            <div className="flex gap-1">
              {modes.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs transition-all ${
                    mode === key
                      ? "bg-accent text-black"
                      : "text-muted hover:bg-foreground/5 hover:text-foreground"
                  }`}
                  style={{ cursor: "none" }}
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Accent colors */}
          <div className="p-3">
            <p className="mb-2 font-display text-[10px] tracking-[0.2em] text-muted">
              ACCENT
            </p>
            <div className="grid grid-cols-7 gap-1.5">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccent(color.value)}
                  className="group relative flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color.value,
                    cursor: "none",
                  }}
                  title={color.name}
                >
                  {accent === color.value && (
                    <Check className="h-3 w-3 text-black" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
