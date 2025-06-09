import { api } from './api';
import type { LoginInput, AuthResponse, CreateStudentInput } from '../types';

export const authService = {
  login: (data: LoginInput) =>
    api.post<AuthResponse>('/auth/login', data),

  register: (data: CreateStudentInput) =>
    api.post<AuthResponse>('/auth/register', data),

  me: () =>
    api.get<AuthResponse>('/auth/me'),

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }
}; 