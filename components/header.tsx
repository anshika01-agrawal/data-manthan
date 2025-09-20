"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BackButton } from "@/components/back-button"
import { Search, Bell, User, Waves, Fish, Droplets } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import Link from "next/link"

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="relative border-b border-cyan-500/20 bg-gradient-to-r from-slate-900/80 via-blue-900/60 to-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-card/50 overflow-hidden">
      {/* Animated wave background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0 C150,80 350,80 500,60 C650,40 850,40 1000,60 C1150,80 1200,80 1200,80 L1200,120 L0,120 Z"
            fill="url(#wave-gradient)"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="rgb(34, 197, 94)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating bubbles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
            }}
          />
        ))}
      </div>

      <div className="relative flex h-20 items-center px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Waves className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <Link href="/">
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent hover:from-blue-400 hover:to-cyan-300 transition-all duration-300">
                  Data Manthan
                </h1>
                <p className="text-sm text-cyan-200 flex items-center gap-1">
                  <Fish className="h-3 w-3" />
                  Marine Research Platform
                </p>
              </div>
            </Link>
          </div>
          
          {/* Navigation controls */}
          <div className="ml-6">
            <BackButton />
          </div>
        </div>

        <div className="flex-1 max-w-lg mx-8">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
            <Input 
              placeholder="Search datasets, species, locations..." 
              className="pl-10 bg-white/70 dark:bg-gray-900/70 border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300" 
            />
            <Droplets className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400 opacity-50" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Current time display */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground bg-white/60 dark:bg-gray-800/60 px-3 py-1 rounded-lg">
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          
          <Button variant="ghost" size="icon" className="hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <User className="h-4 w-4" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
