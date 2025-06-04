import React, { useState, useEffect } from 'react';
import { Student } from '@/types/types';

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
      const url = new URL('/api/managementStudent', window.location.origin);
      if (search) url.searchParams.set('search', search);
      url.searchParams.set('page', page.toString());
      url.searchParams.set('limit', pagination.itemsPerPage.toString());

      const response = await fetch(url.toString());
      let data;
      
      try {
        const textResponse = await response.text(); // 먼저 텍스트로 받아서
        console.log('Raw response:', textResponse); // 원본 응답 로깅
        data = JSON.parse(textResponse); // JSON 파싱 시도
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('서버 응답을 처리하는데 실패했습니다.');
      }
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || '학생 데이터를 불러오는데 실패했습니다.');
      }

      if (!Array.isArray(data.data)) {
        console.error('Invalid data format:', data);
        throw new Error('서버에서 잘못된 형식의 데이터를 반환했습니다.');
      }

      setStudents(data.data);
      setPagination(prev => ({
        ...prev,
        ...data.pagination,
        itemsPerPage: prev.itemsPerPage // 기존 itemsPerPage 유지
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
      const response = await fetch(`/api/managementStudent?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('학생 삭제에 실패했습니다.');
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || '학생 삭제에 실패했습니다.');
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
      const response = await fetch('/api/managementStudent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingStudent),
      });

      if (!response.ok) throw new Error('학생 정보 수정에 실패했습니다.');
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || '학생 정보 수정에 실패했습니다.');
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.student_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.department_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.grade}학년</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.dormitory}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.room_number}</td>
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
              {[...Array(pagination.totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    pagination.currentPage === i + 1
                      ? 'z-10 bg-[#006272] border-[#006272] text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
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
                  value={editingStudent.student_id}
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
                  value={editingStudent.room_number}
                  onChange={(e) => setEditingStudent({...editingStudent, room_number: e.target.value})}
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