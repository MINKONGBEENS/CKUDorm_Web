import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PointService } from './point.service';
import { Point } from '../../entities/point.entity';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { ApiResponse } from '../../types/common';

@Controller('points')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Get()
  async findAll(): Promise<ApiResponse<Point[]>> {
    const points = await this.pointService.findAll();
    return {
      success: true,
      data: points,
    };
  }

  @Get('student/:studentId')
  async findByStudent(
    @Param('studentId', ParseIntPipe) studentId: number,
  ): Promise<ApiResponse<Point[]>> {
    const points = await this.pointService.findByStudent(studentId);
    return {
      success: true,
      data: points,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Point>> {
    const point = await this.pointService.findOne(id);
    return {
      success: true,
      data: point,
    };
  }

  @Post()
  async create(@Body() createPointDto: CreatePointDto): Promise<ApiResponse<Point>> {
    const point = await this.pointService.create(createPointDto);
    return {
      success: true,
      data: point,
      message: '상벌점이 등록되었습니다.',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePointDto: UpdatePointDto,
  ): Promise<ApiResponse<Point>> {
    const point = await this.pointService.update(id, updatePointDto);
    return {
      success: true,
      data: point,
      message: '상벌점이 수정되었습니다.',
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    await this.pointService.delete(id);
    return {
      success: true,
      message: '상벌점이 삭제되었습니다.',
    };
  }
} 