import { LeaveRequestService } from './leave-request.service';
import { ApiResponse } from '../../types/common';
export declare class LeaveRequestController {
    private readonly leaveRequestService;
    private readonly logger;
    constructor(leaveRequestService: LeaveRequestService);
    findAll(request: any): Promise<ApiResponse<any[]>>;
    updateStatus(id: number, status: '승인완료' | '반려'): Promise<ApiResponse<any>>;
}
