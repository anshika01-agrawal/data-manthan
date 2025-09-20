import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationHistoryProvider } from "@/hooks/use-navigation-history"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CMLRE Marine Research Platform",
  description: "AI-driven, unified, cloud-ready data platform for marine research",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="antialiased dark">
        <ThemeProvider>
          <NavigationHistoryProvider>
            {children}
          </NavigationHistoryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
