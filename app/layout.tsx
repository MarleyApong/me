import type { Metadata } from "next";
import { Bebas_Neue, Caveat, Inter } from "next/font/google";
import "./globals.css";

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
      </body>
    </html>
  );
}
