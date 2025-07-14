"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogPostReader } from "@/components/blog-post-reader"
import { Heart, MessageCircle, Clock, Search, Plus, Edit, Trash2 } from "lucide-react"
import type { BlogPost } from "@/app/api/blog/route"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [userPosts, setUserPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isReaderOpen, setIsReaderOpen] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchQuery, selectedCategory])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/blog")
      const data = await response.json()
      setPosts(data.posts)

      // Filter user posts (in real app, this would be based on actual user ID)
      const currentUserPosts = data.posts.filter(
        (post: BlogPost) => post.author === "You" || post.author === "Current User",
      )
      setUserPosts(currentUserPosts)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
  }

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post)
    setIsReaderOpen(true)
  }

  const handleDeletePost = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId))
      setUserPosts(userPosts.filter((post) => post.id !== postId))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const categories = [
    { id: "all", label: "All Posts", count: posts.length },
    { id: "writing-tips", label: "Writing Tips", count: posts.filter((p) => p.category === "writing-tips").length },
    { id: "book-review", label: "Book Reviews", count: posts.filter((p) => p.category === "book-review").length },
    { id: "reading", label: "Reading", count: posts.filter((p) => p.category === "reading").length },
    { id: "learning", label: "Learning", count: posts.filter((p) => p.category === "learning").length },
    { id: "inspiration", label: "Inspiration", count: posts.filter((p) => p.category === "inspiration").length },
  ]

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
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              The <span className="text-electric-blue">StoryForge</span> Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover insights, tips, and inspiration from our community of writers and readers
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-electric-blue hover:bg-electric-blue/90">
              <Plus className="h-4 w-4 mr-2" />
              Write Post
            </Button>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="your-blog">Your Blog</TabsTrigger>
              <TabsTrigger value="writing-tips">Writing Tips</TabsTrigger>
              <TabsTrigger value="book-review">Reviews</TabsTrigger>
              <TabsTrigger value="reading">Reading</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="inspiration">Inspiration</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid gap-6">
                {filteredPosts.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    onReadMore={() => handleReadMore(post)}
                    onDelete={null}
                    showActions={false}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="your-blog" className="mt-8">
              <div className="grid gap-6">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      onReadMore={() => handleReadMore(post)}
                      onDelete={() => handleDeletePost(post.id)}
                      showActions={true}
                    />
                  ))
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h3>
                      <p className="text-gray-500 mb-6">Start sharing your thoughts and experiences</p>
                      <Button className="bg-electric-blue hover:bg-electric-blue/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Write Your First Post
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {categories.slice(2).map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-8">
                <div className="grid gap-6">
                  {filteredPosts
                    .filter((post) => post.category === category.id)
                    .map((post) => (
                      <BlogPostCard
                        key={post.id}
                        post={post}
                        onReadMore={() => handleReadMore(post)}
                        onDelete={null}
                        showActions={false}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {selectedPost && (
        <BlogPostReader post={selectedPost} isOpen={isReaderOpen} onClose={() => setIsReaderOpen(false)} />
      )}

      <Footer />
    </div>
  )
}

interface BlogPostCardProps {
  post: BlogPost
  onReadMore: () => void
  onDelete: (() => void) | null
  showActions: boolean
}

function BlogPostCard({ post, onReadMore, onDelete, showActions }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <Badge
                className={`${
                  post.category === "learning"
                    ? "bg-blue-100 text-blue-800"
                    : post.category === "reading"
                      ? "bg-green-100 text-green-800"
                      : post.category === "writing-tips"
                        ? "bg-purple-100 text-purple-800"
                        : post.category === "book-review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-pink-100 text-pink-800"
                }`}
              >
                {post.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </Badge>
              {showActions && (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-electric-blue">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {onDelete && (
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500" onClick={onDelete}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            <h2
              className="text-xl font-bold text-gray-900 mb-2 hover:text-electric-blue cursor-pointer"
              onClick={onReadMore}
            >
              {post.title}
            </h2>

            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {post.authorAvatar}
                </div>
                <span>{post.author}</span>
              </div>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={onReadMore}>
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
