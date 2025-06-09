"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireAdmin = void 0;
const common_1 = require("@nestjs/common");
const RequireAdmin = () => (0, common_1.SetMetadata)('requireAdmin', true);
exports.RequireAdmin = RequireAdmin;
//# sourceMappingURL=roles.decorator.js.map