import { Repository } from 'typeorm';
import { LeaveRequest, LeaveRequestStatus } from '../../entities/leave-request.entity';
export declare class LeaveRequestService {
    private readonly leaveRequestRepository;
    constructor(leaveRequestRepository: Repository<LeaveRequest>);
    findAll(): Promise<any[]>;
    updateStatus(id: number, status: LeaveRequestStatus): Promise<any>;
    private calculateEndDate;
    private convertStatus;
}
