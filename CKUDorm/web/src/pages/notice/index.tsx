import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Notice {
  id: number;
  title: string;
  category: string;
  content: string;
  is_important: boolean;
  created_at: string;
  views: number;
}

const NoticeManagement: React.FC = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: '공지',
    content: '',
    is_important: false,
  });

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: '2025년 여름방학 기숙사 운영 안내',
      category: '공지',
      content: '2025년 여름방학 기간 기숙사 운영에 대해 안내드립니다...',
      is_important: true,
      created_at: '2024-03-15',
      views: 145,
    },
    {
      id: 2,
      title: '기숙사 시설 점검 일정 안내',
      category: '시설',
      content: '정기 시설 점검이 예정되어 있어 안내드립니다...',
      is_important: false,
      created_at: '2024-03-14',
      views: 89,
    },
    {
      id: 3,
      title: '식당 메뉴 변경 안내',
      category: '식당',
      content: '3월 셋째 주부터 식당 메뉴가 일부 변경됩니다...',
      is_important: false,
      created_at: '2024-03-13',
      views: 67,
    },
  ]);

  const handleCreateNotice = () => {
    if (!newNotice.title || !newNotice.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const notice = {
      id: Date.now(),
      ...newNotice,
      created_at: new Date().toISOString().split('T')[0],
      views: 0,
    };

    setNotices([notice, ...notices]);
    setNewNotice({
      title: '',
      category: '공지',
      content: '',
      is_important: false,
    });
    setShowCreateForm(false);
  };

  const handleDeleteNotice = (id: number) => {
    if (confirm('이 공지사항을 삭제하시겠습니까?')) {
      setNotices(notices.filter(notice => notice.id !== id));
    }
  };

  const handleEditNotice = (notice: any) => {
    setEditingNotice(notice);
    setNewNotice({
      title: notice.title,
      category: notice.category,
      content: notice.content,
      is_important: notice.is_important,
    });
    setShowCreateForm(true);
  };

  const handleUpdateNotice = () => {
    if (!newNotice.title || !newNotice.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    if (!editingNotice) return;

    setNotices(notices.map(notice => 
      notice.id === editingNotice.id 
        ? { ...notice, ...newNotice }
        : notice
    ));
    
    setEditingNotice(null);
    setNewNotice({
      title: '',
      category: '공지',
      content: '',
      is_important: false,
    });
    setShowCreateForm(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <i className="fas fa-arrow-left text-gray-600"></i>
          </button>
          <h1 className="text-2xl font-bold">공지사항 관리</h1>
        </div>
        <button
          onClick={() => {
            setEditingNotice(null);
            setNewNotice({
              title: '',
              category: '공지',
              content: '',
              is_important: false,
            });
            setShowCreateForm(true);
          }}
          className="px-4 py-2 bg-[#006272] text-white rounded-md hover:bg-[#004d5a] transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>공지사항 작성
        </button>
      </div>

      {/* 공지사항 작성/수정 폼 */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              {editingNotice ? '공지사항 수정' : '공지사항 작성'}
            </h2>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditingNotice(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                <input
                  type="text"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="공지사항 제목을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                <select
                  value={newNotice.category}
                  onChange={(e) => setNewNotice({...newNotice, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="공지">공지</option>
                  <option value="시설">시설</option>
                  <option value="식당">식당</option>
                  <option value="안전">안전</option>
                  <option value="행사">행사</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newNotice.is_important}
                  onChange={(e) => setNewNotice({...newNotice, is_important: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">중요 공지사항</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
              <textarea
                value={newNotice.content}
                onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                rows={8}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="공지사항 내용을 입력하세요"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditingNotice(null);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
            <button
              onClick={editingNotice ? handleUpdateNotice : handleCreateNotice}
              className="px-4 py-2 bg-[#006272] text-white rounded-md hover:bg-[#004d5a] transition-colors"
            >
              {editingNotice ? '수정' : '작성'}
            </button>
          </div>
        </div>
      )}

      {/* 공지사항 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">공지사항 목록</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {notices.map((notice) => (
            <div key={notice.id} className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  {notice.is_important && (
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 mr-2">
                      중요
                    </span>
                  )}
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {notice.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{notice.created_at}</span>
                  <span className="text-sm text-gray-500">조회수: {notice.views}</span>
                  <button
                    onClick={() => handleEditNotice(notice)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <i className="fas fa-edit text-sm"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteNotice(notice.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">{notice.title}</h3>
              <p className="text-gray-600 line-clamp-2">{notice.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeManagement; 