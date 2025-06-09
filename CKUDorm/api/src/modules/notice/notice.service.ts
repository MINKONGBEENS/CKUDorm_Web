import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Notice, NoticeCategory } from '../../entities/notice.entity';

interface FindAllOptions {
  category?: NoticeCategory;
  page?: number;
  limit?: number;
  search?: string;
}

interface PaginatedNotices {
  notices: Notice[];
  total: number;
}

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) {}

  async findAll(options: FindAllOptions): Promise<PaginatedNotices> {
    const { category, page = 1, limit = 10, search } = options;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (category) {
      whereClause.category = category;
    }
    if (search) {
      whereClause.title = Like(`%${search}%`);
    }

    const [notices, total] = await this.noticeRepository.findAndCount({
      where: whereClause,
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: limit,
      relations: ['author'],
    });

    return {
      notices,
      total,
    };
  }

  async findOne(id: number): Promise<Notice> {
    const notice = await this.noticeRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!notice) {
      throw new NotFoundException('Notice not found');
    }
    return notice;
  }

  async create(notice: Partial<Notice>): Promise<Notice> {
    const newNotice = this.noticeRepository.create(notice);
    return this.noticeRepository.save(newNotice);
  }

  async update(id: number, notice: Partial<Notice>): Promise<Notice> {
    await this.findOne(id); // 존재 여부 확인
    await this.noticeRepository.update(id, notice);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const notice = await this.findOne(id);
    await this.noticeRepository.remove(notice);
  }
} 