# 변수 명세서

## 1. 공통 컴포넌트

### 1.1 Button.tsx
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'danger'  // 버튼 스타일 변형
  size: 'sm' | 'md' | 'lg'                                // 버튼 크기
  isLoading: boolean                                      // 로딩 상태
  className: string                                       // 추가 스타일 클래스
  children: ReactNode                                     // 버튼 내용
  disabled: boolean                                       // 비활성화 상태
}

const variantStyles = {
  primary: 'bg-[#006272] text-white hover:bg-[#005261]'  // 기본 버튼 스타일
  secondary: 'bg-white text-gray-700 border'             // 보조 버튼 스타일
  outline: 'bg-transparent border-[#006272]'             // 외곽선 버튼 스타일
  danger: 'bg-red-600 text-white'                        // 위험 버튼 스타일
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm'                             // 작은 크기
  md: 'px-4 py-2 text-sm'                               // 중간 크기
  lg: 'px-6 py-3 text-base'                             // 큰 크기
}
```

### 1.2 Input.tsx
```typescript
interface InputProps {
  label: string                                          // 입력 필드 레이블
  error: string                                          // 에러 메시지
  helperText: string                                     // 도움말 텍스트
  className: string                                      // 추가 스타일 클래스
  type: string                                          // 입력 필드 타입
  name: string                                          // 필드 이름
  value: string                                         // 필드 값
  onChange: (e: ChangeEvent<HTMLInputElement>) => void  // 값 변경 핸들러
}
```

### 1.3 Modal.tsx
```typescript
interface ModalProps {
  isOpen: boolean                                        // 모달 표시 여부
  onClose: () => void                                   // 닫기 핸들러
  title: string                                         // 모달 제목
  children: ReactNode                                   // 모달 내용
  footer?: ReactNode                                    // 모달 하단 영역
  size: 'sm' | 'md' | 'lg'                             // 모달 크기
  className: string                                     // 추가 스타일 클래스
}
```

## 2. 인증 관련

### 2.1 auth/store.ts
```typescript
interface User {
  id: number                                            // 사용자 ID
  username: string                                      // 사용자명
  name: string                                         // 실제 이름
  role: 'ADMIN'                                        // 사용자 권한
}

interface AuthState {
  user: User | null                                    // 현재 사용자 정보
  isAuthenticated: boolean                             // 인증 상태
  token: string | null                                 // 인증 토큰
  login: (username: string, password: string) => Promise<void>  // 로그인 함수
  logout: () => void                                   // 로그아웃 함수
}
```

### 2.2 auth/login.tsx
```typescript
interface LoginForm {
  username: string                                     // 아이디
  password: string                                     // 비밀번호
}

interface LoginState {
  isLoading: boolean                                  // 로딩 상태
  error: string                                       // 에러 메시지
  formData: LoginForm                                 // 폼 데이터
}
```

## 3. 대시보드

### 3.1 dashboard/store.ts
```typescript
interface Notification {
  id: number                                          // 알림 ID
  title: string                                       // 알림 제목
  message: string                                     // 알림 내용
  time: string                                        // 알림 시간
  isNew: boolean                                      // 새 알림 여부
}

interface Stats {
  totalStudents: number                               // 전체 학생 수
  pendingStayouts: number                            // 대기 중인 외박 신청
  pendingRepairs: number                             // 대기 중인 수리 요청
}

interface Activity {
  id: number                                         // 활동 ID
  type: 'REPAIR' | 'STAYOUT' | 'QNA'                // 활동 유형
  title: string                                      // 활동 제목
  description: string                                // 활동 설명
  time: string                                       // 활동 시간
  icon: string                                       // 아이콘
  iconBgColor: string                               // 아이콘 배경색
  iconColor: string                                 // 아이콘 색상
}

interface DashboardState {
  notifications: Notification[]                      // 알림 목록
  stats: Stats                                      // 통계 정보
  activities: Activity[]                            // 활동 목록
}
```

## 4. 공지사항

### 4.1 notice/store.ts
```typescript
interface Notice {
  id: number                                        // 공지사항 ID
  title: string                                     // 제목
  content: string                                   // 내용
  category: string                                  // 카테고리
  createdAt: string                                // 작성일
  updatedAt: string                                // 수정일
}

interface NoticeState {
  notices: Notice[]                                // 공지사항 목록
  setNotices: (notices: Notice[]) => void         // 공지사항 목록 설정
  addNotice: (notice: Notice) => void             // 공지사항 추가
  updateNotice: (id: number, updates: Partial<Notice>) => void  // 공지사항 수정
  deleteNotice: (id: number) => void              // 공지사항 삭제
}
```

## 5. 학생 관리

### 5.1 student/store.ts
```typescript
interface Student {
  id: number                                       // 학생 ID
  name: string                                     // 이름
  studentId: string                                // 학번
  room: string                                     // 호실
  department: string                               // 학과
  contact: string                                  // 연락처
  status: 'ACTIVE' | 'INACTIVE'                    // 상태
}

interface StudentState {
  students: Student[]                              // 학생 목록
  setStudents: (students: Student[]) => void      // 학생 목록 설정
  addStudent: (student: Student) => void          // 학생 추가
  updateStudent: (id: number, updates: Partial<Student>) => void  // 학생 정보 수정
  deleteStudent: (id: number) => void             // 학생 삭제
}
```

## 6. 외박 관리

### 6.1 overnight/store.ts
```typescript
interface Overnight {
  id: number                                      // 외박 ID
  studentId: string                               // 학생 학번
  startDate: string                               // 시작일
  endDate: string                                 // 종료일
  reason: string                                  // 사유
  status: 'PENDING' | 'APPROVED' | 'REJECTED'     // 상태
}

interface OvernightState {
  overnights: Overnight[]                         // 외박 신청 목록
  setOvernights: (overnights: Overnight[]) => void  // 외박 목록 설정
  addOvernight: (overnight: Overnight) => void    // 외박 신청 추가
  updateOvernight: (id: number, updates: Partial<Overnight>) => void  // 외박 정보 수정
  deleteOvernight: (id: number) => void          // 외박 신청 삭제
  getStudentOvernights: (studentId: string) => Overnight[]  // 학생별 외박 조회
  getPendingOvernights: () => Overnight[]        // 대기 중인 외박 조회
}
```

[이하 다른 페이지들도 같은 형식으로 계속됩니다...] 