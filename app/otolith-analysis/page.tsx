import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { OtolithAnalysisContent } from "@/components/otolith-analysis-content"

export default function OtolithAnalysisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <OtolithAnalysisContent />
        </main>
      </div>
    </div>
  )
}
