import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 사이드바 */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-4 flex flex-col items-center">
          {/* 로고 이미지 */}
          <img src="/assets/logo/logo.svg" alt="CKUDorm Logo" className="w-24 h-24 mb-4" style={{ filter: 'invert(24%) sepia(99%) saturate(747%) hue-rotate(153deg) brightness(97%) contrast(101%)' }} />
          {/* 타이틀 */}
          <h1 className="text-4xl font-bold mb-2 text-[#006272]" style={{ fontFamily: 'Blacksword, cursive' }}>CkuDorm</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="/"
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/') ? 'bg-gray-100 border-r-4 border-[#006272]' : ''
            }`}
          >
            <i className="fas fa-home w-6"></i>
            <span>대시보드</span>
          </Link>
          <Link
            to="/student-management"
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/student-management') ? 'bg-gray-100 border-r-4 border-[#006272]' : ''
            }`}
          >
            <i className="fas fa-users w-6"></i>
            <span>학생 관리</span>
          </Link>
          <Link
            to="/repair-report"
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/repair-report') ? 'bg-gray-100 border-r-4 border-[#006272]' : ''
            }`}
          >
            <i className="fas fa-tools w-6"></i>
            <span>고장 수리접수</span>
          </Link>
          <Link
            to="/room-change"
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/room-change') ? 'bg-gray-100 border-r-4 border-[#006272]' : ''
            }`}
          >
            <i className="fas fa-exchange-alt w-6"></i>
            <span>호실 변경</span>
          </Link>
          <Link
            to="/qna"
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/qna') ? 'bg-gray-100 border-r-4 border-[#006272]' : ''
            }`}
          >
            <i className="fas fa-question-circle w-6"></i>
            <span>Q&A</span>
          </Link>
          <Link
            to="/meal-menu"
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive('/meal-menu') ? 'bg-gray-100 border-r-4 border-[#006272]' : ''
            }`}
          >
            <i className="fas fa-utensils w-6"></i>
            <span>식단표</span>
          </Link>
        </nav>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout; 