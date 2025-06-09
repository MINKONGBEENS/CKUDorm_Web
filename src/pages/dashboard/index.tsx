// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDashboardStore } from '../../store/dashboard';
import { NotificationPanel } from './components/NotificationPanel';
import { StatsCard } from './components/StatsCard';
import { ActivityList } from './components/ActivityList';
import { NoticeList } from './components/NoticeList';

export const Dashboard: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { stats } = useDashboardStore();

  // 알림 데이터
  const notifications = [
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
  ];

  // 최근 공지사항 데이터
  const recentNotices = [
    {
      id: 1,
      title: "2025년 여름방학 기숙사 운영 안내",
      date: "2025-05-26",
      category: "공지",
    },
    {
      id: 2,
      title: "기숙사 시설 점검 일정 안내",
      date: "2025-05-24",
      category: "공지",
    },
    {
      id: 3,
      title: "식당 메뉴 변경 안내",
      date: "2025-05-22",
      category: "식당",
    },
    {
      id: 4,
      title: "화재 대피 훈련 실시 안내",
      date: "2025-05-20",
      category: "안전",
    },
    {
      id: 5,
      title: "방학 중 기숙사 사용 신청 안내",
      date: "2025-05-18",
      category: "공지",
    },
  ];

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="fas fa-bell text-xl"></i>
              {showNotifications && (
                <NotificationPanel onClose={() => setShowNotifications(false)} />
              )}
            </button>
          </div>
          <div className="flex items-center cursor-pointer">
            <div className="w-10 h-10 bg-[#006272] rounded-full flex items-center justify-center text-white font-medium">
              KD
            </div>
            <span className="ml-2 text-gray-700">김도현</span>
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="전체 학생 수"
          value={`${stats.totalStudents}명`}
          icon="users"
          iconBgColor="bg-blue-50"
        />
        <StatsCard
          title="미해결 외박 승인 요청"
          value={`${stats.pendingStayouts}건`}
          icon="moon"
          iconBgColor="bg-yellow-50"
        />
        <StatsCard
          title="미해결 고장수리 요청"
          value={`${stats.pendingRepairs}건`}
          icon="wrench"
          iconBgColor="bg-red-50"
        />
      </div>

      {/* 최근 활동 섹션 */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <ActivityList />
        <NoticeList />
      </div>

      {/* 하단 정보 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">기숙사 정보</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt w-5 text-[#006272]"></i>
                <span className="ml-2">대전광역시 유성구 대학로 99</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone w-5 text-[#006272]"></i>
                <span className="ml-2">042-123-4567</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope w-5 text-[#006272]"></i>
                <span className="ml-2">dormitory@university.ac.kr</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">운영 시간</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between">
                <span>행정실</span>
                <span>09:00 - 18:00 (평일)</span>
              </li>
              <li className="flex justify-between">
                <span>경비실</span>
                <span>24시간 운영</span>
              </li>
              <li className="flex justify-between">
                <span>식당</span>
                <span>07:00 - 19:00 (매일)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#006272] hover:underline">
                  기숙사 규정 안내
                </a>
              </li>
              <li>
                <a href="#" className="text-[#006272] hover:underline">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" className="text-[#006272] hover:underline">
                  시설 이용 안내
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
