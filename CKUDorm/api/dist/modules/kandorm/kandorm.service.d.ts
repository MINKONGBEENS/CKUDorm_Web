import { Repository } from 'typeorm';
import { Kandorm } from '../../entities/kandorm.entity';
export declare class KandormService {
    private kandormRepository;
    constructor(kandormRepository: Repository<Kandorm>);
    findAll(page?: number, limit?: number, search?: string): Promise<{
        students: Kandorm[];
        total: number;
    }>;
    findOne(id: number): Promise<Kandorm>;
    update(id: number, updateData: Partial<Kandorm>): Promise<Kandorm>;
    delete(id: number): Promise<void>;
}
