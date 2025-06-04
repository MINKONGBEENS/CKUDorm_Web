import { VercelRequest, VercelResponse } from '@vercel/node';
import { executeQuery, DatabaseError, testConnection } from '../src/lib/db';
import { Student, StudentUpdateInput } from '../src/types/types';
import { withErrorHandler } from '../src/lib/api-middleware';

async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, query, body } = req;

  try {
    console.log('Starting request processing:', { method, query });
    
    // 데이터베이스 연결 테스트
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Database connection test failed');
      return res.status(500).json({
        success: false,
        error: '데이터베이스 연결에 실패했습니다.'
      });
    }

    console.log('Database connection successful');
    
    switch (method) {
      case 'GET': {
        const { search, page = '1', limit = '10' } = query;
        const currentPage = parseInt(page as string);
        const itemsPerPage = parseInt(limit as string);
        const offset = (currentPage - 1) * itemsPerPage;

        console.log('Processing GET request:', { search, currentPage, itemsPerPage, offset });

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
        let totalCount;
        try {
          console.log('Executing count query');
          [totalCount] = await executeQuery<{count: string}>(`
            SELECT COUNT(*) as count
            FROM ckudorm s
            LEFT JOIN department d ON s.department_id = d.id
            ${countWhereClause}
          `, values);
          console.log('Count query result:', totalCount);
        } catch (error) {
          console.error('Count query error:', {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
          });
          return res.status(500).json({
            success: false,
            error: '학생 수 조회에 실패했습니다.'
          });
        }

        if (!totalCount) {
          totalCount = { count: '0' };
        }

        // 페이지네이션된 데이터 조회
        let students;
        try {
          console.log('Executing main query');
          const paginationValues = [...values, itemsPerPage, offset];
          students = await executeQuery<Student>(`
            SELECT s.*, d.name as department_name 
            FROM ckudorm s
            LEFT JOIN department d ON s.department_id = d.id
            ${whereClause}
            ORDER BY s.id
            LIMIT $${values.length + 1} OFFSET $${values.length + 2}
          `, paginationValues);
          console.log('Main query result count:', students?.length);
        } catch (error) {
          console.error('Main query error:', {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
          });
          return res.status(500).json({
            success: false,
            error: '학생 데이터 조회에 실패했습니다.'
          });
        }

        if (!students || !Array.isArray(students)) {
          students = [];
        }

        const response = {
          success: true,
          data: students,
          pagination: {
            total: parseInt(totalCount.count),
            currentPage,
            itemsPerPage,
            totalPages: Math.ceil(parseInt(totalCount.count) / itemsPerPage)
          }
        };

        console.log('Sending successful response:', {
          success: response.success,
          dataLength: response.data.length,
          pagination: response.pagination
        });

        return res.status(200).json(response);
      }

      case 'PUT': {
        const { id, ...updateData } = body as StudentUpdateInput & { id: number };
        const setClause = Object.keys(updateData)
          .map((key, index) => `${key} = $${index + 2}`)
          .join(', ');
        const values = [id, ...Object.values(updateData)];
        
        console.log('Processing PUT request:', { id, updateFields: Object.keys(updateData) });
        
        try {
          const [updatedStudent] = await executeQuery<Student>(
            `UPDATE ckudorm SET ${setClause} 
             WHERE id = $1 
             RETURNING *, 
             (SELECT name FROM department WHERE id = department_id) as department_name`,
            values
          );

          if (!updatedStudent) {
            return res.status(404).json({
              success: false,
              error: '학생을 찾을 수 없습니다.'
            });
          }

          console.log('Update successful:', { id: updatedStudent.id });
          
          return res.status(200).json({
            success: true,
            data: updatedStudent
          });
        } catch (error) {
          console.error('Update error:', {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
          });
          return res.status(500).json({
            success: false,
            error: '학생 정보 수정에 실패했습니다.'
          });
        }
      }

      case 'DELETE': {
        const studentId = parseInt(query.id as string);
        console.log('Processing DELETE request:', { studentId });
        
        try {
          await executeQuery(
            'DELETE FROM ckudorm WHERE id = $1',
            [studentId]
          );
          console.log('Delete successful:', { studentId });
          
          return res.status(200).json({
            success: true,
            message: '학생이 삭제되었습니다.'
          });
        } catch (error) {
          console.error('Delete error:', {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined
          });
          return res.status(500).json({
            success: false,
            error: '학생 삭제에 실패했습니다.'
          });
        }
      }

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({
          success: false,
          error: `Method ${method} Not Allowed`
        });
    }
  } catch (error) {
    console.error('Unhandled API Error:', {
      method: req.method,
      path: req.url,
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    });

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.'
    });
  }
}

export default withErrorHandler(handler); 