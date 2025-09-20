"use client"

import { Header } from "@/components/header"
import { TopNavbar } from "@/components/top-navbar"
import { CollaborationContent } from "@/components/collaboration-content"
import { UnderWaterLayout, SlidingContent } from "@/components/underwater-layout"
import { FloatingStartButton } from "@/components/start-now-button"

export default function CollaborationPage() {
  const scrollToContent = () => {
    document.querySelector('#main-content')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <UnderWaterLayout>
      <div className="min-h-screen">
        <SlidingContent delay={0}>
          <Header />
        </SlidingContent>
        
        <SlidingContent delay={200}>
          <TopNavbar />
        </SlidingContent>

        {/* Hero Section */}
        <SlidingContent delay={400} className="text-center py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-6">
              Research Collaboration
            </h1>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Connect with researchers worldwide and collaborate on marine science projects
            </p>
            <FloatingStartButton onClick={scrollToContent}>
              Start Collaborating
            </FloatingStartButton>
          </div>
        </SlidingContent>

        <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SlidingContent delay={600}>
            <CollaborationContent />
          </SlidingContent>
        </main>
      </div>
    </UnderWaterLayout>
  )
}