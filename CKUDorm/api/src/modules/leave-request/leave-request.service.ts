import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest, LeaveRequestStatus } from '../../entities/leave-request.entity';

@Injectable()
export class LeaveRequestService {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRequestRepository: Repository<LeaveRequest>,
  ) {}

  async findAll(): Promise<any[]> {
    const requests = await this.leaveRequestRepository
      .createQueryBuilder('lr')
      .leftJoinAndSelect('lr.student', 'student')
      .orderBy('lr.createdAt', 'DESC')
      .getMany();

    return requests.map(request => ({
      id: request.id,
      studentName: request.student.name,
      studentId: request.student.studentId,
      room: request.student.roomNumber,
      startDate: request.applyDate,
      endDate: this.calculateEndDate(request.applyDate, request.duration),
      reason: request.reason,
      emergencyContact: request.contact,
      destination: request.roomNumber,
      status: this.convertStatus(request.status),
      createdAt: request.createdAt,
      duration: request.duration,
    }));
  }

  async updateStatus(id: number, status: LeaveRequestStatus): Promise<any> {
    const leaveRequest = await this.leaveRequestRepository.findOne({
      where: { id },
      relations: ['student'],
    });

    if (!leaveRequest) {
      throw new NotFoundException(`외박신청 ID ${id}를 찾을 수 없습니다.`);
    }

    leaveRequest.status = status;
    leaveRequest.reviewedAt = new Date();

    const updatedRequest = await this.leaveRequestRepository.save(leaveRequest);

    return {
      id: updatedRequest.id,
      studentName: updatedRequest.student.name,
      studentId: updatedRequest.student.studentId,
      room: updatedRequest.student.roomNumber,
      startDate: updatedRequest.applyDate,
      endDate: this.calculateEndDate(updatedRequest.applyDate, updatedRequest.duration),
      reason: updatedRequest.reason,
      emergencyContact: updatedRequest.contact,
      destination: updatedRequest.roomNumber,
      status: this.convertStatus(status),
      createdAt: updatedRequest.createdAt,
      duration: updatedRequest.duration,
    };
  }

  private calculateEndDate(startDate: Date, duration: string): Date {
    const days = duration === '1박2일' ? 1 : duration === '2박3일' ? 2 : 3;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days);
    return endDate;
  }

  private convertStatus(status: string): string {
    switch (status) {
      case LeaveRequestStatus.PENDING:
        return '승인대기';
      case LeaveRequestStatus.APPROVED:
        return '승인완료';
      case LeaveRequestStatus.REJECTED:
        return '반려';
      default:
        return status;
    }
  }
} 