"use client"

import { Github, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-electric-blue mb-4">StoryForge</div>
            <p className="text-gray-600 mb-4 max-w-md">
              A collaborative storytelling platform where writers come together to create, fork, and merge narratives.
              Building the future of interactive fiction.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-electric-blue text-electric-blue bg-transparent">
                <Github className="h-4 w-4 mr-2" />
                Open Source
              </Button>
              <Select defaultValue="en">
                <SelectTrigger className="w-32">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-electric-blue">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-electric-blue">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-electric-blue">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-electric-blue">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-electric-blue">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-electric-blue">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-electric-blue">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-electric-blue">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 StoryForge. All rights reserved. Built with ❤️ for storytellers everywhere.</p>
        </div>
      </div>
    </footer>
  )
}
