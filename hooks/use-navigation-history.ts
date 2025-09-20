"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface NavigationHistoryContextType {
  history: string[]
  goBack: () => void
  canGoBack: boolean
  addToHistory: (path: string) => void
  clearHistory: () => void
}

const NavigationHistoryContext = createContext<NavigationHistoryContextType | undefined>(undefined)

export function useNavigationHistory() {
  const context = useContext(NavigationHistoryContext)
  if (context === undefined) {
    throw new Error('useNavigationHistory must be used within a NavigationHistoryProvider')
  }
  return context
}

export function useNavigationHistoryProvider() {
  const [history, setHistory] = useState<string[]>([])
  const router = useRouter()
  const pathname = usePathname()

  const addToHistory = (path: string) => {
    setHistory(prev => {
      // Don't add the same path consecutively
      if (prev.length > 0 && prev[prev.length - 1] === path) {
        return prev
      }
      // Keep only last 10 entries to prevent memory issues
      const newHistory = [...prev, path]
      return newHistory.slice(-10)
    })
  }

  const goBack = () => {
    if (history.length > 1) {
      // Remove current page and go to previous
      const newHistory = [...history]
      newHistory.pop() // Remove current page
      const previousPath = newHistory.pop() // Get and remove previous page
      
      setHistory(newHistory)
      
      if (previousPath) {
        router.push(previousPath)
      } else {
        // Fallback to home if no history
        router.push('/')
      }
    } else {
      // If no history, go to home
      router.push('/')
    }
  }

  const canGoBack = history.length > 1

  const clearHistory = () => {
    setHistory([])
  }

  // Track current pathname in history
  useEffect(() => {
    addToHistory(pathname)
  }, [pathname])

  return {
    history,
    goBack,
    canGoBack,
    addToHistory,
    clearHistory
  }
}

interface NavigationHistoryProviderProps {
  children: ReactNode
}

export function NavigationHistoryProvider({ children }: NavigationHistoryProviderProps) {
  const value = useNavigationHistoryProvider()
  
  return React.createElement(
    NavigationHistoryContext.Provider,
    { value },
    children
  )
}