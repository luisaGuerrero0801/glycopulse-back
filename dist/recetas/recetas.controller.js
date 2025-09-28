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
exports.RecetasController = void 0;
const common_1 = require("@nestjs/common");
const recetas_service_1 = require("./recetas.service");
const create_receta_dto_1 = require("./dto/create-receta.dto");
const update_receta_dto_1 = require("./dto/update-receta.dto");
const auth_guard_1 = require("../auth/guard/auth.guard");
const roles_guard_1 = require("../auth/guard/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let RecetasController = class RecetasController {
    constructor(recetasService) {
        this.recetasService = recetasService;
    }
    create(createRecetaDto) {
        return this.recetasService.create(createRecetaDto, createRecetaDto.idUsuario);
    }
    findAll() {
        return this.recetasService.findAll();
    }
    findOne(idReceta) {
        return this.recetasService.findOne(idReceta);
    }
    findRecetaByPaciente(idUsuario) {
        return this.recetasService.findRecetaByPaciente(idUsuario);
    }
    update(idReceta, updateRecetaDto) {
        return this.recetasService.update(idReceta, updateRecetaDto, updateRecetaDto.idUsuario);
    }
    remove(idReceta) {
        return this.recetasService.remove(idReceta);
    }
};
exports.RecetasController = RecetasController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Doctor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_receta_dto_1.CreateRecetaDto]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Doctor', 'Paciente'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':idReceta'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Doctor', 'Paciente'),
    __param(0, (0, common_1.Param)('idReceta', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('usuario/:idUsuario'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Doctor', 'Paciente'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "findRecetaByPaciente", null);
__decorate([
    (0, common_1.Patch)(':idReceta'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Doctor'),
    __param(0, (0, common_1.Param)('idReceta', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_receta_dto_1.UpdateRecetaDto]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':idReceta'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Doctor'),
    __param(0, (0, common_1.Param)('idReceta', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecetasController.prototype, "remove", null);
exports.RecetasController = RecetasController = __decorate([
    (0, common_1.Controller)('recetas'),
    __metadata("design:paramtypes", [recetas_service_1.RecetasService])
], RecetasController);
//# sourceMappingURL=recetas.controller.js.map