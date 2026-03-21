import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Caveat, Inter } from "next/font/google";
import "./globals.css";
import SwRegister from "./components/sw-register";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://mlya.me";
const title = "ASSOH APONG MARLEY WALTER | Fullstack Developer";
const description =
  "Portfolio of ASSOH APONG MARLEY WALTER — Fullstack JavaScript/TypeScript Developer with 4+ years of experience building modern web & mobile applications.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.json",
  keywords: [
    "Fullstack Developer",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Portfolio",
    "ASSOH APONG MARLEY WALTER",
  ],
  authors: [{ name: "ASSOH APONG MARLEY WALTER", url: siteUrl }],
  creator: "ASSOH APONG MARLEY WALTER",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: siteUrl,
    title,
    description,
    siteName: "MLYA Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "ASSOH APONG MARLEY WALTER - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MLYA Portfolio",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5a623",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${bebasNeue.variable} ${caveat.variable} ${inter.variable} antialiased`}
      >
        <div id="main-content">{children}</div>
        <SwRegister />
      </body>
    </html>
  );
}
