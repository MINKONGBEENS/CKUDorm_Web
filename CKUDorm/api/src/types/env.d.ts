declare namespace NodeJS {
  interface ProcessEnv {
    // 데이터베이스 설정
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;

    // 서버 설정
    PORT: string;
    NODE_ENV: 'development' | 'production' | 'test';

    // JWT 설정
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;

    // Redis 설정 (향후 사용)
    REDIS_HOST?: string;
    REDIS_PORT?: string;
    REDIS_PASSWORD?: string;
  }
} 