import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { NoticeModule } from './modules/notice/notice.module';
import { PointModule } from './modules/point/point.module';
import { KandormModule } from './modules/kandorm/kandorm.module';
import { Admin } from './entities/admin.entity';
import { Department } from './entities/department.entity';
import { Kandorm } from './entities/kandorm.entity';
import { LeaveRequest } from './entities/leave-request.entity';
import { Menu } from './entities/menu.entity';
import { Notice } from './entities/notice.entity';
import { Point } from './entities/point.entity';
import { Qna } from './entities/qna.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Admin, Department, Kandorm, LeaveRequest, Menu, Notice, Point, Qna],
      synchronize: false,  // 테이블 자동 생성 비활성화
    }),
    AuthModule,
    NoticeModule,
    PointModule,
    KandormModule,
  ],
})
export class AppModule {}
