import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politique de Confidentialité — YourCap",
  description: "Politique de confidentialité de l'application YourCap.",
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: "1. Collecte de données",
    body: "YourCap ne collecte aucune donnée personnelle. L'application fonctionne entièrement hors ligne. Aucune information n'est envoyée à des serveurs externes.",
  },
  {
    title: "2. Stockage des données",
    body: "Toutes vos données (dettes, contacts, paramètres) sont stockées uniquement sur votre appareil, dans une base de données locale sécurisée. Vous en êtes le seul propriétaire.",
  },
  {
    title: "3. Authentification",
    body: "L'accès à l'application est protégé par un code PIN et/ou la biométrie de votre appareil. Ces données d'authentification ne quittent jamais votre téléphone.",
  },
  {
    title: "4. Notifications",
    body: "YourCap peut envoyer des notifications locales (rappels d'échéances). Ces notifications sont générées localement et ne passent par aucun service tiers.",
  },
  {
    title: "5. Partage de données",
    body: "Nous ne partageons aucune donnée avec des tiers, des annonceurs ou des partenaires.",
  },
  {
    title: "6. Suppression des données",
    body: "Vous pouvez supprimer toutes vos données à tout moment via l'option « Supprimer mon compte » dans les paramètres, ou en désinstallant l'application.",
  },
  {
    title: "7. Contact",
    body: null,
  },
]

export default function YourCapPrivacyPage() {
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-12">
        <p className="font-display text-xs tracking-[0.2em] text-accent mb-4">YOURCAP</p>
        <h1 className="font-display text-5xl tracking-wide text-foreground mb-2">
          CONFIDENTIALITÉ
        </h1>
        <p className="text-muted text-sm mb-14">Dernière mise à jour : 17 avril 2026</p>

        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title} className="border-t border-card-border pt-8">
              <h2 className="font-display text-xs tracking-[0.2em] text-accent mb-3">
                {s.title.toUpperCase()}
              </h2>
              {s.body ? (
                <p className="text-muted leading-relaxed">{s.body}</p>
              ) : (
                <p className="text-muted leading-relaxed">
                  Pour toute question concernant cette politique :{" "}
                  <a
                    href="mailto:marlexapong90@gmail.com"
                    className="text-accent hover:underline"
                  >
                    marlexapong90@gmail.com
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-card-border">
          <Link
            href="/yourcap"
            className="font-display text-xs tracking-widest text-muted transition-colors hover:text-accent"
          >
            &larr; YOURCAP
          </Link>
        </div>
      </section>
    </div>
  )
}
