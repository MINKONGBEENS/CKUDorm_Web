import { Kandorm } from './kandorm.entity';
import { Admin } from './admin.entity';
export declare enum PointType {
    MERIT = "merit",
    DEMERIT = "demerit"
}
export declare class Point {
    id: number;
    studentId: number;
    student: Kandorm;
    point: number;
    type: PointType;
    reason: string;
    createdBy: number;
    creator: Admin;
    created_at: Date;
}
