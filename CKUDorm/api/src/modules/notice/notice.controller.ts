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
import { NoticeService } from './notice.service';
import { Notice, NoticeCategory } from '../../entities/notice.entity';
import { ApiResponse } from '../../types/common';

@Controller('notices')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  async findAll(
    @Query('category') category?: NoticeCategory,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ): Promise<ApiResponse<{ notices: Notice[]; total: number }>> {
    const { notices, total } = await this.noticeService.findAll({
      category,
      page,
      limit,
      search,
    });

    return {
      success: true,
      data: {
        notices,
        total,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Notice>> {
    const notice = await this.noticeService.findOne(id);
    return {
      success: true,
      data: notice,
    };
  }

  @Post()
  async create(@Body() notice: Partial<Notice>): Promise<ApiResponse<Notice>> {
    const newNotice = await this.noticeService.create(notice);
    return {
      success: true,
      data: newNotice,
      message: '공지사항이 등록되었습니다.',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() notice: Partial<Notice>,
  ): Promise<ApiResponse<Notice>> {
    const updatedNotice = await this.noticeService.update(id, notice);
    return {
      success: true,
      data: updatedNotice,
      message: '공지사항이 수정되었습니다.',
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    await this.noticeService.delete(id);
    return {
      success: true,
      message: '공지사항이 삭제되었습니다.',
    };
  }
} 