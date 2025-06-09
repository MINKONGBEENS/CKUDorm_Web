import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PointsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPoint, setNewPoint] = useState({
    student_id: '',
    type: 'MERIT',
    points: 0,
    reason: '',
    description: '',
  });

  // 더미 데이터
  const [pointsHistory, setPointsHistory] = useState([
    {
      id: 1,
      student_id: '20230521',
      student_name: '강민준',
      type: 'MERIT',
      points: 5,
      reason: '봉사활동',
      description: '기숙사 청소 봉사활동 참여',
      created_at: '2024-03-15',
      created_by: '관리자'
    },
    {
      id: 2,
      student_id: '20232418',
      student_name: '강지민',
      type: 'DEMERIT',
      points: 3,
      reason: '소음 발생',
      description: '밤 12시 이후 소음 발생',
      created_at: '2024-03-14',
      created_by: '관리자'
    },
  ]);

  const handleAddPoint = () => {
    if (!newPoint.student_id || !newPoint.points || !newPoint.reason) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const point = {
      id: Date.now(),
      ...newPoint,
      student_name: '학생명', // TODO: 실제로는 student_id로 조회
      created_at: new Date().toISOString().split('T')[0],
      created_by: '관리자'
    };

    setPointsHistory([point, ...pointsHistory]);
    setNewPoint({
      student_id: '',
      type: 'MERIT',
      points: 0,
      reason: '',
      description: '',
    });
    setShowAddForm(false);
  };

  const handleDeletePoint = (id: number) => {
    if (confirm('이 상벌점 기록을 삭제하시겠습니까?')) {
      setPointsHistory(pointsHistory.filter(point => point.id !== id));
    }
  };

  const filteredPoints = pointsHistory.filter(point =>
    point.student_id.includes(searchTerm) ||
    point.student_name.includes(searchTerm) ||
    point.reason.includes(searchTerm)
  );

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
          <h1 className="text-2xl font-bold">상벌점 관리</h1>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-[#006272] text-white rounded-md hover:bg-[#004d5a] transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>상벌점 부여
        </button>
      </div>

      {/* 검색 */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="학번, 이름, 사유로 검색..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 상벌점 부여 폼 */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">상벌점 부여</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">학번</label>
              <input
                type="text"
                value={newPoint.student_id}
                onChange={(e) => setNewPoint({...newPoint, student_id: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">구분</label>
              <select
                value={newPoint.type}
                onChange={(e) => setNewPoint({...newPoint, type: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="MERIT">상점</option>
                <option value="DEMERIT">벌점</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">점수</label>
              <input
                type="number"
                value={newPoint.points}
                onChange={(e) => setNewPoint({...newPoint, points: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">사유</label>
              <select
                value={newPoint.reason}
                onChange={(e) => setNewPoint({...newPoint, reason: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">사유 선택</option>
                {newPoint.type === 'MERIT' ? (
                  <>
                    <option value="봉사활동">봉사활동</option>
                    <option value="청소 우수">청소 우수</option>
                    <option value="행사 참여">행사 참여</option>
                    <option value="모범적인 행동">모범적인 행동</option>
                    <option value="기타 상점">기타 상점</option>
                  </>
                ) : (
                  <>
                    <option value="소음 발생">소음 발생</option>
                    <option value="귀가 시간 위반">귀가 시간 위반</option>
                    <option value="무단 외박">무단 외박</option>
                    <option value="시설물 파손">시설물 파손</option>
                    <option value="청소 상태 불량">청소 상태 불량</option>
                    <option value="기타 벌점">기타 벌점</option>
                  </>
                )}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">상세 내용</label>
              <textarea
                value={newPoint.description}
                onChange={(e) => setNewPoint({...newPoint, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleAddPoint}
              className="px-4 py-2 bg-[#006272] text-white rounded-md hover:bg-[#004d5a] transition-colors"
            >
              부여
            </button>
          </div>
        </div>
      )}

      {/* 상벌점 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">상벌점 이력</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredPoints.map((point) => (
            <div key={point.id} className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-2 ${
                    point.type === 'MERIT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {point.type === 'MERIT' ? '상점' : '벌점'} {point.points}점
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {point.reason}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{point.created_at}</span>
                  <button
                    onClick={() => handleDeletePoint(point.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm text-gray-500">학생 정보</p>
                  <p className="font-medium">{point.student_name} ({point.student_id})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">처리자</p>
                  <p className="font-medium">{point.created_by}</p>
                </div>
              </div>
              {point.description && (
                <p className="text-gray-600">{point.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointsManagement; 