"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_2.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'debug'],
    });
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:19000',
            'http://localhost:19006',
            /^https:\/\/.*\.ckudorm\.com$/,
        ],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('CKU Dormitory API')
        .setDescription('Catholic Kwandong University Dormitory Management System API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const port = process.env.PORT || 4000;
    await app.listen(port);
    logger.log(`API Server is running on port ${port}`);
    logger.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map