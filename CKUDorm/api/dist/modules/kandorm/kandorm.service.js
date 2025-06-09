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
exports.KandormService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const kandorm_entity_1 = require("../../entities/kandorm.entity");
let KandormService = class KandormService {
    kandormRepository;
    constructor(kandormRepository) {
        this.kandormRepository = kandormRepository;
    }
    async findAll(page = 1, limit = 10, search) {
        const queryBuilder = this.kandormRepository.createQueryBuilder('kandorm')
            .leftJoinAndSelect('kandorm.department', 'department');
        if (search) {
            queryBuilder.where([
                { name: (0, typeorm_2.ILike)(`%${search}%`) },
                { studentId: (0, typeorm_2.ILike)(`%${search}%`) },
                { dormitory: (0, typeorm_2.ILike)(`%${search}%`) },
                { roomNumber: (0, typeorm_2.ILike)(`%${search}%`) },
            ]);
        }
        const [students, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return { students, total };
    }
    async findOne(id) {
        const student = await this.kandormRepository.findOne({
            where: { id },
            relations: ['department'],
        });
        if (!student) {
            throw new common_1.NotFoundException('학생을 찾을 수 없습니다.');
        }
        return student;
    }
    async update(id, updateData) {
        const student = await this.findOne(id);
        const { password, ...safeUpdateData } = updateData;
        Object.assign(student, safeUpdateData);
        return this.kandormRepository.save(student);
    }
    async delete(id) {
        const result = await this.kandormRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException('학생을 찾을 수 없습니다.');
        }
    }
};
exports.KandormService = KandormService;
exports.KandormService = KandormService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(kandorm_entity_1.Kandorm)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], KandormService);
//# sourceMappingURL=kandorm.service.js.map