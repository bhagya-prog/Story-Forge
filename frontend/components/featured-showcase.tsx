"use client"

import { StoryCard } from "./story-card"
import { useStories } from "@/hooks/use-stories"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Star, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export function FeaturedShowcase() {
  const { stories, loading } = useStories()
  const router = useRouter()

  // Get top stories for showcase
  const topStories = stories
    .sort((a, b) => b.likes + b.forks + b.views / 10 - (a.likes + a.forks + a.views / 10))
    .slice(0, 3)

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading featured stories...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stories That Captivate</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most loved, forked, and talked-about stories from our community of writers
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-gradient-to-br from-electric-blue/5 to-electric-blue/10 rounded-lg">
            <TrendingUp className="h-8 w-8 text-electric-blue mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">
              {stories.reduce((sum, story) => sum + story.views, 0).toLocaleString()}
            </h3>
            <p className="text-gray-600">Total Reads</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-turquoise/5 to-turquoise/10 rounded-lg">
            <Star className="h-8 w-8 text-turquoise mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">
              {stories.reduce((sum, story) => sum + story.likes, 0).toLocaleString()}
            </h3>
            <p className="text-gray-600">Hearts Given</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-seafoam-green/5 to-seafoam-green/10 rounded-lg">
            <Users className="h-8 w-8 text-seafoam-green mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-900">
              {stories.reduce((sum, story) => sum + story.forks, 0).toLocaleString()}
            </h3>
            <p className="text-gray-600">Story Forks</p>
          </div>
        </div>

        {/* Featured Stories */}
        <div className="space-y-6 mb-8">
          {topStories.map((story, index) => (
            <div key={story.id} className="relative">
              {index === 0 && (
                <div className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  🏆 Most Popular
                </div>
              )}
              <StoryCard {...story} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-electric-blue hover:bg-electric-blue/90 text-white px-8 py-3"
            onClick={() => router.push("/explore")}
          >
            Explore All Stories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
