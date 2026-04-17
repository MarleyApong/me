"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight, Shield, WifiOff, Bell, FileText, Globe, LayoutDashboard } from "lucide-react"

const screens = [
  { src: "/images/yourcap/screen-welcome.jpg", label: "Bienvenue" },
  { src: "/images/yourcap/screen-register.jpg", label: "Inscription" },
  { src: "/images/yourcap/screen-pin.jpg", label: "Code PIN" },
  { src: "/images/yourcap/screen-dashboard.jpg", label: "Dashboard" },
  { src: "/images/yourcap/screen-add-debt.jpg", label: "Ajouter une dette" },
]

const features = [
  {
    Icon: Shield,
    title: "Sécurisé",
    desc: "PIN à 6 chiffres et authentification biométrique. Vos données ne quittent jamais votre appareil.",
  },
  {
    Icon: WifiOff,
    title: "100 % Hors ligne",
    desc: "Aucun serveur, aucun compte cloud. Fonctionne sans connexion internet.",
  },
  {
    Icon: LayoutDashboard,
    title: "Prêts & Emprunts",
    desc: "Enregistrez qui vous doit quoi et ce que vous devez à qui, avec dates et montants.",
  },
  {
    Icon: Bell,
    title: "Rappels intelligents",
    desc: "Notifications push automatiques avant les échéances. Choisissez le délai et la fréquence.",
  },
  {
    Icon: FileText,
    title: "Import / Export CSV",
    desc: "Sauvegardez vos données ou transférez-les vers Excel et Google Sheets.",
  },
  {
    Icon: Globe,
    title: "5 langues",
    desc: "Français, Anglais, Espagnol, Allemand, Portugais — interface entièrement localisée.",
  },
]

const stack = [
  "React Native",
  "Expo",
  "TypeScript",
  "SQLite",
  "NativeWind",
  "Zustand",
  "EAS Build",
]

export default function YourCapPage() {
  const [active, setActive] = useState(0)

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <p className="font-display text-xs tracking-[0.2em] text-accent mb-4">
            DISPONIBLE SUR ANDROID
          </p>
          <h1 className="font-display text-6xl md:text-7xl tracking-wide text-foreground mb-4">
            YOUR<span className="text-accent">CAP</span>
          </h1>
          <p className="text-xl font-semibold text-foreground mb-3">
            N&apos;oubliez plus jamais qui vous doit quoi.
          </p>
          <p className="text-muted leading-relaxed mb-8 max-w-md">
            Gérez vos prêts et emprunts personnels en toute sécurité — sans internet, sans compte, sans compromis sur votre vie privée.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.marleyapong.yourcap"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent px-6 py-3 font-display text-xs tracking-widest text-black transition-all hover:bg-accent/90"
              style={{ cursor: "none" }}
            >
              GOOGLE PLAY
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <Link
              href="/yourcap/privacy"
              className="flex items-center gap-2 rounded-full border border-card-border px-6 py-3 font-display text-xs tracking-widest text-muted transition-all hover:border-accent/50 hover:text-accent"
              style={{ cursor: "none" }}
            >
              CONFIDENTIALITÉ
            </Link>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="flex-shrink-0 relative">
          <div
            className="rounded-[2.5rem] overflow-hidden border border-card-border shadow-2xl"
            style={{ width: 220 }}
          >
            <Image
              src={screens[active].src}
              alt={screens[active].label}
              width={220}
              height={480}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="h-px bg-card-border" />
      </div>

      {/* Screenshots */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <p className="font-display text-xs tracking-[0.2em] text-accent mb-8">APERÇU</p>
        <div className="flex gap-5 overflow-x-auto pb-4">
          {screens.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex-shrink-0 flex flex-col items-center gap-2"
              style={{ cursor: "none" }}
            >
              <div
                className="rounded-2xl overflow-hidden transition-all"
                style={{
                  width: 110,
                  border: active === i ? "2px solid var(--accent)" : "2px solid var(--card-border)",
                }}
              >
                <Image
                  src={s.src}
                  alt={s.label}
                  width={110}
                  height={240}
                  className="w-full h-auto block"
                />
              </div>
              <span
                className="font-display text-[10px] tracking-widest transition-colors"
                style={{ color: active === i ? "var(--accent)" : "var(--muted)" }}
              >
                {s.label.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="h-px bg-card-border" />
      </div>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <p className="font-display text-xs tracking-[0.2em] text-accent mb-10">FONCTIONNALITÉS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {features.map(({ Icon, title, desc }, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border border-card-border bg-card-bg transition-all hover:border-accent/30"
            >
              <Icon className="h-5 w-5 text-accent mb-4" />
              <h3 className="font-display text-sm tracking-widest text-foreground mb-2">
                {title.toUpperCase()}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="h-px bg-card-border" />
      </div>

      {/* Stack */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <p className="font-display text-xs tracking-[0.2em] text-accent mb-8">STACK TECHNIQUE</p>
        <div className="flex flex-wrap gap-3">
          {stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-card-border bg-card-bg px-4 py-2 font-display text-xs tracking-widest text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
