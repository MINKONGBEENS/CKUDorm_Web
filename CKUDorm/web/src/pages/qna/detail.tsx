import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQnaStore } from '../../store/qna';
import { Button } from '../../components/common/Button';

const QnADetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [answer, setAnswer] = useState('');

  const { questions, updateQuestion } = useQnaStore();
  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-900">
          문의사항을 찾을 수 없습니다.
        </h2>
        <Button
          onClick={() => navigate('/qna')}
          className="mt-4"
        >
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  const handleSubmitAnswer = () => {
    updateQuestion(Number(id), { answer });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              {question.title}
            </h2>
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
              {question.category}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            작성일: {new Date(question.date).toLocaleDateString()}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="text-sm text-gray-900">
            {question.content}
          </div>
          {question.answer && !isEditing ? (
            <div className="mt-6 bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-900">답변</h3>
              <div className="mt-2 text-sm text-gray-700">
                {question.answer}
              </div>
            </div>
          ) : isEditing ? (
            <div className="mt-6">
              <textarea
                rows={4}
                className="shadow-sm block w-full focus:ring-[#006272] focus:border-[#006272] sm:text-sm border border-gray-300 rounded-md"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="답변을 입력하세요..."
              />
              <div className="mt-4 flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </Button>
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!answer.trim()}
                >
                  답변 등록
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <Button
                onClick={() => setIsEditing(true)}
              >
                답변 작성
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <Button
          variant="secondary"
          onClick={() => navigate('/qna')}
        >
          목록으로
        </Button>
      </div>
    </div>
  );
};

export default QnADetail; 