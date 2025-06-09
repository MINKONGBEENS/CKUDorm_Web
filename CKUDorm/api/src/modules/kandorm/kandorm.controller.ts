import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { KandormService } from './kandorm.service';
import { Kandorm } from '../../entities/kandorm.entity';
import { ApiResponse } from '../../types/common';

@Controller('kandorm')
export class KandormController {
  constructor(private readonly kandormService: KandormService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('search') search?: string,
  ): Promise<ApiResponse<{ students: Kandorm[]; total: number }>> {
    const { students, total } = await this.kandormService.findAll(page, limit, search);
    return {
      success: true,
      data: {
        students,
        total,
      },
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Kandorm>> {
    const student = await this.kandormService.findOne(id);
    return {
      success: true,
      data: student,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Kandorm>,
  ): Promise<ApiResponse<Kandorm>> {
    const student = await this.kandormService.update(id, updateData);
    return {
      success: true,
      data: student,
      message: '학생 정보가 수정되었습니다.',
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    await this.kandormService.delete(id);
    return {
      success: true,
      message: '학생이 삭제되었습니다.',
    };
  }
} 