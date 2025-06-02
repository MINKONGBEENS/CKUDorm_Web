import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard';
import RoomChange from './pages/room/index';
import StudentManagement from './pages/student/index';
import StudentDetail from './pages/student/detail';
import MealMenu from './pages/meal/index';
import QnA from './pages/qna/index';
import QnADetail from './pages/qna/detail';
import RepairReport from './pages/repair/index';

const App: React.FC = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: '기숙사 입사 날짜 문의',
      category: '입사',
      content: '2024년 1학기 기숙사 입사 날짜가 언제인가요?',
      date: '2024-03-15',
      answer: ''
    },
    {
      id: 2,
      title: '세탁기 사용 방법',
      category: '시설',
      content: '세탁기 사용 방법을 알려주세요.',
      date: '2024-03-14',
      answer: '1층 세탁실에 있는 세탁기는 카드로 결제 후 사용 가능합니다. 세제는 개인 준비물입니다.'
    },
    {
      id: 3,
      title: '방학 중 기숙사 사용',
      category: '기타',
      content: '방학 중에도 기숙사에 머물 수 있나요?',
      date: '2024-03-13',
      answer: '방학 중 기숙사 사용은 별도 신청이 필요합니다. 학과 사무실에서 신청서를 받아 작성해주세요.'
    }
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="room-change" element={<RoomChange />} />
          <Route path="student">
            <Route index element={<StudentManagement />} />
            <Route path=":id" element={<StudentDetail />} />
          </Route>
          <Route path="repair" element={<RepairReport />} />
          <Route path="qna">
            <Route index element={<QnA questions={questions} setQuestions={setQuestions} />} />
            <Route path=":id" element={<QnADetail questions={questions} setQuestions={setQuestions} />} />
          </Route>
          <Route path="meal" element={<MealMenu />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App; 