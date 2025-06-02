import React, { useState } from 'react';

interface SearchFilters {
  searchTerm: string;
  status: string;
  room: string;
  grade?: string;
}

interface StudentSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    status: '전체',
    room: '',
    grade: '전체'
  });

  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleInputChange}
            placeholder="이름, 학번, 연락처로 검색..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
        >
          {isAdvancedSearch ? '기본 검색' : '상세 검색'}
        </button>
      </div>

      {isAdvancedSearch && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="전체">전체 상태</option>
            <option value="재학">재학</option>
            <option value="휴학">휴학</option>
            <option value="졸업">졸업</option>
          </select>

          <input
            type="text"
            name="room"
            value={filters.room}
            onChange={handleInputChange}
            placeholder="호실 번호"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="grade"
            value={filters.grade}
            onChange={handleInputChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="전체">전체 학년</option>
            <option value="1">1학년</option>
            <option value="2">2학년</option>
            <option value="3">3학년</option>
            <option value="4">4학년</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default StudentSearch; 