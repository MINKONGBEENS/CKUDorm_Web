export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface Student {
  id: string;
  name: string;
  roomNumber: string;
  // 추가 필요한 학생 정보 필드
}

export interface QnA {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  // 추가 필요한 QnA 필드
}

export interface RepairReport {
  id: string;
  roomNumber: string;
  issue: string;
  status: 'pending' | 'in_progress' | 'completed';
  // 추가 필요한 수리 신청 필드
}

export interface RoomChange {
  id: string;
  studentId: string;
  currentRoom: string;
  requestedRoom: string;
  status: 'pending' | 'approved' | 'rejected';
  // 추가 필요한 호실 변경 필드
}

export interface MealMenu {
  id: string;
  date: string;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  // 추가 필요한 식단 필드
} 