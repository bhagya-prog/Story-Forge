import { api } from '@/lib/api';

// User Authentication Services
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// Backend auth response format (actual from backend)
export interface BackendAuthResponse {
  token: string;
  userId: string;
}

// Backend registration response format
export interface BackendRegisterResponse {
  user: User;
}

// JWT payload interface
interface JWTPayload {
  id: string;
  role?: string;
  exp?: number;
  iat?: number;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<BackendAuthResponse>('/users/login', credentials);
      
      // Transform backend response to frontend format
      const authResponse: AuthResponse = {
        user: {
          id: response.userId,
          username: credentials.email.split('@')[0], // Extract username from email
          email: credentials.email,
          createdAt: new Date().toISOString()
        },
        token: response.token,
        message: 'Login successful'
      };
      
      return authResponse;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      console.log('Attempting registration with:', { 
        email: userData.email, 
        username: userData.username,
        passwordLength: userData.password.length 
      });
      
      const response = await api.post<BackendRegisterResponse>('/users/register', userData);
      
      // After registration, need to login to get token
      const loginResponse = await this.login({
        email: userData.email,
        password: userData.password
      });
      
      return loginResponse;
    } catch (error) {
      console.error('Registration error:', error);
      
      // Check if it's a password validation error
      if (error instanceof Error && error.message.includes('Password must be at least')) {
        throw new Error(error.message);
      }
      
      throw new Error('Registration failed. Please try again.');
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_authenticated');
  },

  async getCurrentUser(): Promise<User> {
    return api.get<User>('/users/profile');
  },

  saveAuthData(authResponse: AuthResponse): void {
    localStorage.setItem('auth_token', authResponse.token);
    localStorage.setItem('user_data', JSON.stringify(authResponse.user));
    localStorage.setItem('user_authenticated', 'true');
  },

  getStoredUser(): User | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const isAuth = localStorage.getItem('user_authenticated') === 'true';
    
    if (!token || !isAuth) {
      return false;
    }

    // Basic JWT token validation (check if it's properly formatted)
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        console.error('Token is not properly formatted');
        this.logout();
        return false;
      }

      // Decode payload to check expiration (safe base64 decode)
      const base64Payload = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
      const paddedPayload = base64Payload + '='.repeat((4 - base64Payload.length % 4) % 4);
      const payload: JWTPayload = JSON.parse(atob(paddedPayload));
      
      console.log('Token payload:', payload);
      
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (payload.exp && payload.exp < currentTime) {
        console.error('Token has expired');
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating token:', error);
      this.logout();
      return false;
    }
  },

  async validateToken(): Promise<boolean> {
    if (!this.isAuthenticated()) {
      return false;
    }

    try {
      // Try to make a request to validate the token
      await this.getCurrentUser();
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      this.logout();
      return false;
    }
  }
};

