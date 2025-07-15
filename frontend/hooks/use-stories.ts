"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/contexts/app-context"
import { storyService, type Story } from "@/lib/backend-services"

export function useStories() {
  const { state, dispatch } = useApp()
  const [searchQuery, setSearchQuery] = useState("")

  const fetchStories = async (category?: string, search?: string) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const stories = await storyService.getAllStories({ category, search })
      dispatch({ type: "SET_STORIES", payload: stories })
    } catch (error) {
      console.error('Error fetching stories:', error)
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Failed to load stories", type: "error" } })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const createStory = async (storyData: Partial<Story>) => {
    try {
      console.log('Creating story with data:', storyData);

      const newStory = await storyService.createStory(storyData);
      
      dispatch({ type: "ADD_STORY", payload: newStory })
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Story created successfully!", type: "success" } })
      return newStory
    } catch (error) {
      console.error('Create story error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create story';
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: errorMessage, type: "error" } })
      throw error; // Re-throw to handle in component
    }
  }

  const likeStory = async (storyId: string) => {
    try {
      const result = await storyService.likeStory(storyId);
      
      // Update the story in the state with new like count
      const updatedStory = state.stories.find(story => story.id === storyId);
      if (updatedStory) {
        dispatch({ 
          type: "UPDATE_STORY", 
          payload: { 
            id: storyId, 
            updates: { ...updatedStory, likes: result.likes } 
          } 
        });
      }
      
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Story liked!", type: "success" } })
      return result;
    } catch (error) {
      console.error('Like story error:', error);
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Failed to like story", type: "error" } })
      throw error;
    }
  }

  const forkStory = async (storyId: string, forkName: string, isPrivate = false) => {
    try {
      const result = await storyService.forkStory(storyId, { title: forkName, isPrivate });
      
      dispatch({ type: "ADD_STORY", payload: result })
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: `Story forked as "${forkName}"!`, type: "success" } })
      return result.id
    } catch (error) {
      console.error('Fork story error:', error);
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Failed to fork story", type: "error" } })
      throw error;
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
