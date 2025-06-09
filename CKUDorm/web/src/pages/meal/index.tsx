// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MealMenu: React.FC = () => {
  const navigate = useNavigate();
  const [menuFile, setMenuFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMenuFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!menuFile) return;
    // TODO: 파일 업로드 로직 구현
    alert('식단표가 업로드되었습니다.');
    setMenuFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
          <h1 className="text-2xl font-bold">식당</h1>
        </div>
        <button
          onClick={handleUpload}
          disabled={!menuFile}
          className={`flex items-center px-4 py-2 rounded-md text-white font-semibold shadow-sm transition-colors ${
            menuFile ? 'bg-[#006272] hover:bg-[#004d5a]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <i className="fas fa-upload mr-2"></i> 식단표 업로드
        </button>
      </div>

      {/* 식당 운영 시간 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">식당 운영 시간</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-md p-4">
            <div className="font-semibold mb-2">평일</div>
            <div>점심: 11:40 - 13:00</div>
            <div>저녁: 17:40 - 19:00</div>
          </div>
          <div className="bg-gray-50 rounded-md p-4">
            <div className="font-semibold mb-2">토요일</div>
            <div>미운영</div>
          </div>
          <div className="bg-gray-50 rounded-md p-4">
            <div className="font-semibold mb-2">일요일</div>
            <div>점심: 11:40 - 13:00</div>
            <div>저녁: 17:40 - 18:00</div>
          </div>
        </div>
      </div>

      {/* 식단표 업로드 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold mb-4">식단표 업로드</h2>
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center py-12 mb-4">
          <i className="fas fa-file-upload text-4xl text-gray-400 mb-4"></i>
          <p className="text-gray-500 mb-2">Excel 또는 PDF 파일을 드래그하여 업로드하거나<br/>파일을 선택해주세요.</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            파일 선택
          </button>
          <input
            type="file"
            accept=".xlsx,.xls,.pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          {menuFile && (
            <div className="mt-4 text-sm text-gray-700">선택된 파일: {menuFile.name}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealMenu;
