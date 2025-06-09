import React from 'react';
import { Link } from 'react-router-dom';
import { useQnaStore } from '../../store/qna';
import { Button } from '../../components/common/Button';
import type { Question } from '../../types';

const QnA: React.FC = () => {
  const questions = useQnaStore((state) => state.questions);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">문의사항</h1>
        <Button
          as={Link}
          to="/qna/new"
          variant="primary"
        >
          새 문의 작성
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {questions.map((question: Question) => (
            <li key={question.id}>
              <Link
                to={`/qna/${question.id}`}
                className="block hover:bg-gray-50"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-[#006272] truncate">
                        {question.title}
                      </p>
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {question.category}
                      </span>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="text-sm text-gray-500">
                        {new Date(question.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {question.content}
                    </p>
                  </div>
                  {question.answer && (
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span className="truncate">답변완료</span>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QnA; 