import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Admin {
  id: number;
  username: string;
  name: string;
  role: string;
  department: string;
  email: string;
  created_at: string;
  last_login: string;
  is_active: boolean;
}

const AdminManagement: React.FC = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    name: '',
    role: '일반관리자',
    department: '학생처',
    email: '',
    password: '',
  });

  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 1,
      username: 'admin1',
      name: '김관리',
      role: '최고관리자',
      department: '학생처',
      email: 'admin1@cku.ac.kr',
      created_at: '2024-01-01',
      last_login: '2024-03-15 14:30',
      is_active: true,
    },
    {
      id: 2,
      username: 'dormadmin',
      name: '박기숙',
      role: '기숙사관리자',
      department: '학생처',
      email: 'dormadmin@cku.ac.kr',
      created_at: '2024-02-01',
      last_login: '2024-03-14 09:15',
      is_active: true,
    },
    {
      id: 3,
      username: 'mealadmin',
      name: '이식당',
      role: '식당관리자',
      department: '복지과',
      email: 'mealadmin@cku.ac.kr',
      created_at: '2024-02-15',
      last_login: '2024-03-10 16:20',
      is_active: false,
    },
  ]);

  const handleCreateAdmin = () => {
    if (!newAdmin.username || !newAdmin.name || !newAdmin.email || !newAdmin.password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const admin: Admin = {
      id: Date.now(),
      ...newAdmin,
      created_at: new Date().toISOString().split('T')[0],
      last_login: '-',
      is_active: true,
    };

    setAdmins([admin, ...admins]);
    setNewAdmin({
      username: '',
      name: '',
      role: '일반관리자',
      department: '학생처',
      email: '',
      password: '',
    });
    setShowCreateForm(false);
  };

  const handleDeleteAdmin = (id: number) => {
    if (confirm('이 관리자 계정을 삭제하시겠습니까?')) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
  };

  const handleToggleActive = (id: number) => {
    setAdmins(admins.map(admin => 
      admin.id === id ? { ...admin, is_active: !admin.is_active } : admin
    ));
  };

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin);
    setNewAdmin({
      username: admin.username,
      name: admin.name,
      role: admin.role,
      department: admin.department,
      email: admin.email,
      password: '',
    });
    setShowCreateForm(true);
  };

  const handleUpdateAdmin = () => {
    if (!newAdmin.username || !newAdmin.name || !newAdmin.email) {
      alert('필수 필드를 입력해주세요.');
      return;
    }

    if (!editingAdmin) return;

    setAdmins(admins.map(admin => 
      admin.id === editingAdmin.id 
        ? { ...admin, ...newAdmin }
        : admin
    ));
    
    setEditingAdmin(null);
    setNewAdmin({
      username: '',
      name: '',
      role: '일반관리자',
      department: '학생처',
      email: '',
      password: '',
    });
    setShowCreateForm(false);
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
          <h1 className="text-2xl font-bold">관리자 계정 관리</h1>
        </div>
        <button
          onClick={() => {
            setEditingAdmin(null);
            setNewAdmin({
              username: '',
              name: '',
              role: '일반관리자',
              department: '학생처',
              email: '',
              password: '',
            });
            setShowCreateForm(true);
          }}
          className="px-4 py-2 bg-[#006272] text-white rounded-md hover:bg-[#004d5a] transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>관리자 추가
        </button>
      </div>

      {/* 관리자 추가/수정 폼 */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              {editingAdmin ? '관리자 수정' : '관리자 추가'}
            </h2>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditingAdmin(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
              <input
                type="text"
                value={newAdmin.username}
                onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="관리자 아이디"
                disabled={!!editingAdmin}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              <input
                type="text"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="관리자 이름"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">권한</label>
              <select
                value={newAdmin.role}
                onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="일반관리자">일반관리자</option>
                <option value="기숙사관리자">기숙사관리자</option>
                <option value="식당관리자">식당관리자</option>
                <option value="최고관리자">최고관리자</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">부서</label>
              <select
                value={newAdmin.department}
                onChange={(e) => setNewAdmin({...newAdmin, department: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="학생처">학생처</option>
                <option value="복지과">복지과</option>
                <option value="시설관리과">시설관리과</option>
                <option value="보안과">보안과</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="이메일 주소"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {editingAdmin ? '새 비밀번호 (선택사항)' : '비밀번호'}
              </label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={editingAdmin ? "변경시에만 입력" : "비밀번호"}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditingAdmin(null);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
            <button
              onClick={editingAdmin ? handleUpdateAdmin : handleCreateAdmin}
              className="px-4 py-2 bg-[#006272] text-white rounded-md hover:bg-[#004d5a] transition-colors"
            >
              {editingAdmin ? '수정' : '추가'}
            </button>
          </div>
        </div>
      )}

      {/* 관리자 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">관리자 목록</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리자 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  권한/부서
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  최근 로그인
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                      <div className="text-sm text-gray-500">@{admin.username}</div>
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        admin.role === '최고관리자' ? 'bg-purple-100 text-purple-800' :
                        admin.role === '기숙사관리자' ? 'bg-blue-100 text-blue-800' :
                        admin.role === '식당관리자' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {admin.role}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">{admin.department}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      admin.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.is_active ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.last_login}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAdmin(admin)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleToggleActive(admin.id)}
                        className={admin.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                      >
                        {admin.is_active ? '비활성화' : '활성화'}
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        삭제
                      </button>
                    </div>
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

export default AdminManagement; 