import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/contexts/app-context"
import { NotificationSystem } from "@/components/notification-system"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StoryForge - Where Stories Begin",
  description: "Collaborative storytelling platform for writers worldwide",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
          <NotificationSystem />
        </AppProvider>
      </body>
    </html>
  )
}
