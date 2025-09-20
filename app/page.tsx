"use client"

import { Header } from "@/components/header"
import { TopNavbar } from "@/components/top-navbar"
import { DashboardContent } from "@/components/dashboard-content"
import { UnderWaterLayout, SlidingContent } from "@/components/underwater-layout"
import { FloatingStartButton } from "@/components/start-now-button"

export default function HomePage() {
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
        <SlidingContent delay={400} className="text-center py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent mb-8">
              Data Manthan
            </h1>
            <p className="text-2xl text-cyan-100 mb-4">
              Advanced Marine Research Platform
            </p>
            <p className="text-lg text-cyan-200 mb-12 max-w-3xl mx-auto">
              Dive deep into oceanic data with cutting-edge AI-powered analysis, real-time monitoring, and comprehensive marine research tools
            </p>
            <FloatingStartButton onClick={scrollToContent}>
              Explore Ocean Data
            </FloatingStartButton>
          </div>
        </SlidingContent>

        <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SlidingContent delay={600}>
            <DashboardContent />
          </SlidingContent>
        </main>
      </div>
    </UnderWaterLayout>
  )
}
