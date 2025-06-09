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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const kandorm_entity_1 = require("../../entities/kandorm.entity");
let AuthService = class AuthService {
    kandormRepository;
    jwtService;
    constructor(kandormRepository, jwtService) {
        this.kandormRepository = kandormRepository;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const existingStudent = await this.kandormRepository.findOne({
            where: { studentId: registerDto.studentId },
        });
        if (existingStudent) {
            throw new common_1.ConflictException('이미 등록된 학번입니다.');
        }
        const student = this.kandormRepository.create(registerDto);
        return this.kandormRepository.save(student);
    }
    async login(loginDto) {
        const student = await this.kandormRepository.findOne({
            where: { studentId: loginDto.studentId },
        });
        if (!student) {
            throw new common_1.UnauthorizedException('학번 또는 비밀번호가 일치하지 않습니다.');
        }
        if (loginDto.password !== student.password) {
            throw new common_1.UnauthorizedException('학번 또는 비밀번호가 일치하지 않습니다.');
        }
        const payload = {
            sub: student.studentId,
            name: student.name,
            dormitory: student.dormitory,
            roomNumber: student.roomNumber,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
    async validateStudent(studentId) {
        const student = await this.kandormRepository.findOne({
            where: { studentId },
        });
        if (!student) {
            throw new common_1.UnauthorizedException('유효하지 않은 토큰입니다.');
        }
        return student;
    }
    async getProfile(studentId) {
        const student = await this.kandormRepository.findOne({
            where: { studentId },
            select: ['studentId', 'name', 'dormitory', 'roomNumber', 'grade', 'departmentId', 'phone'],
        });
        if (!student) {
            throw new common_1.UnauthorizedException('학생 정보를 찾을 수 없습니다.');
        }
        return student;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(kandorm_entity_1.Kandorm)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map