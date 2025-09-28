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
exports.RecomendacionesEstadoController = void 0;
const common_1 = require("@nestjs/common");
const recomendaciones_estado_service_1 = require("./recomendaciones-estado.service");
const create_recomendaciones_estado_dto_1 = require("./dto/create-recomendaciones-estado.dto");
const update_recomendaciones_estado_dto_1 = require("./dto/update-recomendaciones-estado.dto");
let RecomendacionesEstadoController = class RecomendacionesEstadoController {
    constructor(recomendacionesEstadoService) {
        this.recomendacionesEstadoService = recomendacionesEstadoService;
    }
    create(createRecomendacionesEstadoDto) {
        return this.recomendacionesEstadoService.create(createRecomendacionesEstadoDto);
    }
    findAll() {
        return this.recomendacionesEstadoService.findAll();
    }
    findOne(id) {
        return this.recomendacionesEstadoService.findOne(+id);
    }
    update(id, updateRecomendacionesEstadoDto) {
        return this.recomendacionesEstadoService.update(+id, updateRecomendacionesEstadoDto);
    }
    remove(id) {
        return this.recomendacionesEstadoService.remove(+id);
    }
};
exports.RecomendacionesEstadoController = RecomendacionesEstadoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recomendaciones_estado_dto_1.CreateRecomendacionesEstadoDto]),
    __metadata("design:returntype", void 0)
], RecomendacionesEstadoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecomendacionesEstadoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecomendacionesEstadoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_recomendaciones_estado_dto_1.UpdateRecomendacionesEstadoDto]),
    __metadata("design:returntype", void 0)
], RecomendacionesEstadoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecomendacionesEstadoController.prototype, "remove", null);
exports.RecomendacionesEstadoController = RecomendacionesEstadoController = __decorate([
    (0, common_1.Controller)('recomendaciones-estado'),
    __metadata("design:paramtypes", [recomendaciones_estado_service_1.RecomendacionesEstadoService])
], RecomendacionesEstadoController);
//# sourceMappingURL=recomendaciones-estado.controller.js.map