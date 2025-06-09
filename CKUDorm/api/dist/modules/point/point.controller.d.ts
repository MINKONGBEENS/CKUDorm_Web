import { PointService } from './point.service';
import { Point } from '../../entities/point.entity';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { ApiResponse } from '../../types/common';
export declare class PointController {
    private readonly pointService;
    constructor(pointService: PointService);
    findAll(): Promise<ApiResponse<Point[]>>;
    findByStudent(studentId: number): Promise<ApiResponse<Point[]>>;
    findOne(id: number): Promise<ApiResponse<Point>>;
    create(createPointDto: CreatePointDto): Promise<ApiResponse<Point>>;
    update(id: number, updatePointDto: UpdatePointDto): Promise<ApiResponse<Point>>;
    delete(id: number): Promise<ApiResponse<void>>;
}
