import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RepairReport: React.FC = () => {
  const navigate = useNavigate();
  const [repairs, setRepairs] = useState([
    {
      id: 1,
      title: '302호 수도꼭지 누수',
      content: '수도꼭지에서 물이 새고 있습니다. 긴급 수리가 필요합니다.',
      date: '2024-03-15',
      room: '302',
      category: '수도',
      status: '처리중'
    },
    {
      id: 2,
      title: '405호 냉방기 고장',
      content: '냉방기가 작동하지 않습니다. 확인 부탁드립니다.',
      date: '2024-03-14',
      room: '405',
      category: '전기',
      status: '완료'
    },
    {
      id: 3,
      title: '201호 문 잠금장치 고장',
      content: '문 잠금장치가 제대로 작동하지 않습니다.',
      date: '2024-03-13',
      room: '201',
      category: '시설',
      status: '완료'
    }
  ]);

  const handleApprove = (id: number) => {
    setRepairs(repairs.map(repair => 
      repair.id === id ? { ...repair, status: '완료' } : repair
    ));
  };

  const handleReject = (id: number) => {
    setRepairs(repairs.map(repair => 
      repair.id === id ? { ...repair, status: '반려' } : repair
    ));
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
          <h1 className="text-2xl font-bold">고장 수리접수 관리</h1>
        </div>
      </div>

      {/* 수리접수 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">수리접수 목록</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {repairs.map((repair) => (
            <div key={repair.id} className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mr-2">
                    {repair.category}
                  </span>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    repair.status === '접수' ? 'bg-yellow-100 text-yellow-800' :
                    repair.status === '처리중' ? 'bg-blue-100 text-blue-800' :
                    repair.status === '반려' ? 'bg-red-100 text-red-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {repair.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{repair.date}</span>
              </div>
              <h3 className="text-lg font-medium mb-2">{repair.title}</h3>
              <p className="text-gray-600 mb-2">호실: {repair.room}</p>
              <p className="text-gray-600 mb-4">{repair.content}</p>
              {repair.status === '접수' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(repair.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => handleReject(repair.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    반려
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepairReport; 