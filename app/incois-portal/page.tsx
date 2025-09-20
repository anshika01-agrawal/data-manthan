"use client"

import { Header } from "@/components/header"
import { TopNavbar } from "@/components/top-navbar"
import { IncoisDataPortal } from "@/components/incois-data-portal"
import { UnderWaterLayout, SlidingContent } from "@/components/underwater-layout"
import { FloatingStartButton } from "@/components/start-now-button"

export default function IncoisPortalPage() {
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
              INCOIS Data Portal
            </h1>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Access comprehensive Indian ocean data from the Indian National Centre for Ocean Information Services
            </p>
            <FloatingStartButton onClick={scrollToContent}>
              Access Portal
            </FloatingStartButton>
          </div>
        </SlidingContent>

        <main id="main-content">
          <SlidingContent delay={600}>
            <IncoisDataPortal />
          </SlidingContent>
        </main>
      </div>
    </UnderWaterLayout>
  )
}
