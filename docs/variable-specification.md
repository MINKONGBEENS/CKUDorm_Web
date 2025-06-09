# 📝 변수 명세서

<div align="center">

![CKU Dormitory Management System - Variable Specification](https://via.placeholder.com/800x200?text=Variable+Specification)

</div>

## 🧩 1. 공통 컴포넌트

### 🔘 1.1 Button.tsx

#### 📋 인터페이스 정의
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'danger'  // 버튼 스타일 변형
  size: 'sm' | 'md' | 'lg'                                // 버튼 크기
  isLoading: boolean                                      // 로딩 상태
  className: string                                       // 추가 스타일 클래스
  children: ReactNode                                     // 버튼 내용
  disabled: boolean                                       // 비활성화 상태
  onClick?: () => void                                   // 클릭 이벤트 핸들러
  type?: 'button' | 'submit' | 'reset'                   // 버튼 타입
  icon?: ReactNode                                       // 버튼 아이콘
  fullWidth?: boolean                                    // 너비 100% 여부
}
```

#### 🎨 스타일 상수
```typescript
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

#### 📊 사용 예시
```tsx
// 기본 사용
<Button variant="primary" size="md">
  버튼
</Button>

// 로딩 상태
<Button variant="primary" size="md" isLoading>
  저장 중...
</Button>

// 아이콘 포함
<Button variant="outline" size="sm" icon={<IconSearch />}>
  검색
</Button>

// 전체 너비
<Button variant="secondary" size="lg" fullWidth>
  로그인
</Button>
```

### 📝 1.2 Input.tsx

#### 📋 인터페이스 정의
```typescript
interface InputProps {
  label: string                                          // 입력 필드 레이블
  error?: string                                         // 에러 메시지
  helperText?: string                                    // 도움말 텍스트
  className?: string                                     // 추가 스타일 클래스
  type: 'text' | 'password' | 'email' | 'number'        // 입력 필드 타입
  name: string                                          // 필드 이름
  value: string                                         // 필드 값
  onChange: (e: ChangeEvent<HTMLInputElement>) => void  // 값 변경 핸들러
  placeholder?: string                                  // 플레이스홀더
  required?: boolean                                    // 필수 입력 여부
  disabled?: boolean                                    // 비활성화 상태
  maxLength?: number                                    // 최대 입력 길이
  pattern?: string                                      // 입력 패턴
  autoComplete?: string                                 // 자동완성 설정
}

interface InputState {
  isFocused: boolean                                    // 포커스 상태
  isHovered: boolean                                    // 호버 상태
  isDirty: boolean                                      // 수정 여부
}
```

#### 🎨 스타일 상수
```typescript
const inputStyles = {
  base: 'w-full px-4 py-2 border rounded-md transition-all duration-200',
  focused: 'border-[#006272] ring-1 ring-[#006272]',
  error: 'border-red-500 ring-1 ring-red-500',
  disabled: 'bg-gray-100 cursor-not-allowed',
}

const labelStyles = {
  base: 'block text-sm font-medium text-gray-700 mb-1',
  error: 'text-red-500',
  required: 'after:content-["*"] after:ml-0.5 after:text-red-500',
}
```

#### 📊 사용 예시
```tsx
// 기본 텍스트 입력
<Input
  label="이름"
  type="text"
  name="name"
  value={name}
  onChange={handleChange}
  required
/>

// 비밀번호 입력
<Input
  label="비밀번호"
  type="password"
  name="password"
  value={password}
  onChange={handleChange}
  helperText="8자 이상 입력해주세요"
/>

// 에러 상태
<Input
  label="이메일"
  type="email"
  name="email"
  value={email}
  onChange={handleChange}
  error="올바른 이메일 형식이 아닙니다"
/>
```

### 🔽 1.3 Modal.tsx

#### 📋 인터페이스 정의
```typescript
interface ModalProps {
  isOpen: boolean                                        // 모달 표시 여부
  onClose: () => void                                   // 닫기 핸들러
  title: string                                         // 모달 제목
  children: ReactNode                                   // 모달 내용
  footer?: ReactNode                                    // 모달 하단 영역
  size: 'sm' | 'md' | 'lg'                             // 모달 크기
  className?: string                                    // 추가 스타일 클래스
  closeOnOverlayClick?: boolean                        // 오버레이 클릭 시 닫기
  showCloseButton?: boolean                            // 닫기 버튼 표시
  animation?: 'fade' | 'slide' | 'scale'               // 애니메이션 효과
  zIndex?: number                                      // z-index 값
}

interface ModalState {
  isAnimating: boolean                                 // 애니메이션 상태
  isVisible: boolean                                   // 표시 상태
}
```

#### 🎨 스타일 상수
```typescript
const modalStyles = {
  base: 'fixed inset-0 z-50 flex items-center justify-center',
  overlay: 'fixed inset-0 bg-black bg-opacity-50',
  content: 'bg-white rounded-lg shadow-xl',
  sizes: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  }
}

const animationStyles = {
  fade: 'transition-opacity duration-300',
  slide: 'transition-transform duration-300',
  scale: 'transition-transform duration-300 scale'
}
```

#### 📊 사용 예시
```tsx
// 기본 모달
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="알림"
  size="md"
>
  <p>모달 내용입니다.</p>
</Modal>

// 커스텀 푸터
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="확인"
  size="sm"
  footer={
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={handleClose}>취소</Button>
      <Button variant="primary" onClick={handleConfirm}>확인</Button>
    </div>
  }
>
  <p>저장하시겠습니까?</p>
</Modal>
```

## 🔐 2. 인증 관련

### 🔄 2.1 auth/store.ts

