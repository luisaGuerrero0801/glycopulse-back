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
exports.IngredientesController = void 0;
const common_1 = require("@nestjs/common");
const ingredientes_service_1 = require("./ingredientes.service");
const create_ingrediente_dto_1 = require("./dto/create-ingrediente.dto");
const update_ingrediente_dto_1 = require("./dto/update-ingrediente.dto");
let IngredientesController = class IngredientesController {
    constructor(ingredientesService) {
        this.ingredientesService = ingredientesService;
    }
    create(createIngredienteDto) {
        return this.ingredientesService.create(createIngredienteDto);
    }
    findAll() {
        return this.ingredientesService.findAll();
    }
    findOne(idIngrediente) {
        return this.ingredientesService.findOne(idIngrediente);
    }
    update(idIngrediente, updateIngredienteDto) {
        return this.ingredientesService.update(idIngrediente, updateIngredienteDto);
    }
    remove(idIngrediente) {
        return this.ingredientesService.remove(idIngrediente);
    }
};
exports.IngredientesController = IngredientesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ingrediente_dto_1.CreateIngredienteDto]),
    __metadata("design:returntype", void 0)
], IngredientesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IngredientesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':idIngrediente'),
    __param(0, (0, common_1.Param)('idIngrediente', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IngredientesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':idIngrediente'),
    __param(0, (0, common_1.Param)('idIngrediente', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_ingrediente_dto_1.UpdateIngredienteDto]),
    __metadata("design:returntype", void 0)
], IngredientesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':idIngrediente'),
    __param(0, (0, common_1.Param)('idIngrediente', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IngredientesController.prototype, "remove", null);
exports.IngredientesController = IngredientesController = __decorate([
    (0, common_1.Controller)('ingredientes'),
    __metadata("design:paramtypes", [ingredientes_service_1.IngredientesService])
], IngredientesController);
//# sourceMappingURL=ingredientes.controller.js.map