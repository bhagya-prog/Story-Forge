"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ArrowRight, ArrowLeft, GitBranch, Heart, Zap, Search, Plus, BookOpen } from "lucide-react"

interface TourStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  highlightSelector?: string
  highlightText?: string
  offset?: { x: number; y: number }
  scrollToElement?: boolean
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to StoryForge! 🎉",
    description:
      "Welcome to the future of collaborative storytelling! Here, writers come together to create, fork, and merge amazing narratives. Let's take a quick tour!",
    icon: <Zap className="h-6 w-6 text-electric-blue" />,
  },
  {
    id: "search",
    title: "Discover Stories 🔍",
    description:
      "Use the search bar to find stories by title, author, or genre. Discover your next favorite read or find inspiration for your own writing!",
    icon: <Search className="h-6 w-6 text-electric-blue" />,
    highlightSelector: "input[placeholder*='Search']",
    highlightText: "Search for any story, author, or genre!",
    offset: { x: 0, y: 80 },
    scrollToElement: true,
  },
  {
    id: "create",
    title: "Start Writing ✍️",
    description:
      "Ready to create? Click 'Create' to start your own story. You can write solo or invite collaborators to join your creative journey!",
    icon: <Plus className="h-6 w-6 text-seafoam-green" />,
    highlightSelector: "nav button",
    highlightText: "Click here to start your writing journey!",
    offset: { x: 0, y: 80 },
    scrollToElement: true,
  },
  {
    id: "explore",
    title: "Explore Amazing Stories 📚",
    description:
      "Browse through thousands of stories from writers worldwide. Each story card shows likes, forks, and comments to help you find the best content.",
    icon: <BookOpen className="h-6 w-6 text-turquoise" />,
    highlightSelector: ".story-card",
    highlightText: "These are story cards - click on any story to read it!",
    offset: { x: -200, y: 0 },
    scrollToElement: true,
  },
  {
    id: "fork",
    title: "Fork Stories Like Code 🍴",
    description:
      "See a story you love? Fork it! Create your own version with a 'What if?' twist. Every fork is a new adventure waiting to happen.",
    icon: <GitBranch className="h-6 w-6 text-seafoam-green" />,
    highlightSelector: "button[class*='ghost'] svg[data-lucide='git-branch']",
    highlightText: "Fork buttons let you create your own version of any story!",
    offset: { x: -150, y: -50 },
    scrollToElement: true,
  },
  {
    id: "engage",
    title: "Engage & Discover 💖",
    description:
      "Like, bookmark, and comment on stories. Build your following, discover new voices, and become part of our amazing storytelling community!",
    icon: <Heart className="h-6 w-6 text-red-500" />,
    highlightSelector: "button[class*='ghost'] svg[data-lucide='heart']",
    highlightText: "Show love for stories you enjoy!",
    offset: { x: -150, y: -50 },
    scrollToElement: true,
  },
]

interface InteractiveTourProps {
  onClose: () => void
}

