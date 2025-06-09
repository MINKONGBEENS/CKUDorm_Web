import axios from 'axios';
import type { ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
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

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;

export const apiClient = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  post: async <T>(url: string, data: unknown): Promise<ApiResponse<T>> => {
    try {
      const response = await api.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  put: async <T>(url: string, data: unknown): Promise<ApiResponse<T>> => {
    try {
      const response = await api.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await api.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return new Error(
      error.response?.data?.message || 
      error.message || 
      '서버와의 통신 중 오류가 발생했습니다.'
    );
  }
  return new Error('알 수 없는 오류가 발생했습니다.');
}; 