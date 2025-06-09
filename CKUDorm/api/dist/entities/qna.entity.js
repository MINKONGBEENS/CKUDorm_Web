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
exports.Qna = exports.QnaStatus = void 0;
const typeorm_1 = require("typeorm");
const kandorm_entity_1 = require("./kandorm.entity");
const admin_entity_1 = require("./admin.entity");
var QnaStatus;
(function (QnaStatus) {
    QnaStatus["OPEN"] = "open";
    QnaStatus["ANSWERED"] = "answered";
    QnaStatus["CLOSED"] = "closed";
})(QnaStatus || (exports.QnaStatus = QnaStatus = {}));
let Qna = class Qna {
    id;
    studentId;
    student;
    title;
    content;
    status;
    answer;
    answeredBy;
    answerer;
    answeredAt;
    created_at;
};
exports.Qna = Qna;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Qna.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'student_id' }),
    __metadata("design:type", Number)
], Qna.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => kandorm_entity_1.Kandorm),
    (0, typeorm_1.JoinColumn)({ name: 'student_id' }),
    __metadata("design:type", kandorm_entity_1.Kandorm)
], Qna.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Qna.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Qna.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: QnaStatus, default: QnaStatus.OPEN }),
    __metadata("design:type", String)
], Qna.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Qna.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'answered_by', nullable: true }),
    __metadata("design:type", Number)
], Qna.prototype, "answeredBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'answered_by' }),
    __metadata("design:type", admin_entity_1.Admin)
], Qna.prototype, "answerer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'answered_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Qna.prototype, "answeredAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Qna.prototype, "created_at", void 0);
exports.Qna = Qna = __decorate([
    (0, typeorm_1.Entity)('qna')
], Qna);
//# sourceMappingURL=qna.entity.js.map