import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notice, NoticeCategory } from '../../entities/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) {}

  async findAll(category?: NoticeCategory): Promise<Notice[]> {
    const where = category ? { category } : {};
    return this.noticeRepository.find({
      where,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Notice> {
    const notice = await this.noticeRepository.findOne({ where: { id } });
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
    const updatedNotice = await this.noticeRepository.findOne({ where: { id } });
    if (!updatedNotice) {
      throw new NotFoundException('Notice not found after update');
    }
    return updatedNotice;
  }

  async delete(id: number): Promise<void> {
    const notice = await this.findOne(id);
    await this.noticeRepository.remove(notice);
  }
} 