"use client"

import { useState } from "react"
import { useFaces } from "@/hooks/use-faces"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function FaceDatabaseViewer() {
  const { faces, loading, addFace } = useFaces()
  const [searchQuery, setSearchQuery] = useState("")
  const [newFaceName, setNewFaceName] = useState("")
  const [newFaceImage, setNewFaceImage] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredFaces = faces.filter((face) => face.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddFace = async () => {
    if (newFaceName.trim()) {
      await addFace(newFaceName.trim(), newFaceImage.trim() || undefined)
      setNewFaceName("")
      setNewFaceImage("")
      setIsAddDialogOpen(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Face Database</span>
            <Badge variant="secondary">{faces.length} faces</Badge>
          </CardTitle>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-electric-blue hover:bg-electric-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Face
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Face</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="faceName">Name</Label>
                  <Input
                    id="faceName"
                    value={newFaceName}
                    onChange={(e) => setNewFaceName(e.target.value)}
                    placeholder="Enter person's name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="faceImage">Image URL (optional)</Label>
                  <Input
                    id="faceImage"
                    value={newFaceImage}
                    onChange={(e) => setNewFaceImage(e.target.value)}
                    placeholder="Enter image URL"
                    className="mt-2"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddFace} className="bg-electric-blue hover:bg-electric-blue/90">
                    Add Face
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search faces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-blue mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading faces...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFaces.map((face, index) => (
              <div key={index} className="text-center p-3 border rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={face.imageUrl || "/placeholder.svg"}
                    alt={face.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=64&width=64"
                    }}
                  />
                </div>
                <p className="text-sm font-medium text-gray-900">{face.name}</p>
                <p className="text-xs text-gray-500">{face.dateAdded}</p>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredFaces.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchQuery ? "No faces found matching your search." : "No faces in database yet."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
