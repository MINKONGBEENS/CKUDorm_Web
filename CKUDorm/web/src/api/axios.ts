import axios from 'axios';
import { useAuthStore } from '../store/auth';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => {
    // 성공적인 응답일 경우
    if (response.data.success) {
      return response;
    }
    // success가 false인 경우
    return Promise.reject(new Error(response.data.message || '알 수 없는 오류가 발생했습니다.'));
  },
  (error) => {
    // 401 에러 처리
    if (error.response?.status === 401) {
      // 토큰 제거
      localStorage.removeItem('token');
      // 전역 상태의 인증 정보도 초기화
      useAuthStore.getState().logout();
      // 현재 페이지가 로그인 페이지가 아닐 때만 리다이렉션
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
); 