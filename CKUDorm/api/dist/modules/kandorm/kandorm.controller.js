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
exports.KandormController = void 0;
const common_1 = require("@nestjs/common");
const kandorm_service_1 = require("./kandorm.service");
let KandormController = class KandormController {
    kandormService;
    constructor(kandormService) {
        this.kandormService = kandormService;
    }
    async findAll(page = 1, limit = 10, search) {
        const { students, total } = await this.kandormService.findAll(page, limit, search);
        return {
            success: true,
            data: {
                students,
                total,
            },
            pagination: {
                currentPage: page,
                itemsPerPage: limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const student = await this.kandormService.findOne(id);
        return {
            success: true,
            data: student,
        };
    }
    async update(id, updateData) {
        const student = await this.kandormService.update(id, updateData);
        return {
            success: true,
            data: student,
            message: '학생 정보가 수정되었습니다.',
        };
    }
    async delete(id) {
        await this.kandormService.delete(id);
        return {
            success: true,
            message: '학생이 삭제되었습니다.',
        };
    }
};
exports.KandormController = KandormController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], KandormController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KandormController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], KandormController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], KandormController.prototype, "delete", null);
exports.KandormController = KandormController = __decorate([
    (0, common_1.Controller)('kandorm'),
    __metadata("design:paramtypes", [kandorm_service_1.KandormService])
], KandormController);
//# sourceMappingURL=kandorm.controller.js.map