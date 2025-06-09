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
exports.Menu = exports.MealType = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
var MealType;
(function (MealType) {
    MealType["BREAKFAST"] = "breakfast";
    MealType["LUNCH"] = "lunch";
    MealType["DINNER"] = "dinner";
})(MealType || (exports.MealType = MealType = {}));
let Menu = class Menu {
    id;
    menu_date;
    meal_type;
    menu;
    createdBy;
    creator;
    created_at;
};
exports.Menu = Menu;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Menu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Menu.prototype, "menu_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MealType }),
    __metadata("design:type", String)
], Menu.prototype, "meal_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Menu.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], Menu.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.Admin),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", admin_entity_1.Admin)
], Menu.prototype, "creator", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Menu.prototype, "created_at", void 0);
exports.Menu = Menu = __decorate([
    (0, typeorm_1.Entity)('menus')
], Menu);
//# sourceMappingURL=menu.entity.js.map