#### 📋 인터페이스 정의
```typescript
interface User {
  id: number                                            // 사용자 ID
  username: string                                      // 사용자명
  name: string                                         // 실제 이름
  role: 'ADMIN' | 'MANAGER' | 'STAFF'                 // 사용자 권한
  email: string                                       // 이메일
  lastLogin: string                                   // 최근 로그인
  isActive: boolean                                   // 활성화 상태
}

interface AuthState {
  user: User | null                                    // 현재 사용자 정보
  isAuthenticated: boolean                             // 인증 상태
  token: string | null                                 // 인증 토큰
  refreshToken: string | null                          // 리프레시 토큰
  expiresAt: number | null                            // 토큰 만료 시간
  isLoading: boolean                                   // 로딩 상태
  error: string | null                                 // 에러 메시지
}

interface AuthActions {
  login: (username: string, password: string) => Promise<void>  // 로그인
  logout: () => void                                           // 로그아웃
  refreshSession: () => Promise<void>                          // 세션 갱신
  updateUser: (data: Partial<User>) => void                    // 사용자 정보 수정
  resetPassword: (email: string) => Promise<void>              // 비밀번호 초기화
}
```

#### 📊 사용 예시
```typescript
// 스토어 생성
const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  expiresAt: null,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.auth.login(username, password);
      set({
        user: response.user,
        isAuthenticated: true,
        token: response.token,
        refreshToken: response.refreshToken,
        expiresAt: response.expiresAt,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      expiresAt: null,
    });
  }
}));
```

### 📝 2.2 auth/login.tsx

#### 📋 인터페이스 정의
```typescript
interface LoginForm {
  username: string                                     // 아이디
  password: string                                     // 비밀번호
  rememberMe: boolean                                  // 자동 로그인
}

interface LoginState {
  isLoading: boolean                                  // 로딩 상태
  error: string | null                                // 에러 메시지
  formData: LoginForm                                 // 폼 데이터
  touched: Record<keyof LoginForm, boolean>           // 필드 터치 여부
  validationErrors: Record<keyof LoginForm, string>   // 유효성 검사 에러
}

interface LoginValidation {
  username: (value: string) => string | null          // 아이디 검증
  password: (value: string) => string | null          // 비밀번호 검증
}
```

#### 📊 사용 예시
```typescript
// 폼 상태 관리
const [formData, setFormData] = useState<LoginForm>({
  username: '',
  password: '',
  rememberMe: false
});

// 유효성 검사
const validateForm = (data: LoginForm) => {
  const errors: Record<keyof LoginForm, string> = {
    username: !data.username ? '아이디를 입력하세요' : null,
    password: !data.password ? '비밀번호를 입력하세요' : null,
    rememberMe: null
  };
  return errors;
};

// 폼 제출
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const errors = validateForm(formData);
  if (Object.values(errors).some(Boolean)) {
    setValidationErrors(errors);
    return;
  }
  try {
    await login(formData.username, formData.password);
  } catch (error) {
    setError(error.message);
  }
};
```

## 📊 3. 대시보드

### 🔄 3.1 dashboard/store.ts

#### 📋 인터페이스 정의
```typescript
interface Notification {
  id: number                                          // 알림 ID
  title: string                                       // 알림 제목
  message: string                                     // 알림 내용
  time: string                                        // 알림 시간
  isNew: boolean                                      // 새 알림 여부
  type: 'INFO' | 'WARNING' | 'ERROR'                 // 알림 유형
  link?: string                                      // 연결 링크
  read?: boolean                                     // 읽음 여부
}

interface Stats {
  totalStudents: number                               // 전체 학생 수
  pendingStayouts: number                            // 대기 중인 외박 신청
  pendingRepairs: number                             // 대기 중인 수리 요청
  occupancyRate: number                              // 입실률
  pointAverage: number                               // 평균 상벌점
  mealSatisfaction: number                           // 식단 만족도
}

interface Activity {
  id: number                                         // 활동 ID
  type: 'REPAIR' | 'STAYOUT' | 'QNA'                // 활동 유형
  title: string                                      // 활동 제목
  description: string                                // 활동 설명
  time: string                                       // 활동 시간
  status: 'PENDING' | 'APPROVED' | 'REJECTED'       // 처리 상태
  priority: 'LOW' | 'MEDIUM' | 'HIGH'               // 우선순위
  assignee?: string                                 // 담당자
  dueDate?: string                                  // 처리 기한
}

interface DashboardState {
  notifications: Notification[]                      // 알림 목록
  stats: Stats                                      // 통계 정보
  activities: Activity[]                            // 활동 목록
  isLoading: boolean                                // 로딩 상태
  error: string | null                              // 에러 메시지
  lastUpdated: string | null                        // 최근 갱신 시간
}

interface DashboardActions {
  fetchDashboard: () => Promise<void>               // 대시보드 데이터 조회
  markNotificationAsRead: (id: number) => void      // 알림 읽음 처리
  clearNotifications: () => void                    // 알림 전체 삭제
  updateStats: (stats: Partial<Stats>) => void      // 통계 정보 업데이트
}
```

#### 📊 사용 예시
```typescript
// 스토어 생성
const useDashboardStore = create<DashboardState & DashboardActions>((set) => ({
  notifications: [],
  stats: {
    totalStudents: 0,
    pendingStayouts: 0,
    pendingRepairs: 0,
    occupancyRate: 0,
    pointAverage: 0,
    mealSatisfaction: 0
  },
  activities: [],
  isLoading: false,
  error: null,
  lastUpdated: null,

  fetchDashboard: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.dashboard.getData();
      set({
        notifications: data.notifications,
        stats: data.stats,
        activities: data.activities,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isNew: false } : n
      )
    }));
  }
}));
```

[이하 다른 스토어들도 같은 형식으로 계속됩니다...] 