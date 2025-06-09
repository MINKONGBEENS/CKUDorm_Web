import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import type { ApiResponse, Notice } from '@/types';

interface PaginationInfo {
  total: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

const NoticeManagement: React.FC = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1
  });
  const [newNotice, setNewNotice] = useState<Omit<Notice, 'id' | 'createdAt' | 'updatedAt' | 'author'>>({
    title: '',
    category: 'GENERAL',
    content: '',
  });

  // 공지사항 목록 불러오기
  const fetchNotices = async (search?: string, page: number = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      params.set('page', page.toString());
      params.set('limit', pagination.itemsPerPage.toString());

      const { data } = await api.get<ApiResponse<{ notices: Notice[]; total: number }>>(`/notices?${params}`);
      
      if (!data.success || !data.data) {
        throw new Error('서버에서 데이터를 반환하지 않았습니다.');
      }

      setNotices(data.data.notices);
      setPagination(prev => ({
        ...prev,
        currentPage: page,
        total: data.data.total,
        totalPages: Math.ceil(data.data.total / prev.itemsPerPage)
      }));
    } catch (error) {
      console.error('Error fetching notices:', error);
      alert(error instanceof Error ? error.message : '공지사항을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    fetchNotices();
  }, []);

  // 검색어 변경시 실시간 검색
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchNotices(searchTerm, 1);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleCreateNotice = async () => {
    if (!newNotice.title || !newNotice.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      const { data } = await api.post<ApiResponse<Notice>>('/notices', newNotice);
      if (!data.success) {
        throw new Error(data.message || '공지사항 작성에 실패했습니다.');
      }

      await fetchNotices(searchTerm, pagination.currentPage);
      setNewNotice({
        title: '',
        category: 'GENERAL',
        content: '',
      });
      setShowCreateForm(false);
      alert('공지사항이 작성되었습니다.');
    } catch (error) {
      console.error('Error creating notice:', error);
      alert('공지사항 작성에 실패했습니다.');
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm('이 공지사항을 삭제하시겠습니까?')) return;

    try {
      const { data } = await api.delete<ApiResponse<void>>(`/notices/${id}`);
      if (!data.success) {
        throw new Error(data.message || '공지사항 삭제에 실패했습니다.');
      }

      await fetchNotices(searchTerm, pagination.currentPage);
      alert('공지사항이 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('공지사항 삭제에 실패했습니다.');
    }
  };

  const handleEditNotice = (notice: any) => {
    setEditingNotice(notice);
    setNewNotice({
      title: notice.title,
      category: notice.category,
      content: notice.content,
    });
    setShowCreateForm(true);
  };

  const handleUpdateNotice = async () => {
    if (!newNotice.title || !newNotice.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    if (!editingNotice) return;

    try {
      const { data } = await api.put<ApiResponse<Notice>>(`/notices/${editingNotice.id}`, newNotice);
      if (!data.success) {
        throw new Error(data.message || '공지사항 수정에 실패했습니다.');
      }

      await fetchNotices(searchTerm, pagination.currentPage);
      setEditingNotice(null);
      setNewNotice({
        title: '',
        category: 'GENERAL',
        content: '',
      });
      setShowCreateForm(false);
      alert('공지사항이 수정되었습니다.');
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('공지사항 수정에 실패했습니다.');
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
    fetchNotices(searchTerm, newPage);
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
              category: 'GENERAL',
              content: '',
            });
            setShowCreateForm(true);
          }}
          className="px-4 py-2 bg-[#006272] text-white rounded-md hover:bg-[#004d5a] transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>공지사항 작성
        </button>
      </div>

      {/* 검색창 추가 */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="제목으로 검색..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
                  onChange={(e) => setNewNotice({...newNotice, category: e.target.value as 'GENERAL' | 'IMPORTANT' | 'EVENT'})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GENERAL">일반</option>
                  <option value="IMPORTANT">중요</option>
                  <option value="EVENT">행사</option>
                </select>
              </div>
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
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        notice.category === 'IMPORTANT' 
                          ? 'bg-red-100 text-red-800'
                          : notice.category === 'EVENT'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {notice.category === 'GENERAL' ? '일반' : 
                         notice.category === 'IMPORTANT' ? '중요' : '행사'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notice.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{notice.author?.name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditNotice(notice)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(notice.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="mt-4 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  pagination.currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                이전
              </button>

              {(() => {
                let pages = [];
                const totalPages = pagination.totalPages;
                const currentPage = pagination.currentPage;
                
                let startPage = Math.max(currentPage - 2, 1);
                let endPage = Math.min(startPage + 4, totalPages);
                
                if (endPage - startPage < 4) {
                  startPage = Math.max(endPage - 4, 1);
                }
                
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        i === currentPage
                          ? 'z-10 bg-[#006272] border-[#006272] text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {i}
                    </button>
                  );
                }
                
                return pages;
              })()}

              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  pagination.currentPage === pagination.totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                다음
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default NoticeManagement; 