"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < 100 || currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        menuItemsRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 px-6 py-5 transition-all duration-500 md:px-12"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          backdropFilter: "blur(12px)",
          background: "rgba(10, 10, 10, 0.8)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a
            href="#home"
            className="font-display text-2xl tracking-[0.2em] text-foreground transition-colors hover:text-accent"
          >
            AM<span className="text-accent">.</span>
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative font-display text-xs tracking-[0.2em] text-muted transition-colors hover:text-foreground"
              >
                {link.label.toUpperCase()}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden items-center gap-1 rounded-full border border-accent/30 px-5 py-2 font-display text-xs tracking-widest text-accent transition-all hover:bg-accent hover:text-black md:flex"
          >
            CONTACT
            <ArrowUpRight className="h-3 w-3" />
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-[60] md:hidden"
          >
            {mobileOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-2 bg-[#050505]">
          {links.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => {
                if (el) menuItemsRef.current[i] = el;
              }}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="group flex items-center gap-3 py-3 opacity-0"
            >
              <span className="font-display text-sm text-accent">
                0{i + 1}
              </span>
              <span className="font-display text-5xl tracking-wider text-foreground transition-colors group-hover:text-accent">
                {link.label.toUpperCase()}
              </span>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
