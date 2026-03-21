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

export const metadata: Metadata = {
  title: "ASSOH APONG MARLEY WALTER | Fullstack Developer",
  description:
    "Portfolio of ASSOH APONG MARLEY WALTER — Fullstack JavaScript/TypeScript Developer with 4+ years of experience.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AM Portfolio",
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
