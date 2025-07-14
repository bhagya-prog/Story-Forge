"use client"

import { useEffect } from "react"
import { useApp } from "@/contexts/app-context"

export function useFaces() {
  const { state, dispatch } = useApp()

  const fetchFaces = async () => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const response = await fetch("/api/faces")
      const data = await response.json()

      dispatch({ type: "SET_FACES", payload: data.faces })
    } catch (error) {
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Failed to load face database", type: "error" } })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const addFace = async (name: string, imageUrl?: string) => {
    try {
      const response = await fetch("/api/faces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, imageUrl }),
      })

      const data = await response.json()

      if (data.success) {
        dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Face added successfully!", type: "success" } })
        fetchFaces() // Refresh the list
        return data.face
      }
    } catch (error) {
      dispatch({ type: "ADD_NOTIFICATION", payload: { message: "Failed to add face", type: "error" } })
    }
  }

  useEffect(() => {
    fetchFaces()
  }, [])

  return {
    faces: state.faces,
    loading: state.loading,
    fetchFaces,
    addFace,
  }
}
