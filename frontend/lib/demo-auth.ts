// Demo authentication helper for development
import { authService } from './backend-services';

export interface DemoUser {
  email: string;
  password: string;
  username: string;
}

// Demo user credentials
export const DEMO_USER: DemoUser = {
  email: 'demo@storyforge.com',
  password: 'demo12345',
  username: 'DemoUser'
};

export class DemoAuth {
  private static instance: DemoAuth;
  private isInitialized = false;

  static getInstance(): DemoAuth {
    if (!DemoAuth.instance) {
      DemoAuth.instance = new DemoAuth();
    }
    return DemoAuth.instance;
  }

  async ensureAuthenticated(): Promise<boolean> {
    // For demo purposes, always try fresh authentication
    console.log('Starting fresh demo authentication...');
    
    // Clear any existing auth data
    authService.logout();

    // Try to log in with demo user
    try {
      console.log('Attempting demo user login...');
      const authResponse = await authService.login({
        email: DEMO_USER.email,
        password: DEMO_USER.password
      });
      
      console.log('Login response:', authResponse);
      authService.saveAuthData(authResponse);
      
      // Validate the token immediately
      const isValid = await authService.validateToken();
      console.log('Token validation result:', isValid);
      
      if (isValid) {
        console.log('Demo user logged in successfully');
        return true;
      } else {
        console.error('Token validation failed after login');
        return false;
      }
    } catch (error) {
      console.log('Demo user login failed, attempting registration...');
      console.error('Login error details:', error);
      
      // If login fails, try to register demo user
      try {
        const authResponse = await authService.register(DEMO_USER);
        console.log('Registration response:', authResponse);
        authService.saveAuthData(authResponse);
        
        // Validate the token immediately
        const isValid = await authService.validateToken();
        console.log('Token validation result after registration:', isValid);
        
        if (isValid) {
          console.log('Demo user registered and logged in successfully');
          return true;
        } else {
          console.error('Token validation failed after registration');
          return false;
        }
      } catch (registerError) {
        console.error('Failed to register demo user:', registerError);
        return false;
      }
    }
  }

  async createTestStory() {
    const isAuth = await this.ensureAuthenticated();
    if (!isAuth) {
      throw new Error('Failed to authenticate demo user');
    }

    // Now create a test story using the backend service
    const { storyService } = await import('./backend-services');
    
    const testStory = {
      title: 'Demo Story: Welcome to StoryForge',
      content: 'This is a demo story created to test the backend connection. You can edit, collaborate, and explore all features!',
      tags: ['demo', 'test', 'welcome'],
      isPublic: true,
      allowCollaboration: true
    };

    return await storyService.createStory(testStory);
  }
}

// Export singleton instance
export const demoAuth = DemoAuth.getInstance();
