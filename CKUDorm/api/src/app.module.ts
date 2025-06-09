import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { User } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          Department,
          Admin,
          User,
          Kandorm,
          LeaveRequest,
          Menu,
          Notice,
          Point,
          Qna,
        ],
        synchronize: false,
        logging: true,
        charset: 'utf8mb4',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    NoticeModule,
    PointModule,
    KandormModule,
  ],
})
export class AppModule {}
