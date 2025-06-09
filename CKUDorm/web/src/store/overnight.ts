import { create } from 'zustand';
import type { Overnight } from '../types';

interface OvernightState {
  overnights: Overnight[];
  setOvernights: (overnights: Overnight[]) => void;
  addOvernight: (overnight: Overnight) => void;
  updateOvernight: (id: number, updates: Partial<Overnight>) => void;
  deleteOvernight: (id: number) => void;
  getStudentOvernights: (studentId: string) => Overnight[];
  getPendingOvernights: () => Overnight[];
}

export const useOvernightStore = create<OvernightState>()((set, get) => ({
  overnights: [
    {
      id: 1,
      studentId: '20240001',
      startDate: '2024-03-15',
      endDate: '2024-03-17',
      reason: '가족 행사 참석',
      status: 'PENDING'
    }
  ],
  setOvernights: (overnights) => set({ overnights }),
  addOvernight: (overnight) =>
    set((state) => ({
      overnights: [...state.overnights, overnight]
    })),
  updateOvernight: (id, updates) =>
    set((state) => ({
      overnights: state.overnights.map((overnight) =>
        overnight.id === id ? { ...overnight, ...updates } : overnight
      )
    })),
  deleteOvernight: (id) =>
    set((state) => ({
      overnights: state.overnights.filter((overnight) => overnight.id !== id)
    })),
  getStudentOvernights: (studentId) => {
    const state = get();
    return state.overnights.filter((overnight) => overnight.studentId === studentId);
  },
  getPendingOvernights: () => {
    const state = get();
    return state.overnights.filter((overnight) => overnight.status === 'PENDING');
  }
})); 