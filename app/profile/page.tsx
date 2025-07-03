"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StoryCard } from "@/components/story-card"
import { useStories } from "@/hooks/use-stories"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Calendar,
  Star,
  GitBranch,
  MessageCircle,
  Edit,
  Camera,
  Save,
  X,
  Globe,
  Twitter,
  Github,
} from "lucide-react"

export default function ProfilePage() {
  const { stories } = useStories()
  const [isEditing, setIsEditing] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)

  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    username: "@johndoe",
    bio: "Passionate storyteller exploring the boundaries between reality and imagination. Love collaborative writing and sci-fi adventures.",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    website: "johndoe.com",
    twitter: "johndoe",
    github: "johndoe",
    followers: 1247,
    following: 892,
    totalStories: 15,
    totalLikes: 3420,
    totalForks: 156,
    avatar: "/placeholder.svg?height=96&width=96",
    coverImage: "/placeholder.svg?height=200&width=800",
  })

  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    bio: userProfile.bio,
    location: userProfile.location,
    website: userProfile.website,
    twitter: userProfile.twitter,
    github: userProfile.github,
  })

  const handleSaveProfile = () => {
    setUserProfile((prev) => ({
      ...prev,
      ...editForm,
    }))
    setIsEditing(false)
  }

  const handleImageUpload = (type: "avatar" | "cover") => {
    // In a real app, this would handle file upload
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setUserProfile((prev) => ({
            ...prev,
            [type === "avatar" ? "avatar" : "coverImage"]: result,
          }))
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Cover Image */}
      <section className="relative h-48 bg-gradient-to-r from-electric-blue to-turquoise">
        <img src={userProfile.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4"
          onClick={() => handleImageUpload("cover")}
        >
          <Camera className="h-4 w-4 mr-2" />
          Change Cover
        </Button>
      </section>

      {/* Profile Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                  <AvatarFallback className="text-2xl bg-electric-blue text-white">
                    {userProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  onClick={() => handleImageUpload("avatar")}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 mt-4">
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{userProfile.name}</h1>
                  <Badge variant="secondary">{userProfile.username}</Badge>
                </div>

                <p className="text-gray-600 mb-4 max-w-2xl">{userProfile.bio}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {userProfile.joinDate}</span>
                  </div>
                  {userProfile.website && (
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <a href={`https://${userProfile.website}`} className="text-electric-blue hover:underline">
                        {userProfile.website}
                      </a>
                    </div>
                  )}
                  {userProfile.twitter && (
                    <div className="flex items-center space-x-1">
                      <Twitter className="h-4 w-4" />
                      <a
                        href={`https://twitter.com/${userProfile.twitter}`}
                        className="text-electric-blue hover:underline"
                      >
                        @{userProfile.twitter}
                      </a>
                    </div>
                  )}
                  {userProfile.github && (
                    <div className="flex items-center space-x-1">
                      <Github className="h-4 w-4" />
                      <a
                        href={`https://github.com/${userProfile.github}`}
                        className="text-electric-blue hover:underline"
                      >
                        {userProfile.github}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button className="bg-electric-blue hover:bg-electric-blue/90" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userProfile.followers}</p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userProfile.following}</p>
                <p className="text-sm text-gray-500">Following</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userProfile.totalStories}</p>
                <p className="text-sm text-gray-500">Stories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userProfile.totalLikes}</p>
                <p className="text-sm text-gray-500">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userProfile.totalForks}</p>
                <p className="text-sm text-gray-500">Forks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="stories" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stories">Stories</TabsTrigger>
              <TabsTrigger value="forks">Forks</TabsTrigger>
              <TabsTrigger value="likes">Liked</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="stories" className="mt-8 space-y-6">
              {stories.slice(0, 5).map((story) => (
                <StoryCard key={story.id} {...story} />
              ))}
            </TabsContent>

            <TabsContent value="forks" className="mt-8 space-y-6">
              {stories.slice(2, 4).map((story) => (
                <div key={story.id} className="relative">
                  <Badge className="absolute top-4 right-4 z-10 bg-seafoam-green">
                    <GitBranch className="h-3 w-3 mr-1" />
                    Fork
                  </Badge>
                  <StoryCard {...story} />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="likes" className="mt-8 space-y-6">
              {stories.slice(1, 3).map((story) => (
                <div key={story.id} className="relative">
                  <Badge className="absolute top-4 right-4 z-10 bg-red-500">
                    <Star className="h-3 w-3 mr-1" />
                    Liked
                  </Badge>
                  <StoryCard {...story} />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="activity" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                      <p className="text-sm">
                        <span className="font-medium">Forked</span> "The Last Library" by Sarah Chen
                      </p>
                      <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-sm">
                        <span className="font-medium">Published</span> "Digital Dreams" in Sci-Fi
                      </p>
                      <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <p className="text-sm">
                        <span className="font-medium">Earned badge</span> "Collaborator" for co-authoring 5 stories
                      </p>
                      <span className="text-xs text-gray-500 ml-auto">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editForm.location}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editForm.bio}
                onChange={(e) => setEditForm((prev) => ({ ...prev, bio: e.target.value }))}
                className="mt-2"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={editForm.website}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, website: e.target.value }))}
                  className="mt-2"
                  placeholder="yoursite.com"
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={editForm.twitter}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, twitter: e.target.value }))}
                  className="mt-2"
                  placeholder="username"
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={editForm.github}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, github: e.target.value }))}
                  className="mt-2"
                  placeholder="username"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} className="bg-electric-blue hover:bg-electric-blue/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
