"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Bookmark, GitBranch, Eye, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useStories } from "@/hooks/use-stories"
import { useRouter } from "next/navigation"

interface StoryCardProps {
  id: string
  title: string
  authors: string[]
  description: string
  tags: string[]
  likes: number
  forks: number
  views: number
  comments: number
  coverImage?: string
}

export function StoryCard({
  id,
  title,
  authors,
  description,
  tags,
  likes,
  forks,
  views,
  comments,
  coverImage,
}: StoryCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isForkDialogOpen, setIsForkDialogOpen] = useState(false)
  const [forkName, setForkName] = useState("")
  const [isPrivateFork, setIsPrivateFork] = useState(false)

  const { likeStory, forkStory } = useStories()
  const router = useRouter()

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await likeStory(id)
    setIsLiked(!isLiked)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
    // In a real app, you'd save this to the backend
  }

  const handleFork = async () => {
    if (forkName.trim()) {
      await forkStory(id, forkName.trim(), isPrivateFork)
      setForkName("")
      setIsPrivateFork(false)
      setIsForkDialogOpen(false)
    }
  }

  const handleCardClick = () => {
    // Navigate to story page
    const authorSlug = authors[0].toLowerCase().replace(/\s+/g, "-")
    const titleSlug = title.toLowerCase().replace(/\s+/g, "-")
    router.push(`/story/${authorSlug}/${titleSlug}`)
  }

  return (
    <Card className="story-card hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-electric-blue cursor-pointer">
      <CardHeader className="pb-3" onClick={handleCardClick}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-electric-blue">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">by {authors.join(", ")}</p>
          </div>
          {coverImage && (
            <div className="w-16 h-16 bg-gray-200 rounded-lg ml-4 flex-shrink-0">
              <img
                src={coverImage || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3" onClick={handleCardClick}>
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4" onClick={handleCardClick}>
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-turquoise/10 text-turquoise hover:bg-turquoise/20">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitBranch className="h-4 w-4" />
              <span>{forks}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{comments}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className={`${isLiked ? "text-red-500" : "text-gray-500"} hover:text-electric-blue`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${isBookmarked ? "text-electric-blue" : "text-gray-500"} hover:text-electric-blue`}
              onClick={handleBookmark}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>

            <Dialog open={isForkDialogOpen} onOpenChange={setIsForkDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-electric-blue"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GitBranch className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                  <DialogTitle>Fork "{title}"</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="forkName">Fork Name</Label>
                    <Input
                      id="forkName"
                      value={forkName}
                      onChange={(e) => setForkName(e.target.value)}
                      placeholder="Enter a name for your fork"
                      className="mt-2"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="privateFork"
                      checked={isPrivateFork}
                      onCheckedChange={(checked) => setIsPrivateFork(checked as boolean)}
                    />
                    <Label htmlFor="privateFork">Make this fork private</Label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsForkDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleFork} className="bg-electric-blue hover:bg-electric-blue/90">
                      Create Fork
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
