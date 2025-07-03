"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StoryCard } from "@/components/story-card"
import { useStories } from "@/hooks/use-stories"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, TrendingUp, Clock, Star, SlidersHorizontal, X } from "lucide-react"

const genres = [
  "All",
  "Sci-Fi",
  "Fantasy",
  "Romance",
  "Thriller",
  "Mystery",
  "Dystopian",
  "Cyberpunk",
  "Climate Fiction",
  "Magical Realism",
  "Space Opera",
  "Contemporary",
]

const sortOptions = [
  { value: "trending", label: "Trending", icon: TrendingUp },
  { value: "recent", label: "Most Recent", icon: Clock },
  { value: "popular", label: "Most Popular", icon: Star },
  { value: "likes", label: "Most Liked", icon: Star },
  { value: "forks", label: "Most Forked", icon: TrendingUp },
]

const authors = [
  "All Authors",
  "Sarah Chen",
  "Marcus Rodriguez",
  "Elena Vasquez",
  "James Thornfield",
  "Luna Blackwood",
  "Dr. Amara Okafor",
  "Jin Watanabe",
  "Captain Zara Al-Rashid",
  "Isabella Santos",
  "Kenji Nakamura",
  "Dr. Maya Patel",
]

export default function ExplorePage() {
  const { stories, loading, searchStories } = useStories()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [selectedAuthor, setSelectedAuthor] = useState("All Authors")
  const [sortBy, setSortBy] = useState("trending")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Advanced filters
  const [minLikes, setMinLikes] = useState([0])
  const [minViews, setMinViews] = useState([0])
  const [collaborativeOnly, setCollaborativeOnly] = useState(false)
  const [recentOnly, setRecentOnly] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchStories(searchQuery)
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedGenre("All")
    setSelectedAuthor("All Authors")
    setSortBy("trending")
    setMinLikes([0])
    setMinViews([0])
    setCollaborativeOnly(false)
    setRecentOnly(false)
  }

  // Apply all filters
  let filteredStories = stories

  // Genre filter
  if (selectedGenre !== "All") {
    filteredStories = filteredStories.filter((story) =>
      story.tags.some(
        (tag) =>
          tag.toLowerCase().includes(selectedGenre.toLowerCase()) ||
          (selectedGenre === "Sci-Fi" &&
            (tag.includes("Sci-Fi") || tag.includes("Cyberpunk") || tag.includes("Space Opera"))) ||
          (selectedGenre === "Fantasy" && (tag.includes("Fantasy") || tag.includes("Magic"))) ||
          (selectedGenre === "Romance" && tag.includes("Romance")) ||
          (selectedGenre === "Thriller" && (tag.includes("Thriller") || tag.includes("Mystery"))) ||
          (selectedGenre === "Horror" && (tag.includes("Horror") || tag.includes("Dark"))),
      ),
    )
  }

  // Author filter
  if (selectedAuthor !== "All Authors") {
    filteredStories = filteredStories.filter((story) => story.authors.some((author) => author === selectedAuthor))
  }

  // Advanced filters
  if (minLikes[0] > 0) {
    filteredStories = filteredStories.filter((story) => story.likes >= minLikes[0])
  }

  if (minViews[0] > 0) {
    filteredStories = filteredStories.filter((story) => story.views >= minViews[0])
  }

  if (collaborativeOnly) {
    filteredStories = filteredStories.filter((story) => story.authors.length > 1)
  }

  if (recentOnly) {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    filteredStories = filteredStories.filter((story) => new Date(story.updatedAt) >= oneWeekAgo)
  }

  // Sort stories
  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return b.likes + b.forks - (a.likes + a.forks)
      case "recent":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      case "popular":
        return b.views - a.views
      case "likes":
        return b.likes - a.likes
      case "forks":
        return b.forks - a.forks
      default:
        return 0
    }
  })

  // Apply search filter
  const finalStories = searchQuery
    ? sortedStories.filter(
        (story) =>
          story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
          story.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : sortedStories

  const activeFiltersCount = [
    selectedGenre !== "All",
    selectedAuthor !== "All Authors",
    minLikes[0] > 0,
    minViews[0] > 0,
    collaborativeOnly,
    recentOnly,
    searchQuery.length > 0,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-electric-blue to-turquoise text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Stories</h1>
            <p className="text-xl mb-8 opacity-90">Discover amazing narratives from writers around the world</p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for stories, authors, or themes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-electric-blue hover:bg-gray-100"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            {/* Basic Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Genre Filter */}
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {genres.slice(0, 6).map((genre) => (
                    <Badge
                      key={genre}
                      variant={selectedGenre === genre ? "default" : "secondary"}
                      className={`cursor-pointer ${
                        selectedGenre === genre ? "bg-electric-blue hover:bg-electric-blue/90" : "hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                  {genres.length > 6 && (
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="More..." />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.slice(6).map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Sort and Advanced Filters */}
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <option.icon className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center space-x-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Advanced</span>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
              <Card className="mt-4">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Author Filter */}
                    <div>
                      <Label className="text-sm font-medium">Author</Label>
                      <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {authors.map((author) => (
                            <SelectItem key={author} value={author}>
                              {author}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Minimum Likes */}
                    <div>
                      <Label className="text-sm font-medium">Minimum Likes: {minLikes[0]}</Label>
                      <Slider value={minLikes} onValueChange={setMinLikes} max={2000} step={50} className="mt-2" />
                    </div>

                    {/* Minimum Views */}
                    <div>
                      <Label className="text-sm font-medium">Minimum Views: {minViews[0]}</Label>
                      <Slider value={minViews} onValueChange={setMinViews} max={10000} step={100} className="mt-2" />
                    </div>

                    {/* Special Filters */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Special Filters</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="collaborative"
                            checked={collaborativeOnly}
                            onCheckedChange={setCollaborativeOnly}
                          />
                          <Label htmlFor="collaborative" className="text-sm">
                            Collaborative stories only
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="recent" checked={recentOnly} onCheckedChange={setRecentOnly} />
                          <Label htmlFor="recent" className="text-sm">
                            Updated this week
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button variant="outline" onClick={clearAllFilters}>
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedGenre !== "All" && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <span>Genre: {selectedGenre}</span>
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedGenre("All")} />
                  </Badge>
                )}
                {selectedAuthor !== "All Authors" && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <span>Author: {selectedAuthor}</span>
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedAuthor("All Authors")} />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <span>Search: "{searchQuery}"</span>
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
                {collaborativeOnly && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <span>Collaborative Only</span>
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setCollaborativeOnly(false)} />
                  </Badge>
                )}
                {recentOnly && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <span>Recent Only</span>
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setRecentOnly(false)} />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Info */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              {finalStories.length} {finalStories.length === 1 ? "story" : "stories"} found
              {selectedGenre !== "All" && ` in ${selectedGenre}`}
              {selectedAuthor !== "All Authors" && ` by ${selectedAuthor}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>

            {activeFiltersCount > 0 && (
              <Button variant="ghost" onClick={clearAllFilters} className="text-sm">
                Clear all filters
              </Button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading amazing stories...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {finalStories.map((story) => (
                <div key={story.id} className="story-card">
                  <StoryCard {...story} />
                </div>
              ))}
            </div>
          )}

          {!loading && finalStories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories found</h3>
              <p className="text-gray-500 mb-4">
                {activeFiltersCount > 0
                  ? "Try adjusting your filters to see more results"
                  : "Be the first to create a story in this genre!"}
              </p>
              <Button className="bg-electric-blue hover:bg-electric-blue/90" onClick={clearAllFilters}>
                {activeFiltersCount > 0 ? "Clear Filters" : "Start Writing"}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
