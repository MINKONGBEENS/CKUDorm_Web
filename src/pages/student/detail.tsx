import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Student, Point } from '../../api/types';
import { POINT_TYPE, POINT_REASON } from '../../constants/student';

interface PointFormData {
  type: keyof typeof POINT_TYPE;
  reason: string;
  points: number;
  description: string;
}

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [showPointModal, setShowPointModal] = useState(false);
  const [pointFormData, setPointFormData] = useState<PointFormData>({
    type: 'MERIT',
    reason: '',
    points: 1,
    description: ''
  });
  const [expandedDescriptions, setExpandedDescriptions] = useState<number[]>([]);

  useEffect(() => {
    // 임시 데이터 설정
    setTimeout(() => {
      setStudent({
        id: Number(id),
        name: '김민준',
        studentId: '20250101',
        room: '302',
        status: '재학',
        phone: '010-1234-5678',
        email: 'student1@example.com',
        grade: '1',
        department: '컴퓨터공학과',
        college: '공과대학',
        contact: '010-1234-5678',
        checkInDate: '2024-03-01',
        checkOutDate: '2024-12-31',
        points: [
          {
            id: 1,
            type: '상점',
            reason: '봉사활동',
            points: 3,
            date: '2024-03-15',
            description: '기숙사 환경미화 봉사',
            issuedBy: '관리자'
          }
        ],
        totalMeritPoints: 3,
        totalDemeritPoints: 0
      });
      setLoading(false);
    }, 500); // 로딩 효과를 보기 위해 0.5초 지연
  }, [id]);

  const handlePointSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPoint: Point = {
        id: student?.points.length ? student.points.length + 1 : 1,
        type: POINT_TYPE[pointFormData.type],
        reason: pointFormData.reason,
        points: pointFormData.points,
        date: new Date().toISOString().split('T')[0],
        description: pointFormData.description,
        issuedBy: '관리자'
      };

      // 임시로 상태 직접 업데이트
      if (student) {
        const updatedStudent = {
          ...student,
          points: [...student.points, newPoint],
          totalMeritPoints: pointFormData.type === 'MERIT' 
            ? student.totalMeritPoints + pointFormData.points 
            : student.totalMeritPoints,
          totalDemeritPoints: pointFormData.type === 'DEMERIT'
            ? student.totalDemeritPoints + pointFormData.points
            : student.totalDemeritPoints
        };
        setStudent(updatedStudent);
      }

      setShowPointModal(false);
      setPointFormData({
        type: 'MERIT',
        reason: '',
        points: 1,
        description: ''
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : '오류가 발생했습니다.');
    }
  };

  const toggleDescription = (pointId: number) => {
    setExpandedDescriptions(prev => 
      prev.includes(pointId) 
        ? prev.filter(id => id !== pointId)
        : [...prev, pointId]
    );
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006272]"></div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error || '학생 정보를 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <i className="fas fa-arrow-left text-gray-600"></i>
        </button>
        <h1 className="text-2xl font-bold">학생 상세 정보</h1>
      </div>

      {/* 기본 정보 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">기본 정보</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">이름</p>
            <p className="font-medium">{student.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">학번</p>
            <p className="font-medium">{student.studentId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">학과</p>
            <p className="font-medium">{student.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">단과대학</p>
            <p className="font-medium">{student.college}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">호실</p>
            <p className="font-medium">{student.room}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">연락처</p>
            <p className="font-medium">{student.phone}</p>
          </div>
        </div>
      </div>

      {/* 상벌점 현황 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">상벌점 현황</h2>
          <button
            onClick={() => setShowPointModal(true)}
            className="bg-[#006272] text-white px-4 py-2 rounded-md hover:bg-[#004d5a]"
          >
            상벌점 부여
          </button>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">누적 상점</p>
            <p className="text-2xl font-bold text-green-600">{student.totalMeritPoints}점</p>
          </div>
          <div className="flex-1 bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600">누적 벌점</p>
            <p className="text-2xl font-bold text-red-600">{student.totalDemeritPoints}점</p>
          </div>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">일자</th>
              <th className="px-4 py-2 text-left">구분</th>
              <th className="px-4 py-2 text-left">사유</th>
              <th className="px-4 py-2 text-left">점수</th>
              <th className="px-4 py-2 text-left">부여자</th>
              <th className="px-4 py-2 text-left">상세 설명</th>
            </tr>
          </thead>
          <tbody>
            {student.points.map((point) => (
              <tr key={point.id} className="border-b">
                <td className="px-4 py-2">{point.date}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    point.type === '상점' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {point.type}
                  </span>
                </td>
                <td className="px-4 py-2">{point.reason}</td>
                <td className="px-4 py-2">{point.points}점</td>
                <td className="px-4 py-2">{point.issuedBy}</td>
                <td className="px-4 py-2">
                  {point.description ? (
                    <div>
                      <button
                        onClick={() => toggleDescription(point.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        {expandedDescriptions.includes(point.id) ? (
                          <>
                            <span>접기</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>자세히</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                      {expandedDescriptions.includes(point.id) && (
                        <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {point.description}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 상벌점 부여 모달 */}
      {showPointModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">상벌점 부여</h3>
            <form onSubmit={handlePointSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">구분</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={pointFormData.type}
                  onChange={(e) => setPointFormData({
                    ...pointFormData,
                    type: e.target.value as keyof typeof POINT_TYPE
                  })}
                >
                  {Object.entries(POINT_TYPE).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">사유</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={pointFormData.reason}
                  onChange={(e) => setPointFormData({
                    ...pointFormData,
                    reason: e.target.value
                  })}
                >
                  <option value="">사유 선택</option>
                  {Object.entries(
                    pointFormData.type === 'MERIT' ? POINT_REASON.MERIT : POINT_REASON.DEMERIT
                  ).map(([key, value]) => (
                    <option key={key} value={value}>{value}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">점수</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border rounded-md"
                  value={pointFormData.points}
                  onChange={(e) => setPointFormData({
                    ...pointFormData,
                    points: parseInt(e.target.value)
                  })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">상세 설명</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={3}
                  value={pointFormData.description}
                  onChange={(e) => setPointFormData({
                    ...pointFormData,
                    description: e.target.value
                  })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPointModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006272] text-white rounded-md hover:bg-[#004d5a]"
                >
                  부여하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetail; 