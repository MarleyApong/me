"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Counter animation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    // Exit animation after counter reaches 100
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      tl.to(counterRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
      })
        .to(
          nameRef.current,
          {
            scale: 1.1,
            duration: 0.3,
          },
          "-=0.1"
        )
        .to(lineRef.current, {
          scaleX: 0,
          duration: 0.3,
        })
        .to(nameRef.current, {
          y: -60,
          opacity: 0,
          duration: 0.4,
        })
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "-=0.2"
        );
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background"
    >
      {/* Name reveal */}
      <div ref={nameRef} className="relative">
        <h1 className="font-display text-5xl tracking-[0.3em] text-foreground sm:text-7xl md:text-8xl">
          APONG
          <span className="text-accent"> MARLEY</span>
        </h1>
        <p className="mt-3 text-center font-hand text-xl text-muted sm:text-2xl">
          Fullstack Developer
        </p>
        {/* Animated line under name */}
        <div
          ref={lineRef}
          className="mx-auto mt-4 h-0.5 w-32 bg-accent"
        />
      </div>

      {/* Counter */}
      <div ref={counterRef} className="absolute bottom-12 right-12">
        <span className="font-display text-7xl tabular-nums text-foreground/20 sm:text-9xl">
          {count.toString().padStart(3, "0")}
        </span>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-card-border">
        <div
          className="h-full bg-accent transition-all duration-100 ease-out"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  );
}
