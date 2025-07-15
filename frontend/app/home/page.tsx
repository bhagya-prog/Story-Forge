"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedShowcase } from "@/components/featured-showcase"
import { PersonalizedFeed } from "@/components/personalized-feed"
import { StoryRepository } from "@/components/story-repository"
import { Footer } from "@/components/footer"
import { NotificationSystem } from "@/components/notification-system"
import { ConnectionStatus } from "@/components/connection-status"
import { AppProvider } from "@/contexts/app-context"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("user_authenticated")
    setIsAuthenticated(authStatus === "true")

    if (authStatus !== "true") {
      router.push("/")
    }
  }, [router])

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-electric-blue/5 via-white to-turquoise/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to landing page
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Navigation />
        
        {/* Development: Connection Status */}
        <div className="fixed bottom-4 right-4 z-50">
          <ConnectionStatus />
        </div>
        
        <main>
          <HeroSection />
          <FeaturedShowcase />
          <PersonalizedFeed />
          <StoryRepository />
        </main>
        <Footer />
        <NotificationSystem />
      </div>
    </AppProvider>
  )
}
