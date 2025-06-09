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
exports.CreatePointDto = void 0;
const class_validator_1 = require("class-validator");
const point_entity_1 = require("../../../entities/point.entity");
class CreatePointDto {
    studentId;
    point;
    type;
    reason;
    createdBy;
}
exports.CreatePointDto = CreatePointDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePointDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-10),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], CreatePointDto.prototype, "point", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(point_entity_1.PointType),
    __metadata("design:type", String)
], CreatePointDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePointDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePointDto.prototype, "createdBy", void 0);
//# sourceMappingURL=create-point.dto.js.map