import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaveRequests, updateLeaveRequestStatus, LeaveRequest } from '../../api/leave-request';
import { toast } from 'react-hot-toast';

const OvernightManagement: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [applications, setApplications] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const response = await getLeaveRequests();
      if (response.success && Array.isArray(response.data)) {
        setApplications(response.data);
      } else {
        toast.error('외박신청 목록을 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('외박신청 목록을 불러오는데 실패했습니다:', error);
      toast.error('외박신청 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: '승인완료' | '반려') => {
    try {
      const response = await updateLeaveRequestStatus(id, newStatus);
      if (response.success) {
        await fetchLeaveRequests(); // 목록 새로고침
        toast.success(response.message || `신청이 ${newStatus === '승인완료' ? '승인' : '반려'}되었습니다.`);
      } else {
        toast.error('상태 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('상태 변경에 실패했습니다:', error);
      toast.error('상태 변경에 실패했습니다.');
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case '승인대기': return 'bg-yellow-100 text-yellow-800';
      case '승인완료': return 'bg-green-100 text-green-800';
      case '반려': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="text-2xl font-bold">외박신청 관리</h1>
        </div>
      </div>

      {/* 필터 */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-[#006272] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('승인대기')}
            className={`px-4 py-2 rounded-md ${filter === '승인대기' ? 'bg-[#006272] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            승인대기
          </button>
          <button
            onClick={() => setFilter('승인완료')}
            className={`px-4 py-2 rounded-md ${filter === '승인완료' ? 'bg-[#006272] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            승인완료
          </button>
          <button
            onClick={() => setFilter('반려')}
            className={`px-4 py-2 rounded-md ${filter === '반려' ? 'bg-[#006272] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            반려
          </button>
        </div>
      </div>

      {/* 외박신청 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">외박신청 목록</h2>
        </div>
        {loading ? (
          <div className="p-6 text-center text-gray-500">로딩 중...</div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">외박신청 내역이 없습니다.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredApplications.map((app) => (
              <div key={app.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">신청일: {new Date(app.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <h3 className="font-medium text-lg mb-2">{app.studentName} ({app.studentId})</h3>
                    <p className="text-gray-600">호실: {app.room}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">외박 기간</p>
                    <p className="font-medium">{new Date(app.startDate).toLocaleDateString()} ~ {new Date(app.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">외박 사유</p>
                    <p className="font-medium">{app.reason}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">목적지</p>
                    <p className="font-medium">{app.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">비상연락처</p>
                    <p className="font-medium">{app.emergencyContact}</p>
                  </div>
                </div>

                {app.status === '승인대기' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(app.id, '승인완료')}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => handleStatusChange(app.id, '반려')}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      반려
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OvernightManagement; 