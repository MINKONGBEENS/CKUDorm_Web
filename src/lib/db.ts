import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const connectionString = process.env.DATABASE_URL;

// Vercel의 Serverless 환경에 최적화된 연결 풀 설정
export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 1, // Serverless 환경에서는 연결 수를 최소화
  connectionTimeoutMillis: 5000, // 5초
  idleTimeoutMillis: 1000, // 1초
  allowExitOnIdle: true,
  keepAlive: false // Serverless 환경에서는 연결 유지가 불필요
});

// 연결 이벤트 리스너
pool.on('connect', () => {
  console.log('New database connection established');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', {
    message: err.message,
    stack: err.stack,
    error: err
  });
  process.exit(-1); // 심각한 오류 발생 시 프로세스 종료
});

// 연결 테스트 함수
export async function testConnection() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('Database connection test successful:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection test failed:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      connectionString: connectionString.replace(/:[^:@]*@/, ':****@') // 비밀번호 가림
    });
    return false;
  } finally {
    if (client) {
      try {
        await client.release(true);
      } catch (e) {
        console.error('Error releasing client:', e);
      }
    }
  }
}

// 쿼리 실행 함수
export async function executeQuery<T>(
  query: string,
  values: any[] = []
): Promise<T[]> {
  const client = await pool.connect();
  try {
    console.log('Executing query:', {
      query,
      params: values.length
    });
    
    const result = await client.query(query, values);
    console.log('Query executed successfully, rows:', result.rows.length);
    return result.rows;
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
  } finally {
    try {
      await client.release(true);
    } catch (e) {
      console.error('Error releasing client:', e);
    }
  }
}

export class DatabaseError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'DatabaseError';
  }
} 