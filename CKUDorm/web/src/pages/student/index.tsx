import React, { useState, useEffect } from 'react';
import { Student } from '@/types';
import { api } from '@/services/api';
import type { ApiResponse } from '@/types';

interface PaginationInfo {
  total: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

const StudentListPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1
  });

  // 학생 목록 불러오기
  const fetchStudents = async (search?: string, page: number = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      params.set('page', page.toString());
      params.set('limit', pagination.itemsPerPage.toString());

      const { data } = await api.get<ApiResponse<{ students: Student[]; total: number }>>(`/kandorm?${params}`);
      
      if (!Array.isArray(data.data?.students)) {
        throw new Error('서버에서 잘못된 형식의 데이터를 반환했습니다.');
      }

      setStudents(data.data.students);
      setPagination(prev => ({
        ...prev,
        currentPage: page,
        total: data.data.total,
        totalPages: Math.ceil(data.data.total / prev.itemsPerPage)
      }));
    } catch (error) {
      console.error('Error fetching students:', error);
      alert(error instanceof Error ? error.message : '학생 데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 데이터 로딩
  useEffect(() => {
    fetchStudents();
  }, []);

  // 검색어 변경시 실시간 검색
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchStudents(searchTerm, 1); // 검색 시 첫 페이지로 이동
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleDeleteStudent = async (id: number) => {
    if (!confirm('이 학생을 삭제하시겠습니까?')) return;
    
    try {
      const { data } = await api.delete<ApiResponse<void>>(`/kandorm/${id}`);
      if (!data.success) {
        throw new Error(data.message || '학생 삭제에 실패했습니다.');
      }
      
      setStudents(students.filter(s => s.id !== id));
      alert('학생이 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('학생 삭제에 실패했습니다.');
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowEditForm(true);
  };

  const handleUpdateStudent = async () => {
    if (!editingStudent) return;
    
    try {
      const { data } = await api.put<ApiResponse<Student>>(`/kandorm/${editingStudent.id}`, editingStudent);
      if (!data.success) {
        throw new Error(data.message || '학생 정보 수정에 실패했습니다.');
      }
      
      setStudents(students.map(s => 
        s.id === editingStudent.id ? data.data : s
      ));
      
      setEditingStudent(null);
      setShowEditForm(false);
      alert('학생 정보가 수정되었습니다.');
    } catch (error) {
      console.error('Error updating student:', error);
      alert('학생 정보 수정에 실패했습니다.');
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
    fetchStudents(searchTerm, newPage);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">입주생 관리</h1>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="이름, 학번, 학과, 호실로 검색..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학번</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학과</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학년</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기숙사</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">호실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연락처</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.department_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.grade}학년</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.dormitory}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.roomNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
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
              {/* 이전 페이지 버튼 */}
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

              {/* 페이지 번호 */}
              {(() => {
                let pages = [];
                const totalPages = pagination.totalPages;
                const currentPage = pagination.currentPage;
                
                // 시작 페이지와 끝 페이지 계산
                let startPage = Math.max(currentPage - 2, 1);
                let endPage = Math.min(startPage + 4, totalPages);
                
                // 끝 페이지가 총 페이지 수보다 작으면, 시작 페이지를 조정
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

              {/* 다음 페이지 버튼 */}
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

      {/* 학생 수정 폼 */}
      {showEditForm && editingStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">학생 정보 수정</h2>
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setEditingStudent(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">학번</label>
                <input
                  type="text"
                  value={editingStudent.studentId}
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">학년</label>
                <select
                  value={editingStudent.grade}
                  onChange={(e) => setEditingStudent({...editingStudent, grade: Number(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>1학년</option>
                  <option value={2}>2학년</option>
                  <option value={3}>3학년</option>
                  <option value={4}>4학년</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                <input
                  type="tel"
                  value={editingStudent.phone}
                  onChange={(e) => setEditingStudent({...editingStudent, phone: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기숙사</label>
                <select
                  value={editingStudent.dormitory}
                  onChange={(e) => setEditingStudent({...editingStudent, dormitory: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="우정원">우정원</option>
                  <option value="창조원">창조원</option>
                  <option value="진리원">진리원</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">호실</label>
                <input
                  type="text"
                  value={editingStudent.roomNumber}
                  onChange={(e) => setEditingStudent({...editingStudent, roomNumber: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setEditingStudent(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleUpdateStudent}
                className="px-4 py-2 bg-[#006272] text-white rounded-md hover:bg-[#004d5a] transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListPage;