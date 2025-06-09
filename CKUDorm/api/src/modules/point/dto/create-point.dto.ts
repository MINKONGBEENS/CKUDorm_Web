import { IsString, IsNumber, IsEnum, Min, Max } from 'class-validator';
import { PointType } from '../../../entities/point.entity';

export class CreatePointDto {
  @IsNumber()
  studentId: number;  // 학번

  @IsNumber()
  @Min(-10)
  @Max(10)
  point: number;  // 점수 (-10 ~ 10점)

  @IsEnum(PointType)
  type: PointType;  // 상점/벌점 구분

  @IsString()
  reason: string;  // 사유

  @IsNumber()
  createdBy: number;  // 등록자 (관리자) ID
} 