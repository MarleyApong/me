# Portfolio - ASSOH APONG MARLEY WALTER

Personal portfolio website built with Next.js, showcasing my work as a Fullstack JavaScript/TypeScript Developer.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **GSAP** - Advanced scroll-triggered animations
- **Framer Motion** - Component animations
- **Lenis** - Smooth scroll
- **Lucide React** - Icons

## Features

- Cinematic preloader with counter animation
- Custom magnetic cursor
- Smooth scroll with Lenis
- GSAP scroll-triggered animations (parallax, text reveal, horizontal scroll)
- Bento grid layout for About section
- Horizontal timeline for Experience section
- Pinterest-style masonry grid for Projects (fetched from GitHub API)
- Word-by-word quote reveal on scroll
- Marquee tech stack bands
- Internationalization (FR/EN) with custom i18n system
- Grain/noise texture overlay
- Responsive design

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
| `npm run release:dev` | Dev pre-release (standard-version) |
| `npm run release:prod` | Production release (standard-version) |

## Project Structure

```
app/
  components/       # All UI components
    about.tsx        # Bento grid about section
    contact.tsx      # Contact form + social links
    custom-cursor.tsx
    experience.tsx   # Horizontal scroll timeline
    footer.tsx
    hero.tsx         # Main hero with GSAP animations
    marquee.tsx      # Infinite scrolling tech band
    navbar.tsx       # Hide/show navbar + language switcher
    preloader.tsx    # Loading screen with counter
    projects.tsx     # GitHub repos masonry grid
    quote.tsx        # Animated quote reveal
    smooth-scroll.tsx
  i18n/             # Internationalization
    locales/
      fr.ts          # French translations
      en.ts          # English translations
      index.ts
    index.tsx        # I18nProvider + useTranslation hook
  globals.css       # Theme variables, noise texture, marquee animation
  layout.tsx        # Root layout with fonts
  page.tsx          # Main page assembly
public/
  images/           # Portrait photos
```

## Author

**ASSOH APONG MARLEY WALTER**
- Email: marlexapong90@gmail.com
- GitHub: [@MarleyApong](https://github.com/MarleyApong)
- LinkedIn: [Marley Apong](https://linkedin.com/in/marley-apong)
- YouTube: [@amatutoriel](https://youtube.com/@amatutoriel)
