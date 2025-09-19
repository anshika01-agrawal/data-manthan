import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { EdnaProcessingContent } from "@/components/edna-processing-content"

export default function EdnaProcessingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <EdnaProcessingContent />
        </main>
      </div>
    </div>
  )
}
