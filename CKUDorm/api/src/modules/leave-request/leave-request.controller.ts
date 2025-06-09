import { Controller, Get, Post, Patch, Body, Param, UseGuards, Logger, Req } from '@nestjs/common';
import { LeaveRequestService } from './leave-request.service';
import { LeaveRequest, LeaveRequestStatus } from '../../entities/leave-request.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiResponse } from '../../types/common';

@Controller('leave-requests')
@UseGuards(JwtAuthGuard, AdminGuard)
export class LeaveRequestController {
  private readonly logger = new Logger(LeaveRequestController.name);

  constructor(private readonly leaveRequestService: LeaveRequestService) {}

  @Get()
  async findAll(@Req() request: any): Promise<ApiResponse<any[]>> {
    this.logger.debug('Fetching all leave requests');
    this.logger.debug(`Request user: ${JSON.stringify(request.user)}`);
    
    try {
      const requests = await this.leaveRequestService.findAll();
      this.logger.debug(`Found ${requests.length} leave requests`);
      return {
        success: true,
        data: requests,
        message: '외박신청 목록을 성공적으로 불러왔습니다.'
      };
    } catch (error) {
      this.logger.error('Error fetching leave requests:', error);
      throw error;
    }
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: '승인완료' | '반려',
  ): Promise<ApiResponse<any>> {
    this.logger.debug(`Updating leave request status: ID=${id}, status=${status}`);
    try {
      const backendStatus = status === '승인완료' ? LeaveRequestStatus.APPROVED : LeaveRequestStatus.REJECTED;
      const result = await this.leaveRequestService.updateStatus(id, backendStatus);
      this.logger.debug(`Successfully updated leave request status: ${JSON.stringify(result)}`);
      return {
        success: true,
        data: result,
        message: `외박신청이 성공적으로 ${status === '승인완료' ? '승인' : '반려'}되었습니다.`
      };
    } catch (error) {
      this.logger.error(`Error updating leave request status: ID=${id}`, error);
      throw error;
    }
  }
} 