"use client";

import { motion } from "framer-motion";

export default function SectionNumber({ number }: { number: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 0.1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="pointer-events-none absolute left-4 top-8 font-display text-[10rem] leading-none text-foreground select-none"
    >
      {number}
    </motion.span>
  );
}
