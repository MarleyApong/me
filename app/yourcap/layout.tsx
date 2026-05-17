"use client"

import { ThemeProvider } from "../components/theme-provider"
import type { ReactNode } from "react"

export default function YourCapLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <main>{children}</main>
    </ThemeProvider>
  )
}
