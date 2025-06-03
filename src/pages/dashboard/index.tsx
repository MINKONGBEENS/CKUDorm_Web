// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

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

  // 통계 데이터
  const stats = {
    totalStudents: 320,
    pendingStayouts: 5,
    pendingRepairs: 3,
  };

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
              {/* 알림 모달 */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-medium">알림</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 ${notification.isNew ? "bg-blue-50" : ""}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-sm">
                                {notification.title}
                              </h4>
                              <p className="text-gray-600 text-sm mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        새로운 알림이 없습니다
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <a
                      href="#"
                      className="text-[#006272] text-sm font-medium"
                    >
                      모든 알림 보기
                    </a>
                  </div>
                </div>
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
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500 mb-1">전체 학생 수</div>
            <div className="text-2xl font-bold">
              {stats.totalStudents}명
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <i className="fas fa-users text-[#006272] text-xl"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              미해결 외박 승인 요청
            </div>
            <div className="text-2xl font-bold">
              {stats.pendingStayouts}건
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
            <i className="fas fa-moon text-[#006272] text-xl"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500 mb-1">
              미해결 고장수리 요청
            </div>
            <div className="text-2xl font-bold">
              {stats.pendingRepairs}건
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <i className="fas fa-wrench text-[#006272] text-xl"></i>
          </div>
        </div>
      </div>

      {/* 최근 활동 섹션 */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* 최근 활동 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold">최근 활동</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm rounded-full bg-[#006272] text-white">
                전체
              </button>
              <button className="px-3 py-1 text-sm rounded-full text-gray-600 hover:bg-gray-100">
                고장수리
              </button>
              <button className="px-3 py-1 text-sm rounded-full text-gray-600 hover:bg-gray-100">
                외박신청
              </button>
              <button className="px-3 py-1 text-sm rounded-full text-gray-600 hover:bg-gray-100">
                QnA
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-wrench text-blue-600"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      302호 수도꼭지 수리 완료
                    </h3>
                    <span className="text-sm text-gray-500">10분 전</span>
                  </div>
                  <p className="text-gray-600 mt-1">
                    수도꼭지 누수 현상 해결 완료
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-moon text-yellow-600"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">김민준 외박 신청 승인</h3>
                    <span className="text-sm text-gray-500">30분 전</span>
                  </div>
                  <p className="text-gray-600 mt-1">
                    5월 27일 외박 신청 승인 처리
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 최근 공지사항 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold">최근 공지사항</h2>
            <Link
              to="/notice"
              className="text-[#006272] text-sm font-medium cursor-pointer"
            >
              전체 보기
            </Link>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-100">
              {recentNotices.map((notice) => (
                <li
                  key={notice.id}
                  className="py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium mr-3 ${
                          notice.category === "공지"
                            ? "bg-blue-100 text-blue-800"
                            : notice.category === "안전"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {notice.category}
                      </span>
                      <span className="text-gray-800">{notice.title}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {notice.date}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
