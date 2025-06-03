import { VercelRequest, VercelResponse } from '@vercel/node';
import { executeQuery, DatabaseError } from '../src/lib/db';
import { Student } from '../src/types/types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { search } = req.query;

  try {
    let query = `
      SELECT s.*, d.name as department_name 
      FROM ckudorm s
      LEFT JOIN department d ON s.department_id = d.id
    `;
    let values: any[] = [];

    if (search) {
      query = `
        SELECT s.*, d.name as department_name 
        FROM ckudorm s
        LEFT JOIN department d ON s.department_id = d.id
        WHERE 
          s.name ILIKE $1 OR 
          CAST(s.student_id AS TEXT) ILIKE $1 OR 
          d.name ILIKE $1 OR 
          CAST(s.room_number AS TEXT) ILIKE $1
      `;
      values = [`%${search}%`];
    }

    const students = await executeQuery<Student>(query, values);
    res.status(200).json(students);
  } catch (err) {
    console.error('학생 데이터 조회 실패:', err);
    if (err instanceof DatabaseError) {
      res.status(500).json({ error: `데이터베이스 오류: ${err.message}` });
    } else {
      res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
  }
} 