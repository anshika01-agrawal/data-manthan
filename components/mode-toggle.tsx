"use client"
import { Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  // Dark theme only - no toggle functionality
  return (
    <Button variant="ghost" size="icon" disabled className="opacity-50 cursor-not-allowed">
      <Moon className="h-[1.2rem] w-[1.2rem] text-cyan-400" />
      <span className="sr-only">Dark Theme (Fixed)</span>
    </Button>
  )
}
