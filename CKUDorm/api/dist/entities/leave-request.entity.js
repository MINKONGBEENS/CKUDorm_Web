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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequest = exports.LeaveRequestStatus = exports.LeaveRequestDuration = void 0;
const typeorm_1 = require("typeorm");
const kandorm_entity_1 = require("./kandorm.entity");
const admin_entity_1 = require("./admin.entity");
var LeaveRequestDuration;
(function (LeaveRequestDuration) {
    LeaveRequestDuration["ONE_TWO"] = "1\uBC152\uC77C";
    LeaveRequestDuration["TWO_THREE"] = "2\uBC153\uC77C";
    LeaveRequestDuration["THREE_FOUR"] = "3\uBC154\uC77C";
})(LeaveRequestDuration || (exports.LeaveRequestDuration = LeaveRequestDuration = {}));
var LeaveRequestStatus;
(function (LeaveRequestStatus) {
    LeaveRequestStatus["PENDING"] = "pending";
    LeaveRequestStatus["APPROVED"] = "approved";
    LeaveRequestStatus["REJECTED"] = "rejected";
})(LeaveRequestStatus || (exports.LeaveRequestStatus = LeaveRequestStatus = {}));
let LeaveRequest = class LeaveRequest {
    id;
    studentId;
    student;
    apply_date;
    duration;
    reason;
    contact;
    roomNumber;
    status;
    reviewedBy;
    reviewer;
    reviewedAt;
    created_at;
};
exports.LeaveRequest = LeaveRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LeaveRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id' }),
    __metadata("design:type", Number)
], LeaveRequest.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => kandorm_entity_1.Kandorm),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", kandorm_entity_1.Kandorm)
], LeaveRequest.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "apply_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: LeaveRequestDuration }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_number', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "roomNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: LeaveRequestStatus, default: LeaveRequestStatus.PENDING }),
    __metadata("design:type", String)
], LeaveRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_by', nullable: true }),
    __metadata("design:type", Number)
], LeaveRequest.prototype, "reviewedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'reviewed_by' }),
    __metadata("design:type", admin_entity_1.Admin)
], LeaveRequest.prototype, "reviewer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reviewed_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "reviewedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LeaveRequest.prototype, "created_at", void 0);
exports.LeaveRequest = LeaveRequest = __decorate([
    (0, typeorm_1.Entity)('leave_requests')
], LeaveRequest);
//# sourceMappingURL=leave-request.entity.js.map