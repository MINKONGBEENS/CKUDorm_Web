import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';

// Pages
import Dashboard from './pages/dashboard';
import RoomChange from './pages/room';
import MealMenu from './pages/meal';
import QnA from './pages/qna';
import QnADetail from './pages/qna/detail';
import RepairReport from './pages/repair';
import StudentList from './pages/student';
import PointsManagement from './pages/points';
import OvernightManagement from './pages/overnight';
import NoticeManagement from './pages/notice';
import NoticeDetail from './pages/notice/detail';
import AdminManagement from './pages/admin';
import Login from './pages/auth/login';
import NotFound from './pages/404';

const AdminRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'ADMIN') return <Navigate to="/login" replace />;
  return element;
};

const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/* 로그인 페이지 */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            }
          />

          {/* 관리자 전용 라우트 */}
          <Route path="/" element={<Layout />}>
            <Route index element={<AdminRoute element={<Dashboard />} />} />
            <Route path="student" element={<AdminRoute element={<StudentList />} />} />
            <Route path="points" element={<AdminRoute element={<PointsManagement />} />} />
            <Route path="overnight" element={<AdminRoute element={<OvernightManagement />} />} />
            <Route path="notice">
              <Route index element={<AdminRoute element={<NoticeManagement />} />} />
              <Route path=":id" element={<AdminRoute element={<NoticeDetail />} />} />
            </Route>
            <Route path="admin" element={<AdminRoute element={<AdminManagement />} />} />
            <Route path="room-change" element={<AdminRoute element={<RoomChange />} />} />
            <Route path="repair" element={<AdminRoute element={<RepairReport />} />} />
            <Route path="qna">
              <Route index element={<AdminRoute element={<QnA />} />} />
              <Route path=":id" element={<AdminRoute element={<QnADetail />} />} />
            </Route>
            <Route path="meal" element={<AdminRoute element={<MealMenu />} />} />
            
            {/* 404 페이지 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App; 