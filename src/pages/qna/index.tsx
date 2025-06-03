import React from 'react';
import { Link } from 'react-router-dom';

type Question = {
  id: number;
  title: string;
  category: string;
  content: string;
  date: string;
  answer: string;
};

interface QnAProps {
  questions: Question[];
}

const QnA: React.FC<QnAProps> = ({ questions }) => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => window.history.back()}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <i className="fas fa-arrow-left text-gray-600"></i>
          </button>
          <h1 className="text-2xl font-bold">Q&A 관리</h1>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">문의사항 목록</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {questions.map((question) => (
            <Link to={`/qna/${question.id}`} key={question.id} className="block hover:bg-gray-50 transition">
              <div className="p-6 cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mr-2">
                      {question.category}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      question.answer ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {question.answer ? '답변 완료' : '답변 미작성'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{question.date}</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{question.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{question.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QnA; 