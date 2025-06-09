export interface Student {
  id: number;
  name: string;
  departmentId: number;
  grade: number;
  studentId: string;
  phone: string;
  dormitory: string;
  roomNumber: string;
  department_name?: string;
  points?: number;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Question {
  id: number;
  title: string;
  content: string;
  answer?: string;
  createdAt: Date;
  updatedAt: Date;
  student: Student;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  category: 'GENERAL' | 'IMPORTANT' | 'EVENT';
  createdAt: Date;
  updatedAt: Date;
  author: Student;
}

export interface Point {
  id: number;
  score: number;
  type: 'MERIT' | 'DEMERIT';
  reason: string;
  createdAt: Date;
  student: Student;
}

export interface Overnight {
  id: number;
  startDate: Date;
  endDate: Date;
  destination: string;
  reason: string;
  emergencyContact: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
  student: Student;
}

export interface RepairRequest {
  id: number;
  title: string;
  content: string;
  category: 'ELECTRICAL' | 'PLUMBING' | 'FURNITURE' | 'OTHER';
  location: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
  student: Student;
}

export interface PaginationInfo {
  total: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}

export interface LoginInput {
  studentId: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  student: Student;
}

export type CreateStudentInput = Omit<Student, 'id' | 'points' | 'isAdmin' | 'createdAt' | 'updatedAt'>;
export type UpdateStudentInput = Partial<CreateStudentInput>;

export type CreateNoticeInput = Omit<Notice, 'id' | 'createdAt' | 'updatedAt' | 'author'>;
export type UpdateNoticeInput = Partial<CreateNoticeInput>;

export type CreateQuestionInput = Omit<Question, 'id' | 'answer' | 'createdAt' | 'updatedAt' | 'student'>;
export type UpdateQuestionInput = Partial<CreateQuestionInput>;

export type CreatePointInput = Omit<Point, 'id' | 'createdAt' | 'student'>;

export type CreateOvernightInput = Omit<Overnight, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'student'>;
export type UpdateOvernightInput = Partial<CreateOvernightInput>;

export type CreateRepairRequestInput = Omit<RepairRequest, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'student'>;
export type UpdateRepairRequestInput = Partial<CreateRepairRequestInput>; 