"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Users, BookOpen, GitBranch, Star, TrendingUp, Zap } from "lucide-react"
import { NewStoryWizard } from "./new-story-wizard"
import { authService } from "@/lib/backend-services"

export function HeroSection() {
  const [showNewStoryWizard, setShowNewStoryWizard] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status on component mount and periodically
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = authService.isAuthenticated();
      console.log('Hero section checking auth status:', authStatus);
      setIsAuthenticated(authStatus);
    };

    // Check immediately
    checkAuth();

    // Check periodically for auth changes (every 2 seconds)
    const interval = setInterval(checkAuth, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleStartWriting = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      alert('Please log in first using the Demo Login button in the connection status widget (bottom-right corner) to start writing stories.');
      return;
    }
    setShowNewStoryWizard(true);
  }

  const stats = [
    { icon: Users, value: "50K+", label: "Active Writers", color: "text-electric-blue" },
    { icon: BookOpen, value: "200K+", label: "Stories", color: "text-seafoam-green" },
    { icon: GitBranch, value: "1M+", label: "Forks", color: "text-turquoise" },
    { icon: TrendingUp, value: "95%", label: "Satisfaction", color: "text-yellow-500" },
  ]

  const features = [
    {
      icon: <GitBranch className="h-5 w-5 text-electric-blue" />,
      title: "Fork Stories",
      description: "Create your own version of any story",
    },
    {
      icon: <Users className="h-5 w-5 text-seafoam-green" />,
      title: "Collaborate",
      description: "Write together in real-time",
    },
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      title: "Get Discovered",
      description: "Share your stories with the world",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-electric-blue/5 via-white to-turquoise/5 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-electric-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-turquoise/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-1/4 w-2 h-2 bg-electric-blue rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-seafoam-green rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-turquoise rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-electric-blue/10 text-electric-blue border-electric-blue/20 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Welcome to the Future of Storytelling
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Where Stories
            <span className="block bg-gradient-to-r from-electric-blue via-turquoise to-seafoam-green bg-clip-text text-transparent">
              Come Alive
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create, collaborate, and discover amazing stories with writers from around the world. Your next great
            adventure starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className={`${
                isAuthenticated 
                  ? "bg-electric-blue hover:bg-electric-blue/90" 
                  : "bg-gray-400 hover:bg-gray-500"
              } text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
              onClick={handleStartWriting}
            >
              <Zap className="mr-2 h-5 w-5" />
              {isAuthenticated ? "Start Writing" : "Login Required"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg font-semibold bg-transparent"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Stories
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {showNewStoryWizard && <NewStoryWizard onClose={() => setShowNewStoryWizard(false)} />}
    </section>
  )
}
