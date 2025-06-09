import { create } from 'zustand';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isNew: boolean;
}

interface Stats {
  totalStudents: number;
  pendingStayouts: number;
  pendingRepairs: number;
}

interface Activity {
  id: number;
  type: 'REPAIR' | 'STAYOUT' | 'QNA';
  title: string;
  description: string;
  time: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
}

interface DashboardState {
  notifications: Notification[];
  stats: Stats;
  activities: Activity[];
  setNotifications: (notifications: Notification[]) => void;
  setStats: (stats: Stats) => void;
  setActivities: (activities: Activity[]) => void;
  markNotificationAsRead: (id: number) => void;
  addActivity: (activity: Activity) => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  notifications: [
    {
      id: 1,
      title: "새로운 공지사항",
      message: "2025년 여름방학 기숙사 운영 안내가 등록되었습니다.",
      time: "10분 전",
      isNew: true,
    },
    {
      id: 2,
      title: "고장수리 완료",
      message: "302호 수도꼭지 수리가 완료되었습니다.",
      time: "30분 전",
      isNew: true,
    },
    {
      id: 3,
      title: "외박 신청 승인",
      message: "김민준 학생의 외박 신청이 승인되었습니다.",
      time: "1시간 전",
      isNew: false,
    },
  ],
  stats: {
    totalStudents: 320,
    pendingStayouts: 5,
    pendingRepairs: 3,
  },
  activities: [
    {
      id: 1,
      type: 'REPAIR',
      title: '302호 수도꼭지 수리 완료',
      description: '수도꼭지 누수 현상 해결 완료',
      time: '10분 전',
      icon: 'wrench',
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      type: 'STAYOUT',
      title: '김민준 외박 신청 승인',
      description: '5월 27일 외박 신청 승인 처리',
      time: '30분 전',
      icon: 'moon',
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ],
  setNotifications: (notifications) => set({ notifications }),
  setStats: (stats) => set({ stats }),
  setActivities: (activities) => set({ activities }),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, isNew: false } : notification
      ),
    })),
  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities],
    })),
})); 