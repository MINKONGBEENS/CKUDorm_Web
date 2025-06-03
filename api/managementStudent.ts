import { VercelRequest, VercelResponse } from '@vercel/node';
import { executeQuery, DatabaseError } from '../src/lib/db';
import { Student, StudentUpdateInput } from '../src/types/types';
import { withErrorHandler } from '../src/lib/api-middleware';

async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, query, body } = req;

  try {
    switch (method) {
      case 'GET': {
        const { search, page = '1', limit = '10' } = query;
        const currentPage = parseInt(page as string);
        const itemsPerPage = parseInt(limit as string);
        const offset = (currentPage - 1) * itemsPerPage;

        // 기본 쿼리 구성
        let whereClause = '';
        let countWhereClause = '';
        let values: any[] = [];
        
        if (search) {
          whereClause = `
            WHERE 
              s.name ILIKE $1 OR 
              CAST(s.student_id AS TEXT) ILIKE $1 OR 
              d.name ILIKE $1 OR 
              CAST(s.room_number AS TEXT) ILIKE $1
          `;
          countWhereClause = whereClause;
          values = [`%${search}%`];
        }

        // 전체 개수 조회
        const [totalCount] = await executeQuery<{count: string}>(`
          SELECT COUNT(*) as count
          FROM ckudorm s
          LEFT JOIN department d ON s.department_id = d.id
          ${countWhereClause}
        `, values);

        // 페이지네이션된 데이터 조회
        const paginationValues = [...values, itemsPerPage, offset];
        const students = await executeQuery<Student>(`
          SELECT s.*, d.name as department_name 
          FROM ckudorm s
          LEFT JOIN department d ON s.department_id = d.id
          ${whereClause}
          ORDER BY s.id
          LIMIT $${values.length + 1} OFFSET $${values.length + 2}
        `, paginationValues);

        if (!students) {
          throw new Error('학생 데이터를 불러오는데 실패했습니다.');
        }

        return res.status(200).json({
          success: true,
          data: students,
          pagination: {
            total: parseInt(totalCount.count),
            currentPage,
            itemsPerPage,
            totalPages: Math.ceil(parseInt(totalCount.count) / itemsPerPage)
          }
        });
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

        if (!updatedStudent) {
          throw new Error('학생 정보 수정에 실패했습니다.');
        }

        return res.status(200).json({
          success: true,
          data: updatedStudent
        });
      }

      case 'DELETE': {
        const studentId = parseInt(query.id as string);
        await executeQuery(
          'DELETE FROM ckudorm WHERE id = $1',
          [studentId]
        );
        return res.status(200).json({
          success: true,
          message: '학생이 삭제되었습니다.'
        });
      }

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({
          success: false,
          error: `Method ${method} Not Allowed`
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.'
    });
  }
}

export default withErrorHandler(handler); 