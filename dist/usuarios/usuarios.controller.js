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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
let UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    create(createUsuarioDto) {
        return this.usuariosService.create(createUsuarioDto);
    }
    async getCountByRolAndRh() {
        return this.usuariosService.countByRolAndRh();
    }
    findAll() {
        return this.usuariosService.findAll();
    }
    buscarDoctores() {
        return this.usuariosService.buscarDoctores();
    }
    findOne(idUsuario) {
        return this.usuariosService.findOne(idUsuario);
    }
    getBasicInfo(idUsuario) {
        return this.usuariosService.getBasicInfo(idUsuario);
    }
    findPacientesByDoctor(idDoctor) {
        return this.usuariosService.findPacientesByDoctor(idDoctor);
    }
    update(idUsuario, updateUsuarioDto) {
        return this.usuariosService.update(idUsuario, updateUsuarioDto);
    }
    remove(idUsuario) {
        return this.usuariosService.remove(idUsuario);
    }
    cambiarEstado(idUsuario, activo) {
        return this.usuariosService.cambiarEstado(idUsuario, activo);
    }
    asignarDoctor(idPaciente, idDoctor) {
        return this.usuariosService.asignarDoctor(idPaciente, idDoctor);
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('conteo-rol-rh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "getCountByRolAndRh", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('doctores'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "buscarDoctores", null);
__decorate([
    (0, common_1.Get)(':idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':idUsuario/info'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "getBasicInfo", null);
__decorate([
    (0, common_1.Get)('doctor/:idDoctor/pacientes'),
    __param(0, (0, common_1.Param)('idDoctor', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findPacientesByDoctor", null);
__decorate([
    (0, common_1.Patch)(':idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':idUsuario/estado'),
    __param(0, (0, common_1.Param)('idUsuario', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('activo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "cambiarEstado", null);
__decorate([
    (0, common_1.Patch)(':idPaciente/asignar-doctor'),
    __param(0, (0, common_1.Param)('idPaciente', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('idDoctor', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "asignarDoctor", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map