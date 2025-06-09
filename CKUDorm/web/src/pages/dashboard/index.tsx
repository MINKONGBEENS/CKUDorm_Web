// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
// TODO: 페이지 네비게이션 구현 시 사용될 Link 컴포넌트
// import { Link } from 'react-router-dom';
import { useDashboardStore } from '../../store/dashboard';
import { NotificationPanel } from './components/NotificationPanel';
import { StatsCard } from './components/StatsCard';
import { ActivityList } from './components/ActivityList';
import { NoticeList } from './components/NoticeList';

export const Dashboard: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { stats } = useDashboardStore();

  // TODO: 알림 시스템 구현 시 사용될 데이터
  /* const notifications = [
    // 알림 데이터 구조 정의
  ]; */

  // TODO: 공지사항 시스템 구현 시 사용될 데이터
  /* const recentNotices = [
    // 최근 공지사항 데이터 구조 정의
  ]; */

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
