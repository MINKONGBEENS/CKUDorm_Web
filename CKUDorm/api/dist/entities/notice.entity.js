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
exports.Notice = exports.NoticeCategory = void 0;
const typeorm_1 = require("typeorm");
var NoticeCategory;
(function (NoticeCategory) {
    NoticeCategory["GENERAL"] = "GENERAL";
    NoticeCategory["IMPORTANT"] = "IMPORTANT";
    NoticeCategory["EVENT"] = "EVENT";
})(NoticeCategory || (exports.NoticeCategory = NoticeCategory = {}));
let Notice = class Notice {
    id;
    title;
    content;
    category;
    createdAt;
    updatedAt;
};
exports.Notice = Notice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Notice.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Notice.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: NoticeCategory, default: NoticeCategory.GENERAL }),
    __metadata("design:type", String)
], Notice.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', precision: 6 }),
    __metadata("design:type", Date)
], Notice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime', precision: 6 }),
    __metadata("design:type", Date)
], Notice.prototype, "updatedAt", void 0);
exports.Notice = Notice = __decorate([
    (0, typeorm_1.Entity)('notices')
], Notice);
//# sourceMappingURL=notice.entity.js.map