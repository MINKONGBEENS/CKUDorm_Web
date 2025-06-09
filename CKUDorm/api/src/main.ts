import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug'],
  });

  // CORS 설정
  app.enableCors({
    origin: [
      'http://localhost:3000',  // 웹 개발 환경
      'http://localhost:5173',  // Vite 개발 환경
      'http://localhost:19000', // Expo 개발 환경
      'http://localhost:19006', // Expo 웹
      /^https:\/\/.*\.ckudorm\.com$/, // 프로덕션 도메인
    ],
    credentials: true,
  });

  // API 문서화 설정
  const config = new DocumentBuilder()
    .setTitle('CKU Dormitory API')
    .setDescription('Catholic Kwandong University Dormitory Management System API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // 전역 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true,  // DTO에 정의되지 않은 속성이 있으면 요청 거부
      transform: true,  // 요청 데이터 자동 변환
    }),
  );

  // 서버 시작
  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`API Server is running on port ${port}`);
  logger.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
}
bootstrap();
