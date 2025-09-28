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
exports.IngredientesRecetaController = void 0;
const common_1 = require("@nestjs/common");
const ingredientes_receta_service_1 = require("./ingredientes-receta.service");
let IngredientesRecetaController = class IngredientesRecetaController {
    constructor(ingredientesRecetaService) {
        this.ingredientesRecetaService = ingredientesRecetaService;
    }
    findAll() {
        return this.ingredientesRecetaService.findAll();
    }
    findOne(id) {
        return this.ingredientesRecetaService.findOne(+id);
    }
    remove(id) {
        return this.ingredientesRecetaService.remove(+id);
    }
};
exports.IngredientesRecetaController = IngredientesRecetaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IngredientesRecetaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngredientesRecetaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngredientesRecetaController.prototype, "remove", null);
exports.IngredientesRecetaController = IngredientesRecetaController = __decorate([
    (0, common_1.Controller)('ingredientes-receta'),
    __metadata("design:paramtypes", [ingredientes_receta_service_1.IngredientesRecetaService])
], IngredientesRecetaController);
//# sourceMappingURL=ingredientes-receta.controller.js.map