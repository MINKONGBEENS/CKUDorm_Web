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
var LeaveRequestController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestController = void 0;
const common_1 = require("@nestjs/common");
const leave_request_service_1 = require("./leave-request.service");
const leave_request_entity_1 = require("../../entities/leave-request.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
let LeaveRequestController = LeaveRequestController_1 = class LeaveRequestController {
    leaveRequestService;
    logger = new common_1.Logger(LeaveRequestController_1.name);
    constructor(leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }
    async findAll(request) {
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
        }
        catch (error) {
            this.logger.error('Error fetching leave requests:', error);
            throw error;
        }
    }
    async updateStatus(id, status) {
        this.logger.debug(`Updating leave request status: ID=${id}, status=${status}`);
        try {
            const backendStatus = status === '승인완료' ? leave_request_entity_1.LeaveRequestStatus.APPROVED : leave_request_entity_1.LeaveRequestStatus.REJECTED;
            const result = await this.leaveRequestService.updateStatus(id, backendStatus);
            this.logger.debug(`Successfully updated leave request status: ${JSON.stringify(result)}`);
            return {
                success: true,
                data: result,
                message: `외박신청이 성공적으로 ${status === '승인완료' ? '승인' : '반려'}되었습니다.`
            };
        }
        catch (error) {
            this.logger.error(`Error updating leave request status: ID=${id}`, error);
            throw error;
        }
    }
};
exports.LeaveRequestController = LeaveRequestController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaveRequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], LeaveRequestController.prototype, "updateStatus", null);
exports.LeaveRequestController = LeaveRequestController = LeaveRequestController_1 = __decorate([
    (0, common_1.Controller)('leave-requests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [leave_request_service_1.LeaveRequestService])
], LeaveRequestController);
//# sourceMappingURL=leave-request.controller.js.map