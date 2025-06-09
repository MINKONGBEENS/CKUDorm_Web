import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from '../api/axios';

interface User {
  id: number;
  studentId: string;
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
          const response = await axiosInstance.post('/auth/login', {
            studentId: username,
            password: password
          });

          const { accessToken } = response.data.data;
          
          // JWT 토큰을 디코드하여 사용자 정보 추출
          const base64Url = accessToken.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const payload = JSON.parse(window.atob(base64));

          // 토큰을 localStorage에 저장 (axios 인터셉터가 사용)
          localStorage.setItem('token', accessToken);

          // 상태 업데이트
          set({
            user: {
              id: payload.sub,
              studentId: payload.studentId,
              name: payload.name,
              role: payload.role
            },
            isAuthenticated: true,
            token: accessToken
          });

          // axios 인스턴스의 헤더 업데이트
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      logout: () => {
        // 토큰 제거
        localStorage.removeItem('token');
        
        // axios 헤더에서 토큰 제거
        delete axiosInstance.defaults.headers.common['Authorization'];
        
        // 상태 초기화
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