// Story Services - Backend Response Interface
export interface BackendStoryResponse {
  _id: string;
  title: string;
  content?: string;
  author: string | { _id: string; username: string };
  collaborators?: string[];
  tags: string[];
  summary?: string;
  genre?: string[];
  likes: string[]; // Array of user IDs who liked the story
  forks: string[]; // Array of story IDs that forked this story
  likesCount?: number; // Count of likes (from backend transformation)
  forksCount?: number; // Count of forks (from backend transformation)
  viewsCount?: number; // Count of views (from backend transformation)
  shareCount?: number;
  viewCount?: number;
  isPublic: boolean;
  allowCollaboration?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Frontend Story Interface
export interface Story {
  id: string;
  title: string;
  authors: string[];
  description: string;
  tags: string[];
  likes: number;
  forks: number;
  views: number;
  comments: number;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  allowCollaboration: boolean;
}

// Transform backend story to frontend format
function transformBackendStory(backendStory: BackendStoryResponse): Story {
  // Handle author field safely
  let authorName = 'Unknown Author';
  if (typeof backendStory.author === 'string') {
    authorName = backendStory.author;
  } else if (backendStory.author && typeof backendStory.author === 'object' && backendStory.author.username) {
    authorName = backendStory.author.username;
  }

  return {
    id: backendStory._id,
    title: backendStory.title,
    authors: [authorName],
    description: backendStory.summary || '',
    tags: backendStory.tags || [],
    likes: backendStory.likesCount ?? (backendStory.likes ? backendStory.likes.length : 0), // Use count from backend or calculate
    forks: backendStory.forksCount ?? (backendStory.forks ? backendStory.forks.length : 0), // Use count from backend or calculate
    views: backendStory.viewsCount ?? backendStory.viewCount ?? backendStory.shareCount ?? 0, // Use views count from backend
    comments: 0, // TODO: Add comments count from backend
    coverImage: undefined, // TODO: Add cover image from backend
    createdAt: backendStory.createdAt,
    updatedAt: backendStory.updatedAt,
    isPublic: backendStory.isPublic,
    allowCollaboration: backendStory.allowCollaboration || false,
  };
}

export const storyService = {
  async getAllStories(filters?: { category?: string; search?: string }): Promise<Story[]> {
    const queryParams = new URLSearchParams();
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.search) queryParams.append('search', filters.search);
    
    const endpoint = `/stories${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await api.get<{ stories: BackendStoryResponse[] }>(endpoint);
    
    // Transform backend stories to frontend format
    return response.stories.map(transformBackendStory);
  },

  async getStoryById(id: string): Promise<Story> {
    const backendStory = await api.get<BackendStoryResponse>(`/stories/${id}`);
    return transformBackendStory(backendStory);
  },

  async createStory(storyData: Partial<Story>): Promise<Story> {
    // Transform frontend story format to backend format
    const backendData = {
      title: storyData.title,
      summary: storyData.description,
      tags: storyData.tags,
      isPublic: storyData.isPublic,
    };
    const backendStory = await api.post<BackendStoryResponse>('/stories', backendData);
    return transformBackendStory(backendStory);
  },

  async updateStory(id: string, updates: Partial<Story>): Promise<Story> {
    // Transform frontend updates to backend format
    const backendUpdates = {
      title: updates.title,
      summary: updates.description,
      tags: updates.tags,
      isPublic: updates.isPublic,
    };
    const backendStory = await api.put<BackendStoryResponse>(`/stories/${id}`, backendUpdates);
    return transformBackendStory(backendStory);
  },

  async deleteStory(id: string): Promise<void> {
    return api.delete(`/stories/${id}`);
  },

  async likeStory(id: string): Promise<{ likes: number }> {
    const response = await api.post<BackendStoryResponse>(`/reaction/${id}/like`);
    return { likes: response.likesCount ?? (response.likes ? response.likes.length : 0) };
  },

  async bookmarkStory(id: string): Promise<{ bookmarked: boolean }> {
    await api.post(`/reaction/${id}/bookmark`);
    return { bookmarked: true };
  },

  async forkStory(id: string, forkData: { title: string; isPrivate: boolean }): Promise<Story> {
    const backendStory = await api.post<BackendStoryResponse>(`/stories/${id}/fork`, forkData);
    return transformBackendStory(backendStory);
  },

  async getBookmarkedStories(): Promise<Story[]> {
    // This would need a backend endpoint for bookmarked stories
    // For now, return empty array as placeholder
    return [];
  }
};

// Profile interface for user profile data
export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  twitter?: string;
  github?: string;
  avatar?: string;
  coverImage?: string;
  followers?: number;
  following?: number;
  totalStories?: number;
  totalLikes?: number;
  totalForks?: number;
  joinDate?: string;
  createdAt: string;
  updatedAt?: string;
}

// Profile Services
export const profileService = {
  async getProfile(): Promise<UserProfile> {
    console.log('Getting profile...');
    return api.get<UserProfile>('/users/profile');
  },

  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    console.log('Updating profile with data:', profileData);
    const result = await api.put<UserProfile>('/users/profile', profileData);
    console.log('Profile update result:', result);
    return result;
  }
};

// Comment interfaces and service
export interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
    avatar?: string;
  };
  story: string;
  likes: string[];
  replies: Comment[];
  parentComment?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export const commentService = {
  async getCommentsByStory(storyId: string, page = 1, limit = 20): Promise<{ comments: Comment[]; pagination: any }> {
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    
    return api.get<{ comments: Comment[]; pagination: any }>(`/comments/${storyId}/comments?${queryParams.toString()}`);
  },

  async createComment(storyId: string, commentData: { content: string; parentComment?: string }): Promise<Comment> {
    const response = await api.post<{ comment: Comment }>(`/comments/${storyId}/comments`, commentData);
    return response.comment;
  },

  async updateComment(commentId: string, content: string): Promise<Comment> {
    const response = await api.put<{ comment: Comment }>(`/comments/comments/${commentId}`, { content });
    return response.comment;
  },

  async deleteComment(commentId: string): Promise<void> {
    return api.delete(`/comments/comments/${commentId}`);
  },

  async likeComment(commentId: string): Promise<{ comment: Comment; likesCount: number; isLiked: boolean }> {
    return api.post<{ comment: Comment; likesCount: number; isLiked: boolean }>(`/comments/comments/${commentId}/like`);
  },

  async unlikeComment(commentId: string): Promise<{ comment: Comment; likesCount: number; isLiked: boolean }> {
    return api.delete<{ comment: Comment; likesCount: number; isLiked: boolean }>(`/comments/comments/${commentId}/like`);
  }
};
