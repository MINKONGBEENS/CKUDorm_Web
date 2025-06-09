import { IsString, IsNumber, IsEnum, Min, Max, IsOptional } from 'class-validator';
import { PointType } from '../../../entities/point.entity';

export class UpdatePointDto {
  @IsNumber()
  @Min(-10)
  @Max(10)
  @IsOptional()
  point?: number;  // 점수 (-10 ~ 10점)

  @IsEnum(PointType)
  @IsOptional()
  type?: PointType;  // 상점/벌점 구분

  @IsString()
  @IsOptional()
  reason?: string;  // 사유

  @IsNumber()
  @IsOptional()
  createdBy?: number;  // 등록자 (관리자) ID
} 