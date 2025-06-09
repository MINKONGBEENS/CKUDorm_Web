import { PointType } from '../../../entities/point.entity';
export declare class UpdatePointDto {
    point?: number;
    type?: PointType;
    reason?: string;
    createdBy?: number;
}
