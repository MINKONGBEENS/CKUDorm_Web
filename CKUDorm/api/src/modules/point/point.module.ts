import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from '../../entities/point.entity';
import { Kandorm } from '../../entities/kandorm.entity';
import { Admin } from '../../entities/admin.entity';
import { PointService } from './point.service';
import { PointController } from './point.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Point, Kandorm, Admin])],
  providers: [PointService],
  controllers: [PointController],
  exports: [PointService],
})
export class PointModule {} 