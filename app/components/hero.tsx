"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Code, Terminal } from "lucide-react";
import SectionNumber from "./section-number";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-20 md:px-16">
      <SectionNumber number="01" />

      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
        {/* Left content */}
        <div className="z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 flex items-center gap-2"
          >
            <Code className="h-5 w-5 text-accent" />
            <span className="font-hand text-2xl text-accent">
              Fullstack Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-7xl leading-[0.9] tracking-tight sm:text-8xl md:text-9xl"
          >
            PORT
            <br />
            FO
            <span className="text-accent">LIO</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 max-w-md text-lg text-muted"
          >
            ASSOH APONG MARLEY WALTER
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-2 flex items-center gap-2 text-sm text-muted"
          >
            <Terminal className="h-4 w-4" />
            <span>
              Selected Best &mdash; Fullstack Dev 2025
            </span>
          </motion.div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 flex items-center gap-2 rounded-full border-2 border-accent px-6 py-3 font-display text-lg tracking-wider text-accent transition-colors hover:bg-accent hover:text-black"
          >
            DECOUVRIR
            <ArrowDown className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Right photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Yellow background block */}
          <div className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-accent" />
          <div className="relative h-[400px] w-[300px] overflow-hidden rounded-2xl sm:h-[500px] sm:w-[380px]">
            <Image
              src="/images/portrait-1.jpg"
              alt="ASSOH APONG MARLEY WALTER"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -left-8 top-8 rounded-xl bg-card-bg p-3 shadow-lg"
          >
            <Code className="h-6 w-6 text-accent" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "easeInOut",
            }}
            className="absolute -right-6 bottom-12 rounded-xl bg-card-bg p-3 shadow-lg"
          >
            <Terminal className="h-6 w-6 text-accent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Vertical text right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 -rotate-90 font-display text-sm tracking-[0.3em] text-muted lg:block"
      >
        APONG MARLEY &mdash; 2025
      </motion.div>
    </section>
  );
}
