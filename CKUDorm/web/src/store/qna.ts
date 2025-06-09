import { create } from 'zustand';
import type { Question } from '../types';

interface QnaState {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (id: number, updates: Partial<Question>) => void;
  deleteQuestion: (id: number) => void;
}

export const useQnaStore = create<QnaState>()((set) => ({
  questions: [
    {
      id: 1,
      title: '기숙사 입사 날짜 문의',
      category: 'ADMISSION',
      content: '2024년 1학기 기숙사 입사 날짜가 언제인가요?',
      date: '2024-03-15',
      answer: ''
    },
    {
      id: 2,
      title: '세탁기 사용 방법',
      category: 'FACILITY',
      content: '세탁기 사용 방법을 알려주세요.',
      date: '2024-03-14',
      answer: '1층 세탁실에 있는 세탁기는 카드로 결제 후 사용 가능합니다. 세제는 개인 준비물입니다.'
    },
    {
      id: 3,
      title: '방학 중 기숙사 사용',
      category: 'OTHER',
      content: '방학 중에도 기숙사에 머물 수 있나요?',
      date: '2024-03-13',
      answer: '방학 중 기숙사 사용은 별도 신청이 필요합니다. 학과 사무실에서 신청서를 받아 작성해주세요.'
    }
  ],
  setQuestions: (questions) => set({ questions }),
  addQuestion: (question) => 
    set((state) => ({ 
      questions: [...state.questions, question] 
    })),
  updateQuestion: (id, updates) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
    })),
  deleteQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),
})); 