export function InteractiveTour({ onClose }: InteractiveTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [tourPosition, setTourPosition] = useState({ top: "50%", left: "50%", transform: "translate(-50%, -50%)" })
  const [highlightedElement, setHighlightedElement] = useState<Element | null>(null)
  const tourCardRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    // Disable body scroll when tour is active
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "unset"
      clearHighlights()
    }
  }, [])

  const clearHighlights = useCallback(() => {
    document.querySelectorAll(".tour-highlight").forEach((el) => {
      el.classList.remove("tour-highlight")
      el.style.zIndex = ""
      const overlay = el.querySelector(".tour-highlight-overlay")
      if (overlay) overlay.remove()
    })
    setHighlightedElement(null)
  }, [])

  const updateTourPosition = useCallback((element: Element | null, step: TourStep) => {
    if (!element) {
      // Center the tour card for welcome step
      setTourPosition({
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      })
      return
    }

    // Scroll element into view first
    if (step.scrollToElement) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    }

    // Wait for scroll to complete, then position tour card
    setTimeout(
      () => {
        const rect = element.getBoundingClientRect()
        const offset = step.offset || { x: 0, y: 80 }

        let top = rect.bottom + offset.y
        let left = rect.left + rect.width / 2 + offset.x

        // Ensure tour card stays within viewport
        const cardWidth = 384 // max-w-sm = 24rem = 384px
        const cardHeight = 350 // approximate height
        const padding = 20

        // Horizontal bounds checking
        if (left + cardWidth / 2 > window.innerWidth - padding) {
          left = window.innerWidth - cardWidth / 2 - padding
        }
        if (left - cardWidth / 2 < padding) {
          left = cardWidth / 2 + padding
        }

        // Vertical bounds checking
        if (top + cardHeight > window.innerHeight - padding) {
          top = rect.top - cardHeight - padding
        }
        if (top < padding) {
          top = rect.bottom + padding
        }

        setTourPosition({
          top: `${top}px`,
          left: `${left}px`,
          transform: "translateX(-50%)",
        })
      },
      step.scrollToElement ? 500 : 0,
    )
  }, [])

  const findElement = useCallback((selector: string, stepId: string): Element | null => {
    // Try direct selector first
    let element = document.querySelector(selector)
    if (element) return element

    // Fallback strategies based on step
    switch (stepId) {
      case "search":
        element =
          document.querySelector("input[placeholder*='Search']") ||
          document.querySelector("input[type='text']") ||
          document.querySelector("nav input")
        break
      case "create":
        element = Array.from(document.querySelectorAll("nav button")).find(
          (btn) => btn.textContent?.includes("Create") || btn.textContent?.includes("Start"),
        )
        break
      case "explore":
        element =
          document.querySelector(".story-card") ||
          document.querySelector("[class*='Card']") ||
          document.querySelector("main [class*='card']")
        break
      case "fork":
        element =
          document.querySelector("svg[data-lucide='git-branch']")?.closest("button") ||
          Array.from(document.querySelectorAll("button")).find(
            (btn) => btn.innerHTML.includes("git-branch") || btn.innerHTML.includes("Fork"),
          )
        break
      case "engage":
        element =
          document.querySelector("svg[data-lucide='heart']")?.closest("button") ||
          Array.from(document.querySelectorAll("button")).find(
            (btn) => btn.innerHTML.includes("heart") || btn.innerHTML.includes("Like"),
          )
        break
    }

    return element
  }, [])

  useEffect(() => {
    clearHighlights()

    const currentTourStep = tourSteps[currentStep]

    if (currentTourStep.highlightSelector) {
      const element = findElement(currentTourStep.highlightSelector, currentTourStep.id)

      if (element) {
        setHighlightedElement(element)

        // Add highlight
        element.classList.add("tour-highlight")
        element.style.zIndex = "10001"
        element.style.position = "relative"

        // Create tooltip
        const overlay = document.createElement("div")
        overlay.className = "tour-highlight-overlay"
        overlay.innerHTML = `
          <div class="tour-tooltip">
            ${currentTourStep.highlightText || "This is highlighted for the tour!"}
          </div>
        `
        element.appendChild(overlay)

        // Update tour position
        updateTourPosition(element, currentTourStep)
      } else {
        // Element not found, center the tour card
        updateTourPosition(null, currentTourStep)
      }
    } else {
      // Welcome step - center the tour card
      updateTourPosition(null, currentTourStep)
    }
  }, [currentStep, findElement, updateTourPosition, clearHighlights])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (highlightedElement) {
        updateTourPosition(highlightedElement, tourSteps[currentStep])
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [highlightedElement, currentStep, updateTourPosition])

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    clearHighlights()
    onClose()
  }

  const currentTourStep = tourSteps[currentStep]

  return (
    <>
      {/* Overlay with proper z-index */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-60 z-[10000]"
        onClick={handleClose}
        style={{ zIndex: 10000 }}
      />

      {/* Animated background sparkles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[10001]">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-blue rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Tour Card with highest z-index */}
      <Card
        ref={tourCardRef}
        className={`fixed z-[10002] max-w-sm mx-4 transform transition-all duration-500 shadow-2xl ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          ...tourPosition,
          zIndex: 10002,
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {currentTourStep.icon}
              <h3 className="text-lg font-bold text-gray-900">{currentTourStep.title}</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed text-sm">{currentTourStep.description}</p>

          {/* Progress dots */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  index === currentStep ? "bg-electric-blue" : "bg-gray-300"
                }`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 bg-transparent text-sm"
              size="sm"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back</span>
            </Button>

            <Button variant="ghost" onClick={handleClose} className="text-gray-500 text-sm" size="sm">
              Skip Tour
            </Button>

            <Button
              onClick={nextStep}
              className="bg-electric-blue hover:bg-electric-blue/90 flex items-center space-x-2 text-sm"
              size="sm"
            >
              <span>{currentStep === tourSteps.length - 1 ? "Get Started!" : "Next"}</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced CSS for tour highlights */}
      <style jsx global>{`
        .tour-highlight {
          position: relative !important;
          z-index: 10001 !important;
          box-shadow: 0 0 0 4px rgba(0, 128, 255, 0.4), 
                      0 0 20px rgba(0, 128, 255, 0.3),
                      0 0 40px rgba(0, 128, 255, 0.2) !important;
          border-radius: 8px !important;
          animation: tour-pulse 2s infinite !important;
          background-color: rgba(0, 128, 255, 0.05) !important;
        }

        .tour-highlight-overlay {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10002;
          pointer-events: none;
        }

        .tour-tooltip {
          background: rgba(0, 128, 255, 0.95);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          animation: tour-tooltip-bounce 0.5s ease-out;
          max-width: 200px;
          white-space: normal;
          text-align: center;
        }

        .tour-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: rgba(0, 128, 255, 0.95);
        }

        @keyframes tour-pulse {
          0% {
            box-shadow: 0 0 0 4px rgba(0, 128, 255, 0.4), 
                        0 0 20px rgba(0, 128, 255, 0.3),
                        0 0 40px rgba(0, 128, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(0, 128, 255, 0.3), 
                        0 0 30px rgba(0, 128, 255, 0.4),
                        0 0 60px rgba(0, 128, 255, 0.3);
          }
          100% {
            box-shadow: 0 0 0 4px rgba(0, 128, 255, 0.4), 
                        0 0 20px rgba(0, 128, 255, 0.3),
                        0 0 40px rgba(0, 128, 255, 0.2);
          }
        }

        @keyframes tour-tooltip-bounce {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        /* Ensure tour elements are above everything */
        .tour-highlight {
          z-index: 10001 !important;
        }
        
        .tour-highlight-overlay {
          z-index: 10002 !important;
        }
      `}</style>
    </>
  )
}
