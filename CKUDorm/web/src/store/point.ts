import { create } from 'zustand';
import type { Point } from '../types';

interface PointState {
  points: Point[];
  setPoints: (points: Point[]) => void;
  addPoint: (point: Point) => void;
  updatePoint: (id: number, updates: Partial<Point>) => void;
  deletePoint: (id: number) => void;
  getStudentPoints: (studentId: string) => Point[];
}

export const usePointStore = create<PointState>()((set, get) => ({
  points: [
    {
      id: 1,
      studentId: '20240001',
      type: 'MERIT',
      points: 5,
      reason: '기숙사 청소 도우미 활동',
      date: '2024-03-15'
    }
  ],
  setPoints: (points) => set({ points }),
  addPoint: (point) =>
    set((state) => ({
      points: [...state.points, point]
    })),
  updatePoint: (id, updates) =>
    set((state) => ({
      points: state.points.map((point) =>
        point.id === id ? { ...point, ...updates } : point
      )
    })),
  deletePoint: (id) =>
    set((state) => ({
      points: state.points.filter((point) => point.id !== id)
    })),
  getStudentPoints: (studentId) => {
    const state = get();
    return state.points.filter((point) => point.studentId === studentId);
  }
})); 