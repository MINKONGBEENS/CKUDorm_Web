// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomChange: React.FC = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: '홍길동',
      studentId: '2024001',
      currentRoom: '302',
      requestedRoom: '405',
      reason: '현재 호실이 너무 시끄러워서 조용한 호실로 이동하고 싶습니다.',
      date: '2024-03-15',
      status: '접수'
    },
    {
      id: 2,
      name: '김철수',
      studentId: '2024002',
      currentRoom: '201',
      requestedRoom: '303',
      reason: '친구와 같은 호실로 이동하고 싶습니다.',
      date: '2024-03-14',
      status: '처리중'
    },
    {
      id: 3,
      name: '이영희',
      studentId: '2024003',
      currentRoom: '405',
      requestedRoom: '302',
      reason: '현재 호실이 너무 덥습니다.',
      date: '2024-03-13',
      status: '완료'
    }
  ]);

  const handleApprove = (id: number) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: '완료' } : request
    ));
  };

  const handleReject = (id: number) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: '반려' } : request
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
          <h1 className="text-2xl font-bold">호실변경 관리</h1>
        </div>
      </div>

      {/* 호실변경 신청 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">호실변경 신청 목록</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {requests.map((request) => (
            <div key={request.id} className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    request.status === '접수' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === '처리중' ? 'bg-blue-100 text-blue-800' :
                    request.status === '반려' ? 'bg-red-100 text-red-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{request.date}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">학생 정보</p>
                  <p className="font-medium">{request.name} ({request.studentId})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">호실 정보</p>
                  <p className="font-medium">{request.currentRoom} → {request.requestedRoom}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{request.reason}</p>
              {request.status === '접수' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
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

export default RoomChange;
