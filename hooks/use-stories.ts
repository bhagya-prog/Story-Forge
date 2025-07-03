"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/contexts/app-context"
import type { Story } from "@/app/api/stories/route"

export function useStories() {
  const { state, dispatch } = useApp()
  const [searchQuery, setSearchQuery] = useState("")

  const fetchStories = async (category?: string, search?: string) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const params = new URLSearchParams()
      if (category) params.append("category", category)
      if (search) params.append("search", search)

      const response = await fetch(`/api/stories?${params}`)
      const data = await response.json()

      dispatch({ type: "SET_STORIES", payload: data.stories })
    } catch (error) {
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Failed to load stories", type: "error" } })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const createStory = async (storyData: Partial<Story>) => {
    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(storyData),
      })

      const data = await response.json()

      if (data.success) {
        dispatch({ type: "ADD_STORY", payload: data.story })
        dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Story created successfully!", type: "success" } })
        return data.story
      }
    } catch (error) {
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Failed to create story", type: "error" } })
    }
  }

  const likeStory = async (storyId: string) => {
    try {
      const response = await fetch(`/api/stories/${storyId}/like`, {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        dispatch({ type: "LIKE_STORY", payload: { id: storyId, newCount: data.newLikeCount } })
        dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Story liked!", type: "success" } })
      }
    } catch (error) {
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Failed to like story", type: "error" } })
    }
  }

  const forkStory = async (storyId: string, forkName: string, isPrivate = false) => {
    try {
      const response = await fetch(`/api/stories/${storyId}/fork`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forkName, isPrivate }),
      })

      const data = await response.json()

      if (data.success) {
        dispatch({ type: "FORK_STORY", payload: { id: storyId } })
        dispatch({ type: "ADD_NOTIFICATION", payload: { message: `Story forked as "${forkName}"!`, type: "success" } })
        return data.forkId
      }
    } catch (error) {
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Failed to fork story", type: "error" } })
    }
  }

  const searchStories = (query: string) => {
    setSearchQuery(query)
    fetchStories(undefined, query)
  }

  // Initialize stories if not already loaded
  useEffect(() => {
    if (!state.initialized && !state.loading) {
      fetchStories()
    }
  }, [state.initialized, state.loading])

  return {
    stories: state.stories,
    loading: state.loading,
    searchQuery,
    fetchStories,
    createStory,
    likeStory,
    forkStory,
    searchStories,
  }
}
