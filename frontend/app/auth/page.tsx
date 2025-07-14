"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Github, Mail, Users, BookOpen, GitBranch, Star, Globe, Shield, Sparkles } from "lucide-react"
import { authService } from "@/lib/backend-services"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate Login
    try {
      const authResponse = await authService.login(loginData)
      authService.saveAuthData(authResponse)
      localStorage.setItem("user_authenticated", "true")
      router.push("/home")
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate Signup
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const authResponse = await authService.register({
        username: signupData.name,
        email: signupData.email,
        password: signupData.password
      })
      authService.saveAuthData(authResponse)
      localStorage.setItem("user_authenticated", "true")
      router.push("/home")
    } catch (error) {
      console.error('Signup failed:', error)
      alert('Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: <GitBranch className="h-6 w-6 text-electric-blue" />,
      title: "Fork & Remix Stories",
      description: "Take any story in a new direction with your unique perspective",
    },
    {
      icon: <Users className="h-6 w-6 text-seafoam-green" />,
      title: "Real-time Collaboration",
      description: "Write together with authors from around the world",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-turquoise" />,
      title: "Rich Story Repository",
      description: "Discover thousands of stories across every genre",
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: "Community Challenges",
      description: "Participate in writing challenges and win prizes",
    },
  ]

  const stats = [
    { number: "50K+", label: "Active Writers" },
    { number: "200K+", label: "Stories Created" },
    { number: "1M+", label: "Story Forks" },
    { number: "150+", label: "Countries" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-electric-blue/5 via-white to-turquoise/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-electric-blue">StoryForge</div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Join writers worldwide</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Platform Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Where Stories
                <span className="text-electric-blue bg-gradient-to-r from-electric-blue to-turquoise bg-clip-text text-transparent">
                  {" "}
                  Come Alive
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Join the world's most collaborative storytelling platform. Write, fork, and create amazing narratives
                with writers from around the globe.
              </p>

              <div className="flex items-center space-x-4 mb-8">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Shield className="h-3 w-3 mr-1" />
                  Secure & Private
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-Powered Tools
                </Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-electric-blue">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Writers Choose StoryForge</h3>
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                  {feature.icon}
                  <div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="bg-gradient-to-r from-electric-blue/10 to-turquoise/10 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-electric-blue rounded-full border-2 border-white flex items-center justify-center text-white text-xs"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">+50,000 writers</span>
              </div>
              <p className="text-sm text-gray-700 italic">
                "StoryForge transformed how I write. The collaborative features helped me discover new perspectives and
                improve my storytelling."
              </p>
              <p className="text-xs text-gray-500 mt-2">- Sarah Chen, Published Author</p>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Get Started</CardTitle>
                <p className="text-gray-600">Join thousands of storytellers today</p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                          className="mt-2"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative mt-2">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-electric-blue hover:bg-electric-blue/90"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Signing in...</span>
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>

                    <div className="text-center">
                      <Button variant="link" className="text-sm text-electric-blue">
                        Forgot your password?
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Your full name"
                          value={signupData.name}
                          onChange={(e) => setSignupData((prev) => ({ ...prev, name: e.target.value }))}
                          className="mt-2"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          value={signupData.email}
                          onChange={(e) => setSignupData((prev) => ({ ...prev, email: e.target.value }))}
                          className="mt-2"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a strong password"
                          value={signupData.password}
                          onChange={(e) => setSignupData((prev) => ({ ...prev, password: e.target.value }))}
                          className="mt-2"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          className="mt-2"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-electric-blue hover:bg-electric-blue/90"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <Separator className="my-4" />
                  <div className="text-center text-sm text-gray-500 mb-4">Or continue with</div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Google
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                  By signing up, you agree to our{" "}
                  <Button variant="link" className="text-xs p-0 h-auto text-electric-blue">
                    Terms of Service
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" className="text-xs p-0 h-auto text-electric-blue">
                    Privacy Policy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
