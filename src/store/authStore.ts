import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthResponse } from '../types';
import { authService } from '../services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      login: async (email: string, password: string) => {
        try {
          const response = await authService.login(email, password);
          if (response.success && response.user) {
            set({ 
              user: response.user, 
              isAuthenticated: true,
              error: null 
            });
          }
          return response;
        } catch (error) {
          set({ error: (error as Error).message });
          return { success: false, message: (error as Error).message };
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          const response = await authService.register(name, email, password);
          if (response.success && response.user) {
            set({ 
              user: response.user, 
              isAuthenticated: true,
              error: null 
            });
          }
          return response;
        } catch (error) {
          set({ error: (error as Error).message });
          return { success: false, message: (error as Error).message };
        }
      },

      logout: async () => {
        try {
          await authService.logout();
          set({ 
            user: null, 
            isAuthenticated: false, 
            error: null 
          });
          window.location.href = '/';
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      checkAuth: async () => {
        try {
          const user = await authService.getCurrentUser();
          set({ 
            user, 
            isAuthenticated: !!user,
            isLoading: false,
            error: null 
          });
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: (error as Error).message 
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);

// Initialize auth state
useAuthStore.getState().checkAuth();

export default useAuthStore;