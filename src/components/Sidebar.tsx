import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/', icon: 'home', label: '대시보드' },
    { path: '/student', icon: 'users', label: '학생 관리' },
    { path: '/repair', icon: 'tools', label: '고장 수리접수' },
    { path: '/room-change', icon: 'exchange-alt', label: '호실 변경' },
    { path: '/qna', icon: 'question-circle', label: 'Q&A' },
    { path: '/meal', icon: 'utensils', label: '식단표' },
  ];

  return (
    <div className="w-64 bg-white shadow-sm">
      <div className="p-4 flex flex-col items-center">
        <img 
          src="/assets/logo/logo.svg" 
          alt="CKUDorm Logo" 
          className="w-24 h-24 mb-4" 
          style={{ filter: 'invert(24%) sepia(99%) saturate(747%) hue-rotate(153deg) brightness(97%) contrast(101%)' }} 
        />
        <h1 
          className="text-4xl font-bold mb-2 text-[#006272]" 
          style={{ fontFamily: 'Blacksword, cursive' }}
        >
          CkuDorm
        </h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
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
      </nav>
    </div>
  );
};

export default Sidebar; 