import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNoticeStore } from '../../store/notice';

export const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notices } = useNoticeStore();
  
  const notice = notices.find((n) => n.id === Number(id));

  if (!notice) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            존재하지 않는 공지사항입니다.
          </h1>
          <button
            onClick={() => navigate('/notice')}
            className="text-[#006272] hover:underline"
          >
            공지사항 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
              {notice.category}
            </span>
            <div className="text-sm text-gray-500">
              작성일: {new Date(notice.createdAt).toLocaleDateString()}
              {notice.updatedAt !== notice.createdAt && (
                <span className="ml-2">
                  (수정일: {new Date(notice.updatedAt).toLocaleDateString()})
                </span>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{notice.title}</h1>
        </div>
        <div className="p-6">
          <div className="prose max-w-none">
            {notice.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => navigate('/notice')}
            className="text-[#006272] hover:underline"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail; 