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
exports.RangoGlucometriasController = void 0;
const common_1 = require("@nestjs/common");
const rango_glucometrias_service_1 = require("./rango-glucometrias.service");
let RangoGlucometriasController = class RangoGlucometriasController {
    constructor(rangoGlucometriasService) {
        this.rangoGlucometriasService = rangoGlucometriasService;
    }
    findAll() {
        return this.rangoGlucometriasService.findAll();
    }
    findOne(id) {
        return this.rangoGlucometriasService.findOne(+id);
    }
    remove(id) {
        return this.rangoGlucometriasService.remove(+id);
    }
};
exports.RangoGlucometriasController = RangoGlucometriasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RangoGlucometriasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RangoGlucometriasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RangoGlucometriasController.prototype, "remove", null);
exports.RangoGlucometriasController = RangoGlucometriasController = __decorate([
    (0, common_1.Controller)('rango-glucometrias'),
    __metadata("design:paramtypes", [rango_glucometrias_service_1.RangoGlucometriasService])
], RangoGlucometriasController);
//# sourceMappingURL=rango-glucometrias.controller.js.map