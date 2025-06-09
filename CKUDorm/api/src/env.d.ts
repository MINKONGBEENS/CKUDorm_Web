declare namespace NodeJS {
  interface ProcessEnv {
    // Database
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;

    // JWT
    JWT_SECRET: string;

    // Server
    PORT: string;
  }
} 