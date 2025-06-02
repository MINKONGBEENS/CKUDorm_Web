// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import ExcelJS from "exceljs";
import { useNavigate } from 'react-router-dom';
import StudentSearch from '../../components/StudentSearch';
import { Student } from '../../api/types';
import { STUDENT_STATUS, STUDENT_GRADE } from '../../constants/student';

const StudentManagement: React.FC = () => {
  const navigate = useNavigate();
  // 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showBulkEditModal, setShowBulkEditModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [bulkEditForm, setBulkEditForm] = useState({
    status: "",
    room: "",
    checkOutDate: "",
  });
  // 정렬 방향 상태 추가
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: '김민준',
      studentId: '20250101',
      room: '302',
      status: STUDENT_STATUS.ENROLLED,
      phone: '010-1234-5678',
      email: 'student1@example.com',
      grade: STUDENT_GRADE.FIRST,
      department: '컴퓨터공학과',
      college: '공과대학',
      contact: '010-1234-5678',
      checkInDate: '2024-03-01',
      checkOutDate: '2024-12-31',
      points: [],
      totalMeritPoints: 0,
      totalDemeritPoints: 0
    },
    {
      id: 2,
      name: '이지원',
      studentId: '20250102',
      room: '405',
      status: STUDENT_STATUS.ENROLLED,
      phone: '010-2345-6789',
      email: 'student2@example.com',
      grade: STUDENT_GRADE.SECOND,
      department: '전자공학과',
      college: '공과대학',
      contact: '010-2345-6789',
      checkInDate: '2024-03-01',
      checkOutDate: '2024-12-31',
      points: [],
      totalMeritPoints: 0,
      totalDemeritPoints: 0
    },
    {
      id: 3,
      name: '박서연',
      studentId: '20250103',
      room: '201',
      status: STUDENT_STATUS.ENROLLED,
      phone: '010-3456-7890',
      email: 'student3@example.com',
      grade: STUDENT_GRADE.THIRD,
      department: '소프트웨어학과',
      college: '공과대학',
      contact: '010-3456-7890',
      checkInDate: '2024-03-01',
      checkOutDate: '2024-12-31',
      points: [],
      totalMeritPoints: 0,
      totalDemeritPoints: 0
    }
  ]);

  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    studentId: '',
    room: '',
    phone: '',
    email: '',
    points: [],
    totalMeritPoints: 0,
    totalDemeritPoints: 0
  });

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const handleExcelDownload = async () => {
    try {
      showToastMessage("다운로드가 시작되었습니다");
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("입주사생 목록");

      // 헤더 설정
      worksheet.columns = [
        { header: '이름', key: 'name' },
        { header: '학번', key: 'studentId' },
        { header: '학과', key: 'department' },
        { header: '단과대학', key: 'college' },
        { header: '학년', key: 'grade' },
        { header: '호실', key: 'room' },
        { header: '상태', key: 'status' },
        { header: '연락처', key: 'contact' },
        { header: '입주일', key: 'checkInDate' },
        { header: '퇴사예정일', key: 'checkOutDate' }
      ];

      // 데이터 추가
      students.forEach(student => {
        worksheet.addRow({
          name: student.name,
          studentId: student.studentId,
          department: student.department,
          college: student.college,
          grade: `${student.grade}학년`,
          room: student.room,
          status: student.status,
          contact: student.contact,
          checkInDate: student.checkInDate,
          checkOutDate: student.checkOutDate
        });
      });

      // 스타일 적용
      worksheet.getRow(1).font = { bold: true };
      worksheet.columns.forEach(column => {
        column.width = 15;
      });

      // 파일 저장
      const today = new Date().toISOString().split("T")[0];
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `입주사생_목록_${today}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);

      setTimeout(() => {
        showToastMessage("파일이 성공적으로 다운로드되었습니다");
      }, 1000);
    } catch (error) {
      showToastMessage("다운로드 중 오류가 발생했습니다");
      console.error('Excel 다운로드 중 오류:', error);
    }
  };
  // 필터 상태 관리
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    status: '전체',
    room: '',
    grade: '전체'
  });
  const [sortBy, setSortBy] = useState("이름순");
  // 알림 상태
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  // 알림 데이터
  const notifications = [
    {
      id: 1,
      title: "신규 입주 신청",
      message: "김민준님이 새로운 입주 신청을 했습니다.",
      time: "10분 전",
      isNew: true,
    },
    {
      id: 2,
      title: "시설 보수 요청",
      message: "302호에서 시설 보수 요청이 접수되었습니다.",
      time: "1시간 전",
      isNew: true,
    },
    {
      id: 3,
      title: "퇴실 신청",
      message: "이지원님이 퇴실 신청을 했습니다.",
      time: "3시간 전",
      isNew: false,
    },
  ];
  // 필터링된 학생 목록
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      searchFilters.searchTerm === '' ||
      student.name.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
      student.phone.includes(searchFilters.searchTerm) ||
      student.email.toLowerCase().includes(searchFilters.searchTerm.toLowerCase());

    const matchesStatus =
      searchFilters.status === '전체' || student.status === searchFilters.status;

    const matchesRoom =
      searchFilters.room === '' || student.room.includes(searchFilters.room);

    const matchesGrade =
      searchFilters.grade === '전체' || student.grade === searchFilters.grade;

    return matchesSearch && matchesStatus && matchesRoom && matchesGrade;
  }).sort((a, b) => {
    let comparison = 0;
    if (sortBy === "이름순") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "학번순") {
      comparison = a.studentId.localeCompare(b.studentId);
    } else if (sortBy === "호실순") {
      comparison = a.room.localeCompare(b.room);
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });
  // 정렬 방향 토글 함수
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };
  // 학생 상세 정보 모달 열기
  const openStudentModal = (student: any) => {
    setSelectedStudent(student);
    setShowModal(true);
  };
  // 상태에 따른 배지 스타일
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "입주중":
        return "bg-green-100 text-green-800";
      case "퇴사예정":
        return "bg-yellow-100 text-yellow-800";
      case "퇴사완료":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.studentId || !newStudent.room || !newStudent.phone || !newStudent.email) {
      showToastMessage("모든 필드를 입력해주세요.");
      return;
    }

    const student: Student = {
      id: students.length + 1,
      name: newStudent.name,
      studentId: newStudent.studentId,
      room: newStudent.room,
      phone: newStudent.phone,
      email: newStudent.email,
      status: STUDENT_STATUS.ENROLLED,
      grade: STUDENT_GRADE.FIRST,
      department: '',
      college: '',
      contact: newStudent.phone,
      checkInDate: new Date().toISOString().split('T')[0],
      checkOutDate: '',
      points: [],
      totalMeritPoints: 0,
      totalDemeritPoints: 0
    };
    
    setStudents([student, ...students]);
    setNewStudent({ name: '', studentId: '', room: '', phone: '', email: '', points: [], totalMeritPoints: 0, totalDemeritPoints: 0 });
  };

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
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
          <h1 className="text-2xl font-bold">학생 관리</h1>
        </div>
        <button
          onClick={handleExcelDownload}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          엑셀 다운로드
        </button>
      </div>

      {/* 학생 등록 폼 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">학생 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                이름
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006272]"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                학번
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006272]"
                value={newStudent.studentId}
                onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                호실
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006272]"
                value={newStudent.room}
                onChange={(e) => setNewStudent({...newStudent, room: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                전화번호
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006272]"
                value={newStudent.phone}
                onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                이메일
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006272]"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#006272] text-white px-4 py-2 rounded-md hover:bg-[#004d5a] transition-colors"
          >
            등록하기
          </button>
        </form>
      </div>

      {/* 학생 검색 */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">학생 검색</h2>
        <StudentSearch onSearch={handleSearch} />
      </div>

      {/* 학생 목록 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이름
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                학번
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                호실
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                연락처
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이메일
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.studentId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.room}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => navigate(`/student/${student.id}`)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
