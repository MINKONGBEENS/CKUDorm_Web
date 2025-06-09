import { Repository } from 'typeorm';
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
export declare class NoticeService {
    private noticeRepository;
    constructor(noticeRepository: Repository<Notice>);
    findAll(options: FindAllOptions): Promise<PaginatedNotices>;
    findOne(id: number): Promise<Notice>;
    create(notice: Partial<Notice>): Promise<Notice>;
    update(id: number, notice: Partial<Notice>): Promise<Notice>;
    delete(id: number): Promise<void>;
}
export {};
