import { VercelRequest, VercelResponse } from '@vercel/node';
import { Student, StudentUpdateInput } from '../src/types/types';
import { executeQuery, DatabaseError } from '../src/lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, query, body } = req;

  try {
    switch (method) {
      case 'GET': {
        const searchTerm = query.search?.toString();
        if (searchTerm) {
          const students = await executeQuery<Student>(
            `SELECT s.*, d.name as department_name 
             FROM ckudorm s
             LEFT JOIN department d ON s.department_id = d.id
             WHERE s.name ILIKE $1 
             OR CAST(s.student_id AS TEXT) ILIKE $1 
             OR d.name ILIKE $1
             OR CAST(s.room_number AS TEXT) ILIKE $1`,
            [`%${searchTerm}%`]
          );
          return res.status(200).json(students);
        }
        
        const students = await executeQuery<Student>(
          `SELECT s.*, d.name as department_name 
           FROM ckudorm s
           LEFT JOIN department d ON s.department_id = d.id`
        );
        return res.status(200).json(students);
      }

      case 'PUT': {
        const { id, ...updateData } = body as StudentUpdateInput & { id: number };
        const setClause = Object.keys(updateData)
          .map((key, index) => `${key} = $${index + 2}`)
          .join(', ');
        const values = [id, ...Object.values(updateData)];
        
        const [updatedStudent] = await executeQuery<Student>(
          `UPDATE ckudorm SET ${setClause} 
           WHERE id = $1 
           RETURNING *, 
           (SELECT name FROM department WHERE id = department_id) as department_name`,
          values
        );
        return res.status(200).json(updatedStudent);
      }

      case 'DELETE': {
        const studentId = parseInt(query.id as string);
        await executeQuery(
          'DELETE FROM ckudorm WHERE id = $1',
          [studentId]
        );
        return res.status(200).json({ message: '학생이 삭제되었습니다.' });
      }

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof DatabaseError) {
      return res.status(500).json({ error: `데이터베이스 오류: ${error.message}` });
    }
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
} 