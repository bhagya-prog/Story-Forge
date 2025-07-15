"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trophy, Users, Clock, Target, Award, Crown, CheckCircle, Zap } from "lucide-react"

const challenges = [
  {
    id: 1,
    title: "48-Hour Ghost Story Challenge",
    description: "Write a spine-chilling ghost story in just 48 hours. Perfect for Halloween season!",
    timeLeft: "2 days 14 hours",
    participants: 156,
    prize: "Featured Story + $100",
    difficulty: "Medium",
    tags: ["Horror", "Short Story", "Timed"],
    requirements: "Minimum 1,000 words, maximum 5,000 words. Must include supernatural elements.",
    deadline: "October 31, 2025",
    status: "active",
  },
  {
    id: 2,
    title: "Collaborative Sci-Fi Epic",
    description: "Join forces with other writers to create an interconnected sci-fi universe.",
    timeLeft: "1 week 3 days",
    participants: 89,
    prize: "Publication Opportunity",
    difficulty: "Hard",
    tags: ["Sci-Fi", "Collaboration", "Long-form"],
    requirements: "Work in teams of 3-5 writers. Each writer contributes 2,000-3,000 words.",
    deadline: "November 15, 2025",
    status: "active",
  },
  {
    id: 3,
    title: "Flash Fiction Friday",
    description: "Weekly challenge: Tell a complete story in exactly 100 words.",
    timeLeft: "3 days 8 hours",
    participants: 234,
    prize: "Community Recognition",
    difficulty: "Easy",
    tags: ["Flash Fiction", "Weekly", "Micro-story"],
    requirements: "Exactly 100 words. Any genre. Must have clear beginning, middle, and end.",
    deadline: "Every Friday",
    status: "active",
  },
]

const leaderboard = [
  { rank: 1, name: "Sarah Chen", points: 2450, badge: "👑", stories: 12, forks: 89 },
  { rank: 2, name: "Marcus Rodriguez", points: 2180, badge: "🥈", stories: 8, forks: 67 },
  { rank: 3, name: "Elena Vasquez", points: 1920, badge: "🥉", stories: 15, forks: 45 },
  { rank: 4, name: "James Thornfield", points: 1750, badge: "⭐", stories: 6, forks: 78 },
  { rank: 5, name: "Luna Blackwood", points: 1680, badge: "⭐", stories: 9, forks: 56 },
]

const badges = [
  { name: "First Story", icon: "🎯", description: "Published your first story", earned: true },
  { name: "Collaborator", icon: "🤝", description: "Co-authored 5 stories", earned: true },
  { name: "Fork Master", icon: "🍴", description: "Created 10 successful forks", earned: true },
  { name: "Community Favorite", icon: "❤️", description: "Received 100 likes", earned: false },
  { name: "Speed Writer", icon: "⚡", description: "Completed a 24h challenge", earned: false },
  { name: "Genre Explorer", icon: "🌟", description: "Published in 5 different genres", earned: false },
]

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<(typeof challenges)[0] | null>(null)
  const [showJoinDialog, setShowJoinDialog] = useState(false)
  const [submission, setSubmission] = useState({
    title: "",
    content: "",
    notes: "",
  })
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([])

  const handleJoinChallenge = (challenge: (typeof challenges)[0]) => {
    setSelectedChallenge(challenge)
    setShowJoinDialog(true)
  }

  const handleSubmitEntry = () => {
    if (selectedChallenge && submission.title && submission.content) {
      setJoinedChallenges((prev) => [...prev, selectedChallenge.id])
      setShowJoinDialog(false)
      setSubmission({ title: "", content: "", notes: "" })

      // Show success notification
      alert(`Successfully joined "${selectedChallenge.title}"! Your entry has been submitted.`)
    }
  }

  const isJoined = (challengeId: number) => joinedChallenges.includes(challengeId)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-electric-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Challenges</h1>
          <p className="text-xl mb-8 opacity-90">
            Level up your writing skills, earn badges, and compete with writers worldwide
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>1,247 Active Writers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>89 Challenges This Month</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>$2,500 in Prizes</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="challenges" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="challenges">Active Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="mt-8">
            <div className="grid gap-6">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2 flex items-center space-x-2">
                          <span>{challenge.title}</span>
                          {isJoined(challenge.id) && (
                            <Badge className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Joined
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-gray-600">{challenge.description}</p>
                      </div>
                      <Badge
                        variant={
                          challenge.difficulty === "Easy"
                            ? "secondary"
                            : challenge.difficulty === "Medium"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{challenge.timeLeft}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{challenge.participants} participants</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">{challenge.prize}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-electric-blue" />
                        <span className="text-sm text-gray-600">Deadline: {challenge.deadline}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Requirements:</strong> {challenge.requirements}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {challenge.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Progress value={65} className="flex-1 mr-4" />
                      {isJoined(challenge.id) ? (
                        <Button variant="outline" disabled>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Joined
                        </Button>
                      ) : (
                        <Button
                          className="bg-electric-blue hover:bg-electric-blue/90"
                          onClick={() => handleJoinChallenge(challenge)}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Join Challenge
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  <span>Top Writers This Month</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{user.badge}</div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            #{user.rank} {user.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {user.stories} stories • {user.forks} forks
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-electric-blue">{user.points}</p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <Card key={badge.name} className={`${badge.earned ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
                  <CardContent className="p-6 text-center">
                    <div className={`text-4xl mb-3 ${badge.earned ? "" : "grayscale opacity-50"}`}>{badge.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{badge.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                    {badge.earned ? (
                      <Badge className="bg-green-500">Earned!</Badge>
                    ) : (
                      <Badge variant="outline">Not Earned</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Join Challenge Dialog */}
      <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Join Challenge: {selectedChallenge?.title}</DialogTitle>
          </DialogHeader>

          {selectedChallenge && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Challenge Details</h4>
                <p className="text-sm text-blue-700 mb-2">{selectedChallenge.description}</p>
                <p className="text-sm text-blue-700">
                  <strong>Requirements:</strong> {selectedChallenge.requirements}
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Deadline:</strong> {selectedChallenge.deadline}
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Prize:</strong> {selectedChallenge.prize}
                </p>
              </div>

              <div>
                <Label htmlFor="entry-title">Story Title</Label>
                <Input
                  id="entry-title"
                  value={submission.title}
                  onChange={(e) => setSubmission((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter your story title..."
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="entry-content">Your Story</Label>
                <Textarea
                  id="entry-content"
                  value={submission.content}
                  onChange={(e) => setSubmission((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Start writing your challenge entry here..."
                  className="mt-2 min-h-64"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Word count: {submission.content.split(" ").filter((word) => word.length > 0).length}
                </p>
              </div>

              <div>
                <Label htmlFor="entry-notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="entry-notes"
                  value={submission.notes}
                  onChange={(e) => setSubmission((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional notes about your entry..."
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowJoinDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitEntry}
                  className="bg-electric-blue hover:bg-electric-blue/90"
                  disabled={!submission.title || !submission.content}
                >
                  Submit Entry
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
