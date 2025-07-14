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

// Story Services
export interface BackendStory {
  _id: string;
  title: string;
  content: string;
  author: string;
  collaborators: string[];
  tags: string[];
  isPublic: boolean;
  allowCollaboration: boolean;
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export const storyService = {
  async getAllStories(filters?: { category?: string; search?: string }): Promise<BackendStory[]> {
    const queryParams = new URLSearchParams();
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.search) queryParams.append('search', filters.search);
    
    const endpoint = `/stories${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await api.get<{ stories: BackendStory[] }>(endpoint);
    return response.stories;
  },

  async getStoryById(id: string): Promise<BackendStory> {
    return api.get<BackendStory>(`/stories/${id}`);
  },

  async createStory(storyData: Partial<BackendStory>): Promise<BackendStory> {
    return api.post<BackendStory>('/stories', storyData);
  },

  async updateStory(id: string, updates: Partial<BackendStory>): Promise<BackendStory> {
    return api.put<BackendStory>(`/stories/${id}`, updates);
  },

  async deleteStory(id: string): Promise<void> {
    return api.delete(`/stories/${id}`);
  },

  async likeStory(id: string): Promise<{ likes: number }> {
    return api.post<{ likes: number }>(`/stories/${id}/like`);
  },

  async forkStory(id: string, forkData: { title: string; isPrivate: boolean }): Promise<BackendStory> {
    return api.post<BackendStory>(`/stories/${id}/fork`, forkData);
  }
};

// Club Services
export interface Club {
  _id: string;
  name: string;
  description: string;
  members: string[];
  isPrivate: boolean;
  createdBy: string;
  createdAt: string;
}

export const clubService = {
  async getAllClubs(): Promise<Club[]> {
    return api.get<Club[]>('/club');
  },

  async getClubById(id: string): Promise<Club> {
    return api.get<Club>(`/club/${id}`);
  },

  async createClub(clubData: Partial<Club>): Promise<Club> {
    return api.post<Club>('/club', clubData);
  },

  async joinClub(id: string): Promise<{ message: string }> {
    return api.post<{ message: string }>(`/club/${id}/join`);
  },

  async leaveClub(id: string): Promise<{ message: string }> {
    return api.post<{ message: string }>(`/club/${id}/leave`);
  }
};

// Draft Services
export interface Draft {
  _id: string;
  title: string;
  content: string;
  author: string;
  lastSaved: string;
  autoSave: boolean;
}

export const draftService = {
  async getAllDrafts(): Promise<Draft[]> {
    return api.get<Draft[]>('/draft');
  },

  async getDraftById(id: string): Promise<Draft> {
    return api.get<Draft>(`/draft/${id}`);
  },

  async saveDraft(draftData: Partial<Draft>): Promise<Draft> {
    return api.post<Draft>('/draft', draftData);
  },

  async updateDraft(id: string, updates: Partial<Draft>): Promise<Draft> {
    return api.put<Draft>(`/draft/${id}`, updates);
  },

  async deleteDraft(id: string): Promise<void> {
    return api.delete(`/draft/${id}`);
  }
};
