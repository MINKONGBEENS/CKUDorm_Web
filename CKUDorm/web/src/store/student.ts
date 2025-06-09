import { create } from 'zustand';
import type { Student } from '../types';

interface StudentState {
  students: Student[];
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  updateStudent: (id: number, updates: Partial<Student>) => void;
  deleteStudent: (id: number) => void;
}

export const useStudentStore = create<StudentState>()((set) => ({
  students: [
    {
      id: 1,
      name: '홍길동',
      studentId: '20240001',
      room: '101',
      department: '컴퓨터공학과',
      contact: '010-1234-5678',
      status: 'ACTIVE'
    }
  ],
  setStudents: (students) => set({ students }),
  addStudent: (student) =>
    set((state) => ({
      students: [...state.students, student]
    })),
  updateStudent: (id, updates) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, ...updates } : student
      )
    })),
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id)
    }))
})); 