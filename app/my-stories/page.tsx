"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useStories } from "@/hooks/use-stories"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, BookOpen, Star, Eye, Users, Edit, Trash2 } from "lucide-react"
import { NewStoryWizard } from "@/components/new-story-wizard"

export default function MyStoriesPage() {
  const [showNewStoryWizard, setShowNewStoryWizard] = useState(false)
  const { stories: fetchedStories, loading } = useStories()
  const [userStories, setUserStories] = useState(
    fetchedStories.filter((story) => Array.isArray(story.authors) && story.authors.includes("You"))
  )

  // Mock data for user's stories with different statuses
  const myStories = [
    {
      id: "1",
      title: "The Digital Awakening",
      excerpt: "In a world where consciousness can be uploaded, Maya discovers the truth about digital souls...",
      genre: "Sci-Fi",
      tags: ["technology", "consciousness", "future"],
      status: "published",
      likes: 234,
      views: 1205,
      comments: 18,
      collaborators: 0,
      lastUpdated: "2025-01-15",
      wordCount: 12500,
    },
    {
      id: "2",
      title: "Whispers in the Ancient Forest",
      excerpt: "A young botanist discovers that the old growth forest holds secrets that could change everything...",
      genre: "Fantasy",
      tags: ["nature", "magic", "discovery"],
      status: "draft",
      likes: 0,
      views: 0,
      comments: 0,
      collaborators: 2,
      lastUpdated: "2025-01-20",
      wordCount: 3200,
    },
    {
      id: "3",
      title: "The Last Bookbinder",
      excerpt: "In a digital age, Elena preserves the ancient art of bookbinding and discovers its hidden power...",
      genre: "Literary Fiction",
      tags: ["books", "tradition", "craft"],
      status: "in-review",
      likes: 45,
      views: 156,
      comments: 7,
      collaborators: 1,
      lastUpdated: "2025-01-18",
      wordCount: 8900,
    },
    {
      id: "4",
      title: "Quantum Hearts",
      excerpt: "A love story that transcends dimensions, where two souls find each other across infinite realities...",
      genre: "Romance",
      tags: ["love", "quantum", "multiverse"],
      status: "published",
      likes: 567,
      views: 2340,
      comments: 43,
      collaborators: 0,
      lastUpdated: "2025-01-10",
      wordCount: 15600,
    },
    {
      id: "5",
      title: "Untitled Space Opera",
      excerpt: "A new story waiting to be written...",
      genre: "Sci-Fi",
      tags: ["space", "adventure"],
      status: "draft",
      likes: 0,
      views: 0,
      comments: 0,
      collaborators: 0,
      lastUpdated: "2025-01-21",
      wordCount: 0,
    },
  ]

  const [stories, setStories] = useState(myStories)

  const handleDeleteStory = (storyId: string) => {
    if (confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
      setStories(stories.filter((story) => story.id !== storyId))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "in-review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <BookOpen className="h-4 w-4" />
      case "draft":
        return <Edit className="h-4 w-4" />
      case "in-review":
        return <Eye className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const publishedStories = stories.filter((story) => story.status === "published")
  const draftStories = stories.filter((story) => story.status === "draft")
  const inReviewStories = stories.filter((story) => story.status === "in-review")

  const totalStats = {
    stories: stories.length,
    published: publishedStories.length,
    drafts: draftStories.length,
    totalLikes: stories.reduce((sum, story) => sum + story.likes, 0),
    totalViews: stories.reduce((sum, story) => sum + story.views, 0),
    totalWords: stories.reduce((sum, story) => sum + story.wordCount, 0),
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Stories</h1>
              <p className="text-gray-600 mt-2">Manage and track your creative works</p>
            </div>
            <Button onClick={() => setShowNewStoryWizard(true)} className="bg-electric-blue hover:bg-electric-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              New Story
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-electric-blue">{totalStats.stories}</div>
                <div className="text-sm text-gray-600">Total Stories</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{totalStats.published}</div>
                <div className="text-sm text-gray-600">Published</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{totalStats.drafts}</div>
                <div className="text-sm text-gray-600">Drafts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-500">{totalStats.totalLikes}</div>
                <div className="text-sm text-gray-600">Total Likes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{totalStats.totalViews.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">{totalStats.totalWords.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Words Written</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Stories ({stories.length})</TabsTrigger>
              <TabsTrigger value="published">Published ({publishedStories.length})</TabsTrigger>
              <TabsTrigger value="drafts">Drafts ({draftStories.length})</TabsTrigger>
              <TabsTrigger value="review">In Review ({inReviewStories.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6">
                {stories.map((story) => (
                  <MyStoryCard key={story.id} story={story} onDelete={() => handleDeleteStory(story.id)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="published" className="mt-6">
              <div className="grid gap-6">
                {publishedStories.map((story) => (
                  <MyStoryCard key={story.id} story={story} onDelete={() => handleDeleteStory(story.id)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="drafts" className="mt-6">
              <div className="grid gap-6">
                {draftStories.map((story) => (
                  <MyStoryCard key={story.id} story={story} onDelete={() => handleDeleteStory(story.id)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="review" className="mt-6">
              <div className="grid gap-6">
                {inReviewStories.map((story) => (
                  <MyStoryCard key={story.id} story={story} onDelete={() => handleDeleteStory(story.id)} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {showNewStoryWizard && <NewStoryWizard onClose={() => setShowNewStoryWizard(false)} />}

      <Footer />
    </div>
  )
}

interface MyStoryCardProps {
  story: any
  onDelete: () => void
}

function MyStoryCard({ story, onDelete }: MyStoryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "in-review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <BookOpen className="h-4 w-4" />
      case "draft":
        return <Edit className="h-4 w-4" />
      case "in-review":
        return <Eye className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <Badge className={getStatusColor(story.status)}>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(story.status)}
                  <span className="capitalize">{story.status.replace("-", " ")}</span>
                </div>
              </Badge>
              <Badge variant="outline">{story.genre}</Badge>
              {story.collaborators > 0 && (
                <Badge variant="outline" className="text-electric-blue">
                  <Users className="h-3 w-3 mr-1" />
                  {story.collaborators} collaborator{story.collaborators > 1 ? "s" : ""}
                </Badge>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-electric-blue cursor-pointer">
              {story.title}
            </h3>
            <p className="text-gray-600 mb-4">{story.excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {story.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>{story.wordCount.toLocaleString()} words</span>
                <span>•</span>
                <span>Updated {new Date(story.lastUpdated).toLocaleDateString()}</span>
              </div>

              {story.status === "published" && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>{story.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{story.views}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
