"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    // Follower with delay
    gsap.ticker.add(() => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      gsap.set(follower, { x: pos.x, y: pos.y });
    });

    // Detect hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovered(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovered(false);
      }
    };

    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <div
          className="rounded-full bg-accent"
          style={{
            width: hovered ? 0 : 6,
            height: hovered ? 0 : 6,
            transform: "translate(-50%, -50%)",
            transition: "width 0.3s, height 0.3s",
          }}
        />
      </div>

      {/* Follower ring */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] hidden md:block"
        style={{
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <div
          className="rounded-full border border-accent/50"
          style={{
            width: hovered ? 60 : 36,
            height: hovered ? 60 : 36,
            transform: "translate(-50%, -50%)",
            transition: "width 0.4s ease, height 0.4s ease, background 0.3s",
            background: hovered ? "rgba(245, 166, 35, 0.08)" : "transparent",
          }}
        />
      </div>
    </>
  );
}
