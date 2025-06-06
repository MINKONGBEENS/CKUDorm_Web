import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(process.env.DATABASE_URL!);

// 연결 테스트 함수
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('Database connection test successful:', result[0]);
    return true;
  } catch (error) {
    console.error('Database connection test failed:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      connectionString: process.env.DATABASE_URL!.replace(/:[^:@]*@/, ':****@') // 비밀번호 가림
    });
    return false;
  }
}

// 쿼리 실행 함수
export async function executeQuery<T>(
  query: string,
  values: any[] = []
): Promise<T[]> {
  try {
    console.log('Executing query:', {
      query,
      params: values.length
    });
    // neon은 sql(query, ...values) 형태로 파라미터 바인딩
    const result = await sql(query, ...values);
    console.log('Query executed successfully, rows:', result.length);
    return result as T[];
  } catch (error) {
    console.error('Database query error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      query,
      params: values.length
    });
    throw new DatabaseError(
      'Database query failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
      error instanceof Error ? error : undefined
    );
  }
}

export class DatabaseError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'DatabaseError';
  }
} 