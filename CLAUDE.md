# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Stack

- **Next.js 16** with App Router (`app/` directory)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (configured via `@tailwindcss/postcss`)
- Fonts: Geist Sans and Geist Mono via `next/font/google`

## Architecture

This is a fresh Next.js App Router project. All routes live under `app/`. The root layout (`app/layout.tsx`) sets up fonts and global metadata; `app/page.tsx` is the home route. Global styles are in `app/globals.css`.

No tests are configured yet.
