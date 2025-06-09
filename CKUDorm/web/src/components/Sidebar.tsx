import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuCategories = [
    {
      title: '기본 정보',
      items: [
        { path: '/', icon: 'home', label: '대시보드' },
        { path: '/notice', icon: 'bullhorn', label: '공지사항 관리' },
      ]
    },
    {
      title: '입주생 관리',
      items: [
        { path: '/student', icon: 'users', label: '입주생 관리' },
        { path: '/points', icon: 'star', label: '상벌점 관리' },
        { path: '/overnight', icon: 'moon', label: '외박신청 관리' },
      ]
    },
    {
      title: '시설 관리',
      items: [
        { path: '/repair', icon: 'tools', label: '시설 보수' },
        { path: '/room-change', icon: 'exchange-alt', label: '호실 변경' },
      ]
    },
    {
      title: '생활 서비스',
      items: [
        { path: '/meal', icon: 'utensils', label: '식단 관리' },
        { path: '/qna', icon: 'question-circle', label: '문의사항' },
      ]
    },
    {
      title: '시스템 관리',
      items: [
        { path: '/admin', icon: 'user-shield', label: '관리자 계정 관리' },
      ]
    },
  ];

  return (
    <div className="w-64 bg-white shadow-sm h-screen flex flex-col">
      <div className="p-4 flex flex-col items-center">
        <img 
          src="/assets/logo/logo.svg" 
          alt="CKUDorm Logo" 
          className="w-24 h-24 mb-4" 
        />
        <h1 
          className="text-4xl font-bold mb-2 text-[#006272]" 
          style={{ fontFamily: 'Blacksword, cursive' }}
        >
          CkuDorm
        </h1>
      </div>
      <nav className="mt-4 flex-grow">
        {menuCategories.map((category, index) => (
          <div key={index} className="mb-4">
            <h2 className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {category.title}
            </h2>
            {category.items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                  isActive(item.path) ? 'bg-gray-100 border-r-4 border-[#006272]' : ''
                }`}
              >
                <i className={`fas fa-${item.icon} w-6`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <i className="fas fa-sign-out-alt w-6"></i>
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 