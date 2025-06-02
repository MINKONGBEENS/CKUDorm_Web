import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Student } from '../../src/api/types';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method === 'GET') {
    try {
      // 여기에 실제 데이터베이스 연동 로직이 들어갑니다
      const students: Student[] = [
        {
          id: '1',
          name: '홍길동',
          roomNumber: '101',
        },
        // 더미 데이터
      ];

      return response.status(200).json({
        data: students,
        status: 200,
        message: '학생 목록을 성공적으로 불러왔습니다.',
      });
    } catch (error) {
      return response.status(500).json({
        data: null,
        status: 500,
        message: '서버 에러가 발생했습니다.',
      });
    }
  }

  return response.status(405).json({
    data: null,
    status: 405,
    message: '허용되지 않는 메소드입니다.',
  });
} 