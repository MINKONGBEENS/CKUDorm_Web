import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface QnADetailProps {
  questions: any[];
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

const QnADetail: React.FC<QnADetailProps> = ({ questions, setQuestions }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const question = questions.find(q => q.id === Number(id));
  const [answer, setAnswer] = useState(question?.answer || '');

  if (!question) return <div className="p-8">존재하지 않는 문의입니다.</div>;

  const handleSubmit = () => {
    setQuestions(questions.map(q =>
      q.id === question.id ? { ...q, answer } : q
    ));
    navigate('/qna');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <i className="fas fa-arrow-left text-gray-600"></i>
        </button>
        <h1 className="text-2xl font-bold">Q&A 상세</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mr-2">
            {question.category}
          </span>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
            question.answer ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {question.answer ? '답변 완료' : '답변 미작성'}
          </span>
          <span className="text-sm text-gray-500 ml-auto">{question.date}</span>
        </div>
        <h2 className="text-lg font-semibold mb-2">{question.title}</h2>
        <p className="text-gray-700 mb-4">{question.content}</p>
        <div className="mt-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">답변</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006272] h-32"
            placeholder="답변을 입력하세요"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-[#006272] text-white rounded-md hover:bg-[#004d5a] transition-colors"
            disabled={answer.trim() === ''}
          >
            답변 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default QnADetail; 