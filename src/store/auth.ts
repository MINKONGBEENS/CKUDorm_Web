import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  username: string;
  name: string;
  role: 'ADMIN';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      login: async (username: string, password: string) => {
        try {
          // TODO: API 호출로 변경
          if (username === 'admin' && password === 'admin') {
            set({
              user: {
                id: 1,
                username: 'admin',
                name: '관리자',
                role: 'ADMIN'
              },
              isAuthenticated: true,
              token: 'dummy-token'
            });
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          throw error;
        }
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token
      })
    }
  )
); 