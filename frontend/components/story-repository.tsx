"use client"

import { useState } from "react"
import {
  GitBranch,
  History,
  Users,
  MessageSquare,
  Eye,
  Edit3,
  Share2,
  Copy,
  ChevronDown,
  ChevronRight,
  Star,
  Heart,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StoryRepository() {
  const [selectedBranch, setSelectedBranch] = useState("main")
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["chapter-1"])

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => (prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                <span>sarah-chen</span>
                <span>/</span>
                <span className="text-electric-blue font-medium">the-last-library</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">The Last Library</h1>
              <p className="text-gray-600 mt-2">
                In a world where books are forbidden, a secret underground library holds the key to humanity's forgotten
                past.
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">1,247</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GitBranch className="h-4 w-4 text-electric-blue" />
                  <span className="text-sm">89 forks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">5,432 views</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <GitBranch className="h-4 w-4 mr-2" />
                Fork
              </Button>
              <Button variant="outline" size="sm">
                <Edit3 className="h-4 w-4 mr-2" />
                Suggest Edit
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Clone
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Branch Selector */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Branch</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">
                      <div className="flex items-center space-x-2">
                        <GitBranch className="h-4 w-4" />
                        <span>main</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="alternate-ending">
                      <div className="flex items-center space-x-2">
                        <GitBranch className="h-4 w-4" />
                        <span>alternate-ending</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="prequel-branch">
                      <div className="flex items-center space-x-2">
                        <GitBranch className="h-4 w-4" />
                        <span>prequel-branch</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Story Tree */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Story Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    onClick={() => toggleNode("chapter-1")}
                  >
                    {expandedNodes.includes("chapter-1") ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <span className="text-sm">Chapter 1: Discovery</span>
                  </div>
                  {expandedNodes.includes("chapter-1") && (
                    <div className="ml-6 space-y-1">
                      <div className="text-sm text-gray-600 hover:text-electric-blue cursor-pointer">
                        Scene 1: The Forbidden Zone
                      </div>
                      <div className="text-sm text-gray-600 hover:text-electric-blue cursor-pointer">
                        Scene 2: First Contact
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-sm">Chapter 2: The Underground</span>
                  </div>

                  <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-sm">Chapter 3: Revelations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Notes */}
            <Card className="border-l-4 border-l-seafoam-green">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Author Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  <strong>Tone:</strong> Dark but hopeful dystopian fiction
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Vision:</strong> Exploring themes of knowledge preservation and resistance
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Collaboration Rules:</strong> Major plot changes require discussion. Character consistency is
                  key.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="read" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
                <TabsTrigger value="versions">Versions</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>

              <TabsContent value="read" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Chapter 1: Discovery</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">Latest Draft</Badge>
                        <span className="text-sm text-gray-500">Last updated 2 hours ago</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The morning alarm pierced through Aria's dreams like a shard of broken glass. She jolted awake in
                      her narrow bunk, heart racing from the nightmare that had become all too familiar—books burning in
                      great pyres while crowds cheered. The same dream that had haunted her since the Great Purge began
                      five years ago.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Outside her window, the gray towers of New Eden stretched endlessly toward a colorless sky. The
                      city that had once been called the "Athens of the West" now stood as a monument to enforced
                      ignorance. Where libraries once stood, surveillance towers now watched. Where bookshops had
                      thrived, propaganda centers now indoctrinated.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Aria dressed quickly in her regulation gray uniform, the fabric rough against her skin. As a
                      Level-3 Information Processor, her job was to scan digital feeds for any remaining traces of
                      forbidden knowledge—books, poems, stories that had somehow escaped the digital purge. When she
                      found them, she was supposed to report them immediately.
                    </p>
                    <p className="text-gray-700 leading-relaxed">She had never reported a single one.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="collaborate" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Edit3 className="h-5 w-5" />
                          <span>Live Editor</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 p-4 rounded-lg min-h-96">
                          <p className="text-gray-500 text-center mt-20">
                            Collaborative editor would be integrated here
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Users className="h-5 w-5" />
                          <span>Co-authors</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-white text-sm">
                              SC
                            </div>
                            <div>
                              <p className="text-sm font-medium">Sarah Chen</p>
                              <p className="text-xs text-gray-500">Owner • Online</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-seafoam-green rounded-full flex items-center justify-center text-white text-sm">
                              MR
                            </div>
                            <div>
                              <p className="text-sm font-medium">Marcus Rodriguez</p>
                              <p className="text-xs text-gray-500">Collaborator • Editing</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Live Chat</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          <div className="text-sm">
                            <span className="font-medium text-electric-blue">Marcus:</span>
                            <span className="ml-2">
                              Love the opening! Should we add more about the surveillance system?
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-seafoam-green">Sarah:</span>
                            <span className="ml-2">Good idea. Maybe in the next paragraph?</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="versions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <History className="h-5 w-5" />
                      <span>Version History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-l-electric-blue pl-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Latest Draft</p>
                            <p className="text-sm text-gray-500">2 hours ago by Sarah Chen</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Changes
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Added character development for Aria's morning routine
                        </p>
                      </div>

                      <div className="border-l-4 border-l-gray-300 pl-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Version 1.2</p>
                            <p className="text-sm text-gray-500">1 day ago by Marcus Rodriguez</p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Changes
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Enhanced world-building descriptions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Comments & Discussions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border-l-4 border-l-turquoise pl-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-turquoise rounded-full flex items-center justify-center text-white text-sm">
                            JD
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">Jane Doe</span>
                              <span className="text-sm text-gray-500">2 hours ago</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">
                              The opening is incredibly atmospheric! I love how you've established the dystopian setting
                              without being heavy-handed. The detail about Aria never reporting forbidden knowledge is a
                              perfect character reveal.
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                <Heart className="h-4 w-4 mr-1" />
                                12
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500">
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
