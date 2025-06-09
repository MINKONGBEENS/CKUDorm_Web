export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'STUDENT';
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  category: 'GENERAL' | 'IMPORTANT' | 'EVENT';
  createdAt: string;
  updatedAt: string;
  author?: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface Student {
  id: number;
  studentId: string;
  name: string;
  department_name: string;
  grade: number;
  dormitory: string;
  roomNumber: string;
  phone: string;
} 