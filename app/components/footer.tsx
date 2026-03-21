"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/5 px-6 py-12 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xl tracking-wider"
        >
          APONG MARLEY <span className="text-accent">.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-1 text-sm text-muted"
        >
          &copy; {new Date().getFullYear()} &mdash; Built with{" "}
          <Heart className="h-3 w-3 text-accent" /> and TypeScript
          <span className="ml-2 rounded-md bg-foreground/5 px-2 py-0.5 text-xs">
            v{process.env.APP_VERSION}
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-hand text-lg text-accent"
        >
          &ldquo;Do it once, do it right, do it with TypeScript.&rdquo;
        </motion.p>
      </div>
    </footer>
  );
}
