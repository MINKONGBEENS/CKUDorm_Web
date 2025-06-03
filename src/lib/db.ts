import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// 연결 테스트
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export class DatabaseError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export async function executeQuery<T>(
  query: string,
  values: any[] = []
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw new DatabaseError(
      'Database query failed',
      error instanceof Error ? error : undefined
    );
  } finally {
    client.release();
  }
} 