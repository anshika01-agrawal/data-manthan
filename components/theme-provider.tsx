'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
} from 'next-themes'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      forcedTheme="dark"
      defaultTheme="dark"
      themes={["dark"]}
      enableSystem={false}
      storageKey="underwater-theme"
    >
      {children}
    </NextThemesProvider>
  )
}
