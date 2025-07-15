import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, RefreshCw, User, Zap } from 'lucide-react'
import { demoAuth } from '@/lib/demo-auth'
import { authService } from '@/lib/backend-services'

export function ConnectionStatus() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [socketStatus, setSocketStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [lastChecked, setLastChecked] = useState<Date>(new Date())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const checkBackendConnection = async () => {
    try {
      setBackendStatus('checking')
      const response = await fetch('http://localhost:3000/api/stories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        setBackendStatus('connected')
      } else {
        setBackendStatus('disconnected')
      }
    } catch (error) {
      console.error('Backend connection check failed:', error)
      setBackendStatus('disconnected')
    }
  }

  const checkSocketConnection = async () => {
    try {
      setSocketStatus('checking')
      const response = await fetch('http://localhost:3000/socket.io/', {
        method: 'GET',
      })
      
      if (response.status === 400) { // Socket.IO returns 400 for direct HTTP requests
        setSocketStatus('connected')
      } else {
        setSocketStatus('disconnected')
      }
    } catch (error) {
      console.error('Socket connection check failed:', error)
      setSocketStatus('disconnected')
    }
  }

  const checkConnections = () => {
    checkBackendConnection()
    checkSocketConnection()
    checkAuthStatus()
    setLastChecked(new Date())
  }

  const checkAuthStatus = () => {
    setIsAuthenticated(authService.isAuthenticated())
  }

  const handleDemoLogin = async () => {
    setIsAuthenticating(true)
    try {
      // Clear any existing auth data first
      authService.logout()
      
      const success = await demoAuth.ensureAuthenticated()
      setIsAuthenticated(success)
      if (success) {
        // Validate the token
        const isValid = await authService.validateToken()
        console.log('Token validation result:', isValid)
        setIsAuthenticated(isValid)
        
        if (isValid) {
          console.log('Demo authentication successful!')
        } else {
          console.error('Token validation failed after login')
        }
      }
    } catch (error) {
      console.error('Demo authentication failed:', error)
      setIsAuthenticated(false)
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleCreateTestStory = async () => {
    try {
      const story = await demoAuth.createTestStory()
      console.log('Test story created:', story)
      alert('Test story created successfully!')
    } catch (error) {
      console.error('Failed to create test story:', error)
      alert('Failed to create test story. Check console for details.')
    }
  }

  useEffect(() => {
    checkConnections()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        )
      case 'disconnected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Disconnected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            Checking...
          </Badge>
        )
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          Backend Connection Status
          <Button
            variant="outline"
            size="sm"
            onClick={checkConnections}
            disabled={backendStatus === 'checking' || socketStatus === 'checking'}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${backendStatus === 'checking' || socketStatus === 'checking' ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Express API Server:</span>
          {getStatusBadge(backendStatus)}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-medium">Socket.IO Server:</span>
          {getStatusBadge(socketStatus)}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-medium">Authentication:</span>
          {isAuthenticated ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <User className="h-3 w-3 mr-1" />
              Authenticated
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              <XCircle className="h-3 w-3 mr-1" />
              Not Authenticated
            </Badge>
          )}
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-sm text-gray-500">
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
          
          {backendStatus === 'disconnected' && (
            <div className="mt-2 p-2 bg-red-50 rounded-md">
              <p className="text-sm text-red-800">
                Make sure your backend server is running on port 3000
              </p>
            </div>
          )}
          
          {socketStatus === 'disconnected' && backendStatus === 'connected' && (
            <div className="mt-2 p-2 bg-yellow-50 rounded-md">
              <p className="text-sm text-yellow-800">
                Socket.IO might not be properly configured
              </p>
            </div>
          )}
          
          {backendStatus === 'connected' && socketStatus === 'connected' && (
            <div className="mt-2 p-2 bg-green-50 rounded-md">
              <p className="text-sm text-green-800">
                All systems operational! 🚀
              </p>
            </div>
          )}

          {!isAuthenticated && backendStatus === 'connected' && (
            <div className="mt-2 space-y-2">
              <Button
                onClick={handleDemoLogin}
                disabled={isAuthenticating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                {isAuthenticating ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <User className="h-4 w-4 mr-2" />
                )}
                Demo Login
              </Button>
            </div>
          )}

          {isAuthenticated && backendStatus === 'connected' && (
            <div className="mt-2">
              <Button
                onClick={handleCreateTestStory}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <Zap className="h-4 w-4 mr-2" />
                Create Test Story
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
