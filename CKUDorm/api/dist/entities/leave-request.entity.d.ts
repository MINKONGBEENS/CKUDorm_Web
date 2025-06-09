import { Kandorm } from './kandorm.entity';
import { Admin } from './admin.entity';
export declare enum LeaveRequestDuration {
    ONE_TWO = "1\uBC152\uC77C",
    TWO_THREE = "2\uBC153\uC77C",
    THREE_FOUR = "3\uBC154\uC77C"
}
export declare enum LeaveRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class LeaveRequest {
    id: number;
    studentId: number;
    student: Kandorm;
    apply_date: Date;
    duration: LeaveRequestDuration;
    reason: string;
    contact: string;
    roomNumber: string;
    status: LeaveRequestStatus;
    reviewedBy: number;
    reviewer: Admin;
    reviewedAt: Date;
    created_at: Date;
}
