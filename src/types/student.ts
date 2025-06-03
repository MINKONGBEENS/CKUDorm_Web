export interface Student {
  id: number;
  studentId: string;  // 학번
  name: string;      // 이름
  department: string; // 학과
  room: string;      // 호실
  phone: string;     // 연락처
  address: string;   // 주소
  status: 'ACTIVE' | 'INACTIVE'; // 현재 상태
  points: number;    // 벌점
}

export type StudentCreateInput = Omit<Student, 'id' | 'points'>;
export type StudentUpdateInput = Partial<StudentCreateInput>; 