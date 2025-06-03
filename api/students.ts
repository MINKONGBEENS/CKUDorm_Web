import { VercelRequest, VercelResponse } from '@vercel/node';
import { Student } from '../src/types/types';
import { pool } from '../src/lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, query, body } = req;

  try {
    switch (method) {
      case 'GET':
        // 검색어가 있는 경우 필터링
        if (query.search) {
          const searchTerm = query.search.toString();
          const { rows } = await pool.query(
            `SELECT * FROM students 
             WHERE name ILIKE $1 
             OR student_id ILIKE $1 
             OR room_number ILIKE $1`,
            [`%${searchTerm}%`]
          );
          return res.status(200).json(rows);
        }
        // 검색어가 없으면 전체 목록 반환
        const { rows } = await pool.query('SELECT * FROM students');
        return res.status(200).json(rows);

      case 'PUT':
        const { id, ...updateData } = body;
        const setClause = Object.keys(updateData)
          .map((key, index) => `${key} = $${index + 2}`)
          .join(', ');
        const values = [id, ...Object.values(updateData)];
        
        const result = await pool.query(
          `UPDATE students SET ${setClause} WHERE id = $1 RETURNING *`,
          values
        );
        return res.status(200).json(result.rows[0]);

      case 'DELETE':
        const studentId = parseInt(query.id as string);
        await pool.query('DELETE FROM students WHERE id = $1', [studentId]);
        return res.status(200).json({ message: '학생이 삭제되었습니다.' });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
} 