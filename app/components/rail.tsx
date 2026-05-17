"use client";

import Image from "next/image";
import {
  Home, User, Layers, Folder, Route, GraduationCap, Quote, Mail,
  Github, Linkedin, Youtube,
} from "lucide-react";
import type { Lang } from "@/app/lib/content";
import { CONTENT } from "@/app/lib/content";
import { MAIN_PAGES } from "@/app/hooks/use-page-nav";

interface RailProps {
  page: number;
  go: (idx: number) => void;
  lang: Lang;
  theme: string;
  onBrandClick: () => void;
}

const NAV_ICONS = [
  <Home key="home" size={16} />,
  <User key="user" size={16} />,
  <Layers key="layers" size={16} />,
  <Folder key="folder" size={16} />,
  <Route key="route" size={16} />,
  <GraduationCap key="cap" size={16} />,
  <Quote key="quote" size={16} />,
  <Mail key="mail" size={16} />,
];

export function Rail({ page, go, lang, onBrandClick }: RailProps) {
  const T = CONTENT;
  const isDetail = page >= MAIN_PAGES;

  return (
    <aside className="rail">
      <div className="rail-brand" onClick={onBrandClick}>
        <div className="rail-brand-avatar">
          <Image src="/icons/icon-192.png" alt="MLYA" width={52} height={52} />
        </div>
        <div className="rail-brand-text">
          <span className="rail-brand-name">MLYA</span>
          <span className="rail-brand-sub">{T.ui[lang].role}</span>
        </div>
      </div>

      <nav className="rail-nav">
        {T.nav[lang].map((label, i) => {
          const isActive = i === page || (isDetail && i === 3);
          return (
            <button
              key={i}
              className={`rail-nav-item${isActive ? " active" : ""}`}
              onClick={() => go(i)}
            >
              <span className="rail-nav-icon">{NAV_ICONS[i]}</span>
              <span className="rail-nav-label">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="rail-foot">
        <div className="rail-foot-socials">
          <a href="https://github.com/MarleyApong" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={14} />
          </a>
          <a href="https://cm.linkedin.com/in/marley-apong-228550257" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={14} />
          </a>
          <a href="https://www.youtube.com/@amatutoriel" target="_blank" rel="noreferrer" aria-label="YouTube">
            <Youtube size={14} />
          </a>
          <a href="mailto:marlexapong90@gmail.com" aria-label="Email">
            <Mail size={14} />
          </a>
        </div>
        <div className="rail-foot-meta">
          {T.ui[lang].year}<br />
          {T.ui[lang].sub}
        </div>
      </div>
    </aside>
  );
}
