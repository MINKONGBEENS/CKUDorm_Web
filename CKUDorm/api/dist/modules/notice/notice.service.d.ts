import { Repository } from 'typeorm';
import { Notice, NoticeCategory } from '../../entities/notice.entity';
export declare class NoticeService {
    private noticeRepository;
    constructor(noticeRepository: Repository<Notice>);
    findAll(category?: NoticeCategory): Promise<Notice[]>;
    findOne(id: number): Promise<Notice>;
    create(notice: Partial<Notice>): Promise<Notice>;
    update(id: number, notice: Partial<Notice>): Promise<Notice>;
    delete(id: number): Promise<void>;
}
