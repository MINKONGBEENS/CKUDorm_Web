export interface Student {
  id: number;
  name: string;
  studentId: string;
  room: string;
  department: string;
  contact: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Question {
  id: number;
  title: string;
  category: 'ADMISSION' | 'FACILITY' | 'LIFE' | 'OTHER';
  content: string;
  date: string;
  answer?: string;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  category: 'GENERAL' | 'IMPORTANT' | 'EVENT';
  createdAt: string;
  updatedAt: string;
}

export interface Point {
  id: number;
  studentId: string;
  type: 'MERIT' | 'DEMERIT';
  points: number;
  reason: string;
  date: string;
}

export interface Overnight {
  id: number;
  studentId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface RepairRequest {
  id: number;
  room: string;
  category: 'ELECTRICAL' | 'PLUMBING' | 'FURNITURE' | 'OTHER';
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  completedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 