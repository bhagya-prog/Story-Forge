"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  GitBranch,
  Star,
  ArrowRight,
  Play,
  Quote,
  Sparkles,
  Globe,
  Zap,
  PenTool,
  TrendingUp,
  Shield,
} from "lucide-react"

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <GitBranch className="h-8 w-8 text-electric-blue" />,
      title: "Fork & Remix Stories",
      description:
        "Take any story in a new direction. Create alternate endings, explore different perspectives, or continue where others left off.",
      gradient: "from-electric-blue/10 to-electric-blue/5",
    },
    {
      icon: <Users className="h-8 w-8 text-seafoam-green" />,
      title: "Real-time Collaboration",
      description:
        "Write together with authors worldwide. See changes live, leave comments, and build stories that no single writer could create alone.",
      gradient: "from-seafoam-green/10 to-seafoam-green/5",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-turquoise" />,
      title: "Rich Story Repository",
      description:
        "Discover thousands of stories across every genre. From sci-fi epics to intimate character studies, find your next favorite read.",
      gradient: "from-turquoise/10 to-turquoise/5",
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Community Challenges",
      description:
        "Participate in writing challenges, earn badges, and compete with writers globally. Push your creativity to new heights.",
      gradient: "from-yellow-500/10 to-yellow-500/5",
    },
    {
      icon: <PenTool className="h-8 w-8 text-purple-500" />,
      title: "Advanced Editor",
      description:
        "Write with our powerful editor featuring real-time collaboration, version control, and beautiful formatting options.",
      gradient: "from-purple-500/10 to-purple-500/5",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-pink-500" />,
      title: "Analytics & Insights",
      description:
        "Track your story's performance, understand your audience, and see how your writing evolves over time.",
      gradient: "from-pink-500/10 to-pink-500/5",
    },
  ]

  const testimonials = [
    {
      quote:
        "StoryForge transformed how I write. The collaborative features helped me discover new perspectives and improve my storytelling.",
      author: "Sarah Chen",
      role: "Published Author",
      avatar: "SC",
      stories: 23,
    },
    {
      quote:
        "I've never experienced anything like this. Writing with others in real-time opened up creative possibilities I never imagined.",
      author: "Marcus Rodriguez",
      role: "Screenwriter",
      avatar: "MR",
      stories: 15,
    },
    {
      quote:
        "The community here is incredible. I've learned more about writing in 6 months than I did in years of writing alone.",
      author: "Elena Vasquez",
      role: "Novelist",
      avatar: "EV",
      stories: 31,
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Writers", icon: Users },
    { number: "200K+", label: "Stories Created", icon: BookOpen },
    { number: "1M+", label: "Story Forks", icon: GitBranch },
    { number: "150+", label: "Countries", icon: Globe },
  ]

  const handleGetStarted = () => {
    router.push("/auth")
  }

  const handleEnterPlatform = () => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem("user_authenticated") === "true"
    if (isAuthenticated) {
      router.push("/home")
    } else {
      router.push("/auth")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Floating Books Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            📚
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">📖</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-electric-blue to-turquoise bg-clip-text text-transparent">
                StoryForge
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-electric-blue transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-electric-blue transition-colors">
                How it Works
              </a>
              <a href="#community" className="text-gray-600 hover:text-electric-blue transition-colors">
                Community
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-electric-blue transition-colors">
                Pricing
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleEnterPlatform}>
                Enter Platform
              </Button>
              <Button className="bg-electric-blue hover:bg-electric-blue/90" onClick={handleGetStarted}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Badge className="mb-6 bg-electric-blue/10 text-electric-blue border-electric-blue/20 px-4 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                The Future of Collaborative Storytelling
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Where Stories
                <span className="block bg-gradient-to-r from-electric-blue via-turquoise to-seafoam-green bg-clip-text text-transparent">
                  Come Alive
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join the world's most innovative storytelling platform. Write, collaborate, and create amazing
                narratives with writers from around the globe. Your story starts here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button
                  size="lg"
                  className="bg-electric-blue hover:bg-electric-blue/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  onClick={handleGetStarted}
                >
                  Start Writing Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg font-semibold bg-transparent"
                  onClick={handleEnterPlatform}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Explore Stories
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="h-8 w-8 text-electric-blue" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce">📖</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10 animate-pulse">✍️</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-bounce delay-1000">📚</div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Modern Storytellers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to write, collaborate, and share your stories with the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br ${feature.gradient}`}
              >
                <CardContent className="p-8">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-electric-blue/5 to-turquoise/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How StoryForge Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start your storytelling journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <PenTool className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Start Writing</h3>
              <p className="text-gray-600">
                Create your account and begin writing your story using our intuitive editor
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-seafoam-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Collaborate</h3>
              <p className="text-gray-600">Invite others to co-write or allow the community to fork your stories</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Share & Discover</h3>
              <p className="text-gray-600">Publish your stories and discover amazing works from writers worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="community" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Writers Worldwide</h2>
            <p className="text-xl text-gray-600">See what our community has to say</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-electric-blue/5 to-turquoise/5 border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <Quote className="h-12 w-12 text-electric-blue mx-auto mb-6" />
                <blockquote className="text-2xl text-gray-700 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].author}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                    <div className="text-sm text-electric-blue">
                      {testimonials[currentTestimonial].stories} stories published
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-electric-blue" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Start free, upgrade when you're ready</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
                  <div className="text-gray-600">Forever</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>5 stories</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>Basic collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>Community access</span>
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline" onClick={handleGetStarted}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-electric-blue shadow-xl transform scale-105">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Badge className="bg-electric-blue text-white mb-4">Most Popular</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">$9</div>
                  <div className="text-gray-600">per month</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>Unlimited stories</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>Advanced collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>Analytics dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-electric-blue hover:bg-electric-blue/90" onClick={handleGetStarted}>
                  Start Pro Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">$29</div>
                  <div className="text-gray-600">per month</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>Team management</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>API access</span>
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline" onClick={handleGetStarted}>
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-electric-blue to-turquoise text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Story?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of writers who are already creating amazing stories together. Your next great adventure
            starts with a single word.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-electric-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={handleGetStarted}
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Writing Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
              onClick={handleEnterPlatform}
            >
              Explore Platform
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">📖</div>
                <div className="text-2xl font-bold">StoryForge</div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The world's most collaborative storytelling platform. Where writers come together to create, fork, and
                merge amazing narratives.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  GitHub
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Discord
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 StoryForge. All rights reserved. Built with ❤️ for storytellers everywhere.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
