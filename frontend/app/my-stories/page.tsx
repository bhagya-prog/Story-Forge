"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, BookOpen, Star, Eye, Users, Edit, Trash2 } from "lucide-react"
import { NewStoryWizard } from "@/components/new-story-wizard"

export default function MyStoriesPage() {
  const [showNewStoryWizard, setShowNewStoryWizard] = useState(false)
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("/api/stories") // Adjust path if needed
        const data = await res.json()
        setStories(data)
      } catch (err) {
        console.error("Failed to fetch stories", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  const handleDeleteStory = async (storyId: string) => {
    if (confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
      try {
        await fetch(`/api/stories/${storyId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer YOUR_TOKEN_HERE` }, // Add auth
        })
        setStories((prev) => prev.filter((story) => story._id !== storyId))
      } catch (err) {
        console.error("Delete failed", err)
      }
    }
  }

  const handleEditStory = (storyId: string) => {
    window.location.href = `/story/edit/${storyId}`
  }

  const publishedStories = stories.filter((s) => s.status === "published")
  const draftStories = stories.filter((s) => s.status === "draft")
  const inReviewStories = stories.filter((s) => s.status === "in-review")

  const totalStats = {
    stories: stories.length,
    published: publishedStories.length,
    drafts: draftStories.length,
    totalLikes: stories.reduce((sum, s) => sum + (s.likes || 0), 0),
    totalViews: stories.reduce((sum, s) => sum + (s.views || 0), 0),
    totalWords: stories.reduce((sum, s) => sum + (s.wordCount || 0), 0),
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
        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Stories</h1>
            <p className="text-gray-600">Manage and track your creative works</p>
          </div>
          <Button onClick={() => setShowNewStoryWizard(true)} className="bg-electric-blue hover:bg-electric-blue/90">
            <Plus className="h-4 w-4 mr-2" />
            New Story
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: "Total Stories", value: totalStats.stories, color: "text-electric-blue" },
              { label: "Published", value: totalStats.published, color: "text-green-600" },
              { label: "Drafts", value: totalStats.drafts, color: "text-yellow-600" },
              { label: "Total Likes", value: totalStats.totalLikes, color: "text-red-500" },
              { label: "Total Views", value: totalStats.totalViews, color: "text-blue-500" },
              { label: "Words Written", value: totalStats.totalWords, color: "text-purple-500" },
            ].map((stat, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-4 w-full mb-6">
              <TabsTrigger value="all">All ({stories.length})</TabsTrigger>
              <TabsTrigger value="published">Published ({publishedStories.length})</TabsTrigger>
              <TabsTrigger value="drafts">Drafts ({draftStories.length})</TabsTrigger>
              <TabsTrigger value="review">In Review ({inReviewStories.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">{renderStoryGrid(stories, handleEditStory, handleDeleteStory)}</TabsContent>
            <TabsContent value="published">{renderStoryGrid(publishedStories, handleEditStory, handleDeleteStory)}</TabsContent>
            <TabsContent value="drafts">{renderStoryGrid(draftStories, handleEditStory, handleDeleteStory)}</TabsContent>
            <TabsContent value="review">{renderStoryGrid(inReviewStories, handleEditStory, handleDeleteStory)}</TabsContent>
          </Tabs>
        </div>
      </section>

      {showNewStoryWizard && <NewStoryWizard onClose={() => setShowNewStoryWizard(false)} />}

      <Footer />
    </div>
  )
}

function renderStoryGrid(stories, onEdit, onDelete) {
  return (
    <div className="grid gap-6">
      {stories.map((story) => (
        <MyStoryCard key={story._id} story={story} onEdit={() => onEdit(story._id)} onDelete={() => onDelete(story._id)} />
      ))}
    </div>
  )
}

function MyStoryCard({ story, onDelete, onEdit }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800"
      case "draft": return "bg-yellow-100 text-yellow-800"
      case "in-review": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "published": return <BookOpen className="h-4 w-4" />
      case "draft": return <Edit className="h-4 w-4" />
      case "in-review": return <Eye className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
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

            <h3 className="text-xl font-bold mb-2 hover:text-electric-blue cursor-pointer">{story.title}</h3>
            <p className="text-gray-600 mb-4">{story.excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {story.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <div className="flex space-x-4">
                <span>{story.wordCount?.toLocaleString() || 0} words</span>
                <span>•</span>
                <span>Updated {new Date(story.lastUpdated).toLocaleDateString()}</span>
              </div>
              {story.status === "published" && (
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" /><span>{story.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" /><span>{story.views}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 ml-4">
            <Button variant="outline" size="sm" onClick={onEdit}><Edit className="h-4 w-4 mr-2" />Edit</Button>
            <Button variant="outline" size="sm" onClick={onDelete} className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
