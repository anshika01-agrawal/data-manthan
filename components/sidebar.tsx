import { Button } from "@/components/ui/button"
import { BarChart3, Database, Microscope, Dna, Map, FileText, Settings, Activity, Fish, Waves } from "lucide-react"

const menuItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: Map, label: "Data Visualization", active: false },
  { icon: Fish, label: "Otolith Analysis", active: false },
  { icon: Dna, label: "eDNA Processing", active: false },
  { icon: Activity, label: "Cross-Domain Analytics", active: false },
  { icon: Database, label: "Data Management", active: false },
  { icon: Waves, label: "Oceanographic Data", active: false },
  { icon: Microscope, label: "Taxonomy", active: false },
  { icon: FileText, label: "Reports", active: false },
  { icon: Settings, label: "Settings", active: false },
]

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-sidebar/50 backdrop-blur supports-[backdrop-filter]:bg-sidebar/50">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Button key={index} variant={item.active ? "default" : "ghost"} className="w-full justify-start" size="sm">
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
