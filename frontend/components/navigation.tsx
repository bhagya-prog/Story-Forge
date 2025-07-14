"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Bell, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useStories } from "@/hooks/use-stories"
import { useApp } from "@/contexts/app-context"
import { NewStoryWizard } from "./new-story-wizard"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { searchStories } = useStories()
  const { state } = useApp()
  const router = useRouter()
  const [showNewStoryWizard, setShowNewStoryWizard] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchStories(searchQuery.trim())
      router.push("/explore")
    }
  }

  const handleNavigation = (path: string) => {
    if (path === "/logout") {
      // Handle logout
      localStorage.removeItem("user_authenticated")
      router.push("/")
      return
    }

    router.push(path)
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="text-2xl font-bold text-electric-blue cursor-pointer"
              onClick={() => handleNavigation("/home")}
            >
              StoryForge
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search stories, authors, tags..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-electric-blue"
              onClick={() => handleNavigation("/explore")}
            >
              Explore
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-electric-blue"
              onClick={() => setShowNewStoryWizard(true)}
            >
              Create
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-electric-blue"
              onClick={() => handleNavigation("/blog")}
            >
              Blog
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-electric-blue"
              onClick={() => handleNavigation("/my-stories")}
            >
              My Stories
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-electric-blue"
              onClick={() => handleNavigation("/challenges")}
            >
              Challenges
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {state.notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-electric-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.notifications.length}
                </span>
              )}
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {state.user.avatar}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleNavigation("/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/help")}>Help</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/logout")} className="text-red-600">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search stories, authors, tags..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/explore")}>
                  Explore
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setShowNewStoryWizard(true)}>
                  Create
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/blog")}>
                  Blog
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation("/my-stories")}
                >
                  My Stories
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation("/challenges")}
                >
                  Challenges
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600"
                  onClick={() => handleNavigation("/logout")}
                >
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showNewStoryWizard && <NewStoryWizard onClose={() => setShowNewStoryWizard(false)} />}
    </nav>
  )
}
