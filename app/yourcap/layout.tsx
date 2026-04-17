"use client"

import { ThemeProvider } from "../components/theme-provider"
import { I18nProvider } from "../i18n"
import QueryProvider from "../components/query-provider"
import SmoothScroll from "../components/smooth-scroll"
import CustomCursor from "../components/custom-cursor"
import ThemePanel from "../components/theme-panel"
import BackToTop from "../components/back-to-top"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import { ToastProvider } from "../components/ui/toast"
import type { ReactNode } from "react"

export default function YourCapLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <I18nProvider>
          <ToastProvider position="top-right">
            <CustomCursor />
            <SmoothScroll>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
            <ThemePanel />
            <BackToTop />
          </ToastProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
