"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Database, Microscope, Dna, Map, FileText, Settings, Activity, Fish, Waves, Upload } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: BarChart3, label: "Dashboard", href: "/", active: false },
  { icon: Map, label: "Data Visualization", href: "/data-visualization", active: false },
  { icon: Fish, label: "Otolith Analysis", href: "/otolith-analysis", active: false },
  { icon: Dna, label: "eDNA Processing", href: "/edna-processing", active: false },
  { icon: Upload, label: "Data Upload", href: "/data-upload", active: false },
  { icon: Activity, label: "Cross-Domain Analytics", href: "#", active: false },
  { icon: Database, label: "Data Management", href: "#", active: false },
  { icon: Waves, label: "Oceanographic Data", href: "#", active: false },
  { icon: Microscope, label: "Taxonomy", href: "#", active: false },
  { icon: FileText, label: "Reports", href: "#", active: false },
  { icon: Settings, label: "Settings", href: "#", active: false },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-sidebar/50 backdrop-blur supports-[backdrop-filter]:bg-sidebar/50">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link key={index} href={item.href}>
                <Button 
                  variant={isActive ? "default" : "ghost"} 
                  className="w-full justify-start hover:scale-105 transition-all duration-200 ocean-glass" 
                  size="sm"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
