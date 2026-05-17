"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowUpRight, Shield, WifiOff, Bell, FileText, Globe, LayoutDashboard } from "lucide-react"

const screens = [
  { src: "/images/yourcap/screen-welcome.jpg",   label: "Bienvenue" },
  { src: "/images/yourcap/screen-register.jpg",  label: "Inscription" },
  { src: "/images/yourcap/screen-pin.jpg",        label: "Code PIN" },
  { src: "/images/yourcap/screen-dashboard.jpg",  label: "Dashboard" },
  { src: "/images/yourcap/screen-add-debt.jpg",   label: "Ajouter une dette" },
]

const features = [
  { Icon: Shield,          title: "Sécurisé",          desc: "PIN à 6 chiffres et authentification biométrique. Vos données ne quittent jamais votre appareil." },
  { Icon: WifiOff,         title: "100% Hors ligne",    desc: "Aucun serveur, aucun compte cloud. Fonctionne sans connexion internet." },
  { Icon: LayoutDashboard, title: "Prêts et Emprunts",  desc: "Enregistrez qui vous doit quoi et ce que vous devez à qui, avec dates et montants." },
  { Icon: Bell,            title: "Rappels intelligents",desc: "Notifications push automatiques avant les échéances. Choisissez le délai et la fréquence." },
  { Icon: FileText,        title: "Import / Export JSON", desc: "Sauvegardez et restaurez vos données facilement en format JSON." },
  { Icon: Globe,           title: "5 langues",           desc: "Français, Anglais, Espagnol, Allemand, Portugais — interface entièrement localisée." },
]

const stack = ["React Native", "Expo", "TypeScript", "SQLite", "Zustand", "EAS Build"]

export default function YourCapPage() {
  const [active, setActive] = useState(0)
  const router = useRouter()

  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh", fontFamily: "var(--f-sans)" }}>

      {/* Top bar */}
      <div style={{ borderBottom: "1px solid var(--line-strong)", padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: 0, color: "var(--muted)", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--f-mono)", transition: "color 0.3s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
        >
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
          </svg>
          Retour
        </button>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted)" }}>
          YOURCAP · APP MOBILE
        </span>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }}>

        {/* Hero */}
        <section style={{ padding: "72px 0 56px", display: "flex", gap: 80, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", fontWeight: 700, marginBottom: 24 }}>
              DISPONIBLE SUR ANDROID
            </div>
            <h1 style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1, margin: "0 0 20px", color: "var(--ink)" }}>
              YourCap
            </h1>
            <p style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>
              N&apos;oubliez plus jamais qui vous doit quoi.
            </p>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 36, maxWidth: 420 }}>
              Gérez vos prêts et emprunts personnels en toute sécurité. Sans internet, sans compte, sans compromis sur votre vie privée.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="https://play.google.com/store/apps/details?id=com.marleyapong.yourcap"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 24px", background: "var(--ink)", color: "var(--bg)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", transition: "opacity 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Google Play <ArrowUpRight size={13} />
              </a>
              <Link
                href="/yourcap/privacy"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 24px", border: "1px solid var(--line-strong)", color: "var(--muted)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, textDecoration: "none", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.color = "var(--ink)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line-strong)"; e.currentTarget.style.color = "var(--muted)"; }}
              >
                Confidentialité
              </Link>
            </div>
          </div>

          {/* Phone mockup */}
          <div style={{ flexShrink: 0, background: "#0c0c0c", borderRadius: 28, padding: 6, border: "1px solid #1a1a1a", boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }}>
            <div style={{ width: 200, borderRadius: 22, overflow: "hidden", background: "#000", position: "relative" }}>
              <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 80, height: 20, background: "#000", borderRadius: 10, zIndex: 2 }} />
              <Image src={screens[active].src} alt={screens[active].label} width={200} height={430} style={{ display: "block", width: "100%", height: "auto" }} />
            </div>
          </div>
        </section>

        <div style={{ height: 1, background: "var(--line-strong)" }} />

        {/* Screenshots */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ fontSize: 15, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", fontWeight: 700, marginBottom: 28 }}>
            APERÇU
          </div>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
            {screens.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "none", border: 0, cursor: "pointer" }}
              >
                <div style={{ width: 100, overflow: "hidden", border: `1px solid ${active === i ? "var(--ink)" : "var(--line-strong)"}`, transition: "border-color 0.3s" }}>
                  <Image src={s.src} alt={s.label} width={100} height={215} style={{ display: "block", width: "100%", height: "auto" }} />
                </div>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: active === i ? "var(--ink)" : "var(--muted)", transition: "color 0.3s" }}>
                  {s.label.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: "var(--line-strong)" }} />

        {/* Features */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ fontSize: 15, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", fontWeight: 700, marginBottom: 28 }}>
            FONCTIONNALITÉS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--line-strong)" }}>
            {features.map(({ Icon, title, desc }, i) => (
              <div key={i} style={{ background: "var(--bg)", padding: "28px 24px" }}>
                <Icon size={18} style={{ color: "var(--ink)", marginBottom: 14 }} />
                <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>
                  {title}
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.55, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: "var(--line-strong)" }} />

        {/* Stack */}
        <section style={{ padding: "48px 0 80px" }}>
          <div style={{ fontSize: 15, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", fontWeight: 700, marginBottom: 28 }}>
            STACK TECHNIQUE
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stack.map((t) => (
              <span key={t} style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.1em", padding: "6px 14px", border: "1px solid var(--line-strong)", color: "var(--muted)" }}>
                {t}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
