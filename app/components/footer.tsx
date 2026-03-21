"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "../i18n";
import { useTheme } from "./theme-provider";

export default function Footer() {
  const { t } = useTranslation();
  const { mode } = useTheme();

  return (
    <footer className="border-t border-card-border bg-card-bg px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <a href="#home" className="relative h-8 w-24">
          <Image
            src={mode === "light" ? "/images/logo-dark.png" : "/images/logo-light.png"}
            alt="MLYA"
            fill
            className="object-contain object-left"
          />
        </a>

        <p className="flex items-center gap-1.5 text-xs text-muted">
          &copy; {new Date().getFullYear()} &mdash; {t("footer.builtWith")}{" "}
          <Heart className="h-3 w-3 text-accent" /> {t("footer.and")}
          <span className="ml-2 rounded-md border border-card-border px-2 py-0.5 text-[10px]">
            v{process.env.APP_VERSION}
          </span>
        </p>

        <p className="font-hand text-sm text-accent/60">
          &ldquo;{t("quote.text")}&rdquo;
        </p>
      </div>
    </footer>
  );
}
