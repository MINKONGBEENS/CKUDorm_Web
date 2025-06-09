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
exports.Point = exports.PointType = void 0;
const typeorm_1 = require("typeorm");
const kandorm_entity_1 = require("./kandorm.entity");
const admin_entity_1 = require("./admin.entity");
var PointType;
(function (PointType) {
    PointType["MERIT"] = "merit";
    PointType["DEMERIT"] = "demerit";
})(PointType || (exports.PointType = PointType = {}));
let Point = class Point {
    id;
    studentId;
    student;
    point;
    type;
    reason;
    createdBy;
    creator;
    created_at;
};
exports.Point = Point;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Point.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id' }),
    __metadata("design:type", Number)
], Point.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => kandorm_entity_1.Kandorm),
    (0, typeorm_1.JoinColumn)({ name: 'student_id', foreignKeyConstraintName: 'FK_point_student' }),
    __metadata("design:type", kandorm_entity_1.Kandorm)
], Point.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Point.prototype, "point", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PointType }),
    __metadata("design:type", String)
], Point.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Point.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], Point.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin),
    (0, typeorm_1.JoinColumn)({ name: 'created_by', foreignKeyConstraintName: 'FK_point_creator' }),
    __metadata("design:type", admin_entity_1.Admin)
], Point.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Point.prototype, "created_at", void 0);
exports.Point = Point = __decorate([
    (0, typeorm_1.Entity)('points')
], Point);
//# sourceMappingURL=point.entity.js.map