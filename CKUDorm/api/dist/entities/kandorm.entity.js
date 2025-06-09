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
exports.Kandorm = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("./department.entity");
let Kandorm = class Kandorm {
    id;
    name;
    departmentId;
    department;
    grade;
    studentId;
    phone;
    dormitory;
    roomNumber;
    password;
};
exports.Kandorm = Kandorm;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Kandorm.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Kandorm.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department_id' }),
    __metadata("design:type", Number)
], Kandorm.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", department_entity_1.Department)
], Kandorm.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Kandorm.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Kandorm.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Kandorm.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Kandorm.prototype, "dormitory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_number', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], Kandorm.prototype, "roomNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Kandorm.prototype, "password", void 0);
exports.Kandorm = Kandorm = __decorate([
    (0, typeorm_1.Entity)('kandorm')
], Kandorm);
//# sourceMappingURL=kandorm.entity.js.map