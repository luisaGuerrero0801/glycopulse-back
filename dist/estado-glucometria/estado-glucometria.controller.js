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
exports.EstadoGlucometriaController = void 0;
const common_1 = require("@nestjs/common");
const estado_glucometria_service_1 = require("./estado-glucometria.service");
let EstadoGlucometriaController = class EstadoGlucometriaController {
    constructor(estadoGlucometriaService) {
        this.estadoGlucometriaService = estadoGlucometriaService;
    }
    findAll() {
        return this.estadoGlucometriaService.findAll();
    }
    findOne(id) {
        return this.estadoGlucometriaService.findOne(+id);
    }
    remove(id) {
        return this.estadoGlucometriaService.remove(+id);
    }
};
exports.EstadoGlucometriaController = EstadoGlucometriaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EstadoGlucometriaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstadoGlucometriaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstadoGlucometriaController.prototype, "remove", null);
exports.EstadoGlucometriaController = EstadoGlucometriaController = __decorate([
    (0, common_1.Controller)('estado-glucometria'),
    __metadata("design:paramtypes", [estado_glucometria_service_1.EstadoGlucometriaService])
], EstadoGlucometriaController);
//# sourceMappingURL=estado-glucometria.controller.js.map