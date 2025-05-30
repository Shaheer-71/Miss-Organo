import { supabase } from '../lib/supabase';
import { AuthResponse, User } from '../types';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Check if the user is an admin (hardcoded for demo)
      const isAdmin = email === 'admin@missorgano.com';
      
      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        role: isAdmin ? 'admin' : 'customer',
        name: data.user.user_metadata?.name
      };

      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message
      };
    }
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'customer' // Always register as customer
          }
        }
      });

      if (error) throw error;

      if (!data.user) {
        return {
          success: false,
          message: 'Registration successful. Please check your email for verification.'
        };
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email!,
        role: 'customer',
        name
      };

      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message
      };
    }
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) return null;

    // Check if the user is an admin (hardcoded for demo)
    const isAdmin = user.email === 'admin@missorgano.com';

    return {
      id: user.id,
      email: user.email!,
      role: isAdmin ? 'admin' : 'customer',
      name: user.user_metadata?.name
    };
  },

  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      return {
        success: true,
        message: 'Password reset instructions sent to your email.'
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message
      };
    }
  },

  async updatePassword(newPassword: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      return {
        success: true,
        message: 'Password updated successfully.'
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message
      };
    }
  }
};