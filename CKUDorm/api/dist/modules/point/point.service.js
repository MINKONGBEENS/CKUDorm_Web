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
exports.PointService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const point_entity_1 = require("../../entities/point.entity");
const kandorm_entity_1 = require("../../entities/kandorm.entity");
const admin_entity_1 = require("../../entities/admin.entity");
let PointService = class PointService {
    pointRepository;
    kandormRepository;
    adminRepository;
    constructor(pointRepository, kandormRepository, adminRepository) {
        this.pointRepository = pointRepository;
        this.kandormRepository = kandormRepository;
        this.adminRepository = adminRepository;
    }
    async findAll() {
        return this.pointRepository.find({
            order: {
                created_at: 'DESC',
            },
            relations: ['student', 'creator'],
        });
    }
    async findByStudent(studentId) {
        return this.pointRepository.find({
            where: { studentId },
            order: {
                created_at: 'DESC',
            },
            relations: ['student', 'creator'],
        });
    }
    async findOne(id) {
        const point = await this.pointRepository.findOne({
            where: { id },
            relations: ['student', 'creator'],
        });
        if (!point) {
            throw new common_1.NotFoundException('상벌점 기록을 찾을 수 없습니다.');
        }
        return point;
    }
    async create(point) {
        if (!point.point) {
            throw new common_1.BadRequestException('점수를 입력해주세요.');
        }
        const student = await this.kandormRepository.findOne({
            where: { studentId: point.studentId?.toString() },
        });
        if (!student) {
            throw new common_1.NotFoundException('학생을 찾을 수 없습니다.');
        }
        const admin = await this.adminRepository.findOne({
            where: { id: point.createdBy },
        });
        if (!admin) {
            throw new common_1.NotFoundException('관리자를 찾을 수 없습니다.');
        }
        const newPoint = this.pointRepository.create({
            ...point,
            studentId: parseInt(student.studentId),
        });
        return this.pointRepository.save(newPoint);
    }
    async update(id, point) {
        const existingPoint = await this.findOne(id);
        await this.pointRepository.update(id, point);
        const updatedPoint = await this.pointRepository.findOne({
            where: { id },
            relations: ['student', 'creator'],
        });
        if (!updatedPoint) {
            throw new common_1.NotFoundException('상벌점 기록을 찾을 수 없습니다.');
        }
        return updatedPoint;
    }
    async delete(id) {
        const point = await this.findOne(id);
        await this.pointRepository.remove(point);
    }
};
exports.PointService = PointService;
exports.PointService = PointService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(point_entity_1.Point)),
    __param(1, (0, typeorm_1.InjectRepository)(kandorm_entity_1.Kandorm)),
    __param(2, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PointService);
//# sourceMappingURL=point.service.js.map