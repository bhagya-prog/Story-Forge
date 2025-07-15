"use client"

import { StoryCard } from "./story-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStories } from "@/hooks/use-stories"

export function PersonalizedFeed() {
  const { stories, loading } = useStories()

  // Better categorization of stories
  const featuredStories = stories.filter((story) => story.likes > 1000 || story.forks > 50).slice(0, 4)

  const trendingStories = stories
    .filter((story) => story.tags.some((tag) => ["Sci-Fi", "Cyberpunk", "Climate Fiction", "AI"].includes(tag)))
    .slice(0, 3)

  const spotlightStories = stories
    .filter(
      (story) => story.authors.length > 1, // Collaborative stories
    )
    .slice(0, 3)

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading amazing stories...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Discover Your Next Adventure</h2>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="featured"
              className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
            >
              Featured Stories
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
            >
              Trending Now
            </TabsTrigger>
            <TabsTrigger
              value="spotlight"
              className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
            >
              Collaborative Works
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            {featuredStories.length > 0 ? (
              featuredStories.map((story) => <StoryCard key={story.id} {...story} />)
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading featured stories...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            {trendingStories.length > 0 ? (
              trendingStories.map((story) => <StoryCard key={story.id} {...story} />)
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading trending stories...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="spotlight" className="space-y-6">
            {spotlightStories.length > 0 ? (
              spotlightStories.map((story) => <StoryCard key={story.id} {...story} />)
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading collaborative stories...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
