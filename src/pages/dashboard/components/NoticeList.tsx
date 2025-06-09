import React from 'react';
import { Link } from 'react-router-dom';
import { useNoticeStore } from '../../../store/notice';

export const NoticeList: React.FC = () => {
  const { notices } = useNoticeStore();
  const recentNotices = notices.slice(0, 5);

  return (
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
        <div className="space-y-4">
          {recentNotices.map((notice) => (
            <Link
              key={notice.id}
              to={`/notice/${notice.id}`}
              className="block p-4 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 mb-2">
                    {notice.category}
                  </span>
                  <h3 className="font-medium">{notice.title}</h3>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}; 