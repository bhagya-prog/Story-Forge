"use client"

import { useEffect } from "react"
import { useApp } from "@/contexts/app-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotificationSystem() {
  const { state, dispatch } = useApp()

  useEffect(() => {
    // Auto-remove notifications after 5 seconds
    state.notifications.forEach((notification) => {
      setTimeout(() => {
        dispatch({ type: "REMOVE_NOTIFICATION", payload: notification.id })
      }, 5000)
    })
  }, [state.notifications, dispatch])

  if (state.notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {state.notifications.map((notification) => (
        <Alert
          key={notification.id}
          className={`${
            notification.type === "success"
              ? "border-green-500 bg-green-50"
              : notification.type === "error"
                ? "border-red-500 bg-red-50"
                : "border-blue-500 bg-blue-50"
          }`}
        >
          {notification.type === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
          {notification.type === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
          {notification.type === "info" && <Info className="h-4 w-4 text-blue-600" />}

          <AlertDescription className="flex items-center justify-between">
            <span
              className={`${
                notification.type === "success"
                  ? "text-green-800"
                  : notification.type === "error"
                    ? "text-red-800"
                    : "text-blue-800"
              }`}
            >
              {notification.message}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: "REMOVE_NOTIFICATION", payload: notification.id })}
              className="ml-2 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
