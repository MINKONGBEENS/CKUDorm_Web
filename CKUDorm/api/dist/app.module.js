"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const notice_module_1 = require("./modules/notice/notice.module");
const point_module_1 = require("./modules/point/point.module");
const kandorm_module_1 = require("./modules/kandorm/kandorm.module");
const leave_request_module_1 = require("./modules/leave-request/leave-request.module");
const admin_entity_1 = require("./entities/admin.entity");
const department_entity_1 = require("./entities/department.entity");
const kandorm_entity_1 = require("./entities/kandorm.entity");
const leave_request_entity_1 = require("./entities/leave-request.entity");
const menu_entity_1 = require("./entities/menu.entity");
const notice_entity_1 = require("./entities/notice.entity");
const point_entity_1 = require("./entities/point.entity");
const qna_entity_1 = require("./entities/qna.entity");
const user_entity_1 = require("./entities/user.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DB_HOST'),
                    port: +configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    entities: [
                        department_entity_1.Department,
                        admin_entity_1.Admin,
                        user_entity_1.User,
                        kandorm_entity_1.Kandorm,
                        leave_request_entity_1.LeaveRequest,
                        menu_entity_1.Menu,
                        notice_entity_1.Notice,
                        point_entity_1.Point,
                        qna_entity_1.Qna,
                    ],
                    synchronize: false,
                    logging: ['error'],
                    charset: 'utf8mb4',
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            notice_module_1.NoticeModule,
            point_module_1.PointModule,
            kandorm_module_1.KandormModule,
            leave_request_module_1.LeaveRequestModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map