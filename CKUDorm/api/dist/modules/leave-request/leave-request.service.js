"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const leave_request_entity_1 = require("../../entities/leave-request.entity");
let LeaveRequestService = class LeaveRequestService {
    leaveRequestRepository;
    constructor(leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }
    async findAll() {
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
    async updateStatus(id, status) {
        const leaveRequest = await this.leaveRequestRepository.findOne({
            where: { id },
            relations: ['student'],
        });
        if (!leaveRequest) {
            throw new common_1.NotFoundException(`외박신청 ID ${id}를 찾을 수 없습니다.`);
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
    calculateEndDate(startDate, duration) {
        const days = duration === '1박2일' ? 1 : duration === '2박3일' ? 2 : 3;
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days);
        return endDate;
    }
    convertStatus(status) {
        switch (status) {
            case leave_request_entity_1.LeaveRequestStatus.PENDING:
                return '승인대기';
            case leave_request_entity_1.LeaveRequestStatus.APPROVED:
                return '승인완료';
            case leave_request_entity_1.LeaveRequestStatus.REJECTED:
                return '반려';
            default:
                return status;
        }
    }
};
exports.LeaveRequestService = LeaveRequestService;
exports.LeaveRequestService = LeaveRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_request_entity_1.LeaveRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeaveRequestService);
//# sourceMappingURL=leave-request.service.js.map