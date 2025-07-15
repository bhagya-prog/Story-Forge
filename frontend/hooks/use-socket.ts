import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'

export interface SocketEvents {
  // Story collaboration events
  'story:join': (storyId: string) => void
  'story:leave': (storyId: string) => void
  'story:update': (data: { storyId: string; content: string; userId: string }) => void
  'story:user-joined': (data: { storyId: string; user: any }) => void
  'story:user-left': (data: { storyId: string; userId: string }) => void
  
  // Notification events
  'notification': (data: { message: string; type: string; userId: string }) => void
  
  // Chat events
  'chat:message': (data: { message: string; user: any; timestamp: string }) => void
  'chat:typing': (data: { userId: string; isTyping: boolean }) => void
  
  // Real-time updates
  'story:liked': (data: { storyId: string; likes: number }) => void
  'story:forked': (data: { originalId: string; forkId: string; user: any }) => void
}

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      upgrade: true,
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
      setError(null)
      console.log('Connected to Socket.IO server')
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
      console.log('Disconnected from Socket.IO server')
    })

    newSocket.on('connect_error', (err: Error) => {
      setError(err.message)
      setIsConnected(false)
      console.error('Socket connection error:', err)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  // Join a story room for collaboration
  const joinStoryRoom = (storyId: string, userId: string) => {
    if (socket) {
      socket.emit('story:join', { storyId, userId })
    }
  }

  // Leave a story room
  const leaveStoryRoom = (storyId: string, userId: string) => {
    if (socket) {
      socket.emit('story:leave', { storyId, userId })
    }
  }

  // Send story updates
  const updateStory = (storyId: string, content: string, userId: string) => {
    if (socket) {
      socket.emit('story:update', { storyId, content, userId })
    }
  }

  // Send chat message
  const sendChatMessage = (message: string, user: any) => {
    if (socket) {
      socket.emit('chat:message', { message, user, timestamp: new Date().toISOString() })
    }
  }

  // Send typing indicator
  const sendTypingIndicator = (userId: string, isTyping: boolean) => {
    if (socket) {
      socket.emit('chat:typing', { userId, isTyping })
    }
  }

  return {
    socket,
    isConnected,
    error,
    joinStoryRoom,
    leaveStoryRoom,
    updateStory,
    sendChatMessage,
    sendTypingIndicator,
  }
}

// Hook for story collaboration
export const useStoryCollaboration = (storyId: string, userId: string) => {
  const { socket, isConnected, joinStoryRoom, leaveStoryRoom, updateStory } = useSocket()
  const [collaborators, setCollaborators] = useState<any[]>([])
  const [storyContent, setStoryContent] = useState('')

  useEffect(() => {
    if (isConnected && storyId && userId) {
      joinStoryRoom(storyId, userId)

      return () => {
        leaveStoryRoom(storyId, userId)
      }
    }
  }, [isConnected, storyId, userId])

  useEffect(() => {
    if (!socket) return

    const handleUserJoined = (data: { storyId: string; user: any }) => {
      if (data.storyId === storyId) {
        setCollaborators(prev => [...prev.filter(c => c.id !== data.user.id), data.user])
      }
    }

    const handleUserLeft = (data: { storyId: string; userId: string }) => {
      if (data.storyId === storyId) {
        setCollaborators(prev => prev.filter(c => c.id !== data.userId))
      }
    }

    const handleStoryUpdate = (data: { storyId: string; content: string; userId: string }) => {
      if (data.storyId === storyId && data.userId !== userId) {
        setStoryContent(data.content)
      }
    }

    socket.on('story:user-joined', handleUserJoined)
    socket.on('story:user-left', handleUserLeft)
    socket.on('story:update', handleStoryUpdate)

    return () => {
      socket.off('story:user-joined', handleUserJoined)
      socket.off('story:user-left', handleUserLeft)
      socket.off('story:update', handleStoryUpdate)
    }
  }, [socket, storyId, userId])

  const sendUpdate = (content: string) => {
    updateStory(storyId, content, userId)
  }

  return {
    collaborators,
    storyContent,
    sendUpdate,
    isConnected,
  }
}
