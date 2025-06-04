import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

console.log('Initializing database connection pool');

const connectionString = process.env.DATABASE_URL;
console.log('Connection string format valid:', connectionString.startsWith('postgresql://'));

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// 연결 테스트
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', {
    message: err.message,
    stack: err.stack,
    error: err
  });
  process.exit(-1);
});

pool.on('connect', () => {
  console.log('New database connection established');
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
      stack: error instanceof Error ? error.stack : undefined
    });
    return false;
  } finally {
    if (client) {
      client.release();
    }
  }
}

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
  let client;
  try {
    client = await pool.connect();
    console.log('Executing query:', {
      query,
      values,
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
      values
    });
    
    throw new DatabaseError(
      'Database query failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
      error instanceof Error ? error : undefined
    );
  } finally {
    if (client) {
      client.release();
    }
  }
} 