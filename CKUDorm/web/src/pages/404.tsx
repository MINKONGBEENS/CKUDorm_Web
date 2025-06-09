import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-[#006272] sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                페이지를 찾을 수 없습니다
              </h1>
              <p className="mt-1 text-base text-gray-500">
                요청하신 페이지의 주소가 잘못되었거나 더 이상 제공되지 않는 페이지입니다.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#006272] hover:bg-[#005261] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006272]"
              >
                홈으로 돌아가기
              </Link>
              <Link
                to="/qna"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#006272] bg-[#006272]/10 hover:bg-[#006272]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006272]"
              >
                문의하기
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFound; 