import { PointType } from '../../../entities/point.entity';
export declare class CreatePointDto {
    studentId: number;
    point: number;
    type: PointType;
    reason: string;
    createdBy: number;
}
