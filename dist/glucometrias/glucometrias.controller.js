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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlucometriasController = void 0;
const common_1 = require("@nestjs/common");
const glucometrias_service_1 = require("./glucometrias.service");
const auth_guard_1 = require("../auth/guard/auth.guard");
const roles_guard_1 = require("../auth/guard/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const create_glucometria_dto_1 = require("./dto/create-glucometria.dto");
const update_glucometria_dto_1 = require("./dto/update-glucometria.dto");
let GlucometriasController = class GlucometriasController {
    constructor(glucometrias) {
        this.glucometrias = glucometrias;
    }
    create(createGlucometriaDto, req) {
        const userId = req.user?.sub;
        return this.glucometrias.create(createGlucometriaDto, userId);
    }
    async findOneById(id) {
        return this.glucometrias.findOneById(Number(id));
    }
    async getNombresRangos() {
        return this.glucometrias.getNombresRangosUnicos();
    }
    findLastByUser(userId) {
        return this.glucometrias.findLastByUser(userId);
    }
    async findAllByUser(userId, filters) {
        return this.glucometrias.findAllByUser(userId, filters);
    }
    update(idGlucometria, updateGlucometriaDto, req) {
        const userId = req.user?.sub;
        return this.glucometrias.update(idGlucometria, updateGlucometriaDto, userId);
    }
    remove(idGlucometria) {
        return this.glucometrias.remove(idGlucometria);
    }
};
exports.GlucometriasController = GlucometriasController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Paciente'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_glucometria_dto_1.CreateGlucometriaDto, Object]),
    __metadata("design:returntype", void 0)
], GlucometriasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlucometriasController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('rangos/nombres'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GlucometriasController.prototype, "getNombresRangos", null);
__decorate([
    (0, common_1.Get)('last/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GlucometriasController.prototype, "findLastByUser", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Paciente', 'Doctor'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GlucometriasController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Patch)(':idGlucometria'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Paciente'),
    __param(0, (0, common_1.Param)('idGlucometria', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_glucometria_dto_1.UpdateGlucometriaDto, Object]),
    __metadata("design:returntype", void 0)
], GlucometriasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':idGlucometria'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Paciente'),
    __param(0, (0, common_1.Param)('idGlucometria', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GlucometriasController.prototype, "remove", null);
exports.GlucometriasController = GlucometriasController = __decorate([
    (0, common_1.Controller)('glucometrias'),
    __metadata("design:paramtypes", [glucometrias_service_1.GlucometriasService])
], GlucometriasController);
//# sourceMappingURL=glucometrias.controller.js.map