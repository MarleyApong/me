"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Mail,
  Phone,
  Linkedin,
  Youtube,
  Github,
  GraduationCap,
  Briefcase,
  Globe,
} from "lucide-react";
import SectionNumber from "./section-number";

const skills = [
  "React", "Next.js", "React Native", "TypeScript", "JavaScript",
  "Node.js", "Express", "NestJS", "Python", "FastAPI",
  "Tailwind CSS", "SCSS", "PostgreSQL", "MySQL", "Docker",
  "Jenkins", "AWS", "Git", "Prisma", "Sequelize",
];

const experience = [
  {
    role: "Frontend Developer",
    company: "GB_PAY (BETTER-PLANNING-DIGITAL-PROJECT)",
    period: "En cours",
    description: "Plateforme d'aggregation de paiement",
  },
  {
    role: "Fullstack Developer",
    company: "Projets Divers",
    period: "2022 - Present",
    description: "Developpement d'applications web et mobile",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-24 md:px-16"
    >
      <SectionNumber number="02" />

      <div className="mx-auto max-w-6xl">
        {/* Hello title */}
        <motion.div {...fadeInUp} className="mb-16 flex items-start gap-4">
          <span className="font-hand text-4xl text-accent">&ldquo;</span>
          <h2 className="font-display text-6xl md:text-8xl">HELLO.</h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          {/* Left: Photo + Contact */}
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-2xl" />
              <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-accent">
                <Image
                  src="/images/portrait-2.jpg"
                  alt="APONG MARLEY"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="flex flex-col items-center gap-3 text-sm lg:items-start"
            >
              <h3 className="mb-2 font-display text-xl tracking-wider">
                Let&apos;s Work Together :
              </h3>
              <a
                href="mailto:marlexapong90@gmail.com"
                className="flex items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                marlexapong90@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/marley-apong"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <Linkedin className="h-4 w-4" />
                Marley Apong
              </a>
              <a
                href="https://youtube.com/@amatutoriel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <Youtube className="h-4 w-4" />
                @amatutoriel
              </a>
              <a
                href="https://github.com/MarleyApong"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted transition-colors hover:text-accent"
              >
                <Github className="h-4 w-4" />
                MarleyApong
              </a>
            </motion.div>
          </div>

          {/* Right: Bio + Details */}
          <div>
            <motion.p
              {...fadeInUp}
              className="mb-4 text-lg leading-relaxed text-muted"
            >
              I&apos;m <strong className="text-foreground">ASSOH APONG MARLEY WALTER</strong>,
              a self-taught Fullstack JavaScript / TypeScript Developer with over
              4 years of experience. Passionate and detail-driven, I build
              scalable web and mobile applications with clean architecture.
            </motion.p>
            <motion.p
              {...fadeInUp}
              className="mb-8 text-lg leading-relaxed text-muted"
            >
              From frontend craft to backend mastery, DevOps practices, and data
              analytics — I continuously evolve my skills. For me, coding is not
              just a job, it&apos;s a lifestyle.
            </motion.p>

            <div className="grid gap-12 md:grid-cols-2">
              {/* Education */}
              <motion.div {...fadeInUp}>
                <div className="mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  <h3 className="font-display text-2xl tracking-wider">
                    Education
                  </h3>
                </div>
                <div className="border-l-2 border-accent/30 pl-4">
                  <p className="text-sm text-accent">BTS & Licence</p>
                  <p className="font-semibold">Software Engineering</p>
                  <p className="mt-2 text-sm text-muted">
                    Self-taught developer with extensive real-world project
                    experience
                  </p>
                </div>
              </motion.div>

              {/* Languages */}
              <motion.div {...fadeInUp}>
                <div className="mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  <h3 className="font-display text-2xl tracking-wider">
                    Languages
                  </h3>
                </div>
                <div className="space-y-2 border-l-2 border-accent/30 pl-4">
                  <div>
                    <p className="font-semibold">Francais</p>
                    <p className="text-sm text-muted">Natif, courant</p>
                  </div>
                  <div>
                    <p className="font-semibold">English</p>
                    <p className="text-sm text-muted">
                      Professional, fluent technical
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Software Skills */}
            <motion.div {...fadeInUp} className="mt-12">
              <h3 className="mb-4 font-display text-2xl tracking-wider">
                Software Skills
              </h3>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={{
                      initial: { opacity: 0, scale: 0.8 },
                      whileInView: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{ scale: 1.1, backgroundColor: "var(--accent)", color: "#000" }}
                    className="cursor-default rounded-full border border-foreground/10 bg-card-bg px-4 py-1.5 text-sm font-medium transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Experience */}
            <motion.div {...fadeInUp} className="mt-12">
              <div className="mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" />
                <h3 className="font-display text-2xl tracking-wider">
                  Working Experience
                </h3>
              </div>
              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="border-l-2 border-accent/30 pl-4"
                  >
                    <p className="text-sm text-accent">{exp.period}</p>
                    <p className="font-semibold">{exp.role}</p>
                    <p className="text-sm text-muted">{exp.company}</p>
                    <p className="mt-1 text-sm text-muted">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
