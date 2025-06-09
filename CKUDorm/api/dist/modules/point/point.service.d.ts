import { Repository } from 'typeorm';
import { Point } from '../../entities/point.entity';
import { Kandorm } from '../../entities/kandorm.entity';
import { Admin } from '../../entities/admin.entity';
export declare class PointService {
    private pointRepository;
    private kandormRepository;
    private adminRepository;
    constructor(pointRepository: Repository<Point>, kandormRepository: Repository<Kandorm>, adminRepository: Repository<Admin>);
    findAll(): Promise<Point[]>;
    findByStudent(studentId: number): Promise<Point[]>;
    findOne(id: number): Promise<Point>;
    create(point: Partial<Point>): Promise<Point>;
    update(id: number, point: Partial<Point>): Promise<Point>;
    delete(id: number): Promise<void>;
}
