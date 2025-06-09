"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KandormModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const kandorm_entity_1 = require("../../entities/kandorm.entity");
const kandorm_controller_1 = require("./kandorm.controller");
const kandorm_service_1 = require("./kandorm.service");
let KandormModule = class KandormModule {
};
exports.KandormModule = KandormModule;
exports.KandormModule = KandormModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([kandorm_entity_1.Kandorm])],
        controllers: [kandorm_controller_1.KandormController],
        providers: [kandorm_service_1.KandormService],
        exports: [kandorm_service_1.KandormService],
    })
], KandormModule);
//# sourceMappingURL=kandorm.module.js.map