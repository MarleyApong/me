"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-[#050505] px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="font-display text-xl tracking-[0.2em] text-foreground">
          AM<span className="text-accent">.</span>
        </p>

        <p className="flex items-center gap-1.5 text-xs text-muted">
          &copy; {new Date().getFullYear()} &mdash; Built with{" "}
          <Heart className="h-3 w-3 text-accent" /> and TypeScript
          <span className="ml-2 rounded-md border border-card-border px-2 py-0.5 text-[10px]">
            v{process.env.APP_VERSION}
          </span>
        </p>

        <p className="font-hand text-sm text-accent/60">
          &ldquo;Do it once, do it right, do it with TypeScript.&rdquo;
        </p>
      </div>
    </footer>
  );
}
