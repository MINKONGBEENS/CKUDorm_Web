import { KandormService } from './kandorm.service';
import { Kandorm } from '../../entities/kandorm.entity';
import { ApiResponse } from '../../types/common';
export declare class KandormController {
    private readonly kandormService;
    constructor(kandormService: KandormService);
    findAll(page?: number, limit?: number, search?: string): Promise<ApiResponse<{
        students: Kandorm[];
        total: number;
    }>>;
    findOne(id: number): Promise<ApiResponse<Kandorm>>;
    update(id: number, updateData: Partial<Kandorm>): Promise<ApiResponse<Kandorm>>;
    delete(id: number): Promise<ApiResponse<void>>;
}
