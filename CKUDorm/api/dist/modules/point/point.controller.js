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
exports.PointController = void 0;
const common_1 = require("@nestjs/common");
const point_service_1 = require("./point.service");
const create_point_dto_1 = require("./dto/create-point.dto");
const update_point_dto_1 = require("./dto/update-point.dto");
let PointController = class PointController {
    pointService;
    constructor(pointService) {
        this.pointService = pointService;
    }
    async findAll() {
        const points = await this.pointService.findAll();
        return {
            success: true,
            data: points,
        };
    }
    async findByStudent(studentId) {
        const points = await this.pointService.findByStudent(studentId);
        return {
            success: true,
            data: points,
        };
    }
    async findOne(id) {
        const point = await this.pointService.findOne(id);
        return {
            success: true,
            data: point,
        };
    }
    async create(createPointDto) {
        const point = await this.pointService.create(createPointDto);
        return {
            success: true,
            data: point,
            message: '상벌점이 등록되었습니다.',
        };
    }
    async update(id, updatePointDto) {
        const point = await this.pointService.update(id, updatePointDto);
        return {
            success: true,
            data: point,
            message: '상벌점이 수정되었습니다.',
        };
    }
    async delete(id) {
        await this.pointService.delete(id);
        return {
            success: true,
            message: '상벌점이 삭제되었습니다.',
        };
    }
};
exports.PointController = PointController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PointController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('student/:studentId'),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "findByStudent", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_point_dto_1.CreatePointDto]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_point_dto_1.UpdatePointDto]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PointController.prototype, "delete", null);
exports.PointController = PointController = __decorate([
    (0, common_1.Controller)('points'),
    __metadata("design:paramtypes", [point_service_1.PointService])
], PointController);
//# sourceMappingURL=point.controller.js.map