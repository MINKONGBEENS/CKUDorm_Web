// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import * as XLSX from "xlsx";
import { useNavigate } from 'react-router-dom';

const StudentManagement: React.FC = () => {
  const navigate = useNavigate();
  // 모달 상태 관리
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
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
  const [students, setStudents] = useState([
    {
      id: 1,
      name: '김민준',
      studentId: '20250101',
      room: '302',
      status: '재학',
      phone: '010-1234-5678',
      email: 'student1@example.com'
    },
    {
      id: 2,
      name: '이지원',
      studentId: '20250102',
      room: '405',
      status: '재학',
      phone: '010-2345-6789',
      email: 'student2@example.com'
    },
    {
      id: 3,
      name: '박서연',
      studentId: '20250103',
      room: '201',
      status: '재학',
      phone: '010-3456-7890',
      email: 'student3@example.com'
    }
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    studentId: '',
    room: '',
    phone: '',
    email: ''
  });

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const handleExcelDownload = () => {
    try {
      showToastMessage("다운로드가 시작되었습니다");
      const downloadData = students.map((student) => ({
        이름: student.name,
        학번: student.studentId,
        학과: student.department,
        단과대학: student.college,
        학년: `${student.grade}학년`,
        호실: student.room,
        상태: student.status,
        연락처: student.contact,
        입주일: student.checkInDate,
        퇴사예정일: student.checkOutDate,
      }));
      const ws = XLSX.utils.json_to_sheet(downloadData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "입주사생 목록");
      const today = new Date().toISOString().split("T")[0];
      XLSX.writeFile(wb, `입주사생_목록_${today}.xlsx`);
      setTimeout(() => {
        showToastMessage("파일이 성공적으로 다운로드되었습니다");
      }, 1000);
    } catch (error) {
      showToastMessage("다운로드 중 오류가 발생했습니다");
    }
  };
  // 필터 상태 관리
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("전체");
  const [collegeFilter, setCollegeFilter] = useState("전체");
  const [statusFilter, setStatusFilter] = useState("전체");
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
  const filteredStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.includes(searchTerm) ||
        student.studentId.includes(searchTerm) ||
        student.department.includes(searchTerm);
      const matchesGrade =
        gradeFilter === "전체" || student.grade === gradeFilter;
      const matchesCollege =
        collegeFilter === "전체" || student.college === collegeFilter;
      const matchesStatus =
        statusFilter === "전체" || student.status === statusFilter;
      return matchesSearch && matchesGrade && matchesCollege && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "이름순") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "학번순") {
        comparison = a.studentId.localeCompare(b.studentId);
      } else if (sortBy === "입주일순") {
        comparison =
          new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime();
      } else if (sortBy === "퇴사예정일순") {
        comparison =
          new Date(a.checkOutDate).getTime() -
          new Date(b.checkOutDate).getTime();
      } else if (sortBy === "호실순") {
        comparison = a.room.localeCompare(b.room);
      } else if (sortBy === "학과순") {
        comparison = a.department.localeCompare(b.department);
      } else if (sortBy === "상태순") {
        comparison = a.status.localeCompare(b.status);
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
    const student = {
      id: students.length + 1,
      ...newStudent,
      status: '재학'
    };
    setStudents([student, ...students]);
    setNewStudent({ name: '', studentId: '', room: '', phone: '', email: '' });
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

      {/* 학생 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">학생 목록</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이름
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  학번
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  호실
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  전화번호
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이메일
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-800">
                    {student.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800">
                    {student.studentId}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800">
                    {student.room}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800">
                    {student.phone}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800">
                    {student.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
