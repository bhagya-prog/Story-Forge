"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { Story } from "@/app/api/stories/route"
import type { FaceRecord } from "@/app/api/faces/route"

interface AppState {
  user: {
    id: string
    name: string
    avatar: string
    isAuthenticated: boolean
  }
  stories: Story[]
  faces: FaceRecord[]
  notifications: Array<{
    id: string
    message: string
    type: "success" | "error" | "info"
    timestamp: string
  }>
  loading: boolean
  initialized: boolean
}

type AppAction =
  | { type: "SET_STORIES"; payload: Story[] }
  | { type: "SET_FACES"; payload: FaceRecord[] }
  | { type: "ADD_STORY"; payload: Story }
  | { type: "UPDATE_STORY"; payload: { id: string; updates: Partial<Story> } }
  | { type: "ADD_NOTIFICATION"; payload: { message: string; type: "success" | "error" | "info" } }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LIKE_STORY"; payload: { id: string; newCount: number } }
  | { type: "FORK_STORY"; payload: { id: string } }
  | { type: "SET_INITIALIZED"; payload: boolean }

const initialState: AppState = {
  user: {
    id: "1",
    name: "John Doe",
    avatar: "JD",
    isAuthenticated: true,
  },
  stories: [],
  faces: [],
  notifications: [],
  loading: false,
  initialized: false,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_STORIES":
      return { ...state, stories: action.payload, initialized: true }
    case "SET_FACES":
      return { ...state, faces: action.payload }
    case "ADD_STORY":
      return { ...state, stories: [action.payload, ...state.stories] }
    case "UPDATE_STORY":
      return {
        ...state,
        stories: state.stories.map((story) =>
          story.id === action.payload.id ? { ...story, ...action.payload.updates } : story,
        ),
      }
    case "LIKE_STORY":
      return {
        ...state,
        stories: state.stories.map((story) =>
          story.id === action.payload.id ? { ...story, likes: action.payload.newCount } : story,
        ),
      }
    case "FORK_STORY":
      return {
        ...state,
        stories: state.stories.map((story) =>
          story.id === action.payload.id ? { ...story, forks: story.forks + 1 } : story,
        ),
      }
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now().toString(),
            ...action.payload,
            timestamp: new Date().toISOString(),
          },
        ],
      }
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_INITIALIZED":
      return { ...state, initialized: action.payload }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Initialize stories on app load
  useEffect(() => {
    const initializeStories = async () => {
      if (!state.initialized) {
        dispatch({ type: "SET_LOADING", payload: true })
        try {
          const response = await fetch("/api/stories")
          const data = await response.json()
          dispatch({ type: "SET_STORIES", payload: data.stories })
        } catch (error) {
          console.error("Failed to load stories:", error)
          dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Failed to load stories", type: "error" } })
        } finally {
          dispatch({ type: "SET_LOADING", payload: false })
        }
      }
    }

    initializeStories()
  }, [state.initialized])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
