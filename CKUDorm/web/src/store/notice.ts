import { create } from 'zustand';
import type { Notice } from '../types';

interface NoticeState {
  notices: Notice[];
  setNotices: (notices: Notice[]) => void;
  addNotice: (notice: Notice) => void;
  updateNotice: (id: number, updates: Partial<Notice>) => void;
  deleteNotice: (id: number) => void;
}

export const useNoticeStore = create<NoticeState>()((set) => ({
  notices: [
    {
      id: 1,
      title: '2024학년도 1학기 기숙사 입사 안내',
      content: '2024학년도 1학기 기숙사 입사 일정을 안내드립니다...',
      category: 'IMPORTANT',
      createdAt: '2024-02-15T09:00:00Z',
      updatedAt: '2024-02-15T09:00:00Z'
    }
  ],
  setNotices: (notices) => set({ notices }),
  addNotice: (notice) =>
    set((state) => ({
      notices: [...state.notices, notice]
    })),
  updateNotice: (id, updates) =>
    set((state) => ({
      notices: state.notices.map((notice) =>
        notice.id === id ? { ...notice, ...updates } : notice
      )
    })),
  deleteNotice: (id) =>
    set((state) => ({
      notices: state.notices.filter((notice) => notice.id !== id)
    }))
})); 