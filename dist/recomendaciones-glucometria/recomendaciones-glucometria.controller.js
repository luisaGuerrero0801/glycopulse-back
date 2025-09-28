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
exports.RecomendacionesGlucometriaController = void 0;
const common_1 = require("@nestjs/common");
const recomendaciones_glucometria_service_1 = require("./recomendaciones-glucometria.service");
const create_recomendaciones_glucometria_dto_1 = require("./dto/create-recomendaciones-glucometria.dto");
const update_recomendaciones_glucometria_dto_1 = require("./dto/update-recomendaciones-glucometria.dto");
let RecomendacionesGlucometriaController = class RecomendacionesGlucometriaController {
    constructor(recomendacionesGlucometriaService) {
        this.recomendacionesGlucometriaService = recomendacionesGlucometriaService;
    }
    create(createRecomendacionesGlucometriaDto) {
        return this.recomendacionesGlucometriaService.create(createRecomendacionesGlucometriaDto);
    }
    findAll() {
        return this.recomendacionesGlucometriaService.findAll();
    }
    findOne(id) {
        return this.recomendacionesGlucometriaService.findOne(+id);
    }
    update(id, updateRecomendacionesGlucometriaDto) {
        return this.recomendacionesGlucometriaService.update(+id, updateRecomendacionesGlucometriaDto);
    }
    remove(id) {
        return this.recomendacionesGlucometriaService.remove(+id);
    }
};
exports.RecomendacionesGlucometriaController = RecomendacionesGlucometriaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recomendaciones_glucometria_dto_1.CreateRecomendacionesGlucometriaDto]),
    __metadata("design:returntype", void 0)
], RecomendacionesGlucometriaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecomendacionesGlucometriaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecomendacionesGlucometriaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_recomendaciones_glucometria_dto_1.UpdateRecomendacionesGlucometriaDto]),
    __metadata("design:returntype", void 0)
], RecomendacionesGlucometriaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RecomendacionesGlucometriaController.prototype, "remove", null);
exports.RecomendacionesGlucometriaController = RecomendacionesGlucometriaController = __decorate([
    (0, common_1.Controller)('recomendaciones-glucometria'),
    __metadata("design:paramtypes", [recomendaciones_glucometria_service_1.RecomendacionesGlucometriaService])
], RecomendacionesGlucometriaController);
//# sourceMappingURL=recomendaciones-glucometria.controller.js.map