export type Lang = "fr" | "en";

export interface ProjectItem {
  num: string;
  name: string;
  role: string;
  status: string | null;
  year: string;
  year2?: string;
  desc: string;
  tags: string[];
  action: string;
  actionIdx?: number;
  link?: string;
}

export const CONTENT = {
  nav: {
    fr: ["Accueil", "À propos", "Stack", "Projets", "Parcours", "Formation", "Citation", "Contact"],
    en: ["Home", "About", "Stack", "Work", "Path", "Studies", "Quote", "Contact"],
  },

  hero: {
    fr: {
      kicker: "PORTFOLIO · 2024 → 2026",
      tagline: "DEV. FULLSTACK · CAMEROUN",
      name1: "Marley",
      name2: "Apong",
      lede: "Développeur Fullstack JavaScript / TypeScript. Je construis des produits soignés, du frontend pixel-perfect au backend modulaire, avec une obsession pour le clean code, la fiabilité et le pipeline CI/CD.",
      ctaWork: "Voir les projets",
      ctaContact: "Me contacter",
      m1k: "BASÉ À",  m1v: "Douala, CM",
      m2k: "STATUS",  m2v: "Ouvert aux projets",
      m3k: "STACK",   m3v: "TS · React · Nest",
    },
    en: {
      kicker: "PORTFOLIO · 2024 → 2026",
      tagline: "FULLSTACK DEV. · CAMEROON",
      name1: "Marley",
      name2: "Apong",
      lede: "Fullstack JavaScript / TypeScript developer. I build polished products · from pixel-perfect frontends to modular backends · with an obsession for clean code, reliability and CI/CD.",
      ctaWork: "View projects",
      ctaContact: "Get in touch",
      m1k: "BASED IN", m1v: "Douala, CM",
      m2k: "STATUS",   m2v: "Open to work",
      m3k: "STACK",    m3v: "TS · React · Nest",
    },
  },

  about: {
    fr: {
      kicker: "02 · À PROPOS",
      headline: "Du code propre,\nlivré à temps.",
      p1: "Plusieurs années d'expérience terrain à construire des produits réels. Je passe avec aisance du frontend au backend, de la conception à la livraison, du local au déploiement VPS.",
      p2: "Mon obsession : architectures modulaires, qualité du livrable et automatisation. Docker, CI/CD et TypeScript sont mes outils quotidiens.",
      m: [
        { k: "EXPÉRIENCE",   icon: "Briefcase", v: "4+ années",   s: "Frontend & fullstack · 1+ année DevOps" },
        { k: "BASE",         icon: "MapPin",    v: "Cameroun",    s: "Disponible à distance · Europe / Afrique" },
        { k: "APPROCHE",     icon: "Target",    v: "Clean code",  s: "Architecture modulaire · DDD" },
        { k: "APPRENTISSAGE", icon: "Sparkles", v: "Continu",     s: "Data analytics · nouveaux frameworks" },
      ],
      portraitTag: "A. MARLEY · 2026",
    },
    en: {
      kicker: "02 · ABOUT",
      headline: "Clean code,\non time.",
      p1: "Several years of hands-on experience building real-world products. I move comfortably from frontend to backend, from concept to delivery, from local to VPS deployment.",
      p2: "My obsession: modular architecture, deliverable quality, automation. Docker, CI/CD and TypeScript are my daily tools.",
      m: [
        { k: "EXPERIENCE", icon: "Briefcase", v: "4+ years",   s: "Frontend & fullstack · 1+ yr DevOps" },
        { k: "BASE",       icon: "MapPin",    v: "Cameroon",   s: "Remote-friendly · Europe / Africa" },
        { k: "APPROACH",   icon: "Target",    v: "Clean code", s: "Modular architecture · DDD" },
        { k: "LEARNING",   icon: "Sparkles",  v: "Ongoing",    s: "Data analytics · new frameworks" },
      ],
      portraitTag: "A. MARLEY · 2026",
    },
  },

  stack: {
    fr: {
      kicker: "03 · STACK TECHNIQUE",
      headline: "L'outillage.",
      lede: "Une stack maîtrisée, choisie pour ce qu'elle fait bien · pas pour la mode.",
      cols: [
        {
          num: "01", label: "FRONTEND",
          items: [
            { n: "React.js / React TS", t: "Daily" },
            { n: "Next.js",             t: "SSR · App router" },
            { n: "React Native",        t: "In progress" },
            { n: "Tailwind · SCSS",     t: "Daily" },
            { n: "shadcn/ui · Lucide",  t: "Design system" },
            { n: "SurveyJS",            t: "Forms" },
          ],
        },
        {
          num: "02", label: "BACKEND",
          items: [
            { n: "Express.js (JS/TS)", t: "Daily" },
            { n: "NestJS",             t: "Modular" },
            { n: "FastAPI (Python)",   t: "APIs" },
            { n: "Prisma · Sequelize", t: "ORM" },
            { n: "PostgreSQL · MySQL", t: "Relational" },
            { n: "SQL Server",         t: "Enterprise" },
          ],
        },
        {
          num: "03", label: "DEVOPS",
          items: [
            { n: "Docker",             t: "Daily" },
            { n: "Jenkins CI/CD",      t: "Pipelines" },
            { n: "Git / GitHub",       t: "Daily" },
            { n: "AWS · VPS · Vercel", t: "Deploy" },
            { n: "cPanel · Plesk",     t: "Hosting" },
            { n: "Nginx · Linux",      t: "Servers" },
          ],
        },
        {
          num: "04", label: "DATA / OUTILS",
          items: [
            { n: "Python · Pandas",    t: "Analytics" },
            { n: "NumPy · Matplotlib", t: "Exploration" },
            { n: "REST APIs",          t: "Daily" },
            { n: "Clean architecture", t: "Principle" },
            { n: "Accessibility",      t: "A11y" },
            { n: "Process automation", t: "Scripting" },
          ],
        },
      ],
    },
    en: {
      kicker: "03 · TECH STACK",
      headline: "The toolkit.",
      lede: "A focused stack, picked for what it does well · not for hype.",
      cols: [
        {
          num: "01", label: "FRONTEND",
          items: [
            { n: "React.js / React TS", t: "Daily" },
            { n: "Next.js",             t: "SSR · App router" },
            { n: "React Native",        t: "In progress" },
            { n: "Tailwind · SCSS",     t: "Daily" },
            { n: "shadcn/ui · Lucide",  t: "Design system" },
            { n: "SurveyJS",            t: "Forms" },
          ],
        },
        {
          num: "02", label: "BACKEND",
          items: [
            { n: "Express.js (JS/TS)", t: "Daily" },
            { n: "NestJS",             t: "Modular" },
            { n: "FastAPI (Python)",   t: "APIs" },
            { n: "Prisma · Sequelize", t: "ORM" },
            { n: "PostgreSQL · MySQL", t: "Relational" },
            { n: "SQL Server",         t: "Enterprise" },
          ],
        },
        {
          num: "03", label: "DEVOPS",
          items: [
            { n: "Docker",             t: "Daily" },
            { n: "Jenkins CI/CD",      t: "Pipelines" },
            { n: "Git / GitHub",       t: "Daily" },
            { n: "AWS · VPS · Vercel", t: "Deploy" },
            { n: "cPanel · Plesk",     t: "Hosting" },
            { n: "Nginx · Linux",      t: "Servers" },
          ],
        },
        {
          num: "04", label: "DATA / TOOLS",
          items: [
            { n: "Python · Pandas",    t: "Analytics" },
            { n: "NumPy · Matplotlib", t: "Exploration" },
            { n: "REST APIs",          t: "Daily" },
            { n: "Clean architecture", t: "Principle" },
            { n: "Accessibility",      t: "A11y" },
            { n: "Process automation", t: "Scripting" },
          ],
        },
      ],
    },
  },

  projects: {
    fr: {
      kicker: "04 · PROJETS SÉLECTIONNÉS",
      headline: "Trois produits récents.",
      lede: "Du mobile à l'agrégation de paiements, en passant par la gestion familiale.",
      items: [
        {
          num: "01 / 03",
          name: "YourCap",
          role: "MOBILE · FULLSTACK",
          status: null,
          year: "2025",
          desc: "Application mobile de suivi des dettes. Enregistrez qui vous doit, à qui vous devez, avec sécurité PIN et tableau de bord clair.",
          tags: ["React Native", "Expo", "TypeScript", "SQLite"],
          action: "Voir l'app",
          link: "/yourcap",
        },
        {
          num: "02 / 03",
          name: "Famillia",
          role: "FRONTEND · ADMIN",
          status: null,
          year: "2024",
          year2: "fm.mlya.me",
          desc: "Plateforme de gestion familiale : événements, projets, finances, arbre généalogique. Member area & admin sidebar.",
          tags: ["React", "TypeScript", "Tailwind", "i18n"],
          action: "Étude de cas",
          actionIdx: 9,
        },
        {
          num: "03 / 03",
          name: "GB_PAY",
          role: "FRONTEND · CURRENT",
          status: "EN COURS",
          year: "2026",
          year2: "mygbpay.com",
          desc: "Plateforme d'agrégation de paiements, co-développée avec deux backend devs sous l'org BETTER-PLANNING-DIGITAL-PROJECT.",
          tags: ["Next.js", "TypeScript", "shadcn/ui", "API"],
          action: "Étude de cas",
          actionIdx: 9,
        },
      ] as ProjectItem[],
    },
    en: {
      kicker: "04 · SELECTED WORK",
      headline: "Three recent products.",
      lede: "From mobile to payments aggregation, with family management in between.",
      items: [
        {
          num: "01 / 03",
          name: "YourCap",
          role: "MOBILE · FULLSTACK",
          status: null,
          year: "2025",
          desc: "Mobile debt-tracking app. Record who owes you and who you owe, with PIN security and a clean dashboard.",
          tags: ["React Native", "Expo", "TypeScript", "SQLite"],
          action: "View app",
          link: "/yourcap",
        },
        {
          num: "02 / 03",
          name: "Famillia",
          role: "FRONTEND · ADMIN",
          status: null,
          year: "2024",
          year2: "fm.mlya.me",
          desc: "Family management platform: events, projects, finances, family tree. Member area & admin sidebar.",
          tags: ["React", "TypeScript", "Tailwind", "i18n"],
          action: "Case study",
          actionIdx: 9,
        },
        {
          num: "03 / 03",
          name: "GB_PAY",
          role: "FRONTEND · CURRENT",
          status: "IN PROGRESS",
          year: "2026",
          year2: "mygbpay.com",
          desc: "Payment aggregation platform, co-built with two backend devs under the BETTER-PLANNING-DIGITAL-PROJECT org.",
          tags: ["Next.js", "TypeScript", "shadcn/ui", "API"],
          action: "Case study",
          actionIdx: 9,
        },
      ] as ProjectItem[],
    },
  },

  yourcap: {
    fr: {
      kicker: "ÉTUDE DE CAS · YOURCAP",
      headline: "Gérez vos dettes.\nSimplement.",
      lede: "Une app mobile pour ne plus jamais oublier qui vous doit quoi. Authentification par PIN, tableau de bord en temps réel, formulaires guidés.",
      meta: [
        { k: "TYPE",    v: "Mobile native" },
        { k: "STACK",   v: "React Native + Expo" },
        { k: "LANGUES", v: "FR · EN · ES · DE · PT" },
        { k: "ÉTAT",    v: "Disponible" },
      ],
      featLabel: "POINTS FORTS",
      features: [
        { m: "01", t: "Auth par PIN 6 chiffres, gardée côté device." },
        { m: "02", t: "Tableau de bord temps réel : prêté · dû · solde." },
        { m: "03", t: "Multilingue (5 langues) sélectionnables." },
        { m: "04", t: "Formulaires guidés en sections avec validation." },
      ],
      screens: ["Welcome", "Register", "PIN", "Dashboard", "Add debt"],
    },
    en: {
      kicker: "CASE STUDY · YOURCAP",
      headline: "Track debts.\nSimply.",
      lede: "A mobile app to never forget who owes you what. PIN auth, real-time dashboard, guided forms.",
      meta: [
        { k: "TYPE",      v: "Native mobile" },
        { k: "STACK",     v: "React Native + Expo" },
        { k: "LANGUAGES", v: "FR · EN · ES · DE · PT" },
        { k: "STATUS",    v: "Released" },
      ],
      featLabel: "HIGHLIGHTS",
      features: [
        { m: "01", t: "6-digit PIN auth, kept device-side." },
        { m: "02", t: "Real-time dashboard: lent · owed · balance." },
        { m: "03", t: "Multi-language (5) selectable on landing." },
        { m: "04", t: "Guided form sections with validation." },
      ],
      screens: ["Welcome", "Register", "PIN", "Dashboard", "Add debt"],
    },
  },

  web: {
    fr: {
      kicker: "ÉTUDE DE CAS · WEB",
      headline: "Deux plateformes web.",
      lede: "Famillia (gestion familiale) et GB_PAY (paiements). Deux échelles, une même rigueur.",
      blocks: [
        {
          num: "01",
          name: "Famillia",
          role: "FRONTEND LEAD",
          url: "fm.mlya.me",
          desc: "Application web de gestion familiale : événements, projets, tâches, notes, documents, contributions, amendes, arbre généalogique. Member area + admin sidebar.",
          tags: ["React", "TypeScript", "Tailwind", "i18n", "Design system"],
          mockTag: "DASHBOARD · FR",
        },
        {
          num: "02",
          name: "GB_PAY",
          role: "FRONTEND DEVELOPER",
          url: "mygbpay.com",
          desc: "Plateforme d'agrégation de paiements en cours, co-développée avec deux backend developers sous l'organisation BETTER-PLANNING-DIGITAL-PROJECT.",
          tags: ["Next.js", "TypeScript", "shadcn/ui", "REST", "Stripe-like"],
          mockTag: "PAYMENTS · LIVE",
        },
      ],
    },
    en: {
      kicker: "CASE STUDY · WEB",
      headline: "Two web platforms.",
      lede: "Famillia (family management) and GB_PAY (payments). Two scales, same rigor.",
      blocks: [
        {
          num: "01",
          name: "Famillia",
          role: "FRONTEND LEAD",
          url: "fm.mlya.me",
          desc: "Family management web app: events, projects, tasks, notes, documents, contributions, fines, family tree. Member area + admin sidebar.",
          tags: ["React", "TypeScript", "Tailwind", "i18n", "Design system"],
          mockTag: "DASHBOARD · FR",
        },
        {
          num: "02",
          name: "GB_PAY",
          role: "FRONTEND DEVELOPER",
          url: "mygbpay.com",
          desc: "Payment aggregation platform in progress, co-built with two backend developers under the BETTER-PLANNING-DIGITAL-PROJECT organization.",
          tags: ["Next.js", "TypeScript", "shadcn/ui", "REST", "Stripe-like"],
          mockTag: "PAYMENTS · LIVE",
        },
      ],
    },
  },

  exp: {
    fr: {
      kicker: "05 · PARCOURS",
      headline: "Le chemin.",
      lede: "Plusieurs années en environnement réel, en passant par le frontend, le fullstack et l'infra.",
      items: [
        {
          year: "2026", sub: "EN COURS",
          h: "Frontend Developer · GB_PAY",
          org: "BETTER-PLANNING-DIGITAL-PROJECT",
          b: "Construction d'une plateforme d'agrégation de paiements avec Next.js + TypeScript, en collaboration avec deux backend devs.",
        },
        {
          year: "2024 → 2025", sub: "12+ MOIS",
          h: "Frontend Lead · Famillia",
          org: "fm.mlya.me",
          b: "Conception et développement de la web app Famillia (gestion familiale) : design system, member area, admin sidebar, i18n FR/EN.",
        },
        {
          year: "2024", sub: "PROJET PERSO",
          h: "Mobile Fullstack · YourCap",
          org: "Indépendant",
          b: "App mobile React Native + Expo : auth PIN, dashboard, formulaires guidés, multilingue 5 langues.",
        },
        {
          year: "2022 → 2024", sub: "2 ANS",
          h: "Fullstack Developer",
          org: "Projets divers · confidentiels",
          b: "Développement fullstack TS/Node, conception API REST, intégration design systems, déploiement Docker + CI/CD.",
        },
      ],
    },
    en: {
      kicker: "05 · PATH",
      headline: "The journey.",
      lede: "Several years in real environments, from frontend to fullstack to infra.",
      items: [
        {
          year: "2026", sub: "CURRENT",
          h: "Frontend Developer · GB_PAY",
          org: "BETTER-PLANNING-DIGITAL-PROJECT",
          b: "Building a payments aggregation platform with Next.js + TypeScript, with two backend devs.",
        },
        {
          year: "2024 → 2025", sub: "12+ MONTHS",
          h: "Frontend Lead · Famillia",
          org: "fm.mlya.me",
          b: "Design and development of the Famillia web app (family management): design system, member area, admin sidebar, FR/EN i18n.",
        },
        {
          year: "2024", sub: "SIDE PROJECT",
          h: "Mobile Fullstack · YourCap",
          org: "Independent",
          b: "React Native + Expo mobile app: PIN auth, dashboard, guided forms, 5-language localization.",
        },
        {
          year: "2022 → 2024", sub: "2 YRS",
          h: "Fullstack Developer",
          org: "Various · confidential",
          b: "Fullstack TS/Node, REST API design, design system integration, Docker + CI/CD delivery.",
        },
      ],
    },
  },

  dual: {
    fr: {
      kicker: "06 · FORMATION & LANGUES",
      eduTitle: "Formation.",
      langTitle: "Langues.",
      edus: [
        { y: "2020 → 2022", h: "Bachelor · Génie Logiciel",  b: "Conception logicielle, architecture, méthodes agiles." },
        { y: "2018 → 2020", h: "BTS · Génie Logiciel",       b: "Bases solides : algorithmique, bases de données, web." },
        { y: "Continu",     h: "Autodidacte",                 b: "Plusieurs années d'expérience réelle, learning by doing." },
      ],
      langs: [
        { cc: "CM", name: "Français", level: "Natif · à l'écrit et à l'oral", pct: 100 },
        { cc: "GB", name: "Anglais",  level: "Professionnel · communication technique", pct: 75 },
      ],
    },
    en: {
      kicker: "06 · EDUCATION & LANGUAGES",
      eduTitle: "Education.",
      langTitle: "Languages.",
      edus: [
        { y: "2020 → 2022", h: "Bachelor's · Software Engineering", b: "Software design, architecture, agile methods." },
        { y: "2018 → 2020", h: "BTS · Software Engineering",        b: "Solid foundations: algorithms, databases, web." },
        { y: "Ongoing",     h: "Self-taught",                        b: "Years of real project experience, learning by doing." },
      ],
      langs: [
        { cc: "CM", name: "French",  level: "Native · written & spoken", pct: 100 },
        { cc: "GB", name: "English", level: "Professional · technical fluency", pct: 75 },
      ],
    },
  },

  quote: {
    fr: {
      kicker: "07 · CITATION & FUN FACT",
      quote: "Do it once,\ndo it right,\ndo it with TypeScript.",
      attr: "PHILOSOPHIE PERSONNELLE",
      fact: "Coder n'est pas qu'un métier · c'est un mode de vie. UI au pixel près, backend scalable, pipelines CI/CD propres. Docker ❤️, automatisation, apprentissage continu. TypeScript reste mon favori.",
      tag: "FUN FACT · 002",
    },
    en: {
      kicker: "07 · QUOTE & FUN FACT",
      quote: "Do it once,\ndo it right,\ndo it with TypeScript.",
      attr: "PERSONAL PHILOSOPHY",
      fact: "Coding isn't just a job · it's a lifestyle. Pixel-perfect UI, scalable backends, clean CI/CD pipelines. Docker ❤️, automation, continuous learning. TypeScript remains my all-time favorite.",
      tag: "FUN FACT · 002",
    },
  },

  contact: {
    fr: {
      kicker: "08 · CONTACT",
      headline1: "Travaillons",
      headline2: "ensemble.",
      mailto: "marlexapong90@gmail.com",
      cta: "Écrivez-moi",
      sig: "Apong M. · 2026",
      links: [
        { k: "EMAIL",    v: "marlexapong90@gmail.com", href: "mailto:marlexapong90@gmail.com" },
        { k: "LINKEDIN", v: "Marley Apong",            href: "https://cm.linkedin.com/in/marley-apong-228550257" },
        { k: "GITHUB",   v: "MarleyApong",             href: "https://github.com/MarleyApong" },
        { k: "YOUTUBE",  v: "@amatutoriel",            href: "https://www.youtube.com/@amatutoriel" },
      ],
    },
    en: {
      kicker: "08 · CONTACT",
      headline1: "Let's build",
      headline2: "together.",
      mailto: "marlexapong90@gmail.com",
      cta: "Drop a line",
      sig: "Apong M. · 2026",
      links: [
        { k: "EMAIL",    v: "marlexapong90@gmail.com", href: "mailto:marlexapong90@gmail.com" },
        { k: "LINKEDIN", v: "Marley Apong",            href: "https://cm.linkedin.com/in/marley-apong-228550257" },
        { k: "GITHUB",   v: "MarleyApong",             href: "https://github.com/MarleyApong" },
        { k: "YOUTUBE",  v: "@amatutoriel",            href: "https://www.youtube.com/@amatutoriel" },
      ],
    },
  },

  ui: {
    fr: { hint: "MOLETTE · FLÈCHES · GLISSER", year: "© 2026 · MLYA", role: "FULLSTACK DEV", sub: "CAMEROUN" },
    en: { hint: "WHEEL · ARROWS · DRAG",       year: "© 2026 · MLYA", role: "FULLSTACK DEV", sub: "CAMEROON" },
  },
} as const;
