// src/types/types.ts

export interface Student {
  id: number;
  name: string;
  department_id: number;
  department_name: string;
  grade: number;
  student_id: string;
  phone: string;
  dormitory: string;
  room_number: string;
  password: string;
  status?: 'ACTIVE' | 'INACTIVE';
  points?: number;
}

export type StudentCreateInput = Omit<Student, 'id' | 'points' | 'department_name'>;
export type StudentUpdateInput = Partial<StudentCreateInput>;
  