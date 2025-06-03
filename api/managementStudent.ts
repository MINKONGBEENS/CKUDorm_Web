import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

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

    console.log('실행되는 쿼리:', query);
    console.log('검색어:', search);

    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('DB 조회 실패. 에러 내용:', err);
    if (err instanceof Error) {
      res.status(500).json({ error: `DB 조회 실패: ${err.message}` });
    } else {
      res.status(500).json({ error: 'DB 조회 실패: 알 수 없는 에러' });
    }
  }
} 