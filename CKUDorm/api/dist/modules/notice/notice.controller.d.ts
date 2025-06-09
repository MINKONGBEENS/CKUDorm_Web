import { NoticeService } from './notice.service';
import { Notice, NoticeCategory } from '../../entities/notice.entity';
import { ApiResponse } from '../../types/common';
export declare class NoticeController {
    private readonly noticeService;
    constructor(noticeService: NoticeService);
    findAll(category?: NoticeCategory): Promise<ApiResponse<Notice[]>>;
    findOne(id: number): Promise<ApiResponse<Notice>>;
    create(notice: Partial<Notice>): Promise<ApiResponse<Notice>>;
    update(id: number, notice: Partial<Notice>): Promise<ApiResponse<Notice>>;
    delete(id: number): Promise<ApiResponse<void>>;
}
