import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw new DatabaseError(
      'Database query failed',
      error instanceof Error ? error : undefined
    );
  }
} 