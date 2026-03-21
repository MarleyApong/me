"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Server,
  Container,
  BarChart3,
} from "lucide-react";
import SectionNumber from "./section-number";

const services = [
  {
    icon: Monitor,
    title: "Frontend",
    description: "React, Next.js, React Native, Tailwind CSS",
  },
  {
    icon: Server,
    title: "Backend",
    description: "Express, NestJS, FastAPI, REST APIs",
  },
  {
    icon: Container,
    title: "DevOps",
    description: "Docker, Jenkins, CI/CD, AWS, VPS",
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    description: "Python, Pandas, NumPy, Matplotlib",
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-16">
      <SectionNumber number="03" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-6xl md:text-8xl">
            TABLE{" "}
            <span className="inline-block rounded-lg bg-accent px-3 py-1 text-black">
              OF
            </span>{" "}
            CONTENT.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-transparent bg-card-bg p-8 shadow-md transition-colors hover:border-accent"
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-black"
              >
                <service.icon className="h-8 w-8" />
              </motion.div>
              <h3 className="text-center font-display text-xl tracking-wider">
                {service.title}
              </h3>
              <p className="text-center text-sm text-muted">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
