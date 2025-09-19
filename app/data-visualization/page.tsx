import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { DataVisualizationContent } from "@/components/data-visualization-content"

export default function DataVisualizationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <DataVisualizationContent />
        </main>
      </div>
    </div>
  )
}
