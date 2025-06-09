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
exports.NoticeController = void 0;
const common_1 = require("@nestjs/common");
const notice_service_1 = require("./notice.service");
const notice_entity_1 = require("../../entities/notice.entity");
let NoticeController = class NoticeController {
    noticeService;
    constructor(noticeService) {
        this.noticeService = noticeService;
    }
    async findAll(category) {
        const notices = await this.noticeService.findAll(category);
        return {
            success: true,
            data: notices,
        };
    }
    async findOne(id) {
        const notice = await this.noticeService.findOne(id);
        return {
            success: true,
            data: notice,
        };
    }
    async create(notice) {
        const newNotice = await this.noticeService.create(notice);
        return {
            success: true,
            data: newNotice,
            message: '공지사항이 등록되었습니다.',
        };
    }
    async update(id, notice) {
        const updatedNotice = await this.noticeService.update(id, notice);
        return {
            success: true,
            data: updatedNotice,
            message: '공지사항이 수정되었습니다.',
        };
    }
    async delete(id) {
        await this.noticeService.delete(id);
        return {
            success: true,
            message: '공지사항이 삭제되었습니다.',
        };
    }
};
exports.NoticeController = NoticeController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "delete", null);
exports.NoticeController = NoticeController = __decorate([
    (0, common_1.Controller)('notices'),
    __metadata("design:paramtypes", [notice_service_1.NoticeService])
], NoticeController);
//# sourceMappingURL=notice.controller.js.map