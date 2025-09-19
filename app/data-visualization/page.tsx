import { Header } from "@/components/header"
import { TopNavbar } from "@/components/top-navbar"
import { DataVisualizationContent } from "@/components/data-visualization-content"

export default function DataVisualizationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TopNavbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DataVisualizationContent />
      </main>
    </div>
  )
}
