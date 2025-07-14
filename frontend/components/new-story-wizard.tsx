"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, Upload, ArrowLeft, ArrowRight } from "lucide-react"
import { useStories } from "@/hooks/use-stories"

const steps = ["Title & Summary", "Genre & Tags", "Cover & Settings", "Collaboration", "Publish"]

const genres = [
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Thriller",
  "Horror",
  "Literary Fiction",
  "Young Adult",
  "Historical Fiction",
  "Dystopian",
  "Urban Fantasy",
  "Cyberpunk",
  "Steampunk",
]

interface NewStoryWizardProps {
  onClose: () => void
}

export function NewStoryWizard({ onClose }: NewStoryWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "Fantasy",
    tags: [] as string[],
    language: "en",
    license: "MIT",
    isPublic: true,
    allowCollaboration: true,
    coverImage: null as File | null,
  })
  const [newTag, setNewTag] = useState("")
  const { createStory } = useStories()

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCreateStory = async () => {
    try {
      // Check if user is authenticated first
      const token = localStorage.getItem('auth_token');
      if (!token) {
        alert('Please log in to create a story');
        return;
      }

      const storyData = {
        title: formData.title,
        summary: formData.description, // Backend expects 'summary' not 'description'
        content: formData.description, // Also include content field
        genre: formData.genre || 'General', // Provide default if empty
        tags: formData.tags,
        language: formData.language,
        license: formData.license,
        isPublic: formData.isPublic,
        allowCollaboration: formData.allowCollaboration,
        coverImage: formData.coverImage ? 'uploaded-cover.jpg' : undefined, // Handle file upload separately
      }

      console.log('Creating story with data:', storyData);
      
      const newStory = await createStory(storyData)
      if (newStory) {
        console.log('Story created successfully:', newStory);
        onClose()
        // In a real app, navigate to the new story
      }
    } catch (error) {
      console.error('Failed to create story:', error);
      alert('Failed to create story. Please try again.');
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Story Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter your story title..."
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="description">Story Summary</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your story in a few sentences..."
                className="mt-2 min-h-32"
              />
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="genre">Primary Genre</Label>
              <Select
                value={formData.genre}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, genre: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tags</Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} variant="outline" type="button">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                    <span>{tag}</span>
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>Cover Image (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="license">License</Label>
                <Select
                  value={formData.license}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, license: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MIT">MIT</SelectItem>
                    <SelectItem value="CC-BY">Creative Commons Attribution (CC BY)</SelectItem>
                    <SelectItem value="CC-BY-SA">Creative Commons Attribution-ShareAlike (CC BY-SA)</SelectItem>
                    <SelectItem value="CC-BY-NC">Creative Commons Attribution-NonCommercial (CC BY-NC)</SelectItem>
                    <SelectItem value="CC0">Creative Commons Zero (CC0/Public Domain)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="public"
                checked={formData.isPublic}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPublic: checked as boolean }))}
              />
              <Label htmlFor="public">Make this story public</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="collaboration"
                checked={formData.allowCollaboration}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, allowCollaboration: checked as boolean }))
                }
              />
              <Label htmlFor="collaboration">Allow others to collaborate</Label>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Collaboration Settings</h4>
              <p className="text-sm text-blue-700">
                When enabled, other users can fork your story, suggest edits, and request to become co-authors. You'll
                always have final approval over changes to the main branch.
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Ready to Create Your Story!</h3>
              <p className="text-gray-600 mb-6">
                Your story "{formData.title}" is ready to be published. You can start writing immediately or invite
                collaborators to join you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-electric-blue hover:bg-electric-blue/90" onClick={handleCreateStory}>
                Start Writing
              </Button>
              <Button variant="outline" onClick={handleCreateStory}>
                Invite Co-author
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Create New Story</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-2 mt-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep ? "bg-electric-blue text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${index < currentStep ? "bg-electric-blue" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </p>
        </CardHeader>

        <CardContent>
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={nextStep}
                className="bg-electric-blue hover:bg-electric-blue/90"
                disabled={currentStep === 0 && (!formData.title || !formData.description)